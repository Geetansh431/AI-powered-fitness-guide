import React, { useState, useRef } from "react";

function OTPReset() {
    const [email, setEmail] = useState("");
    const [userExists, setUserExists] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const [password, setPassword] = useState("");
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const correctEmail = "info@pixellab.io";
    const correctCode = "456789";

    const handleCheckEmail = () => {
        if (email.toLowerCase() === correctEmail.toLowerCase()) {
            setUserExists(true);
            setEmailError("");
        } else {
            setUserExists(false);
            setEmailError("User with this email does not exist.");
        }
    };

    const handleChange = (value, index) => {
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerifyOtp = () => {
        const enteredCode = otp.join("");
        if (enteredCode.length === 6) {
            if (enteredCode === correctCode) {
                setIsCodeVerified(true);
            } else {
                setIsCodeVerified(false);
                alert("Incorrect OTP code");
            }
        } else {
            alert("Please enter a 6-digit OTP");
        }
    };

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const isLongEnough = password.length >= 8;

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleResetPassword = () => {
        alert("Password reset successfully!");
    };

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <h2 style={styles.heading}>Reset Password</h2>
                {!userExists && (
                    <div style={{ marginBottom: "1.5rem" }}>
                        <label htmlFor="email" style={styles.label}>
                            Enter your email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.emailInput}
                            placeholder="e.g. user@example.com"
                        />
                        <button style={styles.checkEmailButton} onClick={handleCheckEmail}>
                            Check Email
                        </button>
                        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
                    </div>
                )}
                {userExists && (
                    <>
                        <p style={styles.subtitle}>
                            <strong>OTP sent to:</strong> {email}
                        </p>
                        <div style={styles.otpContainer}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    style={styles.otpInput}
                                />
                            ))}
                        </div>
                        <button style={styles.verifyButton} onClick={handleVerifyOtp}>
                            Verify OTP
                        </button>
                        {otp.join("").length === 6 && (
                            <p style={{ color: isCodeVerified ? "green" : "red", margin: "0.5rem 0" }}>
                                {isCodeVerified ? "OTP verified" : "OTP not verified yet"}
                            </p>
                        )}
                        {isCodeVerified && (
                            <>
                                <div style={{ marginTop: "1.5rem" }}>
                                    <label htmlFor="password" style={styles.label}>
                                        New password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        style={styles.passwordInput}
                                        placeholder="Enter new password"
                                    />
                                </div>
                                <div style={styles.validationContainer}>
                                    <ValidationCheck isValid={hasLowercase} text="At least one lowercase letter" />
                                    <ValidationCheck isValid={hasUppercase} text="At least one uppercase letter" />
                                    <ValidationCheck isValid={hasNumber} text="At least one number" />
                                    <ValidationCheck isValid={isLongEnough} text="Minimum 8 characters" />
                                </div>
                                <div style={styles.buttonContainer}>
                                    <button style={styles.cancelButton} onClick={() => alert("Cancelled")}>
                                        Cancel
                                    </button>
                                    <button
                                        style={styles.resetButton}
                                        disabled={!hasLowercase || !hasUppercase || !hasNumber || !isLongEnough}
                                        onClick={handleResetPassword}
                                    >
                                        Reset password
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

function ValidationCheck({ isValid, text }) {
    return (
        <div style={styles.validationItem}>
            <span style={{ color: isValid ? "green" : "red", marginRight: 8 }}>
                {isValid ? "✔" : "✘"}
            </span>
            <span style={{ color: isValid ? "green" : "red" }}>{text}</span>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f7f7f7",
    },
    box: {
        background: "#fff",
        padding: "2rem",
        borderRadius: 8,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        maxWidth: 400,
        width: "100%",
        textAlign: "center",
    },
    heading: {
        marginBottom: "1rem",
    },
    subtitle: {
        marginBottom: "1.5rem",
        color: "#555",
        fontSize: "0.9rem",
    },
    label: {
        display: "block",
        textAlign: "left",
        marginBottom: 8,
        fontWeight: "bold",
    },
    emailInput: {
        width: "100%",
        padding: "0.5rem",
        border: "1px solid #ccc",
        borderRadius: 4,
        fontSize: "1rem",
        marginBottom: "0.5rem",
    },
    checkEmailButton: {
        background: "#2F80ED",
        color: "#fff",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: 4,
        cursor: "pointer",
        marginTop: "0.5rem",
    },
    otpContainer: {
        display: "flex",
        justifyContent: "space-between",
        margin: "0.5rem 0",
    },
    otpInput: {
        width: 40,
        height: 40,
        fontSize: 18,
        textAlign: "center",
        border: "1px solid #ccc",
        borderRadius: 4,
        margin: "0 2px",
    },
    verifyButton: {
        background: "#2F80ED",
        color: "#fff",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: 4,
        cursor: "pointer",
        marginTop: "0.5rem",
    },
    passwordInput: {
        width: "100%",
        padding: "0.5rem",
        border: "1px solid #ccc",
        borderRadius: 4,
        marginBottom: "0.5rem",
        fontSize: "1rem",
    },
    validationContainer: {
        textAlign: "left",
        marginBottom: "1rem",
    },
    validationItem: {
        display: "flex",
        alignItems: "center",
        marginBottom: 4,
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "1rem",
    },
    cancelButton: {
        background: "#ccc",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: 4,
        cursor: "pointer",
    },
    resetButton: {
        background: "#2F80ED",
        color: "#fff",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: 4,
        cursor: "pointer",
    },
};

export default OTPReset;
