import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import './postDetails.scss'
import {Redirect, useHistory} from "react-router-dom";
import {GlobalStateContext} from "../GlobalState/GlobalState";

type commentsType = {
    id: number
    postId: number
    name: string
    email: string
    body: string
}

export const PostDetails: React.FC = () => {

    const [comments, setComments] = useState<Array<commentsType>>([])
    const history = useHistory();
    // @ts-ignore
    const {selectPost} = useContext(GlobalStateContext);

    useEffect(() => {
        if (selectPost) {
            axios.get(`https://jsonplaceholder.typicode.com/posts/${selectPost.id}/comments`)
                .then((response) => {
                    setComments(response.data)
                })
        } else if (localStorage.getItem("post")) {
            // @ts-ignore
            axios.get(`https://jsonplaceholder.typicode.com/posts/${JSON.parse(localStorage.getItem("post")).id}/comments`)
                .then((response) => {
                    setComments(response.data)
                })
        }
    }, [])

    if (!localStorage.getItem("post")) {
        return <Redirect to="/postsList"/>
    }

    return (
        <div className='postDetails'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 text-white text-center'>
                        <h1 className='userListTitle'>Post Details</h1>
                    </div>

                    <div className='col-12 text-white'>
                        <div className='itemPost'>
                            {selectPost &&
                            <div>
                                <div>Id: {selectPost.id}</div>
                                <div>User id: {selectPost.userId}</div>
                                <div>Title: {selectPost.title}</div>
                                <div>Content: {selectPost.body}</div>
                            </div>}

                            <div>
                                <button type="button" onClick={() => {history.push('/editPost')}} className="mt-3 btn btn-success">Edit Post</button>
                            </div>
                        </div>
                    </div>

                    <div className='col-12 text-white text-center'>
                        <h1 className='userListTitle'>Post Comments</h1>
                    </div>

                    {comments.map((comment, index) => (
                        <div key={comment.id + index} className='col-12 text-white'>
                            <div className='itemPost'>
                                <div>Id: {comment.id}</div>
                                <div>Post id: {comment.postId}</div>
                                <div>Name: {comment.name}</div>
                                <div>E-mail: {comment.email}</div>
                                <div>Content: {comment.body}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}