
import S3 from '../../../../cloud/s3';


export default async function handler(req, res) {
    const s3 = new S3();

    const { pi } = req.query;

    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Prefix: `swapped/${pi}/`,
    }

    const data = await s3.listObjects(params);
    
    const images = data.Contents.map(image => {
        return {
            Key: image.Key,
            LastModified: image.LastModified
        }
    });

    const imagesWithLinks = await Promise.all(images.map(async image => {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: image.Key,
        }
        const url = await s3.getSignedUrl('getObject', params);
        const object = await s3.getObject(params);
        
        const { Metadata } = await s3.headObject(params);

        return {
            ...image,
            url,
            Metadata
        }
    }));

    res.status(200).json({ images: imagesWithLinks });
}



