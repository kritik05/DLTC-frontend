// import React, { useEffect, useContext } from "react";
// import "./shop.scss";
// import Products from "../../Products/Products";
// import { fetchDataFromApi } from "../../../utils/api";
// import { Context } from "../../../utils/context";
// const Home = () => {
//     const { products, setProducts } =  useContext(Context);

//     useEffect(() => {
//         getProducts();
//     }, []);

//     const getProducts = () => {
//         fetchDataFromApi("/api/products?populate=*").then((res) => {
//             console.log(res);
//             setProducts(res);
//         });
//     };
//     return (
//         <div>
//             <div className="main-content">
//                 <div className="layout">
//                      <Products 
//                      headingText="Shop"
//                      products={products} 
//                      />
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default Home;
import React, { useEffect, useContext, useCallback } from "react";
import "./shop.scss";
import Products from "../../Products/Products";
import { fetchDataFromApi } from "../../../utils/api";
import { Context } from "../../../utils/context";

const Home = () => {
    const { products, setProducts } = useContext(Context);

    const getProducts = useCallback(() => {
        fetchDataFromApi("/api/products?populate=*").then((res) => {
            console.log(res);
            setProducts(res);
        });
    }, [setProducts]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    return (
        <div>
            <div className="main-content">
                <div className="layout">
                    <Products
                        headingText="Shop"
                        products={products}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
