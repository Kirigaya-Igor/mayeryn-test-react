import React, {useEffect, useState, useContext} from "react"
import axios from "axios"
import './userList.scss'
import { useHistory } from "react-router-dom"
import {GlobalStateContext} from "../GlobalState/GlobalState";

export type userType = {
    id: number
    name: string
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: {
            lat: string
            lng: string
        }
    },
    phone: string
    website: string
    company: {
        name: string
        catchPhrase: string
        bs: string
    }
}

export const UserList: React.FC = () => {

    const [usersList, setUsersList] = useState<Array<userType>>([])
    const history = useHistory();
    // @ts-ignore
    const {setSelectUser} = useContext(GlobalStateContext);

    const clickUser = (user: object) => {
        setSelectUser(user)
        localStorage.setItem('user', JSON.stringify(user));
        history.push('/postsList')
    }

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                setUsersList(response.data)
            })
    }, [])


    return (
        <div className='userList'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 text-white text-center'>
                        <h1 className='userListTitle'>User List</h1>
                    </div>

                    <div className='col-12 text-white'>
                        {usersList.map((item, index) => (
                            <div key={item.id + index}
                                 onClick={() => {clickUser(item)}}
                                 className='col-12 itemUser d-md-flex'>
                                <div className='col-md-2'>Id: {item.id}</div>
                                <div className='col-md-5'>Name: {item.name}</div>
                                <div className='col-md-5'>E-mail: {item.email}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}