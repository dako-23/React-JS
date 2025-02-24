import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';        // основни стилове за слайдъра
import 'slick-carousel/slick/slick-theme.css'; // тема (добавя точки и анимации)

function PartnersCarousel() {
  const settings = {
    dots: true,              // показва точките отдолу
    infinite: true,          // безкрайно въртене
    speed: 500,              // скорост на анимацията (ms)
    slidesToShow: 3,         // колко слайда се виждат едновременно
    slidesToScroll: 1,       // по колко слайда да се прелистват
    autoplay: true,          // автоматично прелистване
    autoplaySpeed: 2000,     // на колко секунди да прелистват
    pauseOnHover: true,      // пауза при задържане на мишката
    responsive: [
      {
        breakpoint: 768,     // за екрани под 768px
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,     // за екрани под 480px
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  // Тук може да сложиш реалните лога/снимки
  const partners = [
    { id: 1, image: "/partners/baby-daybook.webp" },
    { id: 2, image: "/partners/bg-mama.png" },
    { id: 4, image: "/partners/yan-bibiyan.png" },
    { id: 3, image: "/partners/hipoland.png" },
    { id: 5, image: "/partners/f.l.y.jpg" },
  ];

  return (
    <>
      <div className="max-w-5xl mx-auto py-8">
        <div className="bg-page-pattern flex items-center justify-center my-6 gap-4">
          <div className="h-[2px] w-60 bg-gray-800"></div>
          <h4 className="text-gray-800 text-center text-2xl font-bold mb-1">WE PARTNER WITH</h4>
          <div className="h-[2px] w-60 bg-gray-800"></div>
        </div>
        <Slider {...settings}>
          {partners.map((partner) => (
            <div key={partner.id} className="flex justify-center">
              <img
                src={partner.image}
                alt={`Partner ${partner.id}`}
                className="h-24 object-contain"
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default PartnersCarousel;


