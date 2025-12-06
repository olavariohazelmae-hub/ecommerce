import {
  CombinedError,
  cacheExchange,
  createClient,
  fetchExchange,
} from "@urql/core";
import { env } from "../env.mjs";
import { registerUrql } from "@urql/next/rsc";

export const makeClient = (access_token?: string) => {
  const url = `https://${env.NEXT_PUBLIC_SUPABASE_PROJECT_REF}.supabase.co/graphql/v1`;
  console.log("Creating URQL client with URL:", url);
  return createClient({
    url,
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => {
      const headers = {
        apiKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: access_token
          ? `Bearer ${access_token}`
          : `Bearer ${env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      };

      console.log("URQL Client: FetchOptions called. Headers:", JSON.stringify({ ...headers, apiKey: "HIDDEN", Authorization: headers.Authorization ? "SET" : "MISSING" }));

      return { headers };
    },
  });
};

export type ExpectedErrorsHandlerType = {
  error?: CombinedError | undefined;
  expectedErrors?: { [key: string]: string };
  unexpectedErrorMessage?: string;
  networkErrorMessage?: string;
};

export function expectedErrorsHandler({
  error,
  expectedErrors = {},
  unexpectedErrorMessage = "An unexpected error occurred.",
  networkErrorMessage = "There was a problem with the network connection.",
}: ExpectedErrorsHandlerType): null | string {
  if (error === undefined) {
    return null;
  } else if (error.networkError) {
    return networkErrorMessage;
  }

  let foundExpectedError = false;

  for (const graphQLError of error.graphQLErrors) {
    for (const [errorKey, errorMessage] of Object.entries(expectedErrors)) {
      if (graphQLError.message.includes(errorKey)) {
        return errorMessage;
      }
    }
    foundExpectedError = true;
  }

  return foundExpectedError ? unexpectedErrorMessage : null;
}

export const createUrqlClient = (access_token?: string) =>
  registerUrql(() => makeClient(access_token)).getClient();

export const { getClient } = registerUrql(makeClient);

export const makeServiceClient = () => {
  const url = `https://${env.NEXT_PUBLIC_SUPABASE_PROJECT_REF}.supabase.co/graphql/v1`;
  console.log("Creating Service Role URQL client");
  try {
    if (env.DATABASE_SERVICE_ROLE) {
      const parts = env.DATABASE_SERVICE_ROLE.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
        console.log("Service Role Key Payload Role:", payload.role);
        console.log("Service Role Key Payload Iss:", payload.iss);
      } else {
        console.log("Service Role Key: Not a valid JWT (wrong number of parts)");
      }
    } else {
      console.log("Service Role Key: MISSING");
    }
  } catch (e) {
    console.log("Service Role Key Parse Error:", e);
  }
  return createClient({
    url,
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => {
      const headers = {
        apiKey: env.DATABASE_SERVICE_ROLE,
        Authorization: `Bearer ${env.DATABASE_SERVICE_ROLE}`,
      };
      console.log("Service Client Headers:", {
        apiKeyLength: headers.apiKey?.length,
        authHeaderStart: headers.Authorization?.substring(0, 20)
      });
      return { headers };
    },
  });
};

export const { getClient: getServiceClient } = registerUrql(makeServiceClient);
