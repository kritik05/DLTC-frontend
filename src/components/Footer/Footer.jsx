import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase';
import "./Footer.scss";

// const mail = process.env.REACT_APP_emailjs_token;
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const templateKey=process.env.REACT_APP_EMAILJS_TEMPLATE_ID_I;
const serviceKey=process.env.REACT_APP_EMAILJS_SERVICE_ID;
const Footer = () => {
    const form = useRef();
    const [Name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(serviceKey, templateKey, form.current, publicKey)
            .then((result) => {
                console.log(result.text);
                setName('');
                setPhone('');
                setEmail('');
                setMessage('');
                window.alert("Message sent successfully");
            }, (error) => {
                console.log(error.text);
                window.alert("Failed to send message. Please try again.");
            });
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, 'defaultPassword123');
            const user = userCredential.user;
            await sendEmailVerification(user);
            window.alert("A verification email has been sent. Please verify your email before sending the message.");

            // Set an interval to check email verification status
            const checkEmailVerification = setInterval(async () => {
                const currentUser = auth.currentUser;
                if (currentUser) {
                    await currentUser.reload();
                    if (currentUser.emailVerified) {
                        clearInterval(checkEmailVerification);
                        sendEmail(new Event('submit')); // Trigger the sendEmail function
                    }
                }
            }, 2000); // Check every 2 seconds

        } catch (error) {
            console.error("Error subscribing:", error.message);
            window.alert("Error subscribing. Please try again.");
        }
    };

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="footer">
            <div className="footer-content">
                <div className="col">
                    <div className="title">About</div>
                    <div className="text">
                        Started in 2001 Dhanluxmi Trading Company started its operation at Balasmand Road,Hisar offering fancy products related to gates, grills, shutters, house railings.
                    </div>
                </div>
                <div className="col">
                    <div className="title">Contact</div>
                    <div className="c-item map">
                        <FaLocationArrow />
                        <div onClick={() => openInNewTab("https://goo.gl/maps/wHb7qW1dJKvHbcdLA")} className="text">
                            Shop No. 27, Marble Market, Balasmand Road, Hisar, Haryana - 125 001
                        </div>
                    </div>
                    <div className="c-item">
                        <FaMobileAlt />
                        <a className="text" style={{textDecoration: "none"}} href="tel:+919254291091">Phone: +91 9254291091</a>
                        {/* <a class="header__phone-num" href="tel:+19253196091" data-wpel-link="internal" className="text">(925) 319-6091</a> */}
                    </div>
                    <div className="c-item">
                        <FaEnvelope />
                        <a href="mailto:aggarwalkritik@gmail.com" className="anchor">aggarwalkritik@gmail.com</a>
                    </div>
                </div>
                <div className="col">
                    <div className="title">Enquire Now</div>
                    <div className="Enquire">
                        <form ref={form} onSubmit={handleSubscribe}>
                            <input type="text" placeholder="Full Name" className="fn" name="name" value={Name} onChange={(e) => setName(e.target.value)} />
                            <input type="number" placeholder="Phone Number" className="fn" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <input type="email" placeholder="Email Address" className="fn" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <textarea rows="4" cols="40" placeholder="Message" className="fn" name="message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                            <button className="submit-btn" type="submit">SUBMIT</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
