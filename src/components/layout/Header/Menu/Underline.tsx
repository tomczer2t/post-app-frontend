import { motion } from "framer-motion";

export const Underline = () => {
  return (
    <motion.div layoutId="underline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[3px] rounded-full hidden md:block w-full bg-black relative"/>
  );
};
