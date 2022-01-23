import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";

import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps, router }) {
  const url = `https://wallis.dev${router.route}`;

  return (
    <>
      <Header
        section={
          Object.keys(router.query)[0] === "section" &&
          !pageProps.error &&
          pageProps.data.data[0].attributes.categories.data[0].attributes.name
        }
      />
      <Component {...pageProps} canonical={url} key={url} />
      <Footer />
    </>
  );
}

export default MyApp;
