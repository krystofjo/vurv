import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import './index.css';
import App from './App';

const client = new ApolloClient({
  uri: "https://vurv-admin.digitalove.cz/graphql",
  // uri: "https://vurv-app.onrender.com/graphql",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>
);
