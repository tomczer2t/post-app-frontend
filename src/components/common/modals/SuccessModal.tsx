import { AnimatePresence, motion, Variants } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import React, { useEffect } from 'react';

const modalVariants: Variants = {
  hidden: {
    x: '-100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
  exit: {
    opacity: 0,
  }
}

interface Props {
  close: () => void;
  success?: string | boolean;
  children?: React.ReactNode;
}

export const SuccessModal = ({ close, success, children }: Props) => {

   return (
    <AnimatePresence>
      { success && (
        <motion.div variants={modalVariants} initial="hidden" exit="exit" animate="visible" className="text-center p-6 rounded-md max-w-[400px] bg-green-200 text-green-600 border-solid border-green-600 fixed left-4 bottom-8">
          <IoClose className="absolute top-1 right-1 text-xl cursor-pointer hover:text-green-800 transition-colors duration-300"
                       onClick={ () => close() }
          />
          { children ? children : success }
        </motion.div>
      ) }
    </AnimatePresence>
  );
};
