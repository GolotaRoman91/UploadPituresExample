import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageDisplay = () => {
    const [category, setCategory] = useState("Logo");
    const [imageIds, setImageIds] = useState([]);
    const [images, setImages] = useState([]);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const fetchImageIds = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3333/api/images/category/${category}`
            );
            setImageIds(response.data);
        } catch (error) {
            console.error("Error fetching image IDs:", error);
        }
    };

    const fetchImage = async (id) => {
        try {
            const response = await axios.get(
                `http://localhost:3333/api/images/${id}`,
                { responseType: "arraybuffer" }
            );
            const base64 = btoa(
                new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                )
            );
            setImages((prevImages) => [
                ...prevImages,
                `data:image/jpeg;base64, ${base64}`,
            ]);
        } catch (error) {
            console.error("Error fetching image:", error);
        }
    };

    useEffect(() => {
        if (imageIds.length > 0) {
            setImages([]);
            imageIds.forEach((id) => fetchImage(id));
        }
    }, [imageIds]);

    return (
        <div>
            <h1>Image Display and Upload</h1>
            <div>
                <input
                    type="text"
                    value={category}
                    onChange={handleCategoryChange}
                />
                <button onClick={fetchImageIds}>Fetch Images</button>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {images.map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl}
                            alt={index + 1}
                            style={{
                                width: "200px",
                                height: "200px",
                                margin: "5px",
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageDisplay;
