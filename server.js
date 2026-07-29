import app from "./app.js";

const PORT = process.env.PORT || 3000;

// Avvio backend
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});