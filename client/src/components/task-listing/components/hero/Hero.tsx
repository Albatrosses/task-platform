import { Carousel } from "antd-mobile";
import * as React from "react";
import { HeroWrapper } from "./Hero.style";

export const Hero: React.FC<any> = () => {
  return (
    <HeroWrapper>
      <Carousel
        className="task-top-carousel"
        autoplay={true}
        infinite
        dots={false}
      >
        <a
          key={"asdsadasfasf1"}
          href="http://www.alipay.com"
          style={{ display: "inline-block", width: "100%", height: "90px" }}
        >
          <img
            src="https://media.st.dl.bscstorage.net/steam/apps/1147560/header.jpg?t=1576578161"
            style={{ width: "100%", verticalAlign: "top" }}
          />
        </a>
        <a
          key={"asdsadasfasf2"}
          href="http://www.alipay.com"
          style={{ display: "inline-block", width: "100%", height: "90px" }}
        >
          <img
            src="https://media.st.dl.bscstorage.net/steam/apps/1147560/header.jpg?t=1576578161"
            style={{ width: "100%", verticalAlign: "top" }}
          />
        </a>
        <a
          key={"asdsadasfasf3"}
          href="http://www.alipay.com"
          style={{ display: "inline-block", width: "100%", height: "90px" }}
        >
          <img
            src="https://media.st.dl.bscstorage.net/steam/apps/1147560/header.jpg?t=1576578161"
            style={{ width: "100%", verticalAlign: "top" }}
          />
        </a>
      </Carousel>
    </HeroWrapper>
  );
};
