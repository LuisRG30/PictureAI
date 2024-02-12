import React, { useState } from 'react';
import { CreateImages, NotifyModal } from '@/src/sections';
import { useRouter } from 'next/router'


export default function PreviewPage() {
  const router = useRouter()
  const [isOpenNotifyModal, setIsOpenModal] = useState(false);
  const [error, setError] = useState(false);

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const FULLFILLMENT_PI = localStorage.getItem('paymentIntent');
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      setIsOpenModal(true);
      setError(false);
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
        />
    </div>
  );
}