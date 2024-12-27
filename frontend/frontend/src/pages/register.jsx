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
            console.log(responseData)
            navigate('/login');

        } catch (err) {
            console.error("Hata oluştu", err.message);
        }

        setLoading(false);  
        setName("");
        setEmail("");
        setPassword("");
    };

    return (
        <>
            <div className="register">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="username"
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="email"
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="password"
                        />
                    </label>
                    <button type="submit" className="button" disabled={loading}>Kayıt Ol</button>
                    {loading && <p>Loading...</p>} {/* Display loading message */}
                </form>
            </div></>

    );
}

export default Register;
