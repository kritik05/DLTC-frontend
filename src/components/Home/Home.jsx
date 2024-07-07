import React, { useEffect, useContext, useCallback } from "react";
import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";

const Home = () => {
    const { categories, setCategories } = useContext(Context);

    const getCategories = useCallback(() => {
        fetchDataFromApi("/api/categories?populate=*").then((res) => {
            setCategories(res);
        });
    }, [setCategories]);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    return (
        <div>
            <Banner />
            <div className="main-content">
                <div className="layout">
                    <Category
                        headingText="Categories"
                        categories={categories}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
