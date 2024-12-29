import { useState } from 'react';  // useState hook for managing state
import axios from 'axios';  // Axios for making HTTP requests
import { useNavigate } from 'react-router-dom';  // useNavigate hook for navigation

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
            setResponseData(response.data);
            console.log("Başarıyla kaydedildi", response.data);

            setName("");
            setEmail("");
            setPassword("");


        } catch (err) {
            console.error("Hata oluştu", err.message);
        } finally {
            setLoading(false);
            navigate('/login');

        }

    };

    return (
        <>
            <div className="register-container flex items-center justify-center h-screen bg-gray-900">
                <div className="register-box p-8 bg-black rounded-lg shadow-lg w-96">
                    <h2 className="text-amber-400 text-4xl mb-8 text-center">Register</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="input-group flex flex-col">
                            <label className="text-white">Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input-field p-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none"
                            />
                        </div>
                        <div className="input-group flex flex-col">
                            <label className="text-white">Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field p-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none"
                            />
                        </div>
                        <div className="input-group flex flex-col">
                            <label className="text-white">Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field p-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none"
                            />
                        </div>
                        <button type="submit" className="submit-btn bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600" disabled={loading}>
                            Kayıt Ol
                        </button>
                        {loading && <p className="text-white text-center mt-4">Loading...</p>} {/* Display loading message */}
                    </form>
                    <div className="mt-4 text-center text-white">
                        <p>Already have an account?</p>
                        <a href="#" onClick={() => navigate("/login")} className="text-blue-400">Click Here <span className='text-white' >to Login</span></a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
