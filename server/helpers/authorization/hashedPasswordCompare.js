const bcrypt = require('bcrypt');

const comparePassword = async (password, userPasswordHashed) => {
    try {
        const match = await bcrypt.compare(password, userPasswordHashed);
        if (match) {
            return true; // Şifre doğru
        } else {
            return false; // Şifre yanlış
        }
    } catch (error) {
        console.error("Şifre karşılaştırma hatası:", error);
        throw new Error("Şifre karşılaştırma hatası");
    }
};

module.exports = comparePassword;
