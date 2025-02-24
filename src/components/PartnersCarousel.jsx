import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PartnersCarousel() {
  const [activeSlide, setActiveSlide] = useState(2);

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: true, 
    centerPadding: "60px", 
    focusOnSelect: true,
    afterChange: (current) => setActiveSlide(current), 
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          centerMode: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          centerMode: true,
        },
      },
    ],
  };

  const partners = [
    { id: 1, image: "/partners/baby-book.png", url: "https://babydaybook.app/" },
    { id: 2, image: "/partners/bg-mama.png", url: "https://www.bg-mamma.com/" },
    { id: 4, image: "/partners/yan-bibiyan.png", url: "https://yanbibiyan.net/" },
    { id: 3, image: "/partners/hipoland.png", url: "https://www.hippoland.net/" },
    { id: 5, image: "/partners/f.l.y.jpg", url: "https://bgfundforwomen.org/bg/" },
    { id: 6, image: "/partners/malkite-ribki.png", url: "https://malkiteribki.com/" },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="bg-page-pattern flex items-center justify-center my-6 gap-4">
        <div className="h-[2px] w-60 bg-gray-800"></div>
        <h4 className="text-gray-800 text-center text-2xl font-bold mb-1">WE PARTNER WITH</h4>
        <div className="h-[2px] w-60 bg-gray-800"></div>
      </div>
      <Slider {...settings}>
        {partners.map((partner, index) => (
          <div
            key={partner.id}
            className={`flex justify-center ${index === activeSlide ? "slick-center" : ""
              }`}
          >
            <a
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.currentTarget.blur();
              }}
            >
              <img
                src={partner.image}
                alt={`Partner ${partner.id}`}
                className="h-24 object-contain cursor-pointer transition-transform duration-200 hover:scale-105"
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default PartnersCarousel;