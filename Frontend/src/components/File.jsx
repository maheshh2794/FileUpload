
import React, { useState } from "react";

function File() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://localhost:4000/upload", {
            method: "POST",
            body: formData
        });

        const result = await response.text();
        setMessage(result);
    };

    return (
        <div>
            <h2>Upload File</h2>

            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button onClick={handleUpload}>
                Send
            </button>

            <p>{message}</p>
        </div>
    );
}

export default File;
