import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Apollo from '@apollo/client';
import App from './App';

// 1. Manually create the link
const link = new Apollo.HttpLink({
  uri: 'https://movback.netlify.app/graphql',
});

// 2. Initialize the client using that link
const client = new Apollo.ApolloClient({
  link: link,
  cache: new Apollo.InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Apollo.ApolloProvider client={client}>
      <App />
    </Apollo.ApolloProvider>
  </React.StrictMode>
);
