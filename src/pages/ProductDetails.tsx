import { useContext, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaPlus } from "react-icons/fa6";
import { IoMdRemove } from "react-icons/io";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import '../App.css';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { context } from '../components/context';
import { useParams } from 'react-router-dom';
import type SwiperClass from 'swiper';

const ProductDetails = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const { products, addToCart } = useContext(context);
    const { slug } = useParams();
    const filteredProduct = products.find((product) => product.slug === slug);

    const [quantity, setQuantity] = useState<number>(1);

    const addQuantity = () => setQuantity(prev => prev + 1);
    const removeQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

    if (!filteredProduct)
        return <p className="text-center mt-10 text-red-500">Product not found</p>;

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) addToCart(filteredProduct);
    };

    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-10">

                {/* IMAGES */}
                <div className="w-full md:w-1/2 flex flex-col items-center">
                    <Swiper
                        loop={true}
                        spaceBetween={5}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper2 mb-2 w-full"
                    >
                        {filteredProduct.images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={img}
                                    alt={`${filteredProduct.name}-${index}`}
                                    loading="lazy"
                                    style={{
                                        width: '100%',
                                        height: '500px',
                                        objectFit: 'cover',
                                        display: 'block',
                                        borderRadius: '12px'
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <Swiper
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={5}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper w-full"
                    >
                        {filteredProduct.images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={img}
                                    alt={`${filteredProduct.name}-thumb-${index}`}
                                    loading="lazy"
                                    style={{
                                        width: '100%',
                                        height: '100px',
                                        objectFit: 'cover',
                                        borderRadius: '12px',
                                        display: 'block'
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* PRODUCT INFO */}
                <div className="w-full md:w-1/2 px-4">
                    <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
                        {filteredProduct.name}
                    </h1>

                    <h2 className='text-white text-[13px] md:text-xl mb-4'>
                        {filteredProduct.descprition}
                    </h2>

                    {/* PRICE */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4">
                        {filteredProduct.prices.length === 1 ? (
                            <p className="text-lg sm:text-xl text-green-600 font-semibold">
                                {filteredProduct.prices[0].price} EGP
                            </p>
                        ) : (
                            <>
                                <del className="text-red-500 text-xl sm:text-2xl font-semibold">
                                    {filteredProduct.prices[0].price} EGP
                                </del>
                                <p className="text-lg sm:text-xl text-green-600 font-semibold">
                                    {filteredProduct.prices[1].price} EGP
                                </p>
                            </>
                        )}
                    </div>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-2 mb-4">
                        <label className="text-white font-medium">Quantity:</label>
                        <div className="flex items-center border border-white rounded overflow-hidden p-2">
                            <button
                                className="bg-gray-800 text-white px-3 py-1 hover:bg-gray-700 transition cursor-pointer"
                                onClick={removeQuantity}
                            >
                                <IoMdRemove />
                            </button>
                            <input
                                type="text"
                                className="w-16 text-center bg-black text-white outline-none py-1"
                                value={quantity}
                                readOnly
                            />
                            <button
                                className="bg-gray-800 text-white px-3 py-1 hover:bg-gray-700 transition cursor-pointer"
                                onClick={addQuantity}
                            >
                                <FaPlus />
                            </button>
                        </div>
                    </div>

                    <button
                        className="bg-[#D7D7D7] w-full text-black px-6 sm:px-8 py-2 mt-3 sm:py-3 rounded-lg hover:bg-gray-800 hover:text-white transition duration-300 cursor-pointer"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
