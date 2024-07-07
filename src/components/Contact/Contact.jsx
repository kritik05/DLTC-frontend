import React, {useRef,useState} from "react";
import "./Contact.scss";
import { FaLocationArrow, FaMobileAlt, FaEnvelope} from "react-icons/fa";
import { BsPersonCircle} from "react-icons/bs";
import { SiSimilarweb} from "react-icons/si";
import emailjs from '@emailjs/browser';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import {auth} from "./../../firebase"

const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const templateKey=process.env.REACT_APP_EMAILJS_TEMPLATE_ID_I;
const serviceKey=process.env.REACT_APP_EMAILJS_SERVICE_ID;

const Contact=()=>{
  const form = useRef();
    const [Name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(serviceKey, templateKey, form.current, publicKey)
            .then((result) => {
                setName('');
                setPhone('');
                setEmail('');
                setMessage('');
                window.alert("Message sent successfully");
            }, (error) => {
                window.alert("Failed to send message. Please try again.");
            });
          };

          const handleSubscribe = async (e) => {
              e.preventDefault();
              try {
                  const currentUser = auth.currentUser;
          
                  if (currentUser && currentUser.emailVerified) {
                      sendEmail(new Event('submit'));
                  } else {
                    
                      const userCredential = await createUserWithEmailAndPassword(auth, email, 'defaultPassword123');
                      const user = userCredential.user;
                      await sendEmailVerification(user);
                      window.alert("A verification email has been sent. Please verify your email before sending the message.");
          
                      const checkEmailVerification = setInterval(async () => {
                          await currentUser.reload();
                          if (currentUser.emailVerified) {
                              clearInterval(checkEmailVerification);
                              sendEmail(new Event('submit'));
                          }
                      }, 2000);
                  }
              } catch (error) {
                  window.alert("Error subscribing. Please try again.");
              }
  };
  return (
  <div className="contact">
      <div className="contact-content">
      <div className="c-form">
      <form ref={form} onSubmit={handleSubscribe}>
           <input type="text" placeholder="Full Name" className="fn" name="name"value={Name}
              onChange={(e) => setName(e.target.value)}/>
            <input type="number" placeholder="Phone Number"className="fn" name="phone"value={phone}
              onChange={(e) => setPhone(e.target.value)}/>
            <input type="email" placeholder="Email Address"className="fn" name="email"value={email}
              onChange={(e) => setEmail(e.target.value)}/>
           <textarea rows="4" cols="40" placeholder="Message"className="fn" name="message"value={message}
              onChange={(e) => setMessage(e.target.value)}></textarea>
               <button className="submit-btn" value="send">SUBMIT</button>
                 </form>
      </div>
  <div className="info">
       <div className="content">
           <div className="c-item">
              <BsPersonCircle/>
              <div className="combine">
              <div className="title">Contact Person</div>
               <div className="text">Mr. Pardeep Kumar Aggarwal</div>
               </div>
           </div>
           <div className="c-item">
           <FaLocationArrow />
           <div className="combine">
              <div className="title">Address</div>
           <div className="text">Shop No. 27, Marble Market, Balsamand Road, Hisar, <br></br>Haryana - 125 001</div>
           </div>
           </div>
           <div className="c-item">
               <FaMobileAlt/>
               <div className="combine">
              <div className="title">Mobile No.</div>
               <div className="text">+91 92542 91091</div>
               </div>
           </div>
           <div className="c-item">
               <FaEnvelope/>
               <div className="combine">
              <div className="title">Email</div>
               <div className="text">aggarwalkritik@gmail.com</div>
               </div>
           </div>
           <div className="c-item">
                <SiSimilarweb/>
                <div className="combine">
              <div className="title">Website</div>
                <div className="text">dhanluxmi@trading.co.in</div>
                </div>
           </div>
       </div>
  </div>
  </div>
  </div>
);
};
export default Contact;