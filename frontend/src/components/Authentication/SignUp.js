import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const toast = useToast();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async e => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: 'Please fill all required fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: 'Password does not match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }
    try {
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/user',
        { name, email, password, pic },
        config
      );
      toast({
        title: 'Registration Successfull',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setPicLoading(false);
      history.push('/chats');
    } catch (err) {
      toast({
        title: 'Error Occured',
        description: err.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setPicLoading(false);
    }
  };
  const postDetails = pics => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: 'Please select an image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'Chat-App');
      data.append('cloud_name', 'drxf5uf23');
      fetch('https://api.cloudinary.com/v1_1/drxf5uf23/image/upload', {
        method: 'post',
        body: data,
      })
        .then(res => res.json())
        .then(data => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch(err => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: 'Please select an valid image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setPicLoading(false);
      return;
    }
  };
  return (
    <VStack spacing="5px" color={'black'}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          borderColor={'lightblue'}
          placeholder="Enter Your Name"
          onChange={e => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          borderColor={'lightblue'}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={e => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            borderColor={'lightblue'}
            type={show ? 'text' : 'password'}
            placeholder="Enter Password"
            onChange={e => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            borderColor={'lightblue'}
            type={show ? 'text' : 'password'}
            placeholder="Confirm password"
            onChange={e => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          borderColor={'lightblue'}
          type="file"
          p={1.5}
          accept="image/*"
          onChange={e => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
