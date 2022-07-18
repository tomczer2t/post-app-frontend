import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Props {
  success: boolean,
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

export const VerificationSuccess = ({ success }: Props) => {

  if (!success) return null;

  return (
    <motion.div variants={ variants } animate="visible" initial="hidden">
      <h2 className="text-green-600">Verification email success!</h2>
      <button className="text-green-700 font-bold rounded-md border-solid px-6 py-2 bg-green-200"><Link to="/account/login">Sign in</Link></button>
    </motion.div>
  );
};
