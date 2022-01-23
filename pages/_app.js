import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
function MyApp({ Component, pageProps, router }) {
  return (
    <Layout>
      <AnimatePresence
        exitBeforeEnter
        onExitComplete={() => {
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0 });
          }
        }}
      >
        <Component {...pageProps} key={router.asPath} />;
      </AnimatePresence>
    </Layout>
  );
}

export default MyApp;
