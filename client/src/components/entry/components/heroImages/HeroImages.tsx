import { useQuery } from "@apollo/react-hooks";
import { Carousel } from "antd-mobile";
import { get, isEmpty, map } from "lodash";
import * as React from "react";
import { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Loading } from "src/components/common/loading/Loading";
import { HERO_IMAGE_LISTING } from "./gql";
import { HeroImagesWrapper } from "./HeroImages.style";

export const HeroImages: React.FC<any> = ({ location }) => {
  const { data, loading, refetch } = useQuery(HERO_IMAGE_LISTING);
  const heroImageListing = get(data, "heroImageListing.data", []);

  useEffect(() => {
    refetch();
  }, [location]);

  const renderHeroImages = () => {
    return (
      <HeroImagesWrapper>
        <Loading
          loading={loading}
          content={
            <Carousel
              className="hero-carousel"
              autoplay={true}
              infinite
              dots={false}
            >
              {map(heroImageListing, ({ taskId, imageSrc }, key) => (
                <Link
                  className="hero-carousel-link"
                  key={key}
                  to={`/task/${taskId}`}
                >
                  <img className="hero-carousel-img" src={imageSrc} />
                </Link>
              ))}
            </Carousel>
          }
        />
      </HeroImagesWrapper>
    );
  };

  return !isEmpty(heroImageListing) ? renderHeroImages() : null;
};

export default withRouter(HeroImages);
