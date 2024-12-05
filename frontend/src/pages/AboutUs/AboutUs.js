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

const AboutUs = () => {
    return (
        <>
            <div className="bg-gray-100">
                {/* Hero Section */}

                {/* Mission Statement */}
                <div className="max-w-4xl mx-auto p-8 text-center">
                    <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
                    <p className="text-gray-600">At SneakerShop, we believe sneakers are more than just shoes—they’re a lifestyle. We are dedicated to bringing you the latest trends, premium quality, and unmatched service to help you stand out in style.</p>
                </div>

                {/* Extra Sections */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto p-8">
                    {extraSections.map((section, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                            <div className="flex justify-center mb-4 text-primary">{section.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{section.label}</h3>
                            <p className="text-gray-500">{section.description}</p>
                        </div>
                    ))}
                </div>

                {/* Contact Us Section */}
                <div className="bg-white py-12 mt-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
                        <p className="text-gray-600 mb-6">Our customer support team is here to help! Reach out to us anytime.</p>
                        <button className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-80">Contact Us</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;
