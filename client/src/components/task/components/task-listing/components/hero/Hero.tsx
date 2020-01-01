import { useQuery } from "@apollo/react-hooks";
import { Carousel } from "antd-mobile";
import { get, isEmpty, map } from "lodash";
import * as React from "react";
import { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Loading } from "src/components/common/loading/Loading";
import { HERO_IMAGE } from "../../gql";
import { HeroWrapper } from "./Hero.style";

export const Hero: React.FC<any> = ({ location }) => {
  const { data, loading, refetch } = useQuery(HERO_IMAGE);
  const heroImage = get(data, "heroImage", []);

  useEffect(() => {
    refetch();
  }, [location]);

  const renderHeroImage = () => {
    return (
      <HeroWrapper>
        <Loading
          loading={loading}
          content={
            <Carousel
              className="hero-carousel"
              autoplay={true}
              infinite
              dots={false}
            >
              {map(heroImage, ({ taskId, imageSrc }, key) => (
                <Link
                  className="hero-carousel-link"
                  key={key}
                  to={`/task-listing/detail/${taskId}`}
                >
                  <img className="hero-carousel-img" src={imageSrc} />
                </Link>
              ))}
            </Carousel>
          }
        />
      </HeroWrapper>
    );
  };

  return !isEmpty(heroImage) ? renderHeroImage() : null;
};

export default withRouter(Hero);
