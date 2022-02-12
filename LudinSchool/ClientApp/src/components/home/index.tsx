import * as React from "react";
import { useActions } from "../../hooks/useActions";

import NewsList from "./newsList";

const HomePage = () => {
  const { fetchNews } = useActions();

  React.useEffect(() => {
    // window.addEventListener("scroll", listenToScroll);
  });

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = winScroll / height;
    console.log("scrolled: ", scrolled);
  };

  return (
    <>
      <h1>Home</h1>
      <NewsList />
      <div className="sidebar"></div>
    </>
  );
};

export default HomePage;
