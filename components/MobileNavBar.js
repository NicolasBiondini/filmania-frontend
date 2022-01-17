import { useState } from "react";
import Link from "next/link";

import styles from "../styles/MobileNavBar.module.css";

export default function MobileNavBar({ closeMenu }) {
  const [sectionMenu, setSectionMenu] = useState(false);

  return (
    <div className={styles.navbar}>
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
        {sectionMenu && (
          <ul className={styles.navbarUl}>
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
          </ul>
        )}
        <Link href="/">
          <li onClick={() => closeMenu()} className={styles.navbarItem}>
            <a className={styles.navbarA}>About</a>
          </li>
        </Link>

        <Link href="/">
          <li onClick={() => closeMenu()} className={styles.navbarItem}>
            <a className={styles.navbarA}>Contacto</a>
          </li>
        </Link>
      </ul>
    </div>
  );
}
