import { Carousel } from "antd-mobile";
import { map } from "lodash";
import * as React from "react";
import { Link } from "react-router-dom";
import { generateHashCode } from "src/helper/common";
import { HeroWrapper } from "./Hero.style";

const dataSource = [
  {
    key: generateHashCode(),
    path: "/task-listing/detail/1",
    imageSrc:
      "https://media.st.dl.bscstorage.net/steam/apps/1147560/header.jpg?t=1576578161"
  },
  {
    key: generateHashCode(),
    path: "/task-listing/detail/1",
    imageSrc:
      "https://media.st.dl.bscstorage.net/steam/apps/1147560/header.jpg?t=1576578161"
  },
  {
    key: generateHashCode(),
    path: "/task-listing/detail/1",
    imageSrc:
      "https://media.st.dl.bscstorage.net/steam/apps/1147560/header.jpg?t=1576578161"
  },
  {
    key: generateHashCode(),
    path: "/task-listing/detail/1",
    imageSrc:
      "https://media.st.dl.bscstorage.net/steam/apps/1147560/header.jpg?t=1576578161"
  }
];

export const Hero: React.FC<any> = () => {
  return (
    <HeroWrapper>
      <Carousel
        className="task-top-carousel"
        autoplay={true}
        infinite
        dots={false}
      >
        {map(dataSource, ({ key, path, imageSrc }) => (
          <Link
            key={key}
            to={path}
            style={{ display: "inline-block", width: "100%", height: "90px" }}
          >
            <img
              src={imageSrc}
              style={{ width: "100%", verticalAlign: "top" }}
            />
          </Link>
        ))}
      </Carousel>
    </HeroWrapper>
  );
};
