import React, { useContext, useEffect, useState } from 'react'
import './homepage.css'
import Provider, { State } from '../provider'
import Footer from '../Footer/footer'
import { useNavigate } from 'react-router-dom'
// import { ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, VStack, useToast, Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td, } from '@chakra-ui/react'
import axios from 'axios'

// Define the analysis information
const cancerAnalysis = [
  {
    probability_range: [0, 0.1],
    summary: "Very low probability of skin cancer",
    advice: "The analysis indicates a very low probability of skin cancer. Continue regular skin checks and maintain a healthy skincare routine.",
    next_steps: "Perform regular skin checks and seek medical advice if any unusual changes occur.",
    resources: [
      { title: "Skin Cancer Prevention", url: "https://www.cancer.org/cancer/skin-cancer/prevention-and-early-detection.html" },
      { title: "How to Perform a Skin Self-Exam", url: "https://www.aad.org/public/diseases/skin-cancer/self-exam" },
    ],
  },
  {
    probability_range: [0.1, 0.5],
    summary: "Low to moderate probability of skin cancer",
    advice: "The analysis indicates a low to moderate probability of skin cancer. Consider consulting a dermatologist for further evaluation.",
    next_steps: "Schedule an appointment with a dermatologist for a thorough examination.",
    resources: [
      { title: "Signs and Symptoms of Skin Cancer", url: "https://www.skincancer.org/early-detection/symptoms/" },
      { title: "Find a Dermatologist", url: "https://find-a-derm.aad.org/" },
    ],
  },
  {
    probability_range: [0.5, 0.9],
    summary: "Moderate to high probability of skin cancer",
    advice: "The analysis indicates a moderate to high probability of skin cancer. It is strongly recommended to consult a dermatologist for further tests and comprehensive evaluation.",
    next_steps: "Seek immediate medical advice and consider a biopsy or other diagnostic tests.",
    resources: [
      { title: "Types of Skin Cancer", url: "https://www.skincancer.org/skin-cancer-information/types-of-skin-cancer/" },
      { title: "How to Prepare for a Skin Cancer Screening", url: "https://www.aad.org/public/diseases/skin-cancer/screening" },
    ],
  },
  {
    probability_range: [0.9, 1],
    summary: "High probability of skin cancer",
    advice: "The analysis indicates a high probability of skin cancer. It is crucial to consult a dermatologist or oncologist immediately for comprehensive diagnosis and treatment.",
    next_steps: "Seek immediate medical advice and follow recommended treatment plans.",
    resources: [
      { title: "Understanding Skin Cancer Treatments", url: "https://www.cancer.org/cancer/skin-cancer/treatment.html" },
      { title: "Support Groups for Cancer Patients", url: "https://www.cancer.org/treatment/support-programs-and-services.html" },
    ],
  },
];

// Helper function to get the analysis based on the probability
const getAnalysis = (probability) => {
  for (const analysis of cancerAnalysis) {
    if (probability >= analysis.probability_range[0] && probability < analysis.probability_range[1]) {
      return analysis;
    }
  }
  return null;
};

const Homepage = () => {
  // const [user] = useContext(Provider);
  const { username, setUsername } = State();
  const [userData, setUserData] = useState();
  const [image, setImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  // const [image, setImage] = useState(null);
  const navigate = useNavigate();
  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setUploadedFile(file); // Keep the file reference for sending to the server
    }
  };
  const handleAnalysis = async () => {
    if (!uploadedFile) {
      toast({
        title: 'No image uploaded',
        description: 'Please upload an image to analyze.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    setIsLoading(true); // Show loading spinner while analyzing

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_FASTAPI_URL}/predict`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setAnalysisResult(response.data);
      setIsLoading(false);

      toast({
        title: 'Analysis complete',
        description: `Prediction: ${response.data.prediction}, Probability: ${response.data.probability_of_skin_cancer.toFixed(2)}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        title: 'Error during analysis',
        description: 'An error occurred while analyzing the image. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
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
          <div className="intro11">
            <div className="intro11_title">Analysis Results</div>
            {analysisResult && (
              <Box>
                <Text fontSize="lg">
                <b> Prediction:</b> {analysisResult.prediction}
                </Text>
                <Text marginBottom="16px">
                <b> Probability of Skin Cancer:</b> {(analysisResult.probability_of_skin_cancer.toFixed(2))*100}% ({(analysisResult.probability_of_skin_cancer.toFixed(2))})
                </Text>
               
                  
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Section</Th>
              <Th>Information</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td><b>Summary</b></Td>
              <Td>{getAnalysis(analysisResult.probability_of_skin_cancer).summary}</Td>
            </Tr>
            <Tr>
              <Td><b>Advice</b></Td>
              <Td>{getAnalysis(analysisResult.probability_of_skin_cancer).advice}</Td>
            </Tr>
            <Tr>
              <Td><b>Next Steps</b></Td>
              <Td> {getAnalysis(analysisResult.probability_of_skin_cancer).next_steps}</Td>
            </Tr>
            <Tr>
              <Td><b>Resources</b></Td>
              <Td>
                <VStack align="start">
                {getAnalysis(analysisResult.probability_of_skin_cancer).resources.map((resource, index) => (
                      <div key={index}>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <b>{resource.title}({resource.url})</b>
                        </a>
                      </div>
                    ))}
                </VStack>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      
              </Box>
            )}
          </div>
        </div>
        <div className='intro2'>
          <div className='intro2_title'>Want to Analysis Yourself?</div>
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
          <Button
          colorScheme="teal"
          onClick={handleAnalysis}
          isLoading={isLoading}
          loadingText="Analyzing..."
        >
          Analyze
        </Button>

        
        </div>
        
      </div>
      
      <div><Footer /></div>
    </div>
  )
}

export default Homepage
