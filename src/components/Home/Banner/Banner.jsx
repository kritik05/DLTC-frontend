import React from "react";
import "./Banner.scss";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import image1 from "./image1.png";
import image3 from "./image3.png";
import image4 from "./image4.png";

const Banner = () => {
    return (
    <div className="sliderStyle">
         <AliceCarousel autoPlay autoPlayInterval={2000} disableButtonsControls infinite disableDotsControls>
        <img src={image1} className="sliderimg"/>
        <img src={image3} className="sliderimg"/>
        <img src={image4} className="sliderimg"/>
        </AliceCarousel>
    </div>
    );
};

export default Banner;
