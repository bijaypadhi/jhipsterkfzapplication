import React from 'react';
import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';

import BookCard from '../../Common/BookCard';
function FreeBooks() {
  return (
    <Box as="section" className="free-books kfz-container" id="freeBooks">
      <Box className="content-top">
        <Heading as="h2" textAlign="center" mb="60px">
          Free books by young authors
          <small>Read the books written by the young authors</small>
        </Heading>
        <Box className="book-card-wrap">
          <Grid templateColumns="repeat(3, 1fr)" gap={30}>
            <GridItem w="100%">
              <BookCard />
            </GridItem>
            <GridItem w="100%">
              <BookCard />
            </GridItem>
            <GridItem w="100%">
              <BookCard />
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default FreeBooks;
