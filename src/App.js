import React, { useState } from 'react';
import './App.css';
import Dropzone from 'react-dropzone';
import AWSFileUpload from './components/AWSFileUpload';

export default function App() {

  const [fileNames, setFileNames] = useState([]);

  const handleDrop = acceptedFiles => {
    if (acceptedFiles[0]) {
      console.log(acceptedFiles[0]);
      AWSFileUpload(acceptedFiles[0]).then(url => {
        setFileNames([...fileNames, acceptedFiles.map(file => url)]);
      });
    }
  }


  return (
    <div className="App">
      <Dropzone
        onDrop={handleDrop}
        accept="image/*"
        minSize={1024}
        maxSize={3072000}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag and drop images, or click to select files</p>
          </div>
        )}
      </Dropzone>

      { <div>
        <section id="images">
          {fileNames.map((element, i) => (
            <a href={element} target="_blank" key={i}>
              <img src={element} height="160px" />
            </a>
          ))}
        </section>
      </div> }
    </div>
  );
}