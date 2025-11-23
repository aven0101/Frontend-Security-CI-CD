"use client";
import Image from "next/image";
// import { motion } from "framer-motion";
export default function PowerfullFeatures() {
  return (
    // <div className="wrap relative xl:min-h-[650px] lg:min-h-[490px] md:min-h-[361px] min-h-[197px] flex items-end justify-center">
    //   <div className="layer layer1 absolute max-w-[100%]">
    //     <Image
    //       src={"/images/home-page/Network-Connection.png"}
    //       width={1500}
    //       height={1500}
    //       alt="orbit line"
    //       className="w-full object-contain"
    //     />
    //     <div className="item item1 absolute xl:left-[4%] lg:left-[2%] xl:top-[30%] lg:top-[30%] border-1 border-[#43E1A9] rounded-full p-1 hidden">
    //       <div className="innerWrap border-1 border-[#43E1A9] rounded-full flex flex-col items-center justify-center p-3 gap-3 xl:min-w-[140px] xl:min-h-[140px] lg:min-w-[100px] lg:min-h-[140px]">
    //         <Image
    //           src={"/images/home-page/secure-transfer.png"}
    //           width={500}
    //           height={500}
    //           alt="orbit icon"
    //           className="w-12"
    //         />
    //         <span className="text-[#FDFDFD] w-[80%] text-center leading-[1rem]">
    //           Secure Transfers
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="layer layer2 absolute max-w-[75%]">
    //     <Image
    //       src={"/images/home-page/orbit-line2.png"}
    //       width={1500}
    //       height={1500}
    //       alt="orbit line"
    //       className="w-full object-contain"
    //     />
    //   </div>
    //   <div className="layer layer3 absolute max-w-[50%]">
    //     <Image
    //       src={"/images/home-page/orbit-line3.png"}
    //       width={1500}
    //       height={1500}
    //       alt="orbit line"
    //       className="w-full"
    //     />
    //   </div>
    // </div>
    <div className="wrap mt-2 lg:mt-20 relative xl:min-h-[650px] lg:min-h-[490px] md:min-h-[361px] min-h-[197px] 
    flex items-end justify-center">
      {/* Animated Layer */}
      <Image
        src="/images/home-page/Network-Connection.png"
        width={1500}
        height={1500}
        alt="orbit line"
        className="w-full object-contain"
      />
      {/* <motion.div
        className="layer layer1 absolute max-w-[100%]"
        animate={{
          y: [0, -15, 0],
          opacity: [0.9, 1, 0.9],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/images/home-page/Network-Connection.png"
          width={1500}
          height={1500}
          alt="orbit line"
          className="w-full object-contain"
        />
      </motion.div> */}
    </div>
  );
}
