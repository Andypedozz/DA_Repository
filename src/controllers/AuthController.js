import AuthService from "../services/AuthService.js";

async function login(req, res) {
    try {
        const { email, password } = req.body || {};
        const result = await AuthService.login(email, password);
        const status = result.status || (result.success ? 200 : 500);
        return res.status(status).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

async function register(req, res) {
    try {
        const result = await AuthService.register(req.body || {});
        const status = result.status || (result.success ? 201 : 500);
        return res.status(status).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

async function logout(req, res) {
    return res.json({
        success: true,
        message: "Logout effettuato con successo",
    });
}

const AuthController = {
    login,
    register,
    logout,
};

export default AuthController;
