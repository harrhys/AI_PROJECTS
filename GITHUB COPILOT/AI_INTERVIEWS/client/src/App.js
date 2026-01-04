import React from 'react';

function App() {
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div>
      <h1>AI Interviews React Frontend</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
