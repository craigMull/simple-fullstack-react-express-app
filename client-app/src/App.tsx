import React, {useEffect, useState} from 'react';

function App() {
  const [backendData,setBackendData] = useState(null);
  
  useEffect(() => {

    fetch("/api")
    .then((res) => res.json())
    .then((data) => setBackendData(data.message));

      
      
    
  }, [])
  
  return (
    <div className="App">
      <h1>Application Live Served</h1>
      <p>{!backendData ? "Loading..." : backendData}</p>
    </div>
  );
}

export default App;
