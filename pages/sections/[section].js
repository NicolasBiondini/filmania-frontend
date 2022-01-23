import Link from "next/link";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import { motion } from "framer-motion";

import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArticleCards from "../../components/ArticleCards";

import styles from "../../styles/Sections.module.css";

export default function Section({ error, data, post }) {
  const easing = [0.6, -0.05, 0.01, 0.99];

  const fadeInUpContainer = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        ease: easing,
        staggerChildren: 0.4,
      },
    },
  };

  console.log(data.data[0].attributes.categories.data[0].attributes.name);

  return (
    <Layout
      title={
        !error
          ? "Filmanía - " +
            data.data[0].attributes.categories.data[0].attributes.name
          : "Filmanía"
      }
      section={
        !error && data.data[0].attributes.categories.data[0].attributes.name
      }
    >
      {error ? (
        <div className={styles.errorContainer}>
          <h2>{data}</h2>
          <Link href="/">
            <a className={styles.goBackHome}>Go back to Home.</a>
          </Link>
        </div>
      ) : (
        <div className={styles.contentContainer}>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeInUpContainer}
            className={styles.postContainer}
          >
            {data.data.map((post) => {
              return (
                <ArticleCards
                  key={post.id}
                  title={post.attributes.title}
                  date={post.attributes.date}
                  shortDescription={post.attributes.shortDescription}
                  category={post.attributes.categories.data[0].attributes.name}
                  slug={post.attributes.slug}
                  image={null}
                />
              );
            })}
          </motion.div>
          <div className={styles.paginationContainer}>
            {data.meta.pagination.page !== 1 && (
              <Link
                scroll={false}
                href={`/sections/${
                  data.data[0].attributes.categories.data[0].attributes.slug
                }?post=${(post - 2).toString()}`}
              >
                <a>Back</a>
              </Link>
            )}
            <p>
              Page {data.meta.pagination.page} of{" "}
              {data.meta.pagination.pageCount}
            </p>
            {data.meta.pagination.page !== data.meta.pagination.pageCount && (
              <Link
                scroll={false}
                href={`/sections/${
                  data.data[0].attributes.categories.data[0].attributes.slug
                }?post=${(post + 2).toString()}`}
              >
                <a>Next</a>
              </Link>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const client = new ApolloClient({
    uri: process.env.BACKEND_URL,
    cache: new InMemoryCache(),
  });

  let numberStart = parseInt(query.post) || 0;

  try {
    const { data } = await client.query({
      query: gql`
        query findPostsForSection(
          $slugName: String!
          $pagination: PaginationArg
        ) {
          posts(
            filters: { categories: { slug: { eq: $slugName } } }
            sort: ["id:desc"]
            pagination: $pagination
          ) {
            data {
              id
              attributes {
                slug
                date
                title
                shortDescription
                categories {
                  data {
                    attributes {
                      name
                      slug
                    }
                  }
                }
              }
            }
            meta {
              pagination {
                total
                page
                pageCount
              }
            }
          }
        }
      `,
      variables: {
        slugName: query.section,
        pagination: {
          start: numberStart,
          limit: 2,
        },
      },
    });

    if (data.posts.data.length === 0) {
      return {
        props: {
          error: true,
          data: "Error, we don't have any post here.",
        },
      };
    }

    return {
      props: {
        error: false,
        data: data.posts,
        post: numberStart,
      },
    };
  } catch {
    return {
      props: {
        error: true,
        data: "Error, we don't have any post here.",
      },
    };
  }
}
