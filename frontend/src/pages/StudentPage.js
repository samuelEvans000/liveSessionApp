import React, { useEffect, useState } from "react";
// import { getSession } from "../api/api";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";

const StudentPage = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/session/${id}`);
        const data = await res.json();
        setSession(data);
      } catch (err) {
        console.error("Error fetching session", err);
      }
    };
    fetchData();
  }, [id]);
  

  if (!session) return <p>Loading session...</p>;

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2 style={{color: "white"}}>Session ID : {session.unique_id}</h2>
      <VideoPlayer />
    </div>
  );
};

export default StudentPage;
