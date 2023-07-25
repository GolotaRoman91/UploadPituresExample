import React, { useState } from "react";
import axios from "axios";

const UploadImage = () => {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("description", description);
        formData.append("category", category);

        try {
            const response = await axios.post(
                "http://localhost:3333/api/images",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            console.log("Image uploaded successfully!", response.data);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div>
            <h1>Upload Image</h1>
            <div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <input
                    type="text"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Description"
                />
                <input
                    type="text"
                    value={category}
                    onChange={handleCategoryChange}
                    placeholder="Category"
                />
                <button onClick={uploadImage}>Upload Image</button>
            </div>
        </div>
    );
};

export default UploadImage;
