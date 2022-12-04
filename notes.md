# Basic

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

### **Project Structure**

#### ***client***

+ *src*

  + *actions*/

    > store action related code for redux

  + *api*/

    > store axois code for the HTTP request to the server side

  + *components*/

    > store react component code

  + *reducers*/

    > store reducer related code for redux

  + *constants*/

    > store constants for client side

  + App.js

    > root react component

  + index.js

    > hook App component to the html file

  + styles.js

    > style file for App.js


#### ***server***

+ *controllers*/

  > logical code for HTTP request callback

+ *models*/

  > store mongodb model definition code

+ *routes*/

  > store express routes code

+ index.js

  > handle all the settings

+ To run the client side: `npm start`

  > You can find the script in the package.json: `"start": "react-scripts start"`

+ To run the server side: `npm start`

  > You can find the script in the package.json: `"start": "nodemon index.js"`

#### Server dependencies

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

#### Client dependencies

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




# MongoDB(Using Mongoose)

### Schema to Model

```javascript
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model('PostMessage', postSchema);
```

### Methods of Model

```js
// async call
// read: findById(id)
const post = await PostMessage.findById(id);

// update: findByIdAndUpdate()
await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

// create: create new entry and add to database
const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
await newPostMessage.save();

// delete: findByIdAndRemove(id)
await PostMessage.findByIdAndRemove(id);

// count
const total = await PostMessage.countDocuments({});
```



# Front-end API call (Using axios)

```js
import axios from 'axios';

// create base url
const API = axios.create({ baseURL: 'https://my-memories-mern-project.herokuapp.com/' });

// add auth token
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

// get
export const fetchPost = (id) => API.get(`/posts/${id}`);

// post
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

// patch
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

// delete
export const deletePost = (id) => API.delete(`/posts/${id}`);
```



# React

 ### Component Structure

```jsx
// component name
const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  // material.ui styles object 
  const classes = useStyles();

  if (!posts.length && !isLoading) return 'No posts';

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} lg={3}> 
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
```

### Hook

```js
import { useState, useEffect } from 'react';
// useState
// Declare a new state variable
const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

// side effect, update post in state
// second argument means if the post is the same as the previous render, we skip the effect
useEffect(() => {
    if (post) setPostData(post);
  }, [post]);


```

### Router

```jsx
// App.js
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

// Auth.js
import { useHistory } from "react-router-dom";

const history = useHistory();
// redirect
history.push("/");

// Narvbar.js
// useLocation
// This hook returns the current location object. This can be useful if you'd like to perform some side effect whenever the current location changes.
import { useLocation } from 'react-router-dom';
	useEffect(() => {
        const token = user?.token;
        //JWT
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
		// when current location change, setUser
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
```



# Redux

### index.js

```jsx
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
// async
import thunk from 'redux-thunk';
import { reducers } from './reducers';

// create store for states
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  // use redux
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

### reducer

```js
// index.js
import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
export const reducers = combineReducers({ posts, auth });

// auth.js
// state changed by action
const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
};
export default authReducer;
```

### actions

```js
// create a action and dispatch it (redux-thunk)
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

// dispatched action will go to the reducer
```

### Hook

```js
import { useSelector, useDispatch } from 'react-redux'

// useSelector(): subscribe to the Redux store, and run your selector whenever an action is dispatched.
const { posts, isLoading } = useSelector((state) => state.posts);

// This hook returns a reference to the dispatch function from the Redux store. You may use it to dispatch actions as needed.
const dispatch = useDispatch();

```



# Express

### index.js

```javascript
// create server
const app = express();

// use bodyParsesr to parse parameters
app.use(bodyParser.json({ limit: '30mb', extend: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extend: true }));

// use routes
app.use('/posts', postRoutes);

// connect to mongoDB
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port:${PORT}`));
  })
  .catch((err) => console.log(err));
```

### routes

```js
// create router
const router = express.Router();

// callback functions are in another files
// get
router.get('/search', getPostsBySearch);

// post
router.post('/', auth, createPost);

//patch
router.patch('/:id', auth, updatePost);

// delete
router.delete('/:id', auth, deletePost);
```

### callback functions

```js
// async
export const getPosts = async (req, res) => {
  const { page } = req.query;
  
  // use try-catch clause
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
```

### .env file

```js
CONNECTION_URL = ...
PORT = ...

// index.js
import dotenv from 'dotenv';
dotenv.config();
// use process.env to access .env file constant
const PORT = process.env.PORT || 5000;
```



# Authentication (OAuth, JWT)

### JWT (JSON WebToken)

#### Backend

##### Controller

```js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // from mongoDB database get the user
        const existingUser = await User.findOne({ email });

        if (!existingUser)
            return res.status(404).json({ message: "User doesn't exist." });
		
        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials." });
		
        // create jwt for this user
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            secret,
            { expiresIn: "1h" }
        );
		
        // send to client
        res.status(200).json({ result: existingUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User already exists." });


        // hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        // create MongoDB record
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
		
        // create jwt
        const token = jwt.sign(
            { email: result.email, id: result._id },
            secret,
            { expiresIn: "1h" }
        );
		
        // send to client
        res.status(200).json({ result, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong." });
    }
};
```

##### Middleware

```js
import jwt from "jsonwebtoken";

// need to be the same as you create the jwt
const secret = 'test';

// check if has the auth
const auth = async (req, res, next) => {
    try {
        // get the token
        const token = req.headers.authorization.split(" ")[1];
        // our own auth token or Google auth token
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, secret);
			// get user id
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
			// get user id
            req.userId = decodedData?.sub;
        }
		
        // pass to second thing
        next();
    } catch (error) {
        console.log(error);
    }
};
```

##### Using middle in the Routes

````js
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);
````

#### Client

##### redux action

````js
import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData, history) => async (dispatch) => {
    try {
        // log in the user
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        history.push('/');
    } catch (err) {
        console.log(err);
    }
};

export const signup = (formData, history) => async (dispatch) => {
    try {
        // sign up the user
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
        history.push('/');
    } catch (err) {
        console.log(err);
    }
};
````

##### redux reducer

````js
const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            // save token and data in localStorage profile
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };
        case LOGOUT:
            // clear the localStorage
            localStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
};
````

##### api call

```js
const API = axios.create({ baseURL: 'https://my-memories-mern-project.herokuapp.com/' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    // bear the token when sending api request
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});
```



### OAuth(Google)

- https://console.cloud.google.com/apis/dashboard?pli=1&project=balmy-edition-319403

```jsx
	import { GoogleLogin } from "react-google-login";

	const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({
                type: AUTH,
                data: {
                    result,
                    token,
                },
            });
            // redirect to Home
            history.push("/");
        } catch (err) {
            console.log(err);
        }
    };

    const googleFailure = (err) => {
        console.log(err);
        console.log("Google Sign In was unsuccessful. Try Again Later");
    };


					<GoogleLogin
                        clientId="1072411632868-bcvcigbagfe4hcs7v516s2bqtaq6k7bv.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
```
