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
    
    //Get files from S3 and add to zip
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Prefix: `swapped/${pi}/`,
    }

    const data = await s3.listObjects(params);

    const images = data.Contents.map(image => {
        return image.Key;
    });

    images.forEach(image => {
        const object = s3.getObject({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: image,
        });
        const readStream = object.createReadStream();
        zip.append(readStream, { name: image });
    });

    zip.pipe(res);

    zip.finalize();
}





