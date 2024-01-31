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
        const response = await fetch(`/api/zip/${pi}`);
        const data = await response.json();
        const zips = data.zips;
        const zip = zips[0];
        
        const link = document.createElement('a');
        link.href = zip.url;
        link.download = zip.Key;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
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