import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Apollo from '@apollo/client'; 
import App from './App'; // No curly braces here!

// This is the safety check to make sure Apollo is loaded
const { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } = Apollo;

const link = createHttpLink({
  uri: 'https://movback.netlify.app/graphql',
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));

// This is where line 23 usually is
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);