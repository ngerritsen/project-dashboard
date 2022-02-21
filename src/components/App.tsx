import { MoonIcon } from "@chakra-ui/icons";
import { Box, Heading } from "@chakra-ui/react";
import Projects from "./Projects";

const App = () => (
  <>
    <Box p={6} bg="black" color="white">
      <Heading as="h1" size="md">
        <MoonIcon mr={2} position="relative" top="-1px" color="yellow" />{" "}
        Projects
      </Heading>
    </Box>
    <Projects />
  </>
);

export default App;
