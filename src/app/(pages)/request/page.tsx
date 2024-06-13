"use client"
import { useState } from "react";

export default function Home() {


  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {

    let data = [
      { "role": "user", "content": "what’s a good what to start a conversation ??" }
    ]

    const formData = new FormData();
    formData.append('prompt', JSON.stringify(data));
    
    fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

//With Image
  const handleSubmitWithImage = async () => {

    let data = [
      {
        role: "user",
        content: [
          { type: "text", text: "What’s in this image and how can I use it to start a romantic conversation?" },
          {
            type: "image_url",
            image_url: {
              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
            },
          },
        ],
      },
    ]

    const formData = new FormData();
    formData.append('prompt', JSON.stringify(data));
    
    fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

     <h1>Send POST Request</h1>
      <button onClick={handleSubmit}>Send Data</button>
      <button onClick={handleSubmitWithImage}>Send Data with image</button>
      {response && <div>Response: {JSON.stringify(response)}</div>}
      {error && <div>Error: {error}</div>}
    </main>
  );
}
