import { Node } from "unist";
import path from "path";
import { mkdirSync, writeFileSync } from "fs";
import crypto from "crypto";
import AWS from "aws-sdk";
import { LexiconNameList, VoiceId } from "aws-sdk/clients/polly";
const AwsConfig = AWS.config;
import { AWSRegion } from "aws-sdk/clients/cur";
import { GatsbyCache, Reporter } from "gatsby";
import extractSpeechOutputBlocks, {
  SpeechOutputBlock
} from "./internals/utils/extractSpeechOutputBlocks";
import { TextToSpeech } from "./internals/utils/TextToSpeech";
import { S3Cache } from "./internals/utils/S3Cache";

const getSpeechMarksCacheKey = (speechOutputId: string) =>
  `${speechOutputId}.json`;
const getAudioCacheKey = (speechOutputId: string) => `${speechOutputId}.mp3`;

const publicPath = "./public/tts/";

const getHash = (text: string) =>
  crypto
    .createHash("md5")
    .update(text)
    .digest("hex");

const hasTextChanged = (speechMarksJson: any, freshText: string) => {
  const textHashInFile = speechMarksJson.textHash;
  return getHash(freshText) !== textHashInFile;
};

const delay = (ms: number) => {
  var start = Date.now(),
    now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}

const generateTtsFiles = async (
  pluginOptions: PluginOptions,
  speechOutputBlock: SpeechOutputBlock,
  cache: S3Cache,
  reporter: Reporter
) => {
  let ssmlTagsBeforeText = "";
  let ssmlTagsAfterText = "";
  const ssmlTagsToUse =
    speechOutputBlock.ssmlTags || pluginOptions.defaultSsmlTags;
  if (ssmlTagsToUse) {
    if (ssmlTagsToUse.indexOf("$SPEECH_OUTPUT_TEXT") === -1) {
      throw new Error(
        "If the 'defaultSsmlTags' option is defined it must contain the '$SPEECH_OUTPUT_TEXT' variable (see README file)."
      );
    }
    const matches = ssmlTagsToUse.match(/(.*)\$SPEECH_OUTPUT_TEXT(.*)/);
    if (!!matches) {
      ssmlTagsBeforeText = matches[1];
      ssmlTagsAfterText = matches[2];
    } else {
      throw new Error(
        "Invalid 'defaultSsmlTags' option defined. Check README file for more information about the option."
      );
    }
  }
  const textWithSsmlTags = `<speak>${ssmlTagsBeforeText}${speechOutputBlock.text}${ssmlTagsAfterText}</speak>`;
  const voiceId = speechOutputBlock.voiceId || pluginOptions.defaultVoiceId;
  const lexiconNames = speechOutputBlock.lexiconNames || pluginOptions.defaultLexiconNames;
  const tts = new TextToSpeech(voiceId, lexiconNames!, textWithSsmlTags);

  reporter.info(
    `generating mp3 for SpeechOutput with ID: ${speechOutputBlock.id}`
  );
  delay(750);
  const mp3Data = await tts.toAudio();
  await cache.set(
    getAudioCacheKey(speechOutputBlock.id),
    mp3Data
  );
  reporter.info(
    `generating speech marks for SpeechOutput with ID: ${speechOutputBlock.id}`
  );
  delay(750);
  const speechMarksJson = await tts.toSpeechMarks();
  // TODO: also check if SpeechOutput props have changed!
  const json = {
    textHash: getHash(speechOutputBlock.text),
    speechMarks: speechMarksJson
  };
  await cache.set(getSpeechMarksCacheKey(speechOutputBlock.id), JSON.stringify(json));
};

const generateFiles = async (
  speechOutputBlocks: SpeechOutputBlock[],
  pluginOptions: PluginOptions,
  gatsbyCache: GatsbyCache,
  reporter: Reporter
) => {
  AwsConfig.update({
    region: pluginOptions.awsRegion,
    ...(pluginOptions.awsCredentials && {
      credentials: {
        accessKeyId: pluginOptions.awsCredentials.accessKeyId,
        secretAccessKey: pluginOptions.awsCredentials.secretAccessKey
      }
    })
  });
  const cache = new S3Cache(process.env.GATSBY_MDX_TTS_S3_BUCKET!);
  for (let i = 0; i < speechOutputBlocks.length; i++) {
    const speechOutputBlock = speechOutputBlocks[i];

    const speechMarks = JSON.parse(await cache.get(
      getSpeechMarksCacheKey(speechOutputBlock.id)
    ));
    const audio = await cache.get(getAudioCacheKey(speechOutputBlock.id));

    const filesAlreadyExist = speechMarks && audio;
    if (
      !filesAlreadyExist ||
      hasTextChanged(speechMarks, speechOutputBlock.text)
      // TODO: also check if SpeechOutput props have changed!
    ) {
      await generateTtsFiles(pluginOptions, speechOutputBlock, cache, reporter);
    }

    const eventuallyRegeneratedSpeechMarks = JSON.parse(await cache.get(
      getSpeechMarksCacheKey(speechOutputBlock.id)
    ));

    const eventuallyRegeneratedAudio = await cache.get(
      getAudioCacheKey(speechOutputBlock.id)
    );

    mkdirSync(publicPath, { recursive: true });
    writeFileSync(
      path.join(publicPath, `${speechOutputBlock.id}.mp3`),
      eventuallyRegeneratedAudio
    );
    writeFileSync(
      path.join(publicPath, `${speechOutputBlock.id}.json`),
      JSON.stringify(eventuallyRegeneratedSpeechMarks)
    );
  }
};

interface Parameters {
  markdownAST: Node;
  cache: GatsbyCache;
  reporter: Reporter;
}

interface PluginOptions {
  awsRegion: AWSRegion;
  defaultVoiceId: VoiceId;
  awsCredentials?: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  defaultSsmlTags?: string;
  defaultLexiconNames?: LexiconNameList;
  ignoredCharactersRegex?: RegExp;
  speechOutputComponentNames?: string[];
}

module.exports = async (
  parameters: Parameters,
  pluginOptions: PluginOptions
) => {
  const speechOutputBlocks = extractSpeechOutputBlocks(
    parameters.markdownAST,
    pluginOptions.speechOutputComponentNames || ["SpeechOutput"],
    pluginOptions.ignoredCharactersRegex
  );

  if (speechOutputBlocks.length > 0) {
    await generateFiles(
      speechOutputBlocks,
      pluginOptions,
      parameters.cache,
      parameters.reporter
    );
  }

  return parameters.markdownAST;
};

// TODO: make sure if a certain text is no longer existing, related files are deleted as well!
