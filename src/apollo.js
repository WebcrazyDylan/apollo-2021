import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache(),
  resolvers: {
    Movie: {
      isLiked: () => false
    },
    Mutation: {
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        console.log(isLiked);
        const myMovie = {
          __typename: "Movie",
          id: `${id}`,
          isLiked: `${isLiked}`
        };
        cache.modify({
          id: cache.identify(myMovie),
          fields: {
            isLiked(cachedName) {
              return !isLiked;
            }
          }
        });
      }
    }
  }
});

export default client;
