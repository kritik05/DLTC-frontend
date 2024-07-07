import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import { useNavigate } from "react-router-dom";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaPinterest,
} from "react-icons/fa";
import "./SingleProduct.scss";

const SingleProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);

    if (!data) return;
    const product = data?.data?.[0]?.attributes;
    return (
        <div className="single-product-main-content">
            <div className="layout">
                <div className="single-product-page">
                    <div className="left">
                        <img
                            src={
                                product.img.data[0].attributes.url
                            }
                            alt="loading"
                        />
                    </div>
                    <div className="right">
                        <span className="name">{product.title}</span>
                        <span className="size">{product.Size}</span>
                        <span className="desc">{product.desc}</span>
                        <div className="cart-buttons">
                            <button className="add-to-cart-button" onClick={()=> navigate("/contact")}>
                                ENQUIRE NOW
                            </button>
                        </div>

                        <span className="divider" />
                        <div className="info-item">
                            <div className="text-bold">
                                <span className="category">Category</span>
                                <span className="text-bold-content">
                               {product?.categories?.data?.map((item)=>(
                                   <span>{item.attributes.title} | </span>
                               ))}
                            </span>
                            </div>
                              <span className="text-bold">
                                Share:
                                <span className="social-icons">
                                    <FaFacebookF size={16} />
                                    <FaTwitter size={16} />
                                    <FaInstagram size={16} />
                                    <FaLinkedinIn size={16} />
                                    <FaPinterest size={16} />
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <RelatedProducts
                    productId={id}
                    categoryId={product.categories.data[0].id}
                />
            </div>
        </div>
    );
};

export default SingleProduct;
