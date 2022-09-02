import { AnimatePresence, motion } from 'framer-motion';
import { Loading } from '../common/Loading/Loading';

interface Props {
  loading: boolean;
}

const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  },
}

export const VerificationLoading = ({ loading }: Props) => {

  return (
    <AnimatePresence>
      { loading && (
        <>
          <motion.h2 variants={ variants } animate="visible" initial="hidden" exit="exit"  className="text-slate-600">Verification in progress</motion.h2>
          <Loading className="mx-auto text-8xl" loading={loading} variants={ variants } />
        </>
      )}
    </AnimatePresence>
  );
};
