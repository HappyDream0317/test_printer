import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [ipAddress, setIpAddress] = useState(null);
  const [textval, setTextval] = useState("");

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIpAddress(data.ip))
      .catch(error => console.error(error));
  }, []);

  const changeText = (event) => {
    var data = event.target.value;
    setTextval(data);
  }

  const print = () => {
    var zpl = document.getElementById("zpl").value;
      var ip_addr = ipAddress;
      var output = document.getElementById("output");
      var url = "http://"+ip_addr+"/pstprnt";
      var method = "POST";
      var async = true;
      var request = new XMLHttpRequest();

      request.onload = function () {
        var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
        var data = request.responseText; // Returned data, e.g., an HTML document.
        output.innerHTML = "Status: " + status + "<br>" + data;
      }

      request.open(method, url, async);
      request.setRequestHeader("Content-Length", zpl.length);

      // Actually sends the request to the server.
      request.send(zpl);
  }
  return (
    <div>
      {ipAddress ? (
        <div>
          <textarea id="zpl" style={{width:"500px"}} value={textval} placeholder='input your sentences for test print' onChange={changeText} rows="20"></textarea>
          <button onClick={print}>Print</button>
        </div>
      ) : (        
        <p>fetching ip address</p>
      )}
    </div>
  );
}

export default App;
