import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import './postList.scss'
import {Redirect, useHistory} from "react-router-dom";
import {GlobalStateContext} from "../GlobalState/GlobalState";

export type postType = {
    id: number
    userId: number
    title: string
    body: string
}

export const PostsList: React.FC = () => {

    const [postsList, setPostsList] = useState<Array<postType>>([])
    const history = useHistory();
    // @ts-ignore
    const {selectUser, setSelectPost} = useContext(GlobalStateContext);

    useEffect(() => {
        if (selectUser) {
            axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${selectUser.id}`)
                .then((response) => {
                    setPostsList(response.data)
                })
        } else if (localStorage.getItem("user")) {
            // @ts-ignore
            axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${JSON.parse(localStorage.getItem("user")).id}`)
                .then((response) => {
                    setPostsList(response.data)
                })
        }
    }, [])

    const postClick = (post: any) => {
        setSelectPost(post)
        localStorage.setItem('post', JSON.stringify(post));
        history.push('/postDetails')
    }

    if (!localStorage.getItem("user")) {
        return <Redirect to="/userList"/>
    }

    return (
        <div className='postList'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 text-white text-center'>
                        <h1 className='userListTitle'>Posts List</h1>
                    </div>

                    <div className='col-12 text-white'>
                        {postsList.map((item, index) => (
                            <div key={item.id + index}
                                 onClick={() => {postClick(item)}}
                                 className='itemPost'>
                                <div>Id: {item.id}</div>
                                <div>User id: {item.userId}</div>
                                <div>Title: {item.title}</div>
                                <div>Content: {item.body}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}