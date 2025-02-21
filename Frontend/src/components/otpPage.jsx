import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await axios.post("http://localhost:5001/api/auth/forgot", { email });
            setMessage(response.data.message);
            console.log("Received token:", response.data.token);
        } 
        catch(err){
            setError(err.response?.data?.message || "An error occurred");
        }
        setLoading(false);
    };
    return (
        <div style={styles.container}>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputContainer}>
                    <label htmlFor="email" style={styles.label}>
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
                {message && <p style={{ color: "green" }}>{message}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: "300px",
    },
    inputContainer: {
        marginBottom: "15px",
    },
    label: {
        marginBottom: "5px",
        fontWeight: "bold",
    },
    input: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#2F80ED",
        color: "#fff",
        cursor: "pointer",
    },
};

export default ForgotPassword;
