import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const validatePassword = (password) => {
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const isLongEnough = password.length >= 8;
        return { hasLowercase, hasUppercase, hasNumber, isLongEnough };
    };

    const { hasLowercase, hasUppercase, hasNumber, isLongEnough } = validatePassword(
        newPassword
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (!hasLowercase || !hasUppercase || !hasNumber || !isLongEnough) {
            setError("Password does not meet the required criteria");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(
                `http://localhost:5001/api/auth/reset?token=${token}`,
                { password: newPassword }
            );
            setSuccess(response.data.message);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputContainer}>
                    <label htmlFor="newPassword" style={styles.label}>
                        New Password:
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputContainer}>
                    <label htmlFor="confirmPassword" style={styles.label}>
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.validationContainer}>
                    <p style={{ color: hasLowercase ? "green" : "red" }}>
                        At least one lowercase letter
                    </p>
                    <p style={{ color: hasUppercase ? "green" : "red" }}>
                        At least one uppercase letter
                    </p>
                    <p style={{ color: hasNumber ? "green" : "red" }}>
                        At least one number
                    </p>
                    <p style={{ color: isLongEnough ? "green" : "red" }}>
                        Minimum 8 characters
                    </p>
                </div>
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? "Updating..." : "Update Password"}
                </button>
                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
            </form>
        </div>
    );
};

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
        marginTop: "10px",
    },
    validationContainer: {
        marginBottom: "15px",
    },
};

export default ResetPassword;
