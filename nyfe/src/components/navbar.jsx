import {
    Box,
    Flex,
    Button,
    useColorModeValue,
    Stack,
    useColorMode,

} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'


export default function Nav() {
    const { colorMode, toggleColorMode } = useColorMode()
    const navigate= useNavigate();
    const handleLogout=()=>{
        localStorage.clear();
        navigate("/login");
    }
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>New York Times</Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>
                            <Button colorScheme='blue' onClick={handleLogout}>Logout</Button>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}