import { IoClose } from 'react-icons/io5';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const modalVariants: Variants = {
  hidden: {
    x: '-100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: .3
    }
  },
  exit: {
    opacity: 0,
  }
}

interface Props {
  close: () => void;
  error?: string | boolean;
  children?: React.ReactNode;
}

export const ErrorModal = ({ close, error, children }: Props) => {

  // const [timer, setTimer] = useState(0);
  //
  // useEffect(() => {
  //
  // }, []);

  return (
    <AnimatePresence>
      { error && (
        <motion.div key={ Math.random() } variants={modalVariants} initial="hidden" exit="exit" animate="visible" className="p-6 rounded-md max-w-[400px] md:min-w-[300px] text-center  bg-red-200 text-red-600 border-solid border-red-600 fixed z-10 left-4 bottom-8">
          <IoClose className="absolute top-1 right-1 text-xl cursor-pointer  hover:text-red-800 transition-colors duration-300"
                       onClick={ () => close() }
          />
          { children ? children : error }
        </motion.div>
      ) }
    </AnimatePresence>
  );
};
