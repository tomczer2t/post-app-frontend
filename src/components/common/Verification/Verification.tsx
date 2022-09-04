import { motion, Variants } from 'framer-motion';
import React from 'react';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
}

const variants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: .5
    }
  }
}

export const Verification = ({ isOpen, children }: Props) => {

  if (!isOpen) return null;

  return (
    <motion.div variants={ variants } animate="visible" initial="hidden">
      { children }
    </motion.div>
  );
};
