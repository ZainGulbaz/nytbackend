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
import { loginUser } from './api';
import { useNavigate } from 'react-router-dom';


const Login =() => {

  const navigate=useNavigate();

    let userSchema = object({
        email: string().email().required(),
        password:string().required().min(8)
       
      });
  
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const [isLoading,setIsLoading]=useState(false);

  const handleLogin=async()=>{
    try{
        setIsLoading(true);
        const loginObj={
            email,
            password
        };
       const validatedObj= await userSchema.validate(loginObj);
       let response= await loginUser(validatedObj);
       if(response.statusCode==200){
        toast.success("Login success");
        localStorage.setItem("nyt_token",response.data.token);
        navigate("/stories");
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
        <Heading mb={6}>Log In</Heading>
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
        <Button colorScheme="teal" mb={8} onClick={handleLogin} isLoading={isLoading}>
          Log In
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
