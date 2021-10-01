## Basic

+ `npx create-react-app ./` to create an empty react app in the current directory

+ `npm init -y` to create package.json; use `npm install package-name` to install package.

+ add `"type": "module",` in package.json to use module import syntax in the index.js

  ```js
  // server/index.js
  // module syntax import
  import express from 'express'
  import bodyParser from 'body-parser'
  import mongoose from 'mongoose'
  import cors from 'cors'
  // origional 
  const express = require('express');
  ```

+ **Project Structure**

  + *client*

    + *src*

      + *actions*

        > store action related code for redux

      + *api*

        > store axois code for the HTTP request to the server side

      + *components*

        > store react component code

      + *reducers*

        > store reducer related code for redux

      + *constants*

        > store constants for client side

      + App.js

        > root react component

      + index.js

        > hook App component to the html file
      
      + styles.js
      
        > style file for App.js

  + server

    + *controllers*

      > logical code for HTTP request callback

    + *models*

      > store mongodb model definition code

    + *routes*

      > store express routes code

    + index.js

      > handle all the settings

+ To run the client side: `npm start`

  > You can find the script in the package.json: `"start": "react-scripts start"`

+ To run the server side: `npm start`

  > You can find the script in the package.json: `"start": "nodemon index.js"`
  
+ Server dependencies

  ```json
      "dependencies": {
          "body-parser": "^1.19.0",
          "cors": "^2.8.5",
          "dotenv": "^10.0.0",
          "express": "^4.17.1",
          "mongoose": "^6.0.2",
          "nodemon": "^2.0.12"
      }
  ```

+ Client dependencies

  ```json
    "dependencies": {
      "@material-ui/core": "^4.12.3",
      "@material-ui/icons": "^4.11.2",
      "@testing-library/jest-dom": "^5.14.1",
      "@testing-library/react": "^11.2.7",
      "@testing-library/user-event": "^12.8.3",
      "axios": "^0.21.1",
      "moment": "^2.29.1",
      "react": "^17.0.2",
      "react-dom": "^17.0.2",
      "react-file-base64": "^1.0.3",
      "react-redux": "^7.2.4",
      "react-scripts": "4.0.3",
      "redux": "^4.1.1",
      "redux-thunk": "^2.3.0",
      "web-vitals": "^1.1.2"
    }
  ```

  

## React



## Redux



## Express



## Authentication (OAuth, JWT)


## Middleware



  

