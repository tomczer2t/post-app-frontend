import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Props {
  error: string,
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

export const VerificationError = ({ error }: Props) => {

  if (!error) return null;

  return (
    <motion.div variants={ variants } animate="visible" initial="hidden">
      <h2 className="text-red-600">Verification email error!</h2>
      <p className="py-4">{ error }</p>
    </motion.div>
  );
};
