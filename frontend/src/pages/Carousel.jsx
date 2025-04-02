import React, { useState, useEffect } from "react";


const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const logos = [
    { id: 1, src: "/images/car-rental.jpg", alt: "ACM" },
    { id: 2, src: "/images/bike-rental.jpg", alt: "Dronaid" },
    { id: 3, src: "/images/car-rental.jpg", alt: "LeanIn" },
    { id: 4, src: "/images/bike-rental.jpg", alt: "Varise" },
    { id: 6, src: "/images/car-rental.jpg", alt: "TACM" },
    { id: 7, src: "/images/bike-rental.jpg", alt: "ADG" },
    { id: 8, src: "/images/car-rental.jpg", alt: "ISTE" },
    { id: 9, src: "/images/bike-rental.jpg", alt: "Blank" },
    { id: 10, src: "/images/car-rental.jpg", alt: "MIST" },
    { id: 11, src: "/images/bike-rental.jpg", alt: "ACMW" }
  ];
  

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(
        window.innerWidth >= 1024 ? 5 : window.innerWidth >= 768 ? 4 : 3
      );
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % logos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [logos.length]);

  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % logos.length;
      items.push(logos[index]);
    }
    return items;
  };

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="flex transition-all duration-1000 ease-in-out">
        {getVisibleItems().map((item, index) => (
          <div
            key={item.id}
            className="flex-shrink-0 px-2 transition-all duration-500"
            style={{
              width: `${100 / visibleCount}%`
            }}
          >
            <div className={`
              w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 mx-auto rounded-full bg-white p-2
              ${index === Math.floor(visibleCount / 2) ? 'scale-110 shadow-lg' : 'scale-90 opacity-50'}
              transition-all duration-500
            `}>
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;