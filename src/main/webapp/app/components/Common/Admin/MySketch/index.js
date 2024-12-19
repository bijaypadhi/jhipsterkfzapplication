
import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import AdminLayout from "app/components/Layout/AdminLayout";
import "../style.scss";
import { Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";

function MySketch() {
  const flipBookRef = useRef();
  const userId = useSelector((state) => state.authentication.userInfo.userId);
  const [pages, setPages] = useState([]); // State to store fetched images
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/gcp/get-canvas?userId=${userId}`);
        if (response.data && Array.isArray(response.data)) {
          setPages(response.data); // Assume the API returns an array of image URLs
        } else {
          console.error("Invalid response format");
        }
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

  const handleOpenBook = () => {
    setIsBookOpen(true);
  };

  const handleClose = () => {
    setIsBookOpen(false);
  };

  return (
    <AdminLayout>
      <div className="book-container">
        {!isBookOpen ? (
          <div className="book-front-container">
            <img
              src={"content/images/sketch.jpeg"}
              alt="book"
              onClick={handleOpenBook}
            />
          </div>
        ) : (
          <>
            <div className="flipbook-container">
              <button className="close-button" onClick={handleClose}>
                Close
              </button>
              {loading ? (
                <div className="loading">Loading...</div>
              ) : (
                <HTMLFlipBook
                  ref={flipBookRef}
                  width={500}
                  height={400}
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
          </>
        )}
      </div>
    </AdminLayout>
  );
}

export default MySketch;
