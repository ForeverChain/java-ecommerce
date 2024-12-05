import React from "react";
import SvgCreditCard from "../../components/common/SvgCreditCard";
import SvgCloth from "../../components/common/SvgCloth";
import SvgShipping from "../../components/common/SvgShipping";
import SvgReturn from "../../components/common/SvgReturn";
import HeroSection from "../../components/HeroSection/HeroSection";

//const categories = content?.categories;

const extraSections = [
    {
        icon: <SvgCreditCard />,
        label: "Secure payment",
    },
    {
        icon: <SvgCloth />,
        label: "Size & Fit",
    },
    {
        icon: <SvgShipping />,
        label: "Free shipping",
    },
    {
        icon: <SvgReturn />,
        label: "Free Shipping & Returns",
    },
];

const Home = () => {
    return (
        <>
            <HeroSection />
        </>
    );
};

export default Home;
