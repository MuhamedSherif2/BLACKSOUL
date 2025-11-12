import { useContext, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// ✅ Swiper styles
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
    const { products } = useContext(context);
    const { slug } = useParams();
    const filteredProduct = products.find((product) => product.slug === slug);

    if (!filteredProduct)
        return <p className="text-center mt-10 text-red-500">Product not found</p>;

    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
                
                {/* ✅ قسم الصور */}
                <div className="w-full md:w-1/2 flex flex-col items-center">
                    {/* الصورة الكبيرة */}
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
                                        borderRadius: '12px' // ✅ توحيد شكل الزوايا
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* الصور الصغيرة (thumbnails) */}
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
                                        borderRadius: '12px', // ✅ نفس الشكل للصور الصغيرة
                                        display: 'block'
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* ✅ قسم المعلومات */}
                <div className="w-full md:w-1/2 px-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                        {filteredProduct.name}
                    </h1>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4">
                        <p className="text-gray-400 line-through text-lg sm:text-xl">
                            {filteredProduct.prices[0].price} EGP
                        </p>
                        <p className="text-green-600 text-xl sm:text-2xl font-semibold">
                            {filteredProduct.prices[1].price} EGP
                        </p>
                    </div>

                    <button className="bg-black text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-gray-800 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
