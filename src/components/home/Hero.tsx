import { motion, Variants } from 'framer-motion';
import heroImage from '../../assets/images/hero.jpeg';

const heroVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: .8,
      staggerChildren: .4,
    },
  }
}

const headersVariants: Variants = {
  hidden: {
    x: '-100vw',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      type: 'tween',
      ease: 'easeInOut',
    },
  }
}

export const Hero = () => {
  return (
    <motion.section variants={heroVariants} initial="hidden" animate="visible" className="h-screen-80px min-h-[400px] relative w-full flex flex-col gap-y-2 items-start justify-center">
      <img src={heroImage}
           className="block h-full object-right-top object-cover w-full absolute top-0 -z-10"
           alt="" />
      <motion.h2 variants={headersVariants} className="m-0 text-3xl p-4 bg-slate-500 inline text-white pl-[4vw] rounded-r-xl font-thin">Create posts</motion.h2>
      <motion.h2 variants={headersVariants} className="m-0 text-3xl p-4 bg-slate-500 inline text-white pl-[4vw] rounded-r-xl font-thin">Follow best bloggers</motion.h2>
      <motion.h2 variants={headersVariants} className="m-0 text-3xl p-4 bg-slate-500 inline text-white pl-[4vw] rounded-r-xl font-thin">Get feedback</motion.h2>
    </motion.section>
  );
};
