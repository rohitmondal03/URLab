"use client"

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ProductPreviewSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUpVariants}
      id="preview"
      className="w-full py-12 hidden md:flex justify-center perspective-[2000px]"
    >
      <Image
        src={"/product-preview.png"}
        alt="product-preview"
        width={1000}
        height={1000}
        className="w-full h-full rotate-x-12 hover:rotate-x-0 transition-all duration-500 ease-in-out hover:scale-[1.02] rounded-2xl border-2"
        priority
        fetchPriority="high"
      />
    </motion.section>
  )
}