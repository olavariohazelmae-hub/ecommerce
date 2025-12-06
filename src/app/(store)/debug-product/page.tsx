import { getClient } from "@/lib/urql";
import { gql } from "@/gql";

const ProductDetailPageQuery = gql(/* GraphQL */ `
  query ProductDetailPageQuery($productSlug: String) {
    productsCollection(filter: { slug: { eq: $productSlug } }) {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`);

export default async function DebugProductPage() {
    const slug = "premium-sketchbook";

    try {
        const result = await getClient().query(
            ProductDetailPageQuery,
            { productSlug: slug },
            { requestPolicy: "network-only", fetchOptions: { cache: "no-store" } }
        );

        return (
            <div className="p-10 font-mono text-sm">
                <h1 className="text-xl font-bold mb-4">Debug Product: {slug}</h1>

                <div className="mb-8">
                    <h2 className="font-bold text-red-500">Error:</h2>
                    <pre className="bg-red-50 p-4 rounded border border-red-200 overflow-auto">
                        {JSON.stringify(result.error, null, 2)}
                    </pre>
                </div>

                <div>
                    <h2 className="font-bold text-green-500">Data:</h2>
                    <pre className="bg-green-50 p-4 rounded border border-green-200 overflow-auto">
                        {JSON.stringify(result.data, null, 2)}
                    </pre>
                </div>

                <div className="mt-8">
                    <h2 className="font-bold text-blue-500">Environment:</h2>
                    <pre className="bg-blue-50 p-4 rounded border border-blue-200 overflow-auto">
                        NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}
                        <br />
                        NEXT_PUBLIC_SUPABASE_PROJECT_REF: {process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF}
                    </pre>
                </div>
            </div>
        );
    } catch (e) {
        return (
            <div className="p-10 text-red-500">
                <h1 className="text-xl font-bold">Exception Thrown</h1>
                <pre>{JSON.stringify(e, null, 2)}</pre>
                <pre>{String(e)}</pre>
            </div>
        );
    }
}
