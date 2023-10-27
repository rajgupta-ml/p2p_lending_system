import { useState } from 'react'
import PropTypes from 'prop-types';
import loginEndpoint from '../apiEndpoint/loginEndpoint';
import { toast } from 'react-toastify';

async function handleLogin(data, e, setTab) {
    e.preventDefault();
    localStorage.setItem("email", data["email"])
    try {

        const response = await loginEndpoint(data)
        if (response.data.success) {
            setTab('pin-verify')
        }
    }
    catch (error) {
        toast.error(error.response.data.error)
        // console.log(error.response)
    }

}

function Login(props) {

    const { setTab } = props

    const [FocusEmail, setFocusEmail] = useState(false);
    const [FocusPassword, setFocusPassword] = useState(false);


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div>
            <form className='flex flex-col text-xl gap-7' onSubmit={(e) => handleLogin({ email, password }, e, setTab)}>
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

                    />
                    <label
                        className={`flex absolute top-0 left-0 transition-all  ${!FocusPassword && !password ? 'items-center text-base h-[50px] pl-[1.5rem]' : 'text-xs -top-2 bg-white '}`}
                        style={{ pointerEvents: "none" }}>Password</label>
                </div>

                <button type='submit' className="px-[142px] py-[24px] bg-[#292D32] rounded-lg text-white">Login</button>
            </form >
        </div>
    )
}


Login.propTypes = {
    setTab: PropTypes.func,
};


export default Login
