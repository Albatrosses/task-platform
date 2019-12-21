import * as React from "react";
import { withRouter } from "react-router";
import { Header } from "../header/Header";
import { EntryWrapper } from "./Entry.style";

export const Entry: React.FC<any> = () => {
  return (
    <EntryWrapper>
      <Header />
      <div>Entry</div>
    </EntryWrapper>
  );
};

export default withRouter(Entry);
