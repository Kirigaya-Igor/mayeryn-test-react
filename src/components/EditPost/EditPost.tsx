import React, {useContext, useEffect, useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import {GlobalStateContext} from "../GlobalState/GlobalState";
import axios from "axios";

export const EditPost: React.FC = () => {

    // @ts-ignore
    const {selectPost} = useContext(GlobalStateContext);
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem("post")) {
            // @ts-ignore
            setTitle(JSON.parse(localStorage.getItem("post")).title)
            // @ts-ignore
            setBody(JSON.parse(localStorage.getItem("post")).body)
        }
    }, [])

    const onSubmit = (e: any) => {
        e.preventDefault()

        const updatePost = {
            title,
            body
        }

        axios.put(`https://jsonplaceholder.typicode.com/posts/${selectPost.id}`, updatePost)
            .then((response) => {
                console.log(response.data)
                history.push('/postsList')
            })
    }

    if (!localStorage.getItem("post")) {
        return <Redirect to="/postsList"/>
    }

    return (
        <div>
            <div className='container'>
                <div className='row text-white d-flex justify-content-center'>
                    <div className='col-12 text-center p-4'>
                        <h1>Edit Post</h1>
                    </div>
                    <div className='col-8'>
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title:</label>
                                <input type="text" className="form-control"
                                       value={title}
                                       onChange={(e) => setTitle(e.target.value)}
                                       id="title"
                                       placeholder='Title'/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="content" className="form-label">Content: </label>
                                <textarea
                                    style={{minHeight: '150px'}}
                                    className="form-control"
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    id="content"
                                    placeholder='Content'/>
                            </div>
                            <button type="submit" className="btn btn-success">Edit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}