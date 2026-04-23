"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Trash2, RecycleIcon, Globe } from "lucide-react";

const STATS = [
  {
    icon: Trash2,
    value: "1.3M+",
    label: "Tonnes of clothes go directly to landfills every year in India",
  },
  {
    icon: RecycleIcon,
    value: "<10%",
    label: "Of all textile waste is actually successfully recycled",
  },
  {
    icon: Globe,
    value: "2nd",
    label: "Largest industrial polluter globally,right after oil",
  },
];

export function TextileWaste() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section className="py-0 bg-transparent relative overflow-hidden transition-colors duration-500" id="textile-waste">
      <div className="bg-gray-950 rounded-[2rem] md:rounded-[3rem] mx-3 md:mx-8 overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[520px]">

          {/* Left: Stats */}
          <div ref={ref} className="flex flex-col justify-center px-5 sm:px-8 md:px-14 py-10 md:py-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="h-[2px] w-6 bg-brand/60" />
              <span className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.4em]">The Scale of the Problem</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[26px] sm:text-[32px] md:text-[44px] font-black text-white leading-[1.1] tracking-tight mb-8 md:mb-10"
              style={{ fontFamily: "var(--font-display)" }}
            >
              India generates{" "}
              <span className="text-brand">7.8M+ tonnes</span>{" "}
              of textile waste every year.
            </motion.h2>

            <div className="space-y-6 mb-10">
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0 mt-0.5">
                    <stat.icon className="w-4 h-4 text-brand" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                      {stat.value}
                    </p>
                    <p className="text-[13px] text-gray-100 font-medium leading-snug mt-0.5">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-[15px] font-bold text-brand"
            >
              NoKasa is changing that,one pickup at a time.
            </motion.p>
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <Image
              src="/images/textile_waste.png"
              alt="Textile waste problem"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/20 to-transparent" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
