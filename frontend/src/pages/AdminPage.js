import React, { useState } from "react";
// import { createSession } from "../api/api";
import VideoPlayer from "../components/VideoPlayer";

const AdminPage = () => {
  const [session, setSession] = useState(null);

  const handleStart = async () => {
    try {
      const res = await fetch("http://localhost:8000/create-session", {
        method: "POST",
      });
      const data = await res.json();
      console.log("✅ API Response:", data);
      setSession(data.session);
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      {!session ? (
        <button
          onClick={handleStart}
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          START SESSION
        </button>
      ) : (
        <>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px",color: "white"}}> 

          <h2 style={{color: "white"}}>Session Started!</h2>
          <p style={{marginBottom: "0px",color: "white"}}>Share this URL with student :</p>
          <a href={session.userurl} target="_blank" rel="noreferrer" style={{marginBottom: "10px",color: "white"}}>
            {session.userurl}
          </a>
          
          <VideoPlayer />
        </div> 
        </>
      )}
    </div>
  );
};

export default AdminPage;
