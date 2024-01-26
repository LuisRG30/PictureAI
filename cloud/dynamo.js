import { DynamoDB } from 'aws-sdk'

class Dynamo {
  constructor() {
    this.dynamoDB = new DynamoDB({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    })
  }

  async put(params) {
    return await this.dynamoDB.putItem(params).promise()
  }

  async get(params) {
    return await this.dynamoDB.getItem(params).promise()
  }

  async delete(params) {
    return await this.dynamoDB.deleteItem(params).promise()
  }
}

export default Dynamo