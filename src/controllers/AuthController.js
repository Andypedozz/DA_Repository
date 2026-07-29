
async function login(req, res) {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
}

async function register(req, res) {
    const { email, password } = req.body;
    const result = await AuthService.register(email, password);
}

async function logout(req, res) {
    const result = await AuthService.logout();
}