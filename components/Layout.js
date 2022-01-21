import Head from "next/head";

import { motion } from "framer-motion";

export default function Layout({
  title,
  keywords,
  description,
  type,
  image,
  link,
  children,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, transition: { duration: 0.4 } }}
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
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
    </motion.div>
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
