# Project Dropboxed

## Overview
Project Dropboxed is a web application built using React 18 for the frontend and Node.js 16.20 with Express for the backend. The application utilizes MySQL as its database.

## Technologies
- **Frontend:** React 18
- **Backend:** Node.js 16.20, Express
- **Database:** MySQL

## Setup Instructions

### Prerequisites
- Node.js 16.20 or higher
- npm (comes with Node.js)
- MySQL

### Clone the Repository
1. Clone the repository from Git:
   ```sh
   git clone https://github.com/your-username/Dropboxed.git
   ```

### Install Node Modules
2. Navigate to the backend directory and install the dependencies:
   ```sh
   cd Dropboxed/server
   npm install
   ```

3. Navigate to the frontend directory and install the dependencies:
   ```sh
   cd ../frontend
   npm install
   ```

### Start the Application
4. Start the backend server:
   ```sh
   cd ../server
   npm start
   ```

5. Start the frontend development server:
   ```sh
   cd ../frontend
   npm start
   ```

## Deployment Instructions

### SSH into the Server
1. Login to your server using SSH:
   ```sh
   ssh your-username@your-server-ip
   ```

### Navigate to Project Root
2. Go to the project root directory:
   ```sh
   cd /var/www/Dropboxed
   ```

### Pull the Latest Code
3. Pull the latest code from the `stage` branch:
   ```sh
   git pull origin stage
   ```

### Build and Deploy
4. Navigate to the backend directory and remove the existing build:
   ```sh
   cd server
   rm -rf build
   ```

5. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```

6. Create a new build and deploy it:
   ```sh
   npm run deploy
   ```

### Restart the PM2 Server
7. Restart the PM2 process:
   ```sh
   pm2 restart 0
   ```

## Contact
For any questions or issues, please contact [Your Name](mailto:your-email@example.com).

