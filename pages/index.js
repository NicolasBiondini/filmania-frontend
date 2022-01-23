import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import { motion } from "framer-motion";

import styles from "../styles/Home.module.css";

import Layout from "../components/Layout";
import ArticleCards from "../components/ArticleCards";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home({ data, error }) {
  // Animation config

  const easing = [0.6, -0.05, 0.01, 0.99];

  const fadeInUpContainer = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        ease: easing,
        staggerChildren: 0.6,
      },
    },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <Layout>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className={styles.contentContainer}
      >
        {!error ? (
          <>
            {data.map((columns, columnIndex) => {
              return (
                <motion.div
                  variants={fadeInUpContainer}
                  key={`column-${columnIndex}`}
                  className={styles.columnsContainer}
                >
                  {columns.map((post, index) => {
                    return (
                      <ArticleCards
                        key={post.id}
                        title={post.attributes.title}
                        date={post.attributes.date}
                        shortDescription={post.attributes.shortDescription}
                        category={
                          post.attributes.categories.data[0].attributes.name
                        }
                        slug={post.attributes.slug}
                        image={
                          (columnIndex === 0 || columnIndex === 2) &&
                          index === 0
                            ? null
                            : post.attributes.image.data.attributes.formats
                                .medium
                        }
                        index={index}
                      />
                    );
                  })}
                </motion.div>
              );
            })}
          </>
        ) : (
          <div className={styles.errorContainer}>
            {" "}
            <h1>{data}</h1>
          </div>
        )}
      </motion.div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const client = new ApolloClient({
      uri: process.env.BACKEND_URL,
      cache: new InMemoryCache(),
    });

    const { data } = await client.query({
      query: gql`
        query indexPosts {
          posts(sort: ["id:desc"], pagination: { limit: 11 }) {
            data {
              id
              attributes {
                title
                slug
                date
                shortDescription
                categories {
                  data {
                    attributes {
                      name
                    }
                  }
                }
                writers {
                  data {
                    attributes {
                      name
                    }
                  }
                }
                image {
                  data {
                    attributes {
                      formats
                    }
                  }
                }
              }
            }
          }
        }
      `,
    });

    let almostFinalData = data.posts.data;

    let realArr = [];
    for (let i = 0; i < 3; i++) {
      let prevArr = [];
      for (let x = 0; x < 11 - 1; x += 3) {
        if (almostFinalData[x + i] !== undefined) {
          prevArr.push(almostFinalData[x + i]);
        }
      }
      realArr.push(prevArr);
    }
    if (realArr[2].length <= realArr[1].length) {
      let removeAndAdd = realArr[1].pop();
      realArr[2].push(removeAndAdd);
    }
    return {
      props: {
        data: realArr,
        error: false,
      },
      revalidate: 30,
    };
  } catch {
    return {
      props: {
        data: "Lo sentimos, ha ocurrido un error. Intentelo más tarde.",
        error: true,
      },
    };
  }
}
