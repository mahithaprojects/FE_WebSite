import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1>User Information App</h1>
      <p>Choose an action:</p>
      <button onClick={() => navigate("/post")}>Post the data</button>
      <button onClick={() => navigate("/get")}>Get the data</button>
    </div>
  );
}