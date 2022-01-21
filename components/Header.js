import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import styles from "../styles/Header.module.css";
import MobileNavBar from "./MobileNavBar";

import NavBar from "./NavBar";

export default function Header({ section }) {
  const [menu, setMenu] = useState(false);

  return (
    <div className={styles.header}>
      <div
        className={`${menu && styles.change} ${styles.containerMenuIcon}`}
        onClick={() => setMenu(!menu)}
      >
        <div className={`${styles.bar1} `}></div>
        <div className={`${styles.bar2} `}></div>
        <div className={`${styles.bar3} `}></div>
      </div>
      <AnimatePresence initial={false}>
        {menu && <MobileNavBar closeMenu={() => setMenu(false)} />}
      </AnimatePresence>
      <Link href="/">
        <a>
          <h1
            className={`${styles.title} ${section && styles.titleWithSection}`}
          >
            FILMANÍA
          </h1>
        </a>
      </Link>
      {section && <h1 className={styles.sectionTitle}>{section}</h1>}

      <div className={styles.divider}></div>
      <NavBar />
    </div>
  );
}
