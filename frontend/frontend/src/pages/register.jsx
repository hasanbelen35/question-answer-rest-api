import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Yönlendirme için

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [responseData, setResponseData] = useState(null);
    const navigate = useNavigate(); // useNavigate kullanıldı

    const handleSubmit = async (e) => {
        e.preventDefault();  // Formun varsayılan gönderilmesini engeller

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
            setResponseData(response.data);  // Başarılı response verisini state'e kaydediyoruz
            console.log("Başarıyla kaydedildi", response.data);

            // Kayıt başarılıysa kullanıcıyı login sayfasına yönlendir
            navigate('/login');  // Yönlendirme yapıldı
        } catch (err) {
            console.error("Hata oluştu", err.message);  // Hata durumunda hata mesajını kaydediyoruz
        }

        setName("");  // Formu sıfırlıyoruz
        setEmail("");
        setPassword("");
    };

    return (
        <div className="register">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>  {/* Submit işlemini form üzerinden gerçekleştiriyoruz */}
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
                <button type="submit" className="button">Kayıt Ol</button>  {/* Butonun type'ı submit olarak belirlendi */}
            </form>
        </div>
    );
}

export default Register;
