import AWS from "aws-sdk";

export class S3Cache {
    private readonly s3 = new AWS.S3({ apiVersion: "2016-06-10" });

    constructor(readonly bucket: string) {
    }

    async set(key: string, data: any): Promise<void> {
        await this.s3.upload({
            Bucket: this.bucket,
            Key: key,
            Body: data
        }).promise();
    }

    async get(key: string): Promise<any> {
        try {
            const obj = await this.s3
                .getObject({
                    Bucket: this.bucket,
                    Key: key,
                })
                .promise();
            return obj.Body!;
        } catch (e) {
            return null;
        }
    }
}