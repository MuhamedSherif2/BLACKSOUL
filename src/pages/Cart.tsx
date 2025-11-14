import { useContext, useState } from "react";
import { context } from "../components/context";
import BuyNowForm from "./BuyNowForm";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useContext(context);

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter(product => product.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <section className="w-full min-h-screen bg-[#0D0D0D] py-12 px-6 text-white">
      <h1 className="text-3xl font-semibold mb-8 text-center mt-7">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cart.map((product) => (
              <div
                key={product.id}
                className="bg-[#1A1A1A] rounded-2xl shadow-lg overflow-hidden transition-transform duration-300"
              >
                <div className="w-full h-64 bg-black overflow-hidden">
                  <img
                    src={product.coverIMG}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-xl font-semibold">{product.name}</h2>

                  <p className="text-gray-400">
                    Price:{" "}
                    <span className="text-[#00FF88] font-semibold">
                      {product.prices[1].price} EGP
                    </span>
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-gray-400">Quantity:</span>

                    <div className="flex items-center bg-[#222] px-3 py-1 rounded-xl gap-3">

                      {/* Decrease */}
                      <button
                        onClick={() => {
                          if (product.quantity > 1) {
                            const updatedCart = cart.map(item =>
                              item.id === product.id
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                            );
                            setCart(updatedCart);
                            localStorage.setItem("cart", JSON.stringify(updatedCart));
                          } else {
                            removeFromCart(product.id);
                          }
                        }}
                        className="text-white text-xl px-2 hover:text-red-400"
                      >
                        −
                      </button>

                      {/* Quantity number */}
                      <span className="text-white font-semibold">
                        {product.quantity}
                      </span>

                      {/* Increase */}
                      <button
                        onClick={() => {
                          const updatedCart = cart.map(item =>
                            item.id === product.id
                              ? { ...item, quantity: item.quantity + 1 }
                              : item
                          );
                          setCart(updatedCart);
                          localStorage.setItem("cart", JSON.stringify(updatedCart));
                        }}
                        className="text-white text-xl px-2 hover:text-green-400"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="mt-4 bg-red-600 text-white font-semibold py-2 rounded-xl
                      hover:bg-red-700 transition-colors duration-300 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link to={'/buyNow'} >
              <button
                className="bg-[#00FF88] text-black font-semibold py-3 px-6 rounded-xl hover:bg-[#00CC6F] transition-all"
              >
                Buy Now
              </button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
