import React from 'react'
import { Card,CardBody,Text,Image,Flex,Button} from '@chakra-ui/react';
import {ArrowForwardIcon} from "@chakra-ui/icons";

const CustomCard = ({imageUrl,title,articeUrl}) => {
  return (
    <div>
        <Card maxW='md' shadow={"dark-lg"} mb={4}>
  <Image
    objectFit='cover'
    src={imageUrl}
    alt='Chakra UI'
    boxSize={"500px"}
  />
  <CardBody>
    <Flex justifyContent={"space-between"} gap={2}>
    <Text fontWeight={'bold'} overflow={"break"}>{title}</Text>
    <a href={articeUrl} target="_blank">
    <Button rightIcon={<ArrowForwardIcon/>} colorScheme='teal' variant='solid'>
    Open
  </Button> 
    </a>
   
    </Flex>   
  </CardBody>

</Card>
    </div>
  )
}

export default CustomCard;