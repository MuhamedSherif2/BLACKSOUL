import React, { useRef, useContext, useState } from "react";
import emailjs from "@emailjs/browser";
import { context } from "../components/context";
import type { ICartItem } from "../interfaces";

type ContextType = {
  cart: ICartItem[];
  setCart: React.Dispatch<React.SetStateAction<ICartItem[]>>;
};

const BuyNowForm = () => {
  const { cart, setCart } = useContext(context) as ContextType;
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  // حساب الكمية الإجمالية
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  // حساب السعر الإجمالي مع دعم سعر واحد أو أكثر
  const totalPrice = cart.reduce(
    (acc, item) => acc + ((item.prices[1]?.price ?? item.prices[0].price) * item.quantity),
    0
  );

  const shippingCost = 70;
  const grandTotal = totalPrice + shippingCost;

  const inputClass =
    "p-3 rounded-md border-2 border-gray-400 text-white focus:border-[#00FF88] focus:ring-2 focus:ring-[#00FF88] transition-colors";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSending(true);

    const formData = new FormData(formRef.current);

    const cartItems = cart
      .map(
        (item) =>
          `${item.name} - QTY: ${item.quantity} - Price: ${item.prices[1]?.price ?? item.prices[0].price} EGP`
      )
      .join("<br>");

    const templateParams = {
      user_name: formData.get("name"),
      user_email: formData.get("email"),
      user_phone: formData.get("phone"),

      user_address: formData.get("address"),
      user_building: formData.get("building"),
      user_floor: formData.get("floor"),
      user_apartment: formData.get("apartment"),
      user_landmark: formData.get("landmark"),

      total_quantity: totalQuantity,
      total_price: totalPrice,
      shipping_cost: shippingCost,
      grand_total: grandTotal,
      cart_items: cartItems,
    };

    emailjs
      .send(
        "service_8f3iso3",
        "template_6cl3plb",
        { ...templateParams, to_email: "mohammedsherif675@gmail.com" },
        "EgzhjfKH_MkiSLjq_"
      )
      .then(() =>
        emailjs.send(
          "service_8f3iso3",
          "template_wvkrjox",
          templateParams,
          "EgzhjfKH_MkiSLjq_"
        )
      )
      .then(() => {
        setSuccess(true);
        setSending(false);
        setCart([]);
        formRef.current?.reset();
        localStorage.removeItem("cart");
      })
      .catch(() => setSending(false));
  };

  if (success)
    return (
      <section className="min-h-screen flex justify-center items-center text-green-600 font-bold text-xl">
        Order Sent Successfully!
      </section>
    );

  return (
    <section className="w-full min-h-screen bg-[#0D0D0D] text-white py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-10 mt-7">Checkout</h1>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        
        {/* LEFT: ORDER FORM */}
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 bg-[#1A1A1A] p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-2">Shipping Details</h2>

          <input type="text" name="name" placeholder="Full Name" required className={inputClass} />
          <input type="email" name="email" placeholder="Email Address" required className={inputClass} />
          <input type="text" name="phone" placeholder="Phone Number" required className={inputClass} />

          <input type="text" name="address" placeholder="Street / Area" required className={inputClass} />
          <input type="text" name="building" placeholder="Building Number" required className={inputClass} />
          <input type="text" name="floor" placeholder="Floor Number" required className={inputClass} />
          <input type="text" name="apartment" placeholder="Apartment Number" required className={inputClass} />
          <input type="text" name="landmark" placeholder="Nearest Landmark (Optional)" className={inputClass} />

          <button
            type="submit"
            disabled={sending}
            className={`text-black font-semibold py-3 rounded-xl transition-all ${
              sending ? "bg-gray-500 cursor-not-allowed" : "bg-[#00FF88] hover:bg-[#00CC6F]"
            }`}
          >
            {sending ? "Processing..." : "Confirm Order"}
          </button>
        </form>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="bg-[#1A1A1A] p-6 rounded-xl h-fit">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          {cart.map((item) => (
            <div key={item.id} className="flex justify-between border-b border-gray-700 py-3">
              <span>{item.name} (x{item.quantity})</span>
              <span>{(item.prices[1]?.price ?? item.prices[0].price) * item.quantity} EGP</span>
            </div>
          ))}

          <div className="mt-6 text-lg">
            <p>Total Quantity: <strong>{totalQuantity}</strong></p>
            <p>Shipping: <strong className="text-yellow-300">70 EGP</strong></p>
            <p>Total Price: <strong className="text-[#00FF88]">{totalPrice} EGP</strong></p>
            <p className="mt-4 text-2xl font-bold text-[#00FF88]">
              Grand Total: {grandTotal} EGP
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyNowForm;
