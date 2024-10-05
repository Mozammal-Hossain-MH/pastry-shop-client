"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Slider = ({
  img,
  running,
  borderWidth,
  borderClr,
  dots,
  prevNextBtn,
}) => {
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        if (curr < img.length - 1) {
          setCurr(curr + 1);
        } else {
          setCurr(0);
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [curr, img, running]);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? img.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr < img.length - 1 ? curr + 1 : 0));

  const slideVariants = {
    initial: {
      scale: 0.8,
      opacity: 1,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeIn",
        delay: 0.3,
      },
    },
    exit: {
      scale: 1.3,
      opacity: 0.5,
      transition: {
        duration: 0.6,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className={`space-y-5 relative w-full h-screen overflow-hidden`}>
      <AnimatePresence>
        {/* Wrapping the motion.div in AnimatePresence to handle exit animation */}
        <motion.div
          key={curr}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className=" w-full h-screen flex flex-col justify-center items-center "
          style={{
            backgroundImage: `url(${img[curr]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <motion.div
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-center text-base-300 flex flex-col items-center justify-center gap-5 w-full h-full bg-base-100 bg-opacity-30"
          >
            <div>
              <h2 className="text-4xl lg:text-6xl ">
                Authors Delicious sweets{" "}
              </h2>
              <h2 className="text-4xl lg:text-6xl text-primary">
                and chocolate
              </h2>
            </div>
            <p className="max-w-[300px]">
              Best Quality Cocoa Cras in laoreet metus, vitae efficitur libero.
              Nam sit amet orci.
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      {prevNextBtn && (
        <>
          <button
            onClick={prev}
            className="absolute z-10 top-1/2 left-2 px-4 py-1 rounded-full shadow text-4xl bg-white/50 text-gray-700 transition-all hover:bg-white/30 hover:scale-110 active:scale-90"
          >
            <span>&#10094;</span>
          </button>
          <button
            onClick={next}
            className="absolute z-10 top-1/2 right-2 px-4 py-1 rounded-full shadow text-4xl bg-white/50 text-gray-700 transition-all hover:bg-white/30 hover:scale-110 active:scale-90"
          >
            <span>&#10095;</span>
          </button>
        </>
      )}
    </div>
  );
};

export default Slider;
