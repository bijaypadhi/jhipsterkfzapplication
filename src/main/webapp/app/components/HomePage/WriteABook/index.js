import React from "react";
import { Box, Image, Button } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa6";
import { TbBulb } from "react-icons/tb";
function WriteABook() {
  return (
    <Box as="section" className="write-a-book container" id="bookStore">
      <Box className="content-right">
        <Image src="content/images/AI.svg" alt="EVA AI" />
      </Box>
      <Box className="content-left">
        <h2>Write a Book & Publish it.</h2>
        <ul>
          <li>
            <TbBulb /> Write creative book and publish it with 3 easy steps.
          </li>
          <li>
            <TbBulb /> Receive earnings from book publishing.
          </li>
          <li>
            <TbBulb /> AI assistance for easy writing.
          </li>
        </ul>
        <Button className="btn-primary-outline btn-lg" mt="40px" size="lg">
          Let’s Write a Book
        </Button>
        <Button
          className="icon-btn-primary-outline"
          mt="40px"
          ml="16px"
          size="lg"
        >
          <FaPlay />
        </Button>
      </Box>
    </Box>
  );
}

export default WriteABook;
