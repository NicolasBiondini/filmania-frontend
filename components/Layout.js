import Head from "next/head";

import { motion, AnimatePresence } from "framer-motion";

import Header from "./Header";
import Footer from "./Footer";

import styles from "../styles/Layout.module.css";

export default function Layout({
  title,
  keywords,
  description,
  type,
  image,
  link,
  key,
  section,
  children,
}) {
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };
  return (
    <motion.main
      variants={variants} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      exit="exit" // Exit state (used later) to variants.exit
      transition={{ type: "linear" }} // Set the transition to linear
      className={styles.main}
      key={key}
    >
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={link} />
        <meta property="og:site_name" content="Filmanía" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      </Head>
      {children}
    </motion.main>
  );
}

Layout.defaultProps = {
  title: "Filmanía",
  description:
    "Bienvenidos a la web oficial de Filmanía. Aquí encontrarás reseñas, noticias y todo tipo de extras acerca de diversas películas. Además podras escuchar todos los episodios de Filmanía Podcast.",
  keywords:
    "cine, películas, actores, reseñas, reviews, filmania, famosos, entrevistas",
  type: "website",
  image: ".com",
  link: "filmania.com",
};

/**
 * 
 *       initial={{ opacity: 0, transition: { duration: 0.4 } }}
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
 */
