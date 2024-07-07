import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { FaBars } from "react-icons/fa";
import "./Header.scss";
import Search from "./Search/Search";
import logo from "../Header/logo.png";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [searchModal, setSearchModal] = useState(false);
    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    const homebtn = () => {
        navigate("/");
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        setSideMenuOpen(false);
    };

    const handleAbout = () => {
        navigate("/");
        setTimeout(() => {
            window.scrollTo({
                top: document.body.offsetHeight,
                left: 0,
                behavior: "smooth",
            });
            setSideMenuOpen(false);
        }, 100);
    };

    const handleCategories = () => {
        navigate("/");
        setTimeout(() => {
            window.scrollTo({
                top: 600,
                left: 0,
                behavior: "smooth",
            });
            setSideMenuOpen(false);
        }, 100);
    };

    const handleNavigation = (path) => {
        navigate(path);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        setSideMenuOpen(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleSideMenu = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", // Scroll to top instantly
        });
        setTimeout(() => {
            setSideMenuOpen(!sideMenuOpen);
        }, 0); // Open side menu immediately after scrolling to top
    };

    return (
        <>
            <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
                <div className="header-content">
                    <div className="left" onClick={homebtn}>
                        <span className="logo">
                            <img src={logo} alt="logo" />
                        </span>
                        <span className="title">Dhanluxmi Trading Company</span>
                    </div>
                    <ul className="center">
                        <li onClick={homebtn}>Home</li>
                        <li onClick={handleAbout}>About</li>
                        <li onClick={handleCategories}>Categories</li>
                        <li onClick={() => handleNavigation("/shop")}>Shop</li>
                        <li onClick={() => handleNavigation("/contact")}>Contact Us</li>
                    </ul>
                    <div className="right">
                        <TbSearch onClick={() => setSearchModal(true)} />
                        <FaBars className="menu-icon" onClick={toggleSideMenu} />
                    </div>
                </div>
                {sideMenuOpen && (
                    <div className="side-menu">
                        <div className="menu-icon_" >
                        <FaBars onClick={toggleSideMenu} />
                        </div>
                        <ul>
                            <li onClick={homebtn}>Home</li>
                            <li onClick={handleAbout}>About</li>
                            <li onClick={handleCategories}>Categories</li>
                            <li onClick={() => handleNavigation("/shop")}>Shop</li>
                            <li onClick={() => handleNavigation("/contact")}>Contact Us</li>
                        </ul>
                    </div>
                )}
            </header>
            {searchModal && <Search setSearchModal={setSearchModal} />}
        </>
    );
};

export default Header;
