import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ImageDisplay from "./ImageDisplay";
import UploadImage from "./UploadImage";

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Image Display</Link>
                        </li>
                        <li>
                            <Link to="/upload">Upload Image</Link>
                        </li>
                    </ul>
                </nav>

                <hr />

                <Routes>
                    <Route path="/" element={<ImageDisplay />} />
                    <Route path="/upload" element={<UploadImage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
