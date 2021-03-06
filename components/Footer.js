import { SiTiktok } from "@react-icons/all-files/si/SiTiktok";
import { SiYoutube } from "@react-icons/all-files/si/SiYoutube";
import { SiInstagram } from "@react-icons/all-files/si/SiInstagram";

import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.container}>
        <div className={styles.preContainer}>
          <div className={styles.socialMediaContainer}>
            <a
              target="_blank"
              href="https://www.instagram.com/filmania_ok/"
              rel="noopener noreferrer"
            >
              <SiInstagram />
            </a>
            <a
              target="_blank"
              href="https://www.tiktok.com/@filmania_ok"
              rel="noopener noreferrer"
            >
              <SiTiktok />
            </a>
            <a
              target="_blank"
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
              rel="noopener noreferrer"
            >
              <SiYoutube />
            </a>
          </div>
        </div>

        <div className={styles.bottomFooter}>
          <p>
            © Copyright 2022 -{" "}
            <a
              target="_blank"
              href="https://nicolasbiondini.com/"
              rel="noopener noreferrer"
            >
              Nicolás Biondini
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
