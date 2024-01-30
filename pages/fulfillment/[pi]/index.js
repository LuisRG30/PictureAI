import React from 'react';

import JSZip from 'jszip';

import { saveAs } from 'file-saver';

import { useRouter } from 'next/router';

const FulfillmentPage = () => {

    const router = useRouter();

    const { pi } = router.query;

    const [images, setImages] = React.useState([]);


    React.useEffect(() => {
        const getFullfilment = async () => {
            try {
                const response = await fetch(`/api/fulfillment/${pi}`);
                const fulfillment = await response.json();
                setImages(fulfillment.images);
            } catch (err) {
                console.log(err);
            }
        }
        if (pi) {
            getFullfilment();
        }
    }, [pi]);


    async function downloadAll() {
        const zip = new JSZip();

        for (const image of images) {
            const imageUrl = image.url;
            const response = await fetch(imageUrl, {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                mode: 'cors',
                credentials: 'include',
            });
            
            //These are images from S3
            console.log(response);
            const blob = await response.blob();
            console.log(blob);
            zip.file(image.Key, blob);
        }

        const content = zip.generateAsync({ type: 'blob' }).then(function (content) {
            saveAs(content, `${pi}.zip`);
        });
    }

    return (
        <div>
            <h1>Fulfillment Page</h1>
            <button onClick={downloadAll}>
                Download All
            </button>
            <div>
                <h4>Your images:</h4>
                <ul>
                    {
                        images.map((image, index) => (
                            <li key={index}>
                                <img src={image.url} style={{ width: '100px' }} />
                                <a href={image.url} target="_blank">{image.Key}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}


export default FulfillmentPage;