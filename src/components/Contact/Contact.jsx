import React, {useRef,useState} from "react";
import "./Contact.scss";
import { FaLocationArrow, FaMobileAlt, FaEnvelope} from "react-icons/fa";
import { BsPersonCircle} from "react-icons/bs";
import { SiSimilarweb} from "react-icons/si";
import emailjs from '@emailjs/browser';

const mail = process.env.REACT_APP_emailjs_token;
const Contact=()=>{
  const form = useRef();

  const [Name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('gmail', 'template_s8nua5b', form.current,`${mail}`)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    window.alert("Message sent successfully");
  };
  return (
  <div className="contact">
      <div className="contact-content">
      <div className="c-form">
      <form ref={form} onSubmit={sendEmail}>
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