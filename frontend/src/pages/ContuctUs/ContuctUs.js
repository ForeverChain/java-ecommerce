import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/features/common";
import { loginAPI } from "../../api/authentication";
import { saveToken } from "../../utils/jwt-helper";

const ContactUs = () => {
    const [values, setValues] = useState({
        userName: "",
        email: "",
        message: "",
    });
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            setError("");
            dispatch(setLoading(true));
            // Mock API submission logic
            loginAPI(values)
                .then((res) => {
                    if (res?.token) {
                        saveToken(res?.token);
                        navigate("/thank-you");
                    } else {
                        setError("Something went wrong!");
                    }
                })
                .catch(() => {
                    setError("Submission failed! Please try again.");
                })
                .finally(() => {
                    dispatch(setLoading(false));
                });
        },
        [dispatch, navigate, values]
    );

    const handleOnChange = useCallback((e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 w-full lg:w-[70%] text-center">
                <p className="text-3xl font-bold pb-4 pt-4">Contact Us</p>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="pt-4">
                    <form onSubmit={onSubmit}>
                        <input type="text" name="userName" value={values?.userName} onChange={handleOnChange} placeholder="Your Name..." className="h-[48px] w-full border p-2 border-gray-400 rounded mb-4" required />
                        <input type="email" name="email" value={values?.email} onChange={handleOnChange} placeholder="Your Email..." className="h-[48px] w-full border p-2 border-gray-400 rounded mb-4" required />
                        <textarea name="message" value={values?.message} onChange={handleOnChange} placeholder="Your Message..." className="h-[120px] w-full border p-2 border-gray-400 rounded mb-4 resize-none" required />
                        <button type="submit" className="border w-full rounded-lg h-[48px] bg-black text-white mt-4 hover:opacity-80">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
