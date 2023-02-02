import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import ImageSlider from "./components/Slider/imageSlider";
import Footer from "./components/Footer/footer";
import Header from "./components/Header/header";
import Scroll from "./components/Scroll/scroll"

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const slides = [
    {
      url: "https://ftw.usatoday.com/wp-content/uploads/sites/90/2021/12/gta-online-the-contract-key-art.jpg?w=1000&h=600&crop=1",
      title: "GTA5",
    },
    {
      url: "https://assets.reedpopcdn.com/mafia-definitive-edition-review-a-generous-remake-that-still-shows-some-age-1600945390305.jpg/BROK/thumbnail/1600x900/quality/100/mafia-definitive-edition-review-a-generous-remake-that-still-shows-some-age-1600945390305.jpg",
      title: "MAFIA",
    },
    {
      url: "https://images4.alphacoders.com/720/thumb-1920-720203.jpg",
      title: "DAYS GONE",
    },
    {
      url: "https://twistedvoxel.com/wp-content/uploads/2021/01/ghost-recon-breakpoint-update.jpg",
      title: "BREAKPOINT",
    },
    {
      url: "https://cdn.mos.cms.futurecdn.net/THQywijPnGtYYQ9GGYNnu8-1200-80.jpg",
      title: "THE LAST OF US",
    },
  ];
  const containerStyles = {
    width: "1000px",
    height: "480px",
    margin: "0 auto",
  };
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header/>
        <Scroll/>
        <div style={containerStyles}>
          <ImageSlider slides={slides} />
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}
//<Footer />
export default App;
