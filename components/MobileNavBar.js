import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/MobileNavBar.module.css";

export default function MobileNavBar({ closeMenu }) {
  const [sectionMenu, setSectionMenu] = useState(false);

  return (
    <motion.div
      key="content"
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={{
        open: {
          opacity: 1,
          height: "auto",
          transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
        },
        collapsed: {
          opacity: 0,
          height: 0,
          transition: { duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] },
        },
      }}
      className={styles.navbar}
    >
      <ul className={styles.navbarUl}>
        <Link href="/">
          <li onClick={() => closeMenu()} className={styles.navbarItem}>
            <a className={styles.navbarA}>Home</a>
          </li>
        </Link>
        <li
          onClick={() => setSectionMenu(!sectionMenu)}
          className={styles.navbarItem}
        >
          <a className={styles.navbarA}>Sections</a>
        </li>
        <AnimatePresence>
          {sectionMenu && (
            <motion.ul
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: {
                  opacity: 1,
                  height: "auto",
                  transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                },
                collapsed: {
                  opacity: 0,
                  height: 0,
                  transition: { duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] },
                },
              }}
              className={styles.navbarUl}
            >
              <Link href="/sections/reviews">
                <li onClick={() => closeMenu()} className={styles.navbarItem}>
                  <a className={styles.navbarA}>Reseñas</a>
                </li>
              </Link>{" "}
              <Link href="/sections/podcast">
                <li onClick={() => closeMenu()} className={styles.navbarItem}>
                  <a className={styles.navbarA}>Podcast</a>
                </li>
              </Link>{" "}
              <Link href="/sections/noticias">
                <li onClick={() => closeMenu()} className={styles.navbarItem}>
                  <a className={styles.navbarA}>Noticias</a>
                </li>
              </Link>{" "}
              <Link href="/sections/extras">
                <li onClick={() => closeMenu()} className={styles.navbarItem}>
                  <a className={styles.navbarA}>Extras</a>
                </li>
              </Link>
            </motion.ul>
          )}
        </AnimatePresence>
        <Link href="/">
          <li onClick={() => closeMenu()} className={styles.navbarItem}>
            <a className={styles.navbarA}>About</a>
          </li>
        </Link>
      </ul>
    </motion.div>
  );
}
