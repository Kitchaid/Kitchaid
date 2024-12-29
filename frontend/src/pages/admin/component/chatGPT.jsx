// components/ChatGPT.js
import React, { useState } from 'react';
import axios from 'axios';

const ChatGPT = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:8080/admin/api/chatgpt/ask', { prompt });
            setResponse(res.data);
        } catch (error) {
            console.error('Error fetching response:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ask ChatGPT something..."
                />
                <button type="submit">Submit</button>
            </form>
            <div>
                <h3>Response:</h3>
                <p>{response}</p>
            </div>
        </div>
    );
};

export default ChatGPT;
