import { PasswordHandler, TokenHandler } from "../lib/auth.js";
import User from "../models/User.js";

const ALLOWED_ROLES = ["admin", "member", "viewer"];
const ROLE_ALIASES = { user: "member", guest: "viewer" };

function normalizeRole(ruolo) {
    const role = ROLE_ALIASES[ruolo] || ruolo;
    return ALLOWED_ROLES.includes(role) ? role : "member";
}

/**
 * Login utente
 * @param {string} email - Email utente
 * @param {string} password - Password utente
 * @returns {Promise<Object>} - Token e dati utente
 */
async function login(email, password) {
    try {
        if (!email || !password) {
            return {
                success: false,
                status: 400,
                message: "Email e password sono obbligatorie",
            };
        }

        const user = await User.findByEmail(email);
        if (!user) {
            return {
                success: false,
                status: 401,
                message: "Credenziali non valide!",
            };
        }

        const isValidPassword = await PasswordHandler.comparePassword(
            password,
            user.password,
        );
        if (!isValidPassword) {
            return {
                success: false,
                status: 401,
                message: "Credenziali non valide!",
            };
        }

        const payload = {
            id: user.id,
            nome: user.nome,
            email: user.email,
            role: user.ruolo,
        };

        const token = TokenHandler.generateToken(payload);

        return {
            success: true,
            token,
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                role: user.ruolo,
            },
        };
    } catch (error) {
        return {
            success: false,
            status: 500,
            message: error.message,
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
        if (!userData.email || !userData.password || !userData.nome) {
            return {
                success: false,
                status: 400,
                message: "Nome, email e password sono obbligatori",
            };
        }

        const passwordValidation = PasswordHandler.validatePasswordStrength(
            userData.password,
        );

        if (!passwordValidation.isValid) {
            return {
                success: false,
                status: 400,
                errors: passwordValidation.errors,
            };
        }

        const existing = await User.findByEmail(userData.email);
        if (existing) {
            return {
                success: false,
                status: 409,
                message: "Email già registrata",
            };
        }

        const hashedPassword = await PasswordHandler.hashPassword(
            userData.password,
        );

        const newUser = await User.create({
            nome: userData.nome,
            email: userData.email,
            password: hashedPassword,
            ruolo: normalizeRole(userData.ruolo),
        });

        return {
            success: true,
            status: 201,
            message: "Utente registrato con successo",
            user: {
                id: newUser.id,
                nome: newUser.nome,
                email: newUser.email,
                role: newUser.ruolo,
            },
        };
    } catch (error) {
        return {
            success: false,
            status: 500,
            message: error.message,
        };
    }
}

const AuthService = {
    login,
    register,
};

export default AuthService;
