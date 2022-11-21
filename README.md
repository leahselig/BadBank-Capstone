# Bad Bank Full Stack

## Description:

This Bad Bank Full Stack application is the final capstone project created as part of the MITxPro Full stack with MERN program, which simulates a bank environment, where the user needs to log in, start a session with firebase and start doing operations in the bank such as deposit or withdraw money. The project is created in the MERN stack, which means that the backend is built on NodeJS, Express and MongoDB, and the frontend is built with React. Also, as part of the application for authentication, the project uses firebase.

## Instalation:

1. Download the files by clicking the green code button or Clone the project: Go to a directory on your computer and run this command.

```bash
git clone https://github.com/leahselig/BadBank-Capstone.git
```

2. Install global dependencies: To run this project you will need to install the `nodemon` package globaly. To do this, you can run this command.

```bash
npm i -g nodemon
```

3. Configurate Firebase: Create a project in firebase [https://console.firebase.google.com/](https://console.firebase.google.com/)

Once the project is created, follow these steps: - Go to your project settings - Under 'General', add a web app - Find the SDK setup and configuration section for your new app - Copy the code for the firebase config - Add this code to the index.html file in the public folder in the project and save the file

4. Run an instance of mongoDb with Docker: (Be sure you have docker installed on your local mashine) Run this command.

```bash
docker run -p 27017:27017 --name badbank -d mongo
```

5. Install project dependencies from the `root` directory and run:

   - Client: move to `client` directory and run

   ```bash
   npm install
   ```

6. Run the project in the `root` of the directory.

```bash
nodemon index.js
```

## Technology used:

- NodeJS
- Express
- MongoDB
- ReactJS
- Firebase
- Docker

## Features:

- A Node.js server
- A MongoDB database and data abstraction layer
- API integration
- Connection of the front end and back end
- Authentication
- The app deployed to a cloud service
- Transaction history for the user

## License:

MIT License

Copyright (c) 2022 Leah Selig

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
