import styled from "styled-components";

export const HeroWrapper = styled.div`
  height: 200px;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  .hero-carousel {
    height: 100% !important;
    & > div {
      height: 100% !important;
    }
    .hero-carousel-link {
      display: inline-block;
      width: 100%;
      height: 90px;
      .hero-carousel-img {
        width: 100%;
        vertical-align: top;
        height: 40vw;
      }
    }
  }
`;
