import React from "react";
import Layout from "../components/Layout";

import styles from "../styles/About.module.css";

const About = () => {
  return (
    <Layout>
      <section className={styles.container}>
        <h1>About us</h1>
        <div className={styles.textContainer}>
          <p>
            Filmanía es un blog de cine donde encontrarás diversas reseñas,
            recomendaciones, tops, entre muchas cosas más.
          </p>
          <p>
            Como buenos amantes del cine trataremos de abarcar todo tipo de
            peliculas, desde las más 'pochocleras', hasta las más desconocidas.
          </p>
          <p>
            Agradecemos profundamente tu visita y te animamos a que nos sigas en
            nuestras redes sociales!
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default About;
