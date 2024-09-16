import React from "react";
import {
  Box,
  Image,
  Button,
  Heading,
  Flex,
  Card,
  CardHeader,
  Text,
  CardFooter,
  Avatar,
} from "@chakra-ui/react";
import { BiChat, BiLike, BiShare } from "react-icons/bi";
function BookCard() {
  return (
    <>
      <Card maxW="sm" boxShadow="xl" borderRadius="14px" className="book-card">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
              <Box>
                <Heading as="h4">Segun Adebayo</Heading>
                <Text>Creator - Fairy Tails</Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <Image
          objectFit="cover"
          src="content/images/books-covers/cover-1.jpeg"
          alt="Family"
        />
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
            234
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
            4567
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
            9887
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default BookCard;
