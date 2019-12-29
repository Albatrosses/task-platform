import * as React from "react";
import { withRouter } from "react-router";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { EntryWrapper } from "./Entry.style";

export const Entry: React.FC<any> = () => {
  return (
    <EntryWrapper>
      <Header />
      <div className="main-content">Entry</div>
      <Footer />
    </EntryWrapper>
  );
};

export default withRouter(Entry);
