import { useState } from "react";
import pinGenerationEndpoint from "../apiEndpoint/pinGenerationEndpoint";
import PropTypes from 'prop-types';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
async function handleSubmit(e, digit, setPinGen) {
    e.preventDefault();
    const pin = digit.join("")
    const email = localStorage.getItem("email");

    try {
        const response = await pinGenerationEndpoint({ email, pin });
        if (response.data.success) {
            toast.success('You are registered');
            setPinGen('login')

        }
    }
    catch (error) {
        console.log(error.response.data)
    }
}

function PinGenerationComponent(props) {

    const { setPinGen } = props

    const [digit, setDigit] = useState([])

    const handleInput = (e, index) => {
        const value = e.target.value;
        e.target.value = value.replace(/\D/g, '');


        const updatedDigits = [...digit];
        updatedDigits[index] = value;
        setDigit(updatedDigits);

        if (value.length === 1 && index < 5) {
            // Move to the next input field
            const nextInput = e.target.nextSibling;
            if (nextInput) {
                nextInput.focus();
            }
        } else if (value === '' && index > 0) {
            // Move back to the previous input field
            const previousInput = e.target.previousSibling;
            if (previousInput) {
                previousInput.focus();
            }
        }
    };
    return (
        <div>
            <form className='flex flex-col gap-7' onSubmit={(e) => handleSubmit(e, digit, setPinGen)}>
                <div className="flex justify-evenly gap-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            minLength={1}
                            className="text-center border-2 w-16 h-16"
                            onInput={(e) => handleInput(e, index)}
                        />
                    ))}
                </div>

                <button type='submit' className="px-[142px] py-[24px] bg-[#292D32] rounded-lg text-white">
                    Generate
                </button>
                <ToastContainer position="top-right" />
            </form>
        </div>
    );
}

PinGenerationComponent.propTypes = {
    setPinGen: PropTypes.func,
};



export default PinGenerationComponent;
