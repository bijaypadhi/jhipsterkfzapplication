import React, { useRef, useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import HTMLFlipBook from "react-pageflip";
import AdminLayout from "app/components/Layout/AdminLayout";
import axios from "axios";
import "../style.scss";
import { useSelector } from "react-redux";


const MyBook = () => {
  const flipBookRef = useRef();
  const userId = useSelector((state) => state.authentication.userInfo.userId);
  const [pages, setPages] = useState([]);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [loading, setLoading] = useState(true);


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

  return (
    <AdminLayout>
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

          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default MyBook;
