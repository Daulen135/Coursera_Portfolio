import React, {useEffect} from "react"; 
import { useFormik } from "formik"; 
import { 
 Box, 
 Button, 
 FormControl, 
 FormErrorMessage, 
 FormLabel, 
 Heading, 
 Input, 
 Select, 
 Textarea, 
 VStack, 
} from "@chakra-ui/react"; 
import * as Yup from 'yup'; 
import FullScreenSection from "./FullScreenSection"; 
import useSubmit from "../hooks/useSubmit"; 
import {useAlertContext} from "../context/alertContext"; 
 
/** 
* Covers a complete form implementation using formik and yup for validation 
*/ 
const ContactMeSection = () => { 
 const {isLoading, response, submit} = useSubmit(); 
 const { onOpen } = useAlertContext(); 
 
 const formik = useFormik({ 
   initialValues: { 
     firstName: "", 
     email: "", 
     type: "hireMe", 
     comment: "", 
   }, 
   onSubmit: (values) => { 
     submit('https://john.com/contactme', values); 
   }, 
   validationSchema: Yup.object({ 
     firstName: Yup.string().required("Required"), 
     email: Yup.string().email("Invalid email address").required("Required"), 
     comment: Yup.string() 
       .min(25, "Must be at least 25 characters") 
       .required("Required"), 
   }), 
 }); 
 
 useEffect(() => { 
   if (response) { 
     onOpen(response.type, response.message); 
     if (response.type === 'success') { 
       formik.resetForm(); 
     } 
   } 
 }, [response]); 
 
 return ( 
   <FullScreenSection 
     isDarkBackground 
     backgroundColor="#512DA8" 
     py={16} 
     spacing={8} 
   > 
     <VStack w="1024px" p={32} alignItems="flex-start"> 
       <Heading as="h1" id="contactme-section"> 
         Contact me 
       </Heading> 
       <Box p={6} rounded="md" w="100%"> 
         <form onSubmit={formik.handleSubmit}> 
           <VStack spacing={4}> 
             <FormControl isInvalid={!!formik.errors.firstName && formik.touched.firstName}> 
               <FormLabel htmlFor="firstName">Name</FormLabel> 
               <Input 
                 id="firstName" 
                 name="firstName" 
                 {...formik.getFieldProps("firstName")} 
               /> 
               <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage> 
             </FormControl> 
             <FormControl isInvalid={!!formik.errors.email && formik.touched.email}> 
               <FormLabel htmlFor="email">Email Address</FormLabel> 
               <Input 
                 id="email" 
                 name="email" 
                 type="email" 
                 {...formik.getFieldProps("email")} 
               /> 
               <FormErrorMessage>{formik.errors.email}</FormErrorMessage> 
             </FormControl> 
             <FormControl> 
               <FormLabel htmlFor="type">Type of enquiry</FormLabel> 
               <Select id="type" name="type" {...formik.getFieldProps("type")}> 
                 <option value="hireMe">Freelance project proposal</option> 
                 <option value="openSource"> 
                   Open source consultancy session 
                 </option> 
                 <option value="other">Other</option> 
               </Select> 
             </FormControl> 
             <FormControl isInvalid={!!formik.errors.comment && formik.touched.comment}> 
               <FormLabel htmlFor="comment">Your message</FormLabel> 
               <Textarea 
                 id="comment" 
                 name="comment" 
                 height={250} 
                 {...formik.getFieldProps("comment")} 
               /> 
               <FormErrorMessage>{formik.errors.comment}</FormErrorMessage> 
             </FormControl> 
             <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading}> 
               Submit 
             </Button> 
           </VStack> 
         </form> 
       </Box> 
     </VStack> 
   </FullScreenSection> 
 ); 
}; 
 
export default ContactMeSection;



//rev2

// import React, {useEffect, useState} from "react";
// import { useFormik } from "formik";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormErrorMessage,
//   FormLabel,
//   Heading,
//   Input,
//   Select,
//   Textarea,
//   VStack,
// } from "@chakra-ui/react";
// import * as Yup from 'yup';
// import FullScreenSection from "./FullScreenSection";
// import useSubmit from "../hooks/useSubmit";
// import {useAlertContext} from "../context/alertContext";

// const ContactMeSection = () => {
//   const {isLoading, response, submit} = useSubmit();
//   const { isOpen, onOpen } = useAlertContext();
//   const [buttonText, setButtonText] = useState("Submit");
  
//   useEffect(() => {
//     setButtonText(isLoading ? "Loading...": "Submit");
//   },[isLoading]);

//   useEffect(() => {
//     if (response && response.type) {
//       onOpen(response.type, response.message);
//     }
//   }, [response]);

//   useEffect(() => {
//     if(!isOpen && response.type === "success"){
//         formik.resetForm();
//       }
//   },[isOpen]);

//   const formik = useFormik({
//     initialValues: {
//       firstName: '',
//       email: '',
//       type: '',
//       comment: ''
//     },
//     onSubmit: (values) => {
//       submit("url", values);
//     },
//     validationSchema: Yup.object({
//       firstName: Yup.string()
//         .min(2, 'Too Short!')
//         .max(50, 'Too Long!')
//         .required('Required'),
//       email: Yup.string().email('Invalid email').required('Required'),
//       comment: Yup.string()
//         .min(2, 'Too Short!')
//         .max(2000, 'Too Long!')
//         .required('Required'),
//     }),
//   });

//   return (
//     <FullScreenSection
//       isDarkBackground
//       backgroundColor="#512DA8"
//       py={16}
//       spacing={8}
//     >
//       <VStack w="1024px" p={32} alignItems="flex-start">
//         <Heading as="h1" id="contactme-section">
//           Contact me
//         </Heading>
//         <Box p={6} rounded="md" w="100%">
//           <form onSubmit={(e) => {e.preventDefault(); formik.handleSubmit(e)}}>
//             <VStack spacing={4}>
//               <FormControl isInvalid={!!formik.errors.firstName}>
//                 <FormLabel htmlFor="firstName">Name</FormLabel>
//                 <Input
//                   id="firstName"
//                   name="firstName"
//                   {...formik.getFieldProps('firstName')}
//                 />
//                 {formik.touched.firstName && formik.errors.firstName ? (
//                     <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
//                   ) : null
//                 }
//               </FormControl>
//               <FormControl isInvalid={!!formik.errors.email}>
//                 <FormLabel htmlFor="email">Email Address</FormLabel>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   {...formik.getFieldProps('email')}
//                 />
//                 {formik.touched.email && formik.errors.email ? (
//                     <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
//                   ) : null
//                 }
//               </FormControl>
//               <FormControl>
//                 <FormLabel htmlFor="type">Type of enquiry</FormLabel>
//                 <Select id="type" name="type">
//                   <option style={{ backgroundColor: "#001F3F" }} value="hireMe">Freelance project proposal</option>
//                   <option style={{ backgroundColor: "#001F3F" }} value="openSource">
//                     Open source consultancy session
//                   </option>
//                   <option style={{ backgroundColor: "#001F3F" }} value="other">Other</option>
//                 </Select>
//               </FormControl>
//               <FormControl isInvalid={formik.errors.comment}>
//                 <FormLabel htmlFor="comment">Your message</FormLabel>
//                 <Textarea
//                   id="comment"
//                   name="comment"
//                   height={250}
//                   {...formik.getFieldProps('comment')}
//                 />
//                 {formik.touched.comment && formik.errors.comment ? (
//                     <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
//                   ) : null
//                 }
//               </FormControl>
//               <Button type="submit" colorScheme="purple" width="full">
//                 {buttonText}
//               </Button>
//             </VStack>
//           </form>
//         </Box>
//       </VStack>
//     </FullScreenSection>
//   );
// };

// export default ContactMeSection;


//first rev
//  import React from 'react';
//  import { useFormik } from 'formik';
//  import * as Yup from 'yup';
 
//  const ContactMeSection = () => {
//    const formik = useFormik({
//      initialValues: {
//        firstName: '',
//        lastName: '',
//        email: '',
//      },
//      validationSchema: Yup.object({
//        firstName: Yup.string()
//          .max(15, 'Must be 15 characters or less')
//          .required('Required'),
//        lastName: Yup.string()
//          .max(20, 'Must be 20 characters or less')
//          .required('Required'),
//        email: Yup.string().email('Invalid email address').required('Required'),
//      }),
//      onSubmit: values => {
//        alert(JSON.stringify(values, null, 2));
//      },
//    });
//    return (
//      <form onSubmit={formik.handleSubmit}>
//        <label htmlFor="firstName">First Name</label>
//        <input
//          id="firstName"
//          name="firstName"
//          type="text"
//          onChange={formik.handleChange}
//          onBlur={formik.handleBlur}
//          value={formik.values.firstName}
//        />
//        {formik.touched.firstName && formik.errors.firstName ? (
//          <div>{formik.errors.firstName}</div>
//        ) : null}
 
//        <label htmlFor="lastName">Last Name</label>
//        <input
//          id="lastName"
//          name="lastName"
//          type="text"
//          onChange={formik.handleChange}
//          onBlur={formik.handleBlur}
//          value={formik.values.lastName}
//        />
//        {formik.touched.lastName && formik.errors.lastName ? (
//          <div>{formik.errors.lastName}</div>
//        ) : null}
 
//        <label htmlFor="email">Email Address</label>
//        <input
//          id="email"
//          name="email"
//          type="email"
//          onChange={formik.handleChange}
//          onBlur={formik.handleBlur}
//          value={formik.values.email}
//        />
//        {formik.touched.email && formik.errors.email ? (
//          <div>{formik.errors.email}</div>
//        ) : null}
 
//        <button type="submit">Submit</button>
//      </form>
//    );
//  };

//  export default ContactMeSection;