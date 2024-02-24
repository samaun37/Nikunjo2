import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './Carousal.css'
const Carousal = ({images})=>{
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex + 1 === images.length ? 0 : prevIndex + 1
        );
    };
    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
        );
    };
    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };
    if (images == null) {
        return (
          <div className="carousel">
            <div>No images to display</div>
          </div>
        );
      }
    return (
        <div className="carousal">
          <div className="imageChanger" onClick={handlePrevious} style={{ cursor: 'pointer' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                viewBox="0 96 960 960"
                width="30"
              >
                <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
              </svg>
            </div>
            <img
              key={currentIndex}
              src={images[currentIndex]}
              style={{ width: '550px', height: '350px' }}
            />
            <div className="imageChanger" onClick={handleNext} style={{ cursor: 'pointer' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                viewBox="0 96 960 960"
                width="30"
              >
                <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
              </svg>
            </div>
          <div className="indicator">
            {images.map((_, index) => (
              <div
                key={index}
                className={`dot ${currentIndex === index ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              ></div>
            ))}
          </div>
        </div>
      );

}
export default Carousal;