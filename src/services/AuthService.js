import { PasswordHandler, TokenHandler } from "../lib/auth.js";
import User from "../models/User.js";

/**
 * Login utente
 * @param {string} email - Email utente
 * @param {string} password - Password utente
 * @returns {Promise<Object>} - Token e dati utente
 */
async function login(email, password) {
    try {
        const user = await User.findByEmail(email);
        if (!user) {
            throw new Error("Credenziali non valide!");
        }

        const isValidPassword = await PasswordHandler.comparePassword(password, user.password_hash);
        if (!isValidPassword) {
            throw new Error("Credenziali non valide!");
        }

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        const token = TokenHandler.generateToken(payload);
        return {
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role || 'user'
            }
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

/**
 * Registrazione utente
 * @param {Object} userData - Dati utente
 * @returns {Promise<Object>} - Risultato registrazione
 */
async function register(userData) {
    try {
        const passwordValidation = PasswordHandler.validatePasswordStrength(
            userData.password
        );

        if (!passwordValidation.isValid) {
            return {
                success: false,
                errors: passwordValidation.errors
            };
        }

        const hashedPassword = PasswordHandler.hashPassword(userData.password);

        const newUser = await User.create({
            ...userData,
            password_hash: hashedPassword
        })

        return {
            success: true,
            message: 'Utente registrato con successo',
            user: {
                id: newUser.id,
                email: newUser.email
            }
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

const AuthService = {
    login,
    register
}

export default AuthService;
