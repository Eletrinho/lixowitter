import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

export const ProfilePage = () => {
  const { username } = useParams();
  return (
    <>
      <Header />
      <h1>{username}</h1>
    </>
  );
};
