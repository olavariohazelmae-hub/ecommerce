import * as dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const PROJECT_REF = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const URL = `https://${PROJECT_REF}.supabase.co/graphql/v1`;

const query = `
  query ProductDetailPageQuery($productSlug: String) {
    productsCollection(filter: { slug: { eq: $productSlug } }) {
      edges {
        node {
          id
          name
          slug
          description
          price
          sustainability
          featuredImage: medias {
            id
            key
            alt
          }
          images: product_mediasCollection(orderBy: [{ priority: DescNullsLast }]) {
            edges {
              node {
                media {
                  id
                  key
                  alt
                }
              }
            }
          }
        }
      }
    }
  }
`;

const variables = {
  productSlug: "premium-sketchbook",
};

const checkGraphQL = async () => {
  console.log(`Fetching from ${URL}`);

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apiKey": ANON_KEY!,
        // "Authorization": `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();
    console.log("GraphQL Result:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error fetching GraphQL:", error);
  }
};

checkGraphQL();
