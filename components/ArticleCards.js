import Image from "next/image";
import Link from "next/link";
import { marked } from "marked";

import styles from "../styles/ArticleCards.module.css";

export default function ArticleCards({
  title,
  shortDescription,
  date,
  category,
  slug,
  image,
  index,
}) {
  return (
    <article className={styles.articleContainer}>
      <Link href={`/${slug}`}>
        <a>
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
    </article>
  );
}
