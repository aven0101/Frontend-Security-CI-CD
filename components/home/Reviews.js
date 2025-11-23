"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useEffect, useRef, useState } from "react";

export default function HomeReviews({ reviews }) {
    const slideRefs = useRef([]);
    const [maxHeight, setMaxHeight] = useState(0);

    useEffect(() => {
        if (slideRefs.current.length) {
            const heights = slideRefs.current.map((el) => el?.offsetHeight || 0);
            setMaxHeight(Math.max(...heights));
        }
    }, [reviews]);

    const CustomStar = (
        <path d="M9.57736 13.2201L13.4399 15.6626C13.9381 15.9756 14.5512 15.51 14.4056 14.9375L13.2867 10.5562C13.2564 10.4348 13.2612 10.3073 13.3005 10.1884C13.3399 10.0696 13.4121 9.96424 13.5089 9.88451L16.973 7.00689C17.4251 6.63288 17.1952 5.87722 16.6051 5.83905L12.0834 5.549C11.9601 5.54185 11.8414 5.49906 11.7421 5.42586C11.6427 5.35267 11.5669 5.25223 11.524 5.13682L9.83793 0.908179C9.7933 0.785978 9.71199 0.680415 9.60505 0.605819C9.49811 0.531224 9.37071 0.491211 9.24015 0.491211C9.10959 0.491211 8.98219 0.531224 8.87525 0.605819C8.7683 0.680415 8.687 0.785978 8.64237 0.908179L6.95633 5.13682C6.91335 5.25223 6.83756 5.35267 6.73821 5.42586C6.63885 5.49906 6.52024 5.54185 6.39687 5.549L1.8752 5.83905C1.28509 5.87722 1.05517 6.63288 1.50734 7.00689L4.97139 9.88451C5.06821 9.96424 5.14045 10.0696 5.17977 10.1884C5.21909 10.3073 5.2239 10.4348 5.19364 10.5562L4.15903 14.6169C3.98276 15.3039 4.71849 15.8611 5.3086 15.4871L8.90294 13.2201C9.00373 13.1563 9.1207 13.1224 9.24015 13.1224C9.35959 13.1224 9.47656 13.1563 9.57736 13.2201Z" stroke="#39FF14" strokeWidth="0.924731" strokeLinecap="round" strokeLinejoin="round" />
    )

    const ratingStyle = {
        itemShapes: CustomStar,
        itemStrokeWidth: 1,
        activeFillColor: '#39FF14',
        activeStrokeColor: '#39FF14',
        inactiveFillColor: 'transparent',
        inactiveStrokeColor: '#39FF14'
    }

    return (
        <Swiper
            spaceBetween={10}
            slidesPerView="auto"
            loop={true}
            autoplay={true}
            navigation={false}
            breakpoints={{
                768: { slidesPerView: 3 },
                426: { slidesPerView: 2 },
                0: { slidesPerView: 1.5 },
            }}
        >
            {reviews.map((review, index) => (
                <SwiperSlide
                    key={index}
                    className="cursor-grab select-none flex flex-col bg-[url(/images/footer-bg.png)] bg-cover bg-no-repeat z-20 rounded-2xl backdrop-blur-lg"
                    ref={(el) => (slideRefs.current[index] = el)}
                    style={{ height: maxHeight ? `${maxHeight}px` : "auto" }}
                >
                    <div className="border border-[#43E1A9] rounded-2xl text-[#FDFDFD] xl:p-4 lg:p-4 md:p-3 p-3 flex flex-col h-full justify-between">
                        <div>
                            <Image
                                src={"/icons/home-page/quote.png"}
                                width={500}
                                height={500}
                                alt="quote"
                                className="xl:w-6 lg:w-6 md:w-4 w-3"
                            />
                            <p className="font-bold xl:text-lg text-sm xl:max-w-[80%] xl:mt-5 mt-3">
                                {review.review}
                            </p>
                        </div>

                        <div className="ratingWrap flex items-center gap-4 xl:mt-10 mt-6">
                            <div className="avatar">
                                <Image
                                    src={review.avatar}
                                    width={500}
                                    height={500}
                                    className="xl:w-15 w-12"
                                    alt="avatar"
                                />
                            </div>
                            <div className="meta">
                                <div className="name xl:text-[1rem] text-[0.900rem]">
                                    {review.name}
                                </div>
                                <div className="rating">
                                    <Rating
                                        className="xl:max-w-[120px] max-w-[80px]"
                                        value={parseFloat(review.rating)}
                                        readOnly
                                        itemStyles={ratingStyle}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
