import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Heading, Button, Flex, Center } from '@chakra-ui/react'
const Home = () => {
  const { state, userLogout } = useContext(AuthContext);


  return (
    <Center mt={10}>
      <Flex gap={5}>
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {state.isMail}
        </Heading>
        <Button
          onClick={() => userLogout()}
          fontSize={'md'}
          rounded={5}
          color={'white'}
          bg={'blue.400'}
          _hover={{
            bg: 'blue.500',
          }}
          _focus={{
            bg: 'blue.200',
          }}>
          Logout
        </Button>
      </Flex>
    </Center>
  )
}

export default Home
