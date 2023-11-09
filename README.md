# Webcam Image Description with OpenAI

This project provides a simple web application that uses the user's webcam to capture an image and sends it to OpenAI's GPT-4 Vision API for description. The application is built with HTML, CSS, and JavaScript.

## Features

- **Webcam Stream**: Access the webcam stream and display it in the browser.
- **Capture Image**: Take a snapshot from the webcam feed.
- **Image Analysis**: Send the captured image to OpenAI's GPT-4 Vision API and receive a description of the image.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have a modern web browser.
- You have a stable internet connection.
- You have an API key from OpenAI (see configuration below).

## Configuration

To run this project, you must add your OpenAI API key to a `config.js` file. This file should be located in the root of the project and should not be tracked by Git for security reasons.

1. Create a file named `config.js` in the root of the project.
2. Add the following content to the file:

   ```javascript
   // config.js
   var config = {
     API_KEY: 'YOUR_OPENAI_API_KEY'
   };
