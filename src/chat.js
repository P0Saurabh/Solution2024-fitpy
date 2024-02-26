import React, { useState } from 'react';
import axios from 'axios';
// Import CSS
import './chat.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading animation
    try {
      const res = await axios.post('http://localhost:5000/', { user_input: userInput });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setResponse('Failed to get response from the server.');
    }
    setIsLoading(false); // Hide loading animation
  };

  const createMarkup = () => {
    return {__html: response};
  };

  return (
    <div className="App">
      
      <header className="App-header">
        <h2>Ask a Question</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Type your question here..."
          />
          <button type="submit">Submit</button>
        </form>
        {isLoading ? <div className="loading-animation"></div> :
        (response && <div className='ss'><strong>Response:</strong><div dangerouslySetInnerHTML={createMarkup()} /></div>)}
      </header>
    </div>
  );
}

export default App;
