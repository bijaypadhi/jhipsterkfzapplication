import React from 'react';
import { Box, Image, Button, Heading, Flex, Card, CardHeader, Text, CardFooter, Avatar } from '@chakra-ui/react';
import { BiChat, BiLike, BiShare } from 'react-icons/bi';
function BookCard() {
  return (
    <>
      <Card maxW="sm" boxShadow="xl" borderRadius="14px" className="book-card">
        <CardHeader>
          <Flex spacing="4">
            <Flex w="100%" flex="1" gap="4" alignItems="center" flexWrap="wrap" padding={10}>
              <Avatar size="sm" className="avatar" name="Segun Adebayo" src="content/images/books-covers/cover-1.jpeg" />
              <Box>
                <Heading as="h4" m="0">
                  Segun Adebayo
                </Heading>
                <Text>Writer - Fairy Tails</Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <Image objectFit="cover" src="content/images/books-covers/cover-1.jpeg" alt="Family" />
        <CardFooter
          className="card-footer"
          justify="space-between"
          flexWrap="wrap"
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <Button className="likes" flex="1" variant="ghost" leftIcon={<BiLike />}>
            234
          </Button>
          <Button className="views" flex="1" variant="ghost" leftIcon={<BiChat />}>
            4567
          </Button>
          <Button className="ratings" flex="1" variant="ghost" leftIcon={<BiShare />}>
            9887
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default BookCard;
