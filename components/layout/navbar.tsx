"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/* ─── Data ──────────────────────────────────────────────────────────── */

const homeSections = [
  {
    title: "The Crisis",
    description: "Understand the textile waste crisis and our mission.",
    href: "/#problem",
  },
  {
    title: "How we Solve it",
    description: "The 3-step journey from closet to circular economy.",
    href: "/#how-it-works",
  },
  {
    title: "What we Offer?",
    description: "Explore our intelligent pricing and tech stack.",
    href: "/#features",
  },
  {
    title: "Who's it for?",
    description: "How individuals and societies use NoKasa.",
    href: "/#use-cases",
  },
  {
    title: "What people say",
    description: "Community impact and resident feedback.",
    href: "/#testimonials",
  },
  {
    title: "Is your area ready?",
    description: "Check coverage across Bengaluru's neighborhoods.",
    href: "/#coverage",
  },
  {
    title: "FAQs",
    description: "Common questions about our logistics.",
    href: "/#faq",
  },
];

const resourceLinks = [
  {
    title: "FitCheck",
    description: "Get expert style advice. Elevate your wardrobe.",
    href: "https://nokasa.co/fitcheck",
    external: true,
    icon: null,
  },
  {
    title: "Fabcal",
    description: "Calculate textile carbon footprint.",
    href: "https://nokasa.co/fabcal",
    external: true,
    icon: null,
  },
  {
    title: "Facts",
    description: "Discover the hidden sustainability story of your clothes.",
    href: "https://nokasa.co/facts/",
    external: true,
    icon: null,
  },
];

const blogPreviews = [
  {
    title: "Why Most Clothes End Up in Landfills",
    description: "The hidden journey of textile waste.",
    href: "/blog/clothes-in-landfills",
    image: "/images/hero-img-1.png",
  },
  {
    title: "5 Ways to Declutter Your Wardrobe Faster",
    description: "Habits that reduce clutter instantly.",
    href: "/blog/declutter-wardrobe-faster",
    image: "/images/hero-img-2.png",
  },
  {
    title: "The Cost of Fast Fashion",
    description: "What happens after clothes leave.",
    href: "/blog/fast-fashion-cost",
    image: "/images/hero-img-3.png",
  },
  {
    title: "Communities & Textile Waste",
    description: "Ideas for apartments and societies.",
    href: "/blog/community-textile-waste",
    image: "/images/hero-img-1.png",
  },
];

/* ─── Animation variants ───────────────────────────────────────────── */

const dropdownVariants = {
  hidden: { opacity: 0, y: -6, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.18, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.97,
    transition: { duration: 0.13, ease: "easeIn" as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -4 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.15 },
  }),
};

/* ─── Sub-components ────────────────────────────────────────────────── */

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="text-current"
    >
      <path
        d="M3 5L7 9L11 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function HomeDropdown() {
  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute left-[-20px] top-[calc(100%+12px)] w-[400px] rounded-2xl bg-white dark:bg-card shadow-xl shadow-black/8 border border-gray-100 dark:border-white/5 overflow-hidden"
    >
      <div className="p-3 grid gap-1">
        {homeSections.map((item, i) => (
          <motion.a
            key={item.href}
            href={item.href}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="group flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-brand/5 transition-all duration-150"
          >
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand/20 group-hover:bg-brand transition-colors" />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-brand transition-colors leading-none mb-1">
                {item.title}
              </p>
              <p className="text-[11px] text-text-muted dark:text-gray-400 line-clamp-1">
                {item.description}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

function ResourcesDropdown() {
  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute left-0 top-[calc(100%+12px)] w-[280px] rounded-2xl bg-white dark:bg-card shadow-xl shadow-black/8 border border-gray-100 dark:border-white/5 overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 pt-4 pb-2 border-b border-gray-50 dark:border-white/5">
        <p className="text-xs font-semibold text-text-muted dark:text-gray-400 uppercase tracking-widest">
          Resources & Tools
        </p>
      </div>

      {/* Items */}
      <div className="p-2">
        {resourceLinks.map((item, i) => (
          <motion.a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-brand-muted dark:hover:bg-brand/10 group transition-colors duration-150"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-brand transition-colors leading-snug">
                {item.title}
              </p>
              <p className="text-xs text-text-muted dark:text-gray-400 mt-0.5 truncate">{item.description}</p>
            </div>
          </motion.a>
        ))}
      </div>

    </motion.div>
  );
}

function BlogDropdown() {
  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute left-[-100px] top-[calc(100%+12px)] w-[480px] rounded-2xl bg-white dark:bg-card shadow-xl shadow-black/8 border border-gray-100 dark:border-white/5 overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 pt-4 pb-2 border-b border-gray-50 dark:border-white/5">
        <p className="text-xs font-semibold text-text-muted dark:text-gray-400 uppercase tracking-widest">
          Latest Articles
        </p>
      </div>

      {/* 2×2 grid */}
      <div className="grid grid-cols-2 gap-2 p-3">
        {blogPreviews.map((post, i) => (
          <motion.a
            key={post.href}
            href={post.href}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="group flex flex-col gap-2 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-brand/5 transition-colors duration-150"
          >
            {/* Thumbnail */}
            <div className="w-full h-24 rounded-lg bg-gray-100 dark:bg-black/20 overflow-hidden relative border border-gray-100 dark:border-white/5">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-brand transition-colors leading-snug line-clamp-2">
                {post.title}
              </p>
              <p className="text-xs text-text-muted dark:text-gray-400 mt-0.5 line-clamp-1">{post.description}</p>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-50 dark:border-white/5 bg-gray-50/50 dark:bg-black/20">
        <a
          href="/blog"
          className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
        >
          Visit the blog
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Logo ──────────────────────────────────────────────────────────── */

function NoKasaLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 group select-none relative h-10">
      <motion.div
        className="relative w-9 h-9 flex items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="28" height="28" viewBox="0 0 230 230" fill="none" className="z-20">
          <circle cx="115" cy="115" r="115" fill="#00463C" />
          <path fillRule="evenodd" clipRule="evenodd" d="M115.06 40.7C106.054 40.7 97.2482 42.3 88.9426 45.4C80.6371 48.5 73.2322 53.1 66.928 58.8C60.6238 64.5 55.7205 71.3 52.3182 78.6C48.9159 86 47.2148 93.9 47.2148 101.9C47.2148 109.9 45.0133 106.9 42.2115 106.9C39.4096 106.9 37.2081 104.7 37.2081 101.9C37.2081 92.5 39.2095 83.2 43.2121 74.5C47.1147 65.8 52.9186 58 60.2235 51.4C67.4283 44.8 76.034 39.6 85.4403 36.1C94.8466 32.6 104.953 30.7 115.06 30.7C125.167 30.7 135.274 32.5 144.68 36.1C154.086 39.6 162.692 44.8 169.897 51.4C177.101 58 182.905 65.8 186.908 74.5C190.811 83.2 192.912 92.5 192.912 101.9C192 105.5 190.711 106.9 187.909 106.9C185.107 106.9 182.905 104.7 182.905 101.9C182.905 93.9 181.204 86 177.802 78.6C174.4 71.2 169.496 64.5 163.192 58.8C156.888 53.1 149.383 48.5 141.177 45.4C132.872 42.3 124.066 40.7 115.06 40.7Z" fill="#FCF1DC" />
          <path fillRule="evenodd" clipRule="evenodd" d="M115.06 189.6C124.066 189.6 132.872 188 141.177 184.9C149.483 181.8 156.888 177.2 163.192 171.5C169.496 165.8 174.4 159 177.802 151.7C181.204 144.3 182.905 136.4 182.905 128.4C182.905 120.4 185.107 123.4 187.909 123.4C190.711 123.4 192.912 125.6 192.912 128.4C192.912 137.8 190.911 147.1 186.908 155.8C183.005 164.5 177.202 172.3 169.897 178.9C162.692 185.5 154.086 190.7 144.68 194.2C135.274 197.7 125.167 199.6 115.06 199.6C104.953 199.6 94.8466 197.8 85.4403 194.2C76.034 190.7 67.4283 185.5 60.2235 178.9C53.0187 172.3 47.2148 164.5 43.2121 155.8C39.3095 147.1 37.2081 137.8 37.2081 128.4C37.2081 119 39.4096 123.4 42.2115 123.4C45.0133 123.4 47.2148 125.6 47.2148 128.4C47.2148 136.4 48.9159 144.3 52.3182 151.7C55.7205 159.1 60.6238 165.8 66.928 171.5C73.2322 177.2 80.7372 181.8 88.9426 184.9C97.2482 188 106.054 189.6 115.06 189.6Z" fill="#FCF1DC" />
          <path fillRule="evenodd" clipRule="evenodd" d="M172.598 86.1C173.999 85 176.101 85.2 177.302 86.6L187.909 99.9L198.516 86.6C199.617 85.2 201.718 84.9 203.219 86.1C204.62 87.2 204.92 89.3 203.719 90.8L190.51 107.3C189.91 108.1 188.909 108.5 187.909 108.5C186.908 108.5 185.907 108 185.307 107.3L172.098 90.8C170.997 89.4 171.198 87.3 172.598 86.1Z" fill="#FCF1DC" />
          <path fillRule="evenodd" clipRule="evenodd" d="M57.5217 140.9C56.1208 142 54.0194 141.8 52.8186 140.4L42.2115 127.1L31.6044 140.4C30.5037 141.8 28.4023 142.1 26.9013 140.9C25.5003 139.8 25.2001 137.7 26.4009 136.2L39.6097 119.7C40.2101 118.9 41.2108 118.5 42.2115 118.5C43.2121 118.5 44.2128 119 44.8132 119.7L58.022 136.2C59.1228 137.6 58.9226 139.7 57.5217 140.9Z" fill="#FCF1DC" />
          <path fillRule="evenodd" clipRule="evenodd" d="M115.06 68.1C89.0427 68.1 68.0287 89.2 68.0287 115.1C68.0287 141 89.1428 162.1 115.06 162.1C140.977 162.1 162.091 141 162.091 115.1C162.091 89.2 140.977 68.1 115.06 68.1ZM57.2215 115.2C57.2215 83.3 83.1388 57.4 115.06 57.4C146.981 57.4 172.899 83.3 172.899 115.2C172.899 147.1 146.981 173 115.06 173C83.1388 173 57.2215 147.1 57.2215 115.2Z" fill="#FCF1DC" />
          <path fillRule="evenodd" clipRule="evenodd" d="M145.881 129.4L130.37 135.8L129.27 143.2L140.077 146C141.778 146.4 143.279 147.3 144.48 148.5L149.583 153.6C151.685 155.7 151.685 159.1 149.583 161.2C147.482 163.3 144.079 163.3 141.978 161.2L137.075 156.3L125.667 153.3C123.366 152.7 121.364 151.2 119.963 149.2C118.663 147.2 118.062 144.8 118.462 142.4L119.763 133.6C119.963 131.9 120.664 130.4 121.765 129C122.765 127.7 124.166 126.6 125.667 126L142.278 119.1C143.979 118.4 145.881 118.2 147.682 118.5C149.483 118.8 151.284 119.9 152.685 121.1M152.685 121.1L166.194 133.4C168.396 135.4 168.496 138.8 166.494 141C164.493 143.2 161.091 143.3 158.889 141.3L145.881 129.4" fill="#FCF1DC" />
          <path d="M73.1321 149.9C71.6311 149.9 70.1301 149.1 69.3296 147.7C68.1288 145.6 68.8293 142.9 70.9307 141.6L75.7339 138.8V119.1C75.7339 117.4 76.3343 115.7 77.3349 114.3L88.7425 97.2C89.443 96.2 90.2435 95.4 91.2442 94.7C92.2449 94.1 93.3456 93.6 94.5464 93.4C95.7472 93.2 96.948 93.2 98.0487 93.4C99.1495 93.7 100.25 94.1 101.151 94.8L111.858 101.8C111.858 101.8 111.958 101.8 112.058 101.9L129.17 99.6L141.278 85.5V72.5C141.278 70 143.279 68.1 145.681 68.1C148.082 68.1 150.083 70.1 150.083 72.5V85.6C150.083 87.7 149.283 89.7 147.982 91.3L135.874 105.4C134.473 107 132.472 108.1 130.37 108.4L113.159 110.7C110.957 111 108.756 110.5 106.955 109.2L96.2475 102.1C96.2475 102.1 96.2475 102.1 96.1475 102.1L84.7399 119.1V138.8C84.6398 140.2 84.2395 141.7 83.5391 142.9C82.8386 144.2 81.8379 145.3 80.6371 146.1C80.6371 146.1 80.5371 146.1 80.437 146.2L75.4337 149.1C74.7332 149.5 73.9327 149.7 73.2322 149.7L73.1321 149.9Z" fill="#FCF1DC" />
        </svg>
      </motion.div>
      <svg
        height="18"
        viewBox="41 6 104 25"
        fill="currentColor"
        className="text-gray-900 dark:text-white"
        aria-label="NoKasa"
      >
        <path d="M60.416 8.72221C60.8158 8.72221 61.1014 8.92214 61.1014 9.26486V9.3791C61.1014 10.1788 59.8162 10.5215 59.8162 11.8353V27.6577C59.8162 28.5145 59.3307 29 58.5025 29H56.8745C56.2176 29 55.8178 28.6573 55.3894 28.0575L45.1934 14.5199V25.8584C45.1934 27.1721 46.5357 27.5434 46.5357 28.3431V28.4574C46.5357 28.8001 46.2501 29 45.8217 29H42.166C41.7376 29 41.4805 28.8001 41.4805 28.4574V28.3431C41.4805 27.5434 42.623 27.1721 42.623 25.8584V11.8638C42.623 10.5501 41.4805 10.2073 41.4805 9.3791V9.26486C41.4805 8.92214 41.7376 8.72221 42.166 8.72221H46.4215C47.1355 8.72221 47.5353 9.03638 47.9637 9.63614L57.2458 22.5454V11.8353C57.2458 10.5215 55.9892 10.1788 55.9892 9.3791V9.26486C55.9892 8.92214 56.2748 8.72221 56.6746 8.72221H60.416ZM69.8781 29.2856C65.5084 29.2856 61.9669 26.2582 61.9669 22.117C61.9669 17.8901 65.5941 15.0055 69.6782 15.0055C73.9623 15.0055 77.5037 17.9757 77.5037 22.1741C77.5037 26.3439 74.0479 29.2856 69.8781 29.2856ZM70.4779 27.8861C71.8202 27.8861 72.3058 26.5153 72.3058 24.3732C72.3058 22.1455 71.1348 16.4049 68.8785 16.4049C67.5076 16.4049 67.0221 17.6616 67.0221 19.975C67.0221 22.2883 68.1645 27.8861 70.4779 27.8861ZM96.8785 25.8584C97.821 27.4577 98.8206 27.5434 98.8206 28.3431V28.4574C98.8206 28.8001 98.5636 29 98.1352 29H91.0808C90.6809 29 90.4239 28.8001 90.4239 28.4574V28.3431C90.4239 27.5434 92.0518 27.1721 91.3093 25.9155L87.3108 19.1753L85.0831 21.4315V25.8584C85.0831 27.1721 86.3398 27.5434 86.3398 28.3431V28.4574C86.3398 28.8001 86.0827 29 85.6543 29H79.4282C79.0284 29 78.7428 28.8001 78.7428 28.4574V28.3431C78.7428 27.5434 79.8852 27.1721 79.8852 25.8584V11.8353C79.8852 10.5215 78.7428 10.1788 78.7428 9.3791V9.26486C78.7428 8.92214 79.0284 8.72221 79.4282 8.72221H85.6543C86.0827 8.72221 86.3398 8.92214 86.3398 9.26486V9.3791C86.3398 10.1788 85.0831 10.5215 85.0831 11.8353V18.347L91.395 11.8638C92.4802 10.75 91.195 10.1788 91.195 9.3791V9.26486C91.195 8.92214 91.4521 8.72221 91.8805 8.72221H96.5358C96.9356 8.72221 97.2212 8.92214 97.2212 9.26486V9.3791C97.2212 10.1788 95.7361 10.5786 94.508 11.8638L90.8237 15.6052L96.8785 25.8584ZM112.463 25.8869C112.72 27.9147 113.92 27.4292 113.92 28.2289C113.92 28.9714 112.263 29.1714 110.693 29.1714C108.979 29.1714 108.151 28.8286 107.922 27.8005C107.322 28.6287 106.18 29.2856 104.295 29.2856C101.239 29.2856 98.8972 27.8861 98.8972 24.9444C98.8972 22.0599 101.325 20.5747 104.038 20.5747C105.238 20.5747 106.209 20.8603 106.923 21.2887V21.203C106.58 17.8329 106.38 16.3764 104.895 16.3764C102.924 16.3764 103.724 20.2034 101.182 20.2034C99.9824 20.2034 99.1828 19.4609 99.1828 18.347C99.1828 16.0051 101.982 15.0055 104.895 15.0055C108.722 15.0055 111.378 17.2332 111.835 20.7746L112.463 25.8869ZM105.866 27.829C106.808 27.829 107.351 26.7437 107.351 25.7727L107.237 24.4589C107.037 22.7453 106.294 22.0884 105.466 22.0884C104.609 22.0884 104.009 22.8595 104.009 24.0305C104.009 26.0583 104.695 27.829 105.866 27.829ZM120.854 29.257C117.255 29.257 114.57 27.9147 114.57 25.9155C114.57 24.6303 115.456 24.0876 116.598 24.0876C119.454 24.0876 118.483 28.0004 120.854 28.0004C121.711 28.0004 122.396 27.572 122.396 26.4296C122.396 22.6882 114.828 24.8873 114.828 19.3466C114.828 16.8048 117.284 15.0055 120.854 15.0055C124.481 15.0055 126.851 16.5763 126.851 18.4327C126.851 19.4323 125.995 20.1749 124.938 20.1749C122.168 20.1749 123.081 16.3192 121.111 16.3192C120.225 16.3192 119.768 17.1189 119.768 17.9472C119.768 21.8599 127.08 19.8036 127.08 25.0587C127.08 27.4292 124.824 29.257 120.854 29.257ZM142.028 25.8869C142.285 27.9147 143.484 27.4292 143.484 28.2289C143.484 28.9714 141.828 29.1714 140.257 29.1714C138.543 29.1714 137.715 28.8286 137.487 27.8005C136.887 28.6287 135.744 29.2856 133.859 29.2856C130.803 29.2856 128.461 27.8861 128.461 24.9444C128.461 22.0599 130.889 20.5747 133.602 20.5747C134.802 20.5747 135.773 20.8603 136.487 21.2887V21.203C136.144 17.8329 135.944 16.3764 134.459 16.3764C132.488 16.3764 133.288 20.2034 130.746 20.2034C129.547 20.2034 128.747 19.4609 128.747 18.347C128.747 16.0051 131.546 15.0055 134.459 15.0055C138.286 15.0055 140.942 17.2332 141.399 20.7746L142.028 25.8869ZM135.43 27.829C136.373 27.829 136.915 26.7437 136.915 25.7727L136.801 24.4589C136.601 22.7453 135.859 22.0884 135.03 22.0884C134.174 22.0884 133.574 22.8595 133.574 24.0305C133.574 26.0583 134.259 27.829 135.43 27.829Z" />
      </svg>
    </Link>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10 px-2 py-2" />;

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-white/10 pointer-events-auto overflow-hidden group"
      aria-label="Toggle theme"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ y: -20, opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
          exit={{ y: 20, opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          className="relative z-10"
        >
          {isDark ? (
            <Sun className="w-[18px] h-[18px] text-brand-light brightness-110 drop-shadow-[0_0_8px_rgba(163,177,138,0.4)]" />
          ) : (
            <Moon className="w-[18px] h-[18px] text-gray-600" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Background Glow Effect */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(163,177,138,0.2) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(44,76,59,0.1) 0%, transparent 70%)"
        }}
      />
    </motion.button>
  );
}

/* ─── Mobile Menu ────────────────────────────────────────────────────── */

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="lg:hidden border-t border-gray-100 dark:border-white/5 bg-white dark:bg-card overflow-hidden"
        >
          <div className="flex flex-col py-4 px-4 gap-1">
            {[
              { label: "Home", href: "/" },
              { label: "Become a Partner", href: "/become-partner" },
              { label: "Blog", href: "https://nokasa.co/blogs/" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl hover:bg-brand-muted dark:hover:bg-brand/10 hover:text-brand transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 mt-1 border-t border-gray-100 dark:border-white/5">
              <a
                href="/book-a-slot"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl gradient-brand text-white text-sm font-semibold shadow-sm"
              >
                Book a Slot
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main Navbar ────────────────────────────────────────────────────── */

export function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Hover helpers with intent delay */
  const openDropdown = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(name);
  };

  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const stayOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  // Single centralized pill layout spanning the Navbar
  const pillClass = cn(
    "pointer-events-auto transition-all duration-300 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.06)] border p-1.5 w-full mx-auto max-w-[1020px]",
    scrolled
      ? "bg-white/95 dark:bg-card/95 backdrop-blur-xl border-black dark:border-white rounded-[2rem] shadow-black/5 dark:shadow-white/5"
      : "bg-white/80 dark:bg-card/80 backdrop-blur-lg border-gray-200/50 dark:border-white/5 rounded-[2rem]"
  );

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center items-center px-4 lg:px-6 pointer-events-none w-full">
      <div className={pillClass}>

        {/* ── Left: Logo ── */}
        <div className="flex-shrink-0 pl-2">
          <NoKasaLogo />
        </div>

        {/* ── Center: Desktop nav ── */}
        <div className="hidden lg:flex items-center h-10 relative">
          {[
            { id: "home", label: "Home", href: "/" },
            { id: "resources", label: "Resources", href: "#", dropdown: true },
            { id: "become-partner", label: "Become a Partner", href: "/become-partner" },
            { id: "blog", label: "Blog", href: "https://nokasa.co/blogs/", external: true },
          ].map((item) => {
            const isActive = pathname === "/" ? (item.id === "home") : (item.id !== "home" && item.id !== "resources" && item.id !== "blog" && pathname?.startsWith(item.id));
            const isHoveredDropdown = activeDropdown === item.id;

            return (
              <div
                key={item.id}
                className="relative h-11 flex items-center justify-center px-5"
                onMouseEnter={() => item.dropdown && openDropdown(item.id)}
                onMouseLeave={item.dropdown ? closeDropdown : undefined}
              >
                {/* Active Background Pill */}
                {isActive && (
                  <motion.div
                    layoutId="active-bg"
                    className="absolute inset-0 bg-gray-100/80 dark:bg-white/5 rounded-full z-0"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                {/* Active Top Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute top-0 w-6 h-[4px] bg-gray-900 dark:bg-brand-light rounded-b-md z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}

                {item.dropdown ? (
                  <button
                    className={cn(
                      "relative z-10 flex items-center gap-1.5 text-[15px] font-bold transition-colors duration-200",
                      isActive ? "text-gray-900 dark:text-gray-100" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                    )}
                  >
                    {item.label}
                    <ChevronIcon open={isHoveredDropdown} />
                  </button>
                ) : item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 text-[15px] font-bold transition-colors duration-200 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "relative z-10 text-[15px] font-bold transition-colors duration-200",
                      isActive ? "text-gray-900 dark:text-gray-100" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdowns */}
                {item.dropdown && (
                  <AnimatePresence>
                    {isHoveredDropdown && (
                      <div onMouseEnter={stayOpen} onMouseLeave={closeDropdown} className="absolute left-0 top-full pt-4">
                        {item.id === "home" ? <HomeDropdown /> : item.id === "resources" ? <ResourcesDropdown /> : <BlogDropdown />}
                      </div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Right: Download CTA + Theme Toggle + Mobile toggle ── */}
        <div className="flex items-center gap-1 pr-1">
          {/* <ThemeToggle /> */}

          {/* Download CTA */}
          <motion.a
            href="/book-a-slot"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:flex items-center justify-center px-5 h-[42px] rounded-[1.2rem] text-white text-[14px] font-bold shadow-md shadow-brand/10 border border-brand/20 transition-all duration-300 pointer-events-auto"
            style={{ background: "linear-gradient(135deg, var(--brand-dark), var(--brand))" }}
          >
            Book a Slot
          </motion.a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden flex flex-col items-center justify-center w-[42px] h-[42px] rounded-[1.2rem] hover:bg-gray-100 dark:hover:bg-white/5 transition-colors gap-1.5 pointer-events-auto"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-gray-700 dark:bg-gray-300 rounded-full origin-center transition-all"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, x: -4 } : { opacity: 1, x: 0 }}
              className="block w-5 h-[1.5px] bg-gray-700 dark:bg-gray-300 rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-gray-700 dark:bg-gray-300 rounded-full origin-center transition-all"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu wrapper (fixed overlay below navbar) */}
      <div className="absolute top-[calc(100%+16px)] left-4 right-4 max-w-[500px] mx-auto pointer-events-auto">
        <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </div>
    </div>
  );
}
