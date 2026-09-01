
import test from "node:test"
import assert from "node:assert"
import app from "../app.js"

const PORT = process.env.PORT;
const URL = "http://localhost:"+PORT

// Example test case for an Endpoint
// Test GET all projects
test("GET /projects", async () => {
    const server = app.listen(PORT);

    try {
        const response = await fetch(URL+"/projects");

        const body = await response.json();
        assert.strictEqual(response.status, 200);
        assert.deepStrictEqual(body, {
            
        })
    } finally {
        server.close();
    }
})

// Test GET project by id
test("GET /projects/id", async () => {
    const server = app.listen(PORT);
    const id = 1;

    try {
        const response = await fetch(URL+"/projects/"+id);

        const body = await response.json();
        assert.strictEqual(response.status, 200);
        assert.deepStrictEqual(body, {
            
        })
    } finally {
        server.close();
    }
})

test("GET /projects", async () => {
    const server = app.listen(PORT);

    try {
        const response = await fetch(URL+"/projects");

        const body = await response.json();
        assert.strictEqual(response.status, 200);
        assert.deepStrictEqual(body, {
            
        })
    } finally {
        server.close();
    }
})