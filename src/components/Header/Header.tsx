import React, {useContext} from "react";
import './header.scss';
import {NavLink} from 'react-router-dom'
import {GlobalStateContext} from "../GlobalState/GlobalState";

export const Header: React.FC = () => {

    // @ts-ignore
    const {selectUser, setSelectUser, setSelectPost} = useContext(GlobalStateContext);

    return (
        <div className='header'>

            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12 d-md-flex align-items-center'>
                        <div className='col-md-3'>
                            <h3 className='headerTitle'>Author: Igor Shyian</h3>
                        </div>
                        <div className='col-md-4 d-flex'>
                            {selectUser && <NavLink className='customLink' to='postsList'>moja lista postów</NavLink>}
                            <NavLink className='customLink' to='userList'>Zmien uzytkownikow</NavLink>
                        </div>
                        <div className='col-md-5 d-md-flex align-items-center'>
                            {selectUser &&
                            <div className='userData'>
                                <div className='item'>Id: {selectUser.id}</div>
                                <div className='item'>Name: {selectUser.name}</div>
                                <div className='item'>E-mail: {selectUser.email}</div>
                            </div>}

                            {selectUser && <button className='clearButton' onClick={() => {
                                setSelectUser(null)
                                setSelectPost(null)
                                localStorage.removeItem("user")
                                localStorage.removeItem("post")
                            }}>Clear User</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}