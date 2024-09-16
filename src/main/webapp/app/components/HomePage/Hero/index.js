import React from "react";
import { Box, Image, Button } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa6";
function Hero() {
  return (
    <Box as="section" className="hero container" id="aboutSection">
      <Box className="content-left">
        <h1>
          <span className="k">K</span>
          <span className="f">F</span>
          <span className="z">Z</span> is the best platform, <br />
          for Young and Kids to turn ideas
          <br />
          into books, sketches and many more...
        </h1>
        <Button className="btn-primary-outline btn-lg" mt="40px" size="lg">
          Try it for free
        </Button>
        <Button
          className="icon-btn-primary-outline"
          mt="40px"
          ml="16px"
          size="lg"
        >
          <FaPlay />{" "}
        </Button>
      </Box>
      <Box className="content-right">
        <Image
          className="move-up-down "
          src="/assets/images/AI-robot.svg"
          alt="EVA AI"
        />
      </Box>
    </Box>
  );
}

export default Hero;
