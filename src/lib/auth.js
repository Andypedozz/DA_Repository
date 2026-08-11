import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// Configurazione
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "30m";
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

/**
 * Funzioni per la gestione delle password
 */
class PasswordHandler {
    /**
     * Hasha una password usando bcrypt
     * @param {string} password - Password in chiaro
     * @returns {Promise<string>} - Password hashata
     */
    static async hashPassword(password) {
        try {
            const salt = await bcrypt.genSalt(SALT_ROUNDS);
            return await bcrypt.hash(password, salt);
        } catch (error) {
            throw new Error(
                `Errore nell'hashing della password: ${error.message}`,
            );
        }
    }

    /**
     * Confronta una password in chiaro con un hash
     * @param {string} plainPassword - Password in chiaro
     * @param {string} hashedPassword - Password hashata
     * @returns {Promise<boolean>} - True se corrispondono
     */
    static async comparePassword(plainPassword, hashedPassword) {
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (error) {
            throw new Error(`Errore nel confronto password: ${error.message}`);
        }
    }

    /**
     * Verifica se una password è abbastanza forte
     * @param {string} password - Password da validare
     * @returns {Object} - Risultato validazione
     */
    static validatePasswordStrength(password) {
        const errors = [];

        if (password.length < 8) {
            errors.push("La password deve essere almeno di 8 caratteri");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push(
                "La password deve contenere almeno una lettera maiuscola",
            );
        }
        if (!/[a-z]/.test(password)) {
            errors.push(
                "La password deve contenere almeno una lettera minuscola",
            );
        }
        if (!/[0-9]/.test(password)) {
            errors.push("La password deve contenere almeno un numero");
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password)) {
            errors.push(
                "La password deve contenere almeno un carattere speciale",
            );
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    }
}

/**
 * Funzioni per la gestione dei token JWT
 */
class TokenHandler {
    /**
     * Genera un token JWT
     * @param {Object} payload - Dati da includere nel token
     * @param {Object} options - Opzioni aggiuntive
     * @returns {string} - Token JWT
     */
    static generateToken(payload, options = {}) {
        try {
            const token = jwt.sign(payload, JWT_SECRET, {
                expiresIn: options.expiresIn || JWT_EXPIRES_IN,
                ...options,
            });
            return token;
        } catch (error) {
            throw new Error(
                `Errore nella generazione del token: ${error.message}`,
            );
        }
    }

    /**
     * Verifica e decodifica un token JWT
     * @param {string} token - Token da verificare
     * @returns {Object} - Payload decodificato
     */
    static verifyToken(token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            return decoded;
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                throw new Error("Token scaduto");
            } else if (error.name === "JsonWebTokenError") {
                throw new Error("Token non valido");
            } else {
                throw new Error(
                    `Errore nella verifica del token: ${error.message}`,
                );
            }
        }
    }

    /**
     * Decodifica un token senza verificarlo
     * @param {string} token - Token da decodificare
     * @returns {Object} - Payload decodificato
     */
    static decodeToken(token) {
        try {
            return jwt.decode(token);
        } catch (error) {
            throw new Error(
                `Errore nella decodifica del token: ${error.message}`,
            );
        }
    }

    /**
     * Estrae il token dall'header Authorization
     * @param {string} authHeader - Header Authorization
     * @returns {string|null} - Token estratto o null
     */
    static extractTokenFromHeader(authHeader) {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        return authHeader.substring(7);
    }

    /**
     * Rinnova un token (se non è scaduto)
     * @param {string} token - Token da rinnovare
     * @returns {string} - Nuovo token
     */
    static refreshToken(token) {
        try {
            // Verifica che il token sia valido (non scaduto)
            const decoded = this.verifyToken(token);

            // Rimuovi le informazioni di exp e iat per generare un nuovo token
            const { exp, iat, ...payload } = decoded;

            // Genera un nuovo token
            return this.generateToken(payload);
        } catch (error) {
            throw new Error(`Impossibile rinnovare il token: ${error.message}`);
        }
    }
}

/**
 * Middleware per Express.js
 */
class AuthMiddleware {
    /**
     * Middleware per proteggere le route
     */
    static authenticate(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const token = TokenHandler.extractTokenFromHeader(authHeader);

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Token non fornito o formato non valido",
                });
            }

            const decoded = TokenHandler.verifyToken(token);
            req.user = decoded; // Aggiungi i dati dell'utente alla request
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message,
            });
        }
    }

    /**
     * Middleware per verificare i ruoli
     * @param {Array} allowedRoles - Ruoli permessi
     */
    static authorize(allowedRoles = []) {
        return (req, res, next) => {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "Utente non autenticato",
                });
            }

            if (
                allowedRoles.length > 0 &&
                !allowedRoles.includes(req.user.role)
            ) {
                return res.status(403).json({
                    success: false,
                    message: "Permessi insufficienti",
                });
            }

            next();
        };
    }
}

// Esporta le classi e i moduli
export { PasswordHandler, TokenHandler, AuthMiddleware };
