import React, { useState } from 'react';
import { CreateImages, NotifyModal } from '@/src/sections';
import { useRouter } from 'next/router'
import { Footer } from '@/src/components';


export default function PreviewPage() {
  const router = useRouter()
  const [isOpenNotifyModal, setIsOpenModal] = useState(false);
  const [error, setError] = useState(false);
  const [subtitle, setSubtitle] = useState('');
  const [message, setMessage] = useState('');

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const FULLFILLMENT_PI = localStorage.getItem('paymentIntent');
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      setIsOpenModal(true);
      setError(false);
      setSubtitle('Payment received!');
      setMessage('Your images are now in our queue. You will receive an email with the download link shortly.');
    }
    if (query.get('canceled')) {
      setIsOpenModal(true);
      setError(true);
    }
  }, []);

  return (
    <div>
      <CreateImages />
      <NotifyModal
          isOpen={isOpenNotifyModal}
          onClose={()=> setIsOpenModal(false)}
          error={error}
          OnSuccess={()=> setIsOpenModal(false)}
          subtitle={subtitle}
          message={message}
        />
      <Footer />
    </div>
  );
}