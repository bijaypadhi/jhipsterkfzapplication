import React, { useRef, useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import HTMLFlipBook from "react-pageflip";
import axios from "axios";
import { useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import './OkumaReaderModal.scss'; // Ensure you have appropriate styles for the modal

// interface OkumaReaderModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   isLoading: boolean;
//   userId: string; // Keep userId as a required prop
// }

const OkumaReaderModal = ({ isOpen, onClose, userId, isLoading }) => {
  const flipBookRef = useRef();
  //const userId = useSelector((state) => state.authentication.userInfo.userId);
  const [pages, setPages] = useState([]);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/gcs/pages?userId=${userId}`
        );
        setPages(response.data);
      } catch (error) {
        console.error("Error fetching pages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [userId]);

  const goToNextPage = () => flipBookRef.current.pageFlip().flipNext();
  const goToPreviousPage = () => flipBookRef.current.pageFlip().flipPrev();

  const handleOpenBook = () => setIsBookOpen(true);
  const handleClose = () => setIsBookOpen(false);

  const CustomLeftArrow = ({ onClick }) => (
    <button className="custom-arrow custom-arrow-left" onClick={onClick}>
      <FaArrowLeft />
    </button>
  );

  const CustomRightArrow = ({ onClick }) => (
    <button className="custom-arrow custom-arrow-right" onClick={onClick}>
      <FaArrowRight />
    </button>
  );

  return (

      <div className="book-container">
        {!isBookOpen ? (
          <div className="book-front-container">
            <img
              src="content/images/book.jpeg"
              alt="Open book"
              onClick={handleOpenBook}
              role="button"
              aria-label="Open the book"
            />
          </div>
        ) : (
          <>
            <div className="flipbook-container">
              <button
                className="close-button"
                onClick={handleClose}
                aria-label="Close the book"
              >
                Close
              </button>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <HTMLFlipBook
                  ref={flipBookRef}
                  width={250}
                  height={350}
                  size="stretch"
                  minWidth={200}
                  maxWidth={500}
                  minHeight={300}
                  maxHeight={400}
                  drawShadow={true}
                  flippingTime={1000}
                  useMouseEvents={true}
                  className="flipbook"
                >
                  {pages.map((image, index) => (
                    <div className="page" key={index}>
                      <img src={image} alt={`Page ${index + 1}`} />
                    </div>
                  ))}
                </HTMLFlipBook>
              )}
            </div>
            <div className="flipbook-button">
              <Button
                className="btn-secondary-solid"
                colorScheme="grey"
                onClick={goToPreviousPage}
              >
                Previous
              </Button>
              <Button
                className="btn-secondary-solid"
                colorScheme="grey"
                onClick={goToNextPage}
              >
                Next
              </Button>
            </div>
            <div className="carousel-container" style={{ marginTop: "20px" }}>
              <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                showDots={true}
                infinite={true}
                autoPlay={true}
                keyBoardControl={true}
                customTransition="all .5s ease"
                transitionDuration={500}
                containerClass="carousel-wrapper"
                itemClass="carousel-item"
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                centerMode={false} // Ensure items are properly aligned
              >
                <div className="carousel-item">Item 1</div>
                <div className="carousel-item">Item 2</div>
                <div className="carousel-item">Item 3</div>
              </Carousel>
            </div>
          </>
        )}
      </div>

  );
};

export default OkumaReaderModal;
