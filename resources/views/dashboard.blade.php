<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Space Pong Dashboard</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <style>
    /* Custom styles */
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #0a0e1e; /* Dark background resembling space */
      color: #ffffff; /* White text color */
      font-family: 'Arial', sans-serif;
    }
    .dashboard {
      max-width: 600px;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.1); /* Subtle box shadow */
      text-align: center;
    }
    .message {
      font-size: 24px;
      margin-bottom: 30px;
    }
    .cta-button {
      display: inline-block;
      padding: 12px 24px;
      border-radius: 5px;
      background-color: #3e78b3; /* Blue color for button */
      color: #ffffff;
      text-decoration: none;
      transition: background-color 0.3s ease;
    }
    .cta-button:hover {
      background-color: #235487; /* Darker shade of blue on hover */
    }
  </style>
</head>
<body>

  <div class="dashboard">
    <div class="message">
      <p>You are logged in!</p>
    </div>
    <a href="#" class="cta-button">Explore</a>
  </div>

</body>
</html>
