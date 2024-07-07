import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { auth } from '../../../firebase';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import "./Newsletter.scss";

const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const templateKey=process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const serviceKey=process.env.REACT_APP_EMAILJS_SERVICE_ID;

const Newsletter = () => {
    const form = useRef();
    const [email, setEmail] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(serviceKey, templateKey, form.current, publicKey)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        window.alert("Message sent successfully");
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, 'defaultPassword123');
            const user = userCredential.user;
            await sendEmailVerification(user);
            window.alert("A verification email has been sent. Please verify your email before subscribing.");


            const checkEmailVerification = setInterval(async () => {
                const currentUser = auth.currentUser;
                if (currentUser) {
                    await currentUser.reload();
                    if (currentUser.emailVerified) {
                        clearInterval(checkEmailVerification);
                        sendEmail(new Event('submit')); 
                    }
                }
            }, 2000); 

        } catch (error) {
            console.error("Error subscribing:", error.message);
            window.alert("Error subscribing. Please try again.");
        }
    };

    return (
        <div className="newsletter-section">
            <div className="newsletter-content">
                <span className="small-text">Newsletter</span>
                <span className="big-text">
                    Sign up for latest updates and offers
                </span>
                <div className="form">
                    <form className="form-content" ref={form} onSubmit={handleSubscribe}>
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
                <span className="text">
                    Will be used in accordance with our Privacy Policy
                </span>
                <span className="social-icons">
                    <div className="icon">
                        <FaLinkedinIn size={14} />
                    </div>
                    <div className="icon">
                        <FaFacebookF size={14} />
                    </div>
                    <div className="icon">
                        <FaTwitter size={14} />
                    </div>
                    <div className="icon">
                        <FaInstagram size={14} />
                    </div>
                </span>
                <span className="coming">Coming Soon !</span>
            </div>
        </div>
    );
};

export default Newsletter;
