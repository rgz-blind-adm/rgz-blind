import AWS from "aws-sdk";

export class TextToSpeech {
    private readonly polly = new AWS.Polly({ apiVersion: "2016-06-10" });
    private readonly config: any;

    constructor(voiceId: string, lexiconNames: AWS.Polly.LexiconNameList, text: string) {
        this.config = {
            VoiceId: voiceId,
            LexiconNames: lexiconNames,
            TextType: "ssml",
            Text: text
        };
    }

    async toAudio(): Promise<Buffer> {
        const audio = await this.polly.synthesizeSpeech({
            OutputFormat: "mp3",
            Engine: "neural",
            ...this.config
        }).promise();
        return audio.AudioStream! as Buffer;
    }

    async toSpeechMarks(): Promise<any> {
        const jsonData = await this.polly.synthesizeSpeech({
            OutputFormat: "json",
            SpeechMarkTypes: ["word"],
            ...this.config
        }).promise();
        const speechMarks = jsonData.AudioStream!.toString();
        return JSON.parse(
            `[${speechMarks.replace(/\}\n\{/g, "},{")}]`
        );
    }
}