// The function to start the video stream from the webcam

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
let API_KEY = config.API_KEY;


function startWebcam() {
    const video = document.getElementById('video');

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (error) {
                console.log("Something went wrong!", error);
            });
    }
}

// Function to take a picture from the video stream
function takePicture() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const video = document.getElementById('video');

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/png');
    document.getElementById('photo').src = dataURL;

    // Here you would send the dataURL to the API
    sendToAPI(dataURL);
}

// Function to send the captured image to the API
function sendToAPI(imageData) {
    if (!API_KEY) {
        console.log('You need to add your api key!')
        return;
    }
    const body = {
        "model": "gpt-4-vision-preview",
        "messages": [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": "Hey I am sending you a picture from my webcam. Describe to me what you see in my image. You are friendly and kind. ONLY provide the conversation in your response."
              },
              {
                "type": "image_url",
                "image_url": {
                  "url": imageData
                }
              }
            ]
          }
        ],
        "max_tokens": 300
    };

    fetch(OPENAI_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const description = data.choices[0].message.content;
        document.getElementById('apiResponse').innerText = description;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('apiResponse').innerText = 'Failed to get a description.';
    });
}

// Event listener for the capture button
document.getElementById('capture').addEventListener('click', function() {
    takePicture();
});

document.addEventListener('DOMContentLoaded', (event) => {
    API_KEY = config.API_KEY;
});

// Start the webcam stream when the window loads
window.addEventListener('load', startWebcam, false);