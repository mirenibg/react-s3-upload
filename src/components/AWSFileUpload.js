import React from "react";
import axios from 'axios';
import { GeneratePutUrl, GenerateGetUrl } from "./AWSPresignedUrlGenerator";

/**
 * Request to upload file
 * 
 * @param {string} signedURL 
 * @param {string} fileInput 
 */
function upload(signedURL, fileInput) {
  const options = {
    headers: {
      'Content-Type': fileInput.type
    }
  };

  return new Promise((resolve, reject) => {
    axios
      .put(signedURL, fileInput, options)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      });
  });
}

/**
 * Generate put url, uploads the file and returns the get url
 * 
 * @param {string} fileInput 
 */
function AWSFileUpload(fileInput) {

  const randomID = parseInt(Math.random() * 10000000)
  const Key = `${randomID}.jpg`;

  return new Promise((resolve, reject) => {
    GeneratePutUrl(Key, fileInput.type)
      .then((signedURL) => {
        console.log("put signed url: " + signedURL);

        upload(signedURL, fileInput)
          .then((response) => {
            GenerateGetUrl(Key)
              .then(signedURL => {
                resolve(signedURL);
              })
              .catch(err => {
                reject(err);
              });
          })
      })
  });
}

export default AWSFileUpload;