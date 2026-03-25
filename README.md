# ThinkBoard-MERN

## Project Overview

ThinkBoard-MERN is a full-stack web application built on the MERN stack, which includes MongoDB, Express.js, React.js, and Node.js. The application aims to provide users with a collaborative platform for brainstorming and sharing ideas in a user-friendly interface.

## Project Structure

```
ThinkBoard-MERN/
├── client/         # Contains the frontend React application
│   ├── public/     # Static files like index.html
│   └── src/       # React source files
│       ├── components/  # Reusable React components
│       ├── pages/       # Page components
│       ├── App.js       # Main application component
│       └── index.js     # Entry point of the application
│
├── server/         # Contains the backend Node.js application
│   ├── config/      # Configuration files like database connection
│   ├── controllers/ # Business logic for handling requests
│   ├── models/      # Database models
│   ├── routes/      # API routes
│   ├── utils/       # Utility functions
│   └── server.js    # Entry point for the Node.js server
│
├── .gitignore      # Git ignore configuration
├── package.json     # Project dependencies and scripts
└── README.md        # Project documentation
```

## Technologies Used

- **MongoDB:** NoSQL database for storing application data.
- **Express.js:** Web framework for Node.js to handle HTTP requests and responses.
- **React.js:** Frontend library for building user interfaces.
- **Node.js:** JavaScript runtime for running the server.
- **Heroku:** Platform to deploy the application.

## Setup Instructions

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/aditii0011/ThinkBoard-MERN.git
   cd ThinkBoard-MERN
   ```

2. **Install dependencies:**  
   - For the server:
   ```bash
   cd server
   npm install
   ```
   - For the client:
   ```bash
   cd client
   npm install
   ```

3. **Set up environment variables:**  
   Create a `.env` file in the `server/` directory with your database connection string and any other necessary credentials.

4. **Run the application:**  
   - Start the server:
   ```bash
   cd server 
   node server.js
   ```
   - In a separate terminal, start the client:
   ```bash
   cd client
   npm start
   ```

5. **Access the application:**  
   Navigate to `http://localhost:3000` in your browser.

## Contributing

Feel free to submit issues or pull requests to help improve the ThinkBoard-MERN application!