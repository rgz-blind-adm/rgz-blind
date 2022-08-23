"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const crypto_1 = __importDefault(require("crypto"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const AwsConfig = aws_sdk_1.default.config;
const extractSpeechOutputBlocks_1 = __importDefault(require("./internals/utils/extractSpeechOutputBlocks"));
const TextToSpeech_1 = require("./internals/utils/TextToSpeech");
const S3Cache_1 = require("./internals/utils/S3Cache");
const getSpeechMarksCacheKey = (speechOutputId) => `${speechOutputId}.json`;
const getAudioCacheKey = (speechOutputId) => `${speechOutputId}.mp3`;
const publicPath = "./public/tts/";
const getHash = (text) => crypto_1.default
    .createHash("md5")
    .update(text)
    .digest("hex");
const hasTextChanged = (speechMarksJson, freshText) => {
    const textHashInFile = speechMarksJson.textHash;
    return getHash(freshText) !== textHashInFile;
};
const delay = (ms) => {
    var start = Date.now(), now = start;
    while (now - start < ms) {
        now = Date.now();
    }
};
const generateTtsFiles = async (pluginOptions, speechOutputBlock, cache, reporter) => {
    let ssmlTagsBeforeText = "";
    let ssmlTagsAfterText = "";
    const ssmlTagsToUse = speechOutputBlock.ssmlTags || pluginOptions.defaultSsmlTags;
    if (ssmlTagsToUse) {
        if (ssmlTagsToUse.indexOf("$SPEECH_OUTPUT_TEXT") === -1) {
            throw new Error("If the 'defaultSsmlTags' option is defined it must contain the '$SPEECH_OUTPUT_TEXT' variable (see README file).");
        }
        const matches = ssmlTagsToUse.match(/(.*)\$SPEECH_OUTPUT_TEXT(.*)/);
        if (!!matches) {
            ssmlTagsBeforeText = matches[1];
            ssmlTagsAfterText = matches[2];
        }
        else {
            throw new Error("Invalid 'defaultSsmlTags' option defined. Check README file for more information about the option.");
        }
    }
    const textWithSsmlTags = `<speak>${ssmlTagsBeforeText}${speechOutputBlock.text}${ssmlTagsAfterText}</speak>`;
    const voiceId = speechOutputBlock.voiceId || pluginOptions.defaultVoiceId;
    const lexiconNames = speechOutputBlock.lexiconNames || pluginOptions.defaultLexiconNames;
    const tts = new TextToSpeech_1.TextToSpeech(voiceId, lexiconNames, textWithSsmlTags);
    reporter.info(`generating mp3 for SpeechOutput with ID: ${speechOutputBlock.id}`);
    delay(750);
    const mp3Data = await tts.toAudio();
    await cache.set(getAudioCacheKey(speechOutputBlock.id), mp3Data);
    reporter.info(`generating speech marks for SpeechOutput with ID: ${speechOutputBlock.id}`);
    delay(750);
    const speechMarksJson = await tts.toSpeechMarks();
    // TODO: also check if SpeechOutput props have changed!
    const json = {
        textHash: getHash(speechOutputBlock.text),
        speechMarks: speechMarksJson
    };
    await cache.set(getSpeechMarksCacheKey(speechOutputBlock.id), JSON.stringify(json));
};
const generateFiles = async (speechOutputBlocks, pluginOptions, gatsbyCache, reporter) => {
    AwsConfig.update(Object.assign({ region: pluginOptions.awsRegion }, (pluginOptions.awsCredentials && {
        credentials: {
            accessKeyId: pluginOptions.awsCredentials.accessKeyId,
            secretAccessKey: pluginOptions.awsCredentials.secretAccessKey
        }
    })));
    const cache = new S3Cache_1.S3Cache(process.env.GATSBY_MDX_TTS_S3_BUCKET);
    for (let i = 0; i < speechOutputBlocks.length; i++) {
        const speechOutputBlock = speechOutputBlocks[i];
        const speechMarks = JSON.parse(await cache.get(getSpeechMarksCacheKey(speechOutputBlock.id)));
        const audio = await cache.get(getAudioCacheKey(speechOutputBlock.id));
        const filesAlreadyExist = speechMarks && audio;
        if (!filesAlreadyExist ||
            hasTextChanged(speechMarks, speechOutputBlock.text)
        // TODO: also check if SpeechOutput props have changed!
        ) {
            await generateTtsFiles(pluginOptions, speechOutputBlock, cache, reporter);
        }
        const eventuallyRegeneratedSpeechMarks = JSON.parse(await cache.get(getSpeechMarksCacheKey(speechOutputBlock.id)));
        const eventuallyRegeneratedAudio = await cache.get(getAudioCacheKey(speechOutputBlock.id));
        (0, fs_1.mkdirSync)(publicPath, { recursive: true });
        (0, fs_1.writeFileSync)(path_1.default.join(publicPath, `${speechOutputBlock.id}.mp3`), eventuallyRegeneratedAudio);
        (0, fs_1.writeFileSync)(path_1.default.join(publicPath, `${speechOutputBlock.id}.json`), JSON.stringify(eventuallyRegeneratedSpeechMarks));
    }
};
module.exports = async (parameters, pluginOptions) => {
    const speechOutputBlocks = (0, extractSpeechOutputBlocks_1.default)(parameters.markdownAST, pluginOptions.speechOutputComponentNames || ["SpeechOutput"], pluginOptions.ignoredCharactersRegex);
    if (speechOutputBlocks.length > 0) {
        await generateFiles(speechOutputBlocks, pluginOptions, parameters.cache, parameters.reporter);
    }
    return parameters.markdownAST;
};
// TODO: make sure if a certain text is no longer existing, related files are deleted as well!
//# sourceMappingURL=index.js.map