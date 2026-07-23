
import knex from "knex"

export const db = knex({
    client: "@libsql/knex-libsql",
    connection: {
        connectionString: "libsql://test-andypedozz.aws-eu-west-1.turso.io",
        authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODQ3NjMwOTYsImlkIjoiMDE5ZjhjMmItNjgwMS03OGZlLWEwMDUtMGM4Yjk1MjgyNTVhIiwia2lkIjoiTmM4aGpUUTQ1U3VkajJaSGxfY0pRNWNSNXQwMVVFMC1ZMktLMmhSYmZNRSIsInJpZCI6ImNmMjhhZDliLWFkZmUtNDViZC04OTc2LThmZWVlZGFkYmEyMSJ9.M5Jh5V0DmtG01S7tVuVHwDXDyheMaBuSDYmfcYWXpeHxutduKZImmDOeMVdicOU_RpPzTJQjr5xNvCtKlyPZAA"
    }
});