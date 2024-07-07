import { BrowserRouter, Routes, Route,useLocation } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Shop from"./components/Header/shop/shop";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import AppContext from "./utils/context";
import Contact from "./components/Contact/Contact";

function App() {
  return (
    <BrowserRouter>
      <AppContextWrapper />
    </BrowserRouter>
  );
}

function AppContextWrapper() {
  const location = useLocation();
  const isContactPath = location.pathname === '/contact';
  const path = location.pathname ==='/';
  return (
    <AppContext>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {path ? <Newsletter/>: null}
      {isContactPath ? null : <Footer />}
    </AppContext>
  );
}

export default App;
