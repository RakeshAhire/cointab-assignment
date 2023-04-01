import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
  const toast = useToast()
  const { userLogin } = useContext(AuthContext)
  const [details, setDetails] = useState({
    email: undefined,
    password: undefined
  })
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { value, id } = e.target;
    setDetails({ ...details, [id]: value })
    // console.log('details: ', details);
  }
  const handleLogin = () => {
    if ((details.email === undefined || null) && (details.password === undefined || null)) {
      return toast({
        title: "Error",
        description: "Please fill Details",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
    else {
      axios.post("http://localhost:8080/user/login", details)
        .then(res => {
          console.log(res.data)
          if (res.data.error) {
            toast({
              title: "Error",
              description: res.data.message,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
          else {
            userLogin(res.data.username);
            navigate("/home");
            toast({
              title: "Success",
              description: res.data.message,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }
        })

        .catch(e => {
          // console.log(e.response)
          toast({
            title: "Error",
            description: e.response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          })
        }
        )
    }
  }
  return (
    <Container
      maxW="lg"

      py={{
        base: '12',
        md: '24',
      }}
      px={{
        base: '0',
        sm: '8',
      }}
    >

      <Stack spacing="8">
        <Stack spacing="6">
          <Stack
            spacing={{
              base: '2',
              md: '3',
            }}
            textAlign="center"
          >
            <Heading
              size={{
                base: 'xs',
                md: 'sm',
                lg: "md"
              }}
            >
              Log in
            </Heading>

          </Stack>
        </Stack>
        <Box
          py={{
            base: '0',
            sm: '8',
          }}
          px={{
            base: '4',
            sm: '10',
          }}
          bg={{
            base: 'transparent',
            sm: 'bg-surface',
          }}
          boxShadow={{
            base: 'none',
            sm: 'md',
          }}
          borderRadius={{
            base: 'none',
            sm: 'xl',
          }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input onChange={handleChange} id="email" type="email" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input onChange={handleChange} id="password" type="password" />
              </FormControl>
            </Stack>

            <Stack spacing="6">
              <Button onClick={handleLogin} colorScheme='blue'>Sign in</Button>
              <HStack spacing="1" justify="center">
                <Text color="muted">Don't have an account?</Text>
                <Link to='/register'><Button variant="link" colorScheme="blue">
                  Sign up
                </Button></Link>
              </HStack>
            </Stack>
          </Stack>
        </Box>

      </Stack>
    </Container>
  )
}

export default Login

