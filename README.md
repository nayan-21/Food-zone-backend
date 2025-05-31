🧩 Step 1: Initialize Backend Project
Clone the Project
npm install

🔌 Step 2: Install Dependencies
Install Express and node-fetch:

npm install express node-fetch
(Use npm install node-fetch@2 for compatibility with CommonJS)

🟢 Step 3: Run the Backend Server
In the terminal, start the server:

node server.js

⚛️ Step 4: Configure the API on React APP

useEffect(() => {
 fetchData();
 }, []);
 const fetchData = async () => {
 const data = await fetch("http://localhost:5000/api/swiggy");
 const json = await data.json();
 // Set States.....
 }