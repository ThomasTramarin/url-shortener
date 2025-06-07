import { motion } from "motion/react";

type SubmitButtonProps = {
  text: string;
  disabled?: boolean;
  loading: boolean;
};

const SubmitButton = ({ text, disabled, loading }: SubmitButtonProps) => {
  return (
    <motion.button
      type="submit"
      disabled={disabled}
      className="bg-accent text-black p-3 w-full rounded-lg font-medium text-lg cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {loading ? "Loading..." : text}
    </motion.button>
  );
};

export default SubmitButton;
