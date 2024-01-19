import { useState } from "react";

const CheckoutPage = () => {
  const [showPromoCodeInput, setShowPromoCodeInput] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const handleTogglePromoCodeInput = () => {
    setShowPromoCodeInput(!showPromoCodeInput);
  };

  const handleApplyPromoCode = () => {
    // Implement logic to apply the promotional code
    console.log("Applying promo code:", promoCode);
  };
  return (
    <div className={`xPaddings yPaddings relative`}>
      <div className={`mx-auto flex flex-col justify-between gap-8 max-width`}>
        <p className="md:text-[20px] text-[17px]">PAY TDSE</p>
        <h1
          className="sm:text-[55px] text-[35px] 
              font-bold p-0 leading-none"
        >
          MX$100.00
        </h1>
        {[0, 1, 2].map((item) => (
          <div key={item} className="flex flex-row justify-between items-center">
            <div className="flex gap-6 items-center">
              <img
                src="/assets/images/img.png"
                style={{ width: 40, height: 40 }}
              />
              <p className="text-[16px] font-bold">Photo 1</p>
            </div>
            <p className="text-[16px] font-bold">MX $50.00</p>
          </div>
        ))}

        <div
          className="flex flex-col gap-2"
          style={{
            borderTop: "1px solid gray",
            borderBottom: "1px solid gray",
            paddingTop: 30,
            paddingBottom: 30,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <div className="flex flex-row justify-between items-center">
            <p className="text-[18px] font-bold">Subtotal</p>
            <p className="text-[18px] font-bold">MX $50.00</p>
          </div>
          {showPromoCodeInput ? (
            <div className="flex flex-row items-center gap-2">
              <input
                type="text"
                placeholder="Enter promo code"
                className="border border-gray-300 px-1 py-1 rounded-md"
                style={{paddingLeft:10, paddingRight:10}}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                className="bg-gray-800 text-white px-4 py-1 rounded"
                onClick={handleApplyPromoCode}
              >
                Apply
              </button>
            </div>
          ) : (
            <p
              className="text-[18px] font-bold cursor-pointer"
              style={{ color: "#7F3CF5" }}
              onClick={handleTogglePromoCodeInput}
            >
              Add Promotional Code
            </p>
          )}
        </div>

        <div className="flex flex-row justify-between items-center">
          <p className="text-[18px] font-bold">Total Due</p>
          <p className="text-[18px] font-bold">MX $50.00</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
