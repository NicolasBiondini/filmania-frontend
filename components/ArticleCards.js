import Image from "next/image";
import Link from "next/link";
import { marked } from "marked";
import { motion } from "framer-motion";

import styles from "../styles/ArticleCards.module.css";

export default function ArticleCards({
  title,
  shortDescription,
  date,
  category,
  slug,
  image,
  notAnimation,
}) {
  const easing = [0.6, -0.05, 0.01, 0.99];

  const fadeInUp = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: easing,
      },
    },
  };

  return (
    <motion.article
      whileTap={
        notAnimation ? null : { scale: 0.95, transition: { duration: 0.2 } }
      }
      variants={fadeInUp}
      className={styles.articleContainer}
    >
      <Link href={`/${slug}`}>
        <a className={styles.articleContainerHover}>
          <span
            dangerouslySetInnerHTML={{ __html: marked(title) }}
            className={styles.articleTitle}
          ></span>
          {image && (
            <div className={styles.articleImageContainer}>
              <Image
                sizes="50vw"
                src={image.url}
                width={image.width}
                height={image.height}
                layout="responsive"
                alt={shortDescription}
              />
            </div>
          )}
          {shortDescription && <p>{shortDescription}</p>}
          <div className={styles.spanContainer}>
            <span className={styles.date}>{date} / </span>
            <span className={styles.tag}>{category}</span>
            <span className={styles.finalLine}></span>
          </div>
        </a>
      </Link>
    </motion.article>
  );
}
