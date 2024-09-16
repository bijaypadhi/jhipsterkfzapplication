import React from "react";
import {
  Box,
  Heading
} from "@chakra-ui/react";

import BookCard from "../../Common/BookCard";
function FreeBooks() {
  return (
    <Box as="section" className="free-books container" id="freeBooks">
      <Box className="content-top">
        <Heading as="h2" textAlign="center" mb="60px">
          Free books by young authors
          <small>Read the books written by the young authors</small>
        </Heading>
        <Box className="book-card-wrap">
          <BookCard />
        </Box>
      </Box>
    </Box>
  );
}

export default FreeBooks;
