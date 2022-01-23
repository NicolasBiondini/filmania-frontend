import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";

import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps, router }) {
  const url = `https://wallis.dev${router.route}`;

  return (
    <>
      <Header />
      <AnimatePresence
        exitBeforeEnter
        onExitComplete={() => {
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0 });
          }
        }}
      >
        <Component {...pageProps} key={url} />;
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default MyApp;
