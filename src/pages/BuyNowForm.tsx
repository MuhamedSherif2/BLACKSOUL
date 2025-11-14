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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setSending(true);

    const formData = new FormData(formRef.current);

    const totalPrice = cart.reduce(
      (acc, item) => acc + (item.prices[1]?.price || 0) * item.quantity,
      0
    );

    const cartItems = cart
      .map(
        (item) =>
          `${item.name} - QTY: ${item.quantity} - Price: ${
            item.prices[1]?.price || 0
          } EGP`
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

      cart_items: cartItems,
      total_price: totalPrice.toFixed(2),
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
      })
      .catch((err) => {
        console.error("Failed to send emails:", err);
        setSending(false);
      });
  };

  if (success)
    return (
      <div className="text-center text-green-600 font-semibold py-6">
        ✅ Order sent successfully!
      </div>
    );

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
      <h2 className="text-2xl font-bold text-center mb-4">Confirm Your Order</h2>

      <input type="text" name="name" placeholder="Full Name" required className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#00FF88]" />

      <input type="email" name="email" placeholder="Email Address" required className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#00FF88]" />

      <input type="text" name="phone" placeholder="Phone Number" required className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#00FF88]" />

      <input type="text" name="address" placeholder="Street / Area" required className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#00FF88]" />

      <input type="text" name="building" placeholder="Building Number" required className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#00FF88]" />

      <input type="text" name="floor" placeholder="Floor Number" required className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#00FF88]" />

      <input type="text" name="apartment" placeholder="Apartment Number" required className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#00FF88]" />

      <input type="text" name="landmark" placeholder="Nearest Landmark (Optional)" className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#00FF88]" />

      <button
        type="submit"
        disabled={sending}
        className={`text-black font-semibold py-3 rounded-xl transition-all ${
          sending ? "bg-gray-400 cursor-not-allowed" : "bg-[#00FF88] hover:bg-[#00CC6F] shadow-lg"
        }`}
      >
        {sending ? "Sending..." : "Confirm Order"}
      </button>
    </form>
  );
};

export default BuyNowForm;
