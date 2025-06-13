const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log(token,"tokendecoded")

  if (!token) {
    return res.send(`
      <html>
        <head>
          <title>Premium Page</title>
          <!-- Bootstrap CSS -->
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhh5RcnMFp8Fh1LqtjFhR6M4mqflWzXMK1DCl9g+C6pAHcoBJ5suK5eW1Ct24Fp" crossorigin="anonymous">
          <!-- Google Fonts -->
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'Poppins', sans-serif;
              background-color: #f8f9fa;
              color: #333;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            .container {
              text-align: center;
              background-color: white;
              padding: 40px;
              border-radius: 12px;
              box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
              max-width: 500px;
              width: 100%;
            }
            h1 {
              color: #dc3545;
              font-size: 2.5rem;
            }
            p {
              font-size: 1.25rem;
              margin-top: 20px;
              color: #6c757d;
            }
            .btn {
              margin-top: 20px;
              padding: 10px 20px;
              font-size: 1rem;
              color: #fff;
              background-color: #007bff;
              border: none;
              border-radius: 5px;
              text-decoration: none;
              display: inline-block;
            }
            .btn:hover {
              background-color: #0056b3;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Access Denied</h1>
            <p>This content is only available for users with a valid token</p>
          </div>
        </body>
      </html>
    `);
  }
  
  

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded,"decoded")
    req.userId = decoded.userId; 
    console.log("goooooooooooooooooooooooooooooooooooooooooooooooooooooooddecoded")
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
