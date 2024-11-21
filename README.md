## Express authentication 
Web application built with Express.js that provides secure user authentication using local and modern OAuth authentication through Google, leveraging Passport.js for seamless integration.     
It employs bcrypt for password hashing, manages user sessions securely with express-session, and connects to a PostgreSQL database to store user credentials and session information.   

## Features   
**User Registration:** Users can create a new account by providing an email and password.   
**User Login:** Users can log in with their credentials and access protected routes.   
**Google OAuth Login:** Users can log in using their Google account.   
**Session Management:** Sessions are handled using express-session to keep users logged in.   
**Password Hashing:** Passwords are securely hashed using bcrypt.    


## Getting Started
Follow the instructions below to get local copy up and running.
**Some features require a set up of .env file.**
### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/huseinspahich/express-auth-app.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run command below to start the application.
   ```sh
   node index.js
   ```
   Website home page can be accessed on http://localhost:3000.
