import { S3 } from "aws-sdk";

class S3Client {
  constructor() {
    this.s3 = new S3({
      region: "us-east-1",
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
  }

  async listObjects(params) {
    return await this.s3.listObjectsV2(params).promise();
  }

  getObject(params) {
    return this.s3.getObject(params);
  }

  headObject(params) {
    return this.s3.headObject(params).promise();
  }

  async getSignedUrl(operation, params) {
    return await this.s3.getSignedUrlPromise(operation, params);
  }

  async upload(params) {
    return await this.s3.upload(params).promise();
  }

  async delete(params) {
    return await this.s3.deleteObject(params).promise();
  }
}

export default S3Client;