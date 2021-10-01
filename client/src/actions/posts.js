import * as api from '../api';
import { CREATE, UPDATE, DELETE, FETCH_ALL, LIKE } from '../constants/actionTypes';

// Action Creators
const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    const action = {
      type: FETCH_ALL,
      payload: data,
    };
    dispatch(action);
  } catch (err) {
    console.log(err);
  }
};

const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({
      type: CREATE,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({
      type: DELETE,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({
      type: LIKE,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({
      type: UPDATE,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export { getPosts, createPost, deletePost, likePost, updatePost };
