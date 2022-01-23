import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence
      exitBeforeEnter
      onExitComplete={() => {
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0 });
        }
      }}
    >
      <Component {...pageProps} key={router.asPath} />
    </AnimatePresence>
  );
}

export default MyApp;

/**
 * onExitComplete={() => {
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0 });
        }
      }}
 */
