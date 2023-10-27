import { useState } from "react";
import pinVerficationEndpoint from "../apiEndpoint/pinVerificationEndpoint";
import { toast } from "react-toastify";



async function handleSubmit(e, digit) {
    e.preventDefault();
    const pin = digit.join("")
    const email = localStorage.getItem("email");

    try {
        const response = await pinVerficationEndpoint({ email, pin });
        if (response.data.success) {
            localStorage.setItem("jwt", response.data.jwtToken)
            toast.success("Succefully logged In")
        }
    }
    catch (error) {
        // console.log(error.response.data)
        toast.error("Wrong Pin")
    }
}

function PinVerification() {


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
            <form className='flex flex-col gap-7' onSubmit={(e) => handleSubmit(e, digit)}>
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
                    Verify
                </button>
            </form>
        </div>
    )
}




export default PinVerification
