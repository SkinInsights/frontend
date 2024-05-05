import React, { useContext, useEffect, useState } from 'react'
import './homepage.css'
import Provider, { State } from '../provider'
import Footer from '../Footer/footer'
import { useNavigate } from 'react-router-dom'
// import { ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
const Homepage = () => {
  // const [user] = useContext(Provider);
  const { username, setUsername } = State();
  const [userData, setUserData] = useState();
  const toast = useToast();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  // console.log(user);
  const logoutHandler = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/logout`,
      config
    );
    if (data) {
      toast({
        title: "Logged Out!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.removeItem('username');
      navigate("/");
    }
  };
  const profileHandler = async (username) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/profile?username=${username}`
      )
      .then((data) => {
        setUserData(username);
        // setUserId(data.data._id);
        // setTaskData(data.data.task);
        console.log(data.data);
        // console.log({ taskInd });
      });
  };
  useEffect(() => {
    profileHandler(username);
  }, [username]);
  return (
    <div className='container'>
      <div className='title'>Skin Insights</div>
      <Box boxShadow={"dark-lg"} display={"flex"}>
        <Menu>
          <MenuButton as={Button} rightIcon={''}>
            <Avatar size={"sm"} cursor={"pointer"} name={userData} />
          </MenuButton>
          <MenuList color={"black"}>
            <MenuItem>
              Username :{userData}
              <Text color={"black"}></Text>
              <Text color={"blue"} fontFamily={"cursive"}></Text>
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <div className='Sec1'>
        <div className='intro'>
          <div className='intro1'>
            <div> <div className='intro1_title'>About Us</div>
              <div className='intro1_con'>Skin Insights combines advanced machine learning (ML)
                technology with compassionate support to revolutionize skin
                cancer detection. Our platform offers precise analysis of skin
                images, empowering users with early detection and peace of mind. Built with React for seamless interaction, we provide an intuitive interface for uploading images and receiving comprehensive reports. Join our community today and take control of your skin health with Skin Insights.
              </div></div>
          </div>
          <div className='intro11'>
            <div className='intro11_title'>Analysis Results</div>
          </div>
        </div>
        <div className='intro2'>
          <div className='intro2_title'>Want to Analyis Yourself?</div>
          <div className='intro1_con'>Welcome to the Analysis Box, your gateway to proactive skin health. Here, you can upload skin images and tap the analysis button to harness the power of our advanced machine learning algorithms. Simply select your image, click analyze, and within moments, receive a comprehensive report detailing potential skin irregularities. Take charge of your skin health today with Skin Insights.  </div>
          <div className='uploadbutton'>
            <input
              type="file"
              id="uploadInput"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <label className='uploadbtn' htmlFor="uploadInput" >
              Upload
            </label>
            {image ? (
              <div className='image_prev'>
                <h2>Image Preview</h2>
                <img src={image} alt="Uploaded" style={{ maxWidth: '50%', maxHeight: '50%' }} />
              </div>
            ) : (
              <div>No image uploaded</div>
            )}
          </div>
          <button className='analysisbtn'>Analyis</button>
        </div>
      </div>
      <div><Footer /></div>
    </div>
  )
}

export default Homepage
