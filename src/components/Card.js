import { Heading, HStack, Image, Text, VStack, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
    <VStack backgroundColor="white" borderRadius={10}>
      <Image src={imageSrc} borderRadius={10} width="100%"/>
      <VStack alignItems="left" width="100%" px={3} spacing={2} paddingTop={2} paddingBottom={2}>
        <Heading as="h3" size="sm" color="black">
          {title}
        </Heading>
        <Text fontSize='xs' color="black" opacity="70%">{description}</Text>
        <Text fontSize='xs' color="black">
          {"See more "}
          <FontAwesomeIcon icon={faArrowRight} size="xs"/>
        </Text>
      </VStack>
    </VStack>
  );
};

export default Card;
