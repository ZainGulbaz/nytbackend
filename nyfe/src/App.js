import './App.css';
import { BrowserRouter,Route,Routes  } from 'react-router-dom';
import Login from './views/login/login';
import Signup from './views/signup/signup';
import Posts from './views/posts/posts';
import { ChakraProvider } from '@chakra-ui/react'
import Nav from './components/navbar';

function App() {
  return (
    <ChakraProvider>
    <BrowserRouter>
    <Routes>
 <Route exact path="/login" element={<Login/>}/>
 <Route exact path="/stories" element={<><Nav></Nav><Posts/></>}/>
 <Route exact path={"/signup"} element={<Signup/>}/>
 <Route exact path={"/"} element={<Signup/>}/>


    </Routes>

    <Routes>
      
    </Routes>

    
    </BrowserRouter>
    </ChakraProvider>
  )
}

export default App;
