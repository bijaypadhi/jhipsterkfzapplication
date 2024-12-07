import React,{useRef} from "react";
import { Text } from "@chakra-ui/react";
import HTMLFlipBook from "react-pageflip";
import { Button } from "@chakra-ui/react";
import AdminLayout from "app/components/Layout/AdminLayout";
import "../style.scss";

const images = [
  "content/images/pages/01.jpg",
  "content/images/pages/02.jpg",
  "content/images/pages/03.jpg",
  "content/images/pages/04.jpg",
  "content/images/pages/05.jpg",
  "content/images/pages/06.jpg",
];

function MyBook() {
  const flipBookRef = useRef();

  const goToNextPage = () => flipBookRef.current.pageFlip().flipNext();
  const goToPreviousPage = () => flipBookRef.current.pageFlip().flipPrev();
  return (
    <AdminLayout>
      <div className="flipbook-container">
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
          {images.map((image, index) => (
            <div className="page" key={index}>
              <img src={image} alt={`Page ${index + 1}`} />
            </div>
          ))}
        </HTMLFlipBook>
      </div>
      <div className="flipbook-button">
        <Button className="btn-secondary-solid"
          colorScheme="grey" onClick={goToPreviousPage}>Previous
        </Button>
        <Button className="btn-secondary-solid"
          colorScheme="grey" onClick={goToNextPage}>Next
        </Button>
      </div>
    </AdminLayout>
  );
}

export default MyBook;