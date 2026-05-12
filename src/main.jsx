import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Apollo from '@apollo/client'; // Import everything as a namespace
import App from './App';

// Manually extract the pieces from the Apollo namespace
const { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } = Apollo;

const link = createHttpLink({
  uri: 'https://movback.netlify.app/graphql',
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);