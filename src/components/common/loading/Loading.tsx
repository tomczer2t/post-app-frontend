import { motion, Variants } from 'framer-motion';
import { BiLoaderAlt } from 'react-icons/bi';

interface Props {
  className?: string;
  loading: boolean;
  variants?: Variants
}

const defaultVariants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  }
}

export const Loading = ({ className = '', loading, variants = defaultVariants }: Props) => {

  return (
    <>
      { loading && <motion.div variants={ variants } animate="visible" initial="hidden" exit="exit" className={`inline text-slate-600 ${className}`}>
        <BiLoaderAlt className={`animate-spin`}/>
      </motion.div>}
    </>
  );
};
