import { useState } from "react";
import Link from "next/link";
import styles from "../styles/NavBar.module.css";

export default function NavBar() {
  const [hoverMenu, setHoverMenu] = useState(false);
  return (
    <div className={styles.navbar}>
      <ul className={styles.navbarUl}>
        <Link href="/">
          <li className={styles.navbarItem}>
            <a className={styles.navbarA}>Home</a>
          </li>
        </Link>
        <Link href="/">
          <li
            onMouseEnter={() => setHoverMenu(true)}
            onMouseLeave={() => setHoverMenu(false)}
            className={styles.navbarItem}
          >
            <a className={styles.navbarA}>Sections</a>
          </li>
        </Link>

        <Link href="/About">
          <li className={styles.navbarItem}>
            <a className={styles.navbarA}>About</a>
          </li>
        </Link>
      </ul>
      {hoverMenu && (
        <div
          onMouseEnter={() => setHoverMenu(true)}
          onMouseLeave={() => setHoverMenu(false)}
          className={styles.hoverMenu}
        >
          <ul className={styles.navbarUl}>
            <Link href="/sections/reviews">
              <li className={styles.navbarItemB}>
                <a className={styles.navbarA}>Reseñas</a>
              </li>
            </Link>
            <Link href="/sections/podcast">
              <li className={styles.navbarItemB}>
                <a className={styles.navbarA}>Podcast</a>
              </li>
            </Link>

            <Link href="/sections/noticias">
              <li className={styles.navbarItemB}>
                <a className={styles.navbarA}>Noticias</a>
              </li>
            </Link>

            <Link href="/sections/extras">
              <li className={styles.navbarItemB}>
                <a className={styles.navbarA}>Extras</a>
              </li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}
