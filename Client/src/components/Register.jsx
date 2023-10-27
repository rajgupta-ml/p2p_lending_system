import { useState } from "react";
import registrationEndpoint from "../apiEndpoint/RegistrationEndpoint";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


async function handleRegistration(data, e, setRegisterSuccess) {
    e.preventDefault();
    let response;

    try {
        response = await registrationEndpoint(data)
        localStorage.setItem("email", data['email']);
        if (response.data.success) {
            setRegisterSuccess('pin-gen');
        } else {

            localStorage.clear()
            toast.error(response.data.error)
        }

    } catch (error) {
        console.log(error.response.data)
        localStorage.clear()
        toast.error(response.data.error)
    }


}

function Register(props) {


    const { setRegisterSuccess } = props

    const [FocusfullName, setFocusFullName] = useState(false);
    const [FocusEmail, setFocusEmail] = useState(false);
    const [FocusPassword, setFocusPassword] = useState(false);


    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            <form className='flex flex-col text-xl gap-7' onSubmit={(e) => handleRegistration({ fullName, email, password }, e, setRegisterSuccess)}>
                <div className="relative ">
                    <input
                        type="text"
                        className='border-2 border-[#C7C1C1] rounded-lg h-[55px] w-[100%] pl-[1.5rem] focus:outline-none focus:border-[#292D32] focus:ring-[#292D32] transition-all'
                        onFocus={() => setFocusFullName(true)}
                        onBlur={() => setFocusFullName(false)}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    <label
                        className={`flex absolute top-0 left-0 transition-all  ${!FocusfullName && !fullName ? 'items-center text-base h-[50px] pl-[1.5rem]' : 'text-xs -top-2 bg-white '}`}
                        style={{ pointerEvents: "none" }}>Full Name</label>
                </div>
                <div className="relative ">
                    <input
                        type="text"
                        className='border-2 border-[#C7C1C1] rounded-lg h-[55px] w-[100%] pl-[1.5rem] focus:outline-none focus:border-[#292D32] focus:ring-[#292D32] transition-all'
                        onFocus={() => setFocusEmail(true)}
                        onBlur={() => setFocusEmail(false)}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label
                        className={`flex absolute top-0 left-0 transition-all  ${!FocusEmail && !email ? 'items-center text-base h-[50px] pl-[1.5rem]' : 'text-xs -top-2 bg-white '}`}
                        style={{ pointerEvents: "none" }}>Email</label>
                </div>
                <div className="relative ">
                    <input
                        type="text"
                        className='border-2 border-[#C7C1C1] rounded-lg h-[55px] w-[100%] pl-[1.5rem] focus:outline-none focus:border-[#292D32] focus:ring-[#292D32] transition-all'
                        onFocus={() => setFocusPassword(true)}
                        onBlur={() => setFocusPassword(false)}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                    />
                    <label
                        className={`flex absolute top-0 left-0 transition-all  ${!FocusPassword && !password ? 'items-center text-base h-[50px] pl-[1.5rem]' : 'text-xs -top-2 bg-white '}`}
                        style={{ pointerEvents: "none" }}>Password</label>
                </div>

                <button type='submit' className="px-[142px] py-[24px] bg-[#292D32] rounded-lg text-white">Register</button>
            </form >
            {/* <ToastContainer /> */}
        </div >
    )
}

Register.propTypes = {
    setRegisterSuccess: PropTypes.func,
};
export default Register
