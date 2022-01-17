import Image from "next/image";
import Link from "next/link";

import { marked } from "marked";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import Layout from "../components/Layout";
import Header from "../components/Header";
import ArticleCards from "../components/ArticleCards";
import styles from "../styles/BlogArticle.module.css";

import Footer from "../components/Footer";

export default function BlogArticle({ data: data }) {
  const relatedPosts =
    data[0].attributes.categories.data[0].attributes.posts.data;
  console.log(relatedPosts);

  return (
    <Layout
      title={data[0].attributes.simpleTitle}
      description={data[0].attributes.shortDescription}
      keywords={data[0].attributes.keywords && data[0].attributes.keywords}
      type={"Article"}
      image={data[0].attributes.image.data.attributes.formats.small.url}
    >
      <div className={styles.main}>
        <Header />
        <article className={styles.contentContainer}>
          <div className={styles.spanContainer}>
            <span className={styles.date}>
              {data[0].attributes.writers.data[0].attributes.name} /{" "}
            </span>
            <span className={styles.date}>{data[0].attributes.date} / </span>
            <Link
              href={`/sections/${data[0].attributes.categories.data[0].attributes.slug}`}
            >
              <a>
                <span className={styles.tag}>
                  {data[0].attributes.categories.data[0].attributes.name}
                </span>
              </a>
            </Link>
            <span className={styles.finalLine}></span>
          </div>
          <span
            dangerouslySetInnerHTML={{
              __html: marked(data[0].attributes.title),
            }}
            className={styles.title}
          ></span>
          <div className={styles.imageContainer}>
            <Image
              width={
                data[0].attributes.image.data.attributes.formats.medium.width
              }
              height={
                data[0].attributes.image.data.attributes.formats.medium.height
              }
              src={data[0].attributes.image.data.attributes.formats.medium.url}
              layout="responsive"
            />
          </div>
          <article
            dangerouslySetInnerHTML={{
              __html: marked(data[0].attributes.content),
            }}
            className={styles.textContainer}
          ></article>
        </article>
        <div className={styles.relatedPostsContainer}>
          <h4>Related Posts:</h4>
          <section className={styles.relatedPosts}>
            {relatedPosts.map((post) => {
              return (
                <ArticleCards
                  key={post.id}
                  title={post.attributes.title}
                  image={post.attributes.image.data.attributes.formats.small}
                  shortDescription={post.attributes.shortDescription}
                  date={post.attributes.date}
                  category={
                    data[0].attributes.categories.data[0].attributes.name
                  }
                  slug={post.attributes.slug}
                />
              );
            })}
          </section>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: "http://localhost:1337/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query findSlugs {
        posts(pagination: { limit: 500 }) {
          data {
            attributes {
              slug
            }
          }
        }
      }
    `,
  });

  console.log(data.posts.data);

  const paths = data.posts.data.map((post) => {
    return { params: { slug: post.attributes.slug } };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const client = new ApolloClient({
    uri: "http://localhost:1337/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query findPost($slugName: String!) {
        posts(filters: { slug: { eq: $slugName } }) {
          data {
            id
            attributes {
              title
              simpleTitle
              content
              date
              shortDescription
              categories {
                data {
                  attributes {
                    name
                    slug
                    posts(
                      sort: ["id:desc"]
                      filters: { slug: { ne: $slugName } }
                      pagination: { limit: 3 }
                    ) {
                      data {
                        id
                        attributes {
                          slug
                          image {
                            data {
                              attributes {
                                formats
                              }
                            }
                          }
                          shortDescription
                          title
                          date
                        }
                      }
                    }
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
    variables: {
      slugName: params.slug,
    },
  });

  const postData = data.posts.data;

  return {
    props: {
      data: postData,
    },
  };
}