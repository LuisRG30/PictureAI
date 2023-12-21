import React from 'react';

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
                console.log(fulfillment);
            } catch (err) {
                console.log(err);
            }
        }
        const getZipFile = async () => {
            try {
                const response = await fetch(`/api/zip/${pi}`);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${pi}.zip`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            } catch (err) {
                console.log(err);
            }
        }
        if (pi) {
            getFullfilment();
            getZipFile();
        }
    }, [pi]);

    return (
        <div>
            <h1>Fulfillment Page</h1>
            <div>
                <h4>Your images:</h4>
                <ul>
                    {

                    }
                </ul>
            </div>
        </div>
    );
}

export default FulfillmentPage;