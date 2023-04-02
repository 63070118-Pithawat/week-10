import React, { useState } from "react";
import "./style.css";
import axios from "axios";

export default function UploadImage() {
	const [selectedFile, setSelectFile] = useState("");
	const [uploadedFile, setUploadedFile] = useState("");

	const imageComponent = selectedFile ? (
		<img src={selectedFile} alt="select-image" className="image" />
	) : null;

	const uploadedImageComponent = uploadedFile ? (
		<img src={uploadedFile} alt="upload-image" className="image" />
	) : null;

	const onChangeFile = async (e) => {
		let base64 = await toBase64(e.target.files[0]);
		setSelectFile(base64);
	};

	const toBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});

	const onSubmit = async (e) => {
		const imageFile = {
			image: selectedFile,
			name: "pithawat",
			surname: "nuckong",
			numbers: [6, 3, 0, 7, 0, 1, 1, 8],
		};
		const { data } = await axios.post(
			"http://54.254.201.77:8081/process-image",
			imageFile,
		);
		setUploadedFile(data.processed_image);
	};

	return (
		<div className="container">
			<div className="input-image">
				<div className="image-container">{imageComponent}</div>
				<input type="file" onChange={onChangeFile} />
			</div>
			<button onClick={onSubmit}>Upload</button>
			<div className="image-container size">{uploadedImageComponent}</div>
		</div>
	);
}
