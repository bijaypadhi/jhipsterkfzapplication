import React from "react";
import { Box, Image, Button } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa6";
import { FaMagic } from "react-icons/fa";
function SketchYourIdeas() {
  return (
    <Box as="section" className="sketch-your-ideas container" id="sketchYourIdeas">
      <Box className="content-left">
        <h2>Sketch Your Ideas</h2>
        <ul>
          <li>
            <FaMagic /> Write creative book and publish it with 3 easy steps.
          </li>
          <li>
            <FaMagic /> Receive earnings from book publishing.
          </li>
          <li>
            <FaMagic /> AI assistance for easy sketching.
          </li>
        </ul>
        <Button className="btn-primary-outline btn-lg" mt="40px" size="lg">
        Let’s Sketch
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
      <Box className="content-right">
        <Image src="content/images/sketch.svg" alt="EVA AI" />
      </Box>
    </Box>
  );
}

export default SketchYourIdeas;
