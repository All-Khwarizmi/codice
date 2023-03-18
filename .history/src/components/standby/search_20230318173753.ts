// Enable NextJS to cache and dedupe queries
const clientFetch = cache(client.fetch.bind(client));
