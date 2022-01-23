import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";

import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Header />
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => {
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0 });
          }
        }}
      >
        <Component {...pageProps} key={router.asPath} />;
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default MyApp;
