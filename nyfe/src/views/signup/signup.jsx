import React,{useState} from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { object, string} from 'yup';
import toast from 'react-hot-toast';
import { createUser } from './api';
import { useNavigate } from 'react-router-dom';



const Signup =() => {

  const navigate=useNavigate();

    let userSchema = object({
        email: string().email().required(),
        password:string().required().min(8),
        name:string().required().min(3)     
      });
  
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const [name,setName]=useState("");
  const [isLoading,setIsLoading]=useState(false);
  

  const hanldeSignup=async()=>{
    try{
        setIsLoading(true);
        const signupObj={
            email,
            password,
            name
        };
       const validatedObj= await userSchema.validate(signupObj);

       let response=await createUser(validatedObj);
       if(response.statusCode==201){
        toast.success(response.message[0]);
        navigate("/login");
       }
       else{
        toast.error(response.message[0]);
       
       }

    }
    catch(err)
    {
        toast.error(err.message);

    }
    finally{
        setIsLoading(false);
    }

  }


  return (
   
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Sign Up</Heading>
        <Input
          placeholder="name"
          type="text"
          variant="filled"
          mb={6}
          onChange={((e)=>setName(e.target.value))}
        />
        <Input
          placeholder="johndoe@gmail.com"
          type="email"
          variant="filled"
          mb={3}
          onChange={((e)=>setEmail(e.target.value))}
        />
        <Input
          placeholder="**********"
          type="password"
          variant="filled"
          mb={6}
          onChange={((e)=>setPassword(e.target.value))}
        />
        <Button colorScheme="teal" mb={8} onClick={hanldeSignup} isLoading={isLoading}>
          Sign up
        </Button>
      </Flex>
    </Flex>
  );
};

export default Signup;
