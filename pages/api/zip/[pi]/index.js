import archiver from 'archiver';

import { createReadStream, createWriteStream, unlink } from 'fs';

import S3 from '../../../../cloud/s3';

export default async function handler(req, res) {
    const s3 = new S3();

    const { pi } = req.query;
    const zip = archiver('zip', {
        zlib: { level: 9 },
    });

    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=${pi}.zip`);
    
    //Get file from S3
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Prefix: `zips/${pi}/`,
    }

    const data = await s3.listObjects(params);

    const images = data.Contents.map(zip => {
        return {
            Key: zip.Key,
            LastModified: zip.LastModified
        }
    });

    const imagesWithLinks = await Promise.all(images.map(async image => {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: image.Key,
        }
        const url = await s3.getSignedUrl('getObject', params);
        const object = await s3.getObject(params);
        return {
            ...image,
            url,
            Metadata: object.Metadata
        }
    }));


    res.status(200).json({ zips: imagesWithLinks });
}





