import React from "react";
import { useParams } from "react-router-dom";

export const ProfilePage = () => {
    const {username} = useParams()
    return (
        <>
            <h1>{username}</h1>
        </>
    )
}