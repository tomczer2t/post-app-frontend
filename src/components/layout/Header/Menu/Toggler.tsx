import React from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';

interface Props {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const pathVariants: Variants = {
  hidden: {
    pathLength: 0,
    transition: {
      duration: .2,
      ease: 'linear',
    },
  },
  visible: {
    pathLength: 1,
    transition: {
      duration: .2,
      ease: 'linear',
    },
  },
};

export const Toggler = ({ setShowMenu, showMenu }: Props) => {

  const handleToggleMenu = () => setShowMenu(prev => !prev);

  return (
    <button className="ml-auto md:hidden"
            onClick={ handleToggleMenu }>
      <svg xmlns="http://www.w3.org/2000/svg"
           className="h-6 w-6"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor"
           strokeWidth="2">
        <AnimatePresence exitBeforeEnter>
          { !showMenu ? (
            <motion.path strokeLinecap="round"
                         variants={ pathVariants }
                         animate="visible"
                         initial="hidden"
                         exit="hidden"
                         key="men"
                         strokeLinejoin="round"
                         d="M4 6h16M4 12h16M4 18h16" />
          ) : (
            <motion.path strokeLinecap="round"
                         variants={ pathVariants }
                         animate="visible"
                         initial="hidden"
                         exit="hidden"
                         strokeLinejoin="round"
                         key="close"
                         d="M6 18L18 6M6 6l12 12" />
          ) }
        </AnimatePresence>
      </svg>
    </button>
  );
};
