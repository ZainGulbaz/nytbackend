import React, { useEffect, useState } from 'react';
import CustomCard from '../../components/card';
import { SimpleGrid, Box } from '@chakra-ui/react'
import { getStories } from './api';
import toast from 'react-hot-toast';
import { Spinner } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';



const Posts = () => {

    const [stories, setStories] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {
       
        if(!localStorage.getItem("nyt_token")) {navigate("/login");
      return;
    }

        getStories().then(res => {
            if (res.statusCode == 200) {
                setStories(res.data.stories);
            }
            else {
                toast.error(res.message[0]);
            }
        }).catch(console.error);
    }, []);

    return (
        <div>

            {(stories.length > 0) ? <SimpleGrid columns={[1, 3]} p={2} >
                {
                    stories?.map(story => (
                        <Box><CustomCard imageUrl={story?.multimedia?.[0]?.url} title={story?.title} articeUrl={story?.url} /></Box>
                    ))
                }
            </SimpleGrid> : <Spinner thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
                mt={2}
                ml={2}
            />}

        </div>
    )
}

export default Posts