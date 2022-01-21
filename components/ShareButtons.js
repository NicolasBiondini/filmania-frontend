import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";

import { SiFacebook } from "@react-icons/all-files/si/SiFacebook";
import { SiTwitter } from "@react-icons/all-files/si/SiTwitter";
import { SiLinkedin } from "@react-icons/all-files/si/SiLinkedin";
import { SiWhatsapp } from "@react-icons/all-files/si/SiWhatsapp";

import styles from "../styles/ShareButtons.module.css";

export default function ShareButtons({ url }) {
  return (
    <div className={styles.conatiner}>
      <p>Comparte este post! </p>
      <div className={styles.socialContainer}>
        <FacebookShareButton
          quote={"Acabo de leer este post de filmanía, no te lo podes perder!"}
          hashtag={"#filmanía"}
          url={url}
        >
          <Buttons>
            <SiFacebook />
          </Buttons>
        </FacebookShareButton>
        <TwitterShareButton
          title={"Acabo de leer este post de filmanía, no te lo podes perder!"}
          hashtags={["Filmanía"]}
          url={url}
        >
          <Buttons>
            <SiTwitter />
          </Buttons>
        </TwitterShareButton>
        <LinkedinShareButton
          title={"Acabo de leer este post de filmanía, no te lo podes perder!"}
          url={url}
        >
          <Buttons>
            <SiLinkedin />
          </Buttons>
        </LinkedinShareButton>
        <WhatsappShareButton url={url}>
          <Buttons>
            <SiWhatsapp />
          </Buttons>
        </WhatsappShareButton>
      </div>
    </div>
  );
}

function Buttons({ children }) {
  return <div className={styles.buttonContainer}>{children}</div>;
}
