import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import { context } from "../components/context";

// ✅ استيراد CSS Swiper
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const { products } = useContext(context);
  const { slug } = useParams();
  const filteredProduct = products.find((product) => product.slug === slug);

  if (!filteredProduct)
    return (
      <p className="text-center mt-10 text-red-500">Product not found</p>
    );

  return (
    <section className="pt-10 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* ✅ Swiper Section */}
          <div>
            <Swiper
              loop
              spaceBetween={10}
              navigation
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="rounded-xl overflow-hidden mySwiper2"
            >
              {filteredProduct.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`${filteredProduct.name}-${index}`}
                    style={{ width: "500px", height: "500px", objectFit: "cover" }}
                    className="rounded-xl transition-transform duration-300 hover:scale-105"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode
              watchSlidesProgress
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper mt-4"
            >
              {filteredProduct.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`${filteredProduct.name}-thumb-${index}`}
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                    className="rounded-lg border border-gray-300 hover:border-black transition"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* ✅ Product Info Section */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {filteredProduct.name}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <p className="text-gray-400 line-through text-xl">
                {filteredProduct.prices[0].price} EGP
              </p>
              <p className="text-green-600 text-2xl font-semibold">
                {filteredProduct.prices[1].price} EGP
              </p>
            </div>

            <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
