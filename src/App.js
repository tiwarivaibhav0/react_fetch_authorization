import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const fetchhandler = (e) => {
    e.preventDefault();
    var data = {
      username: user,
      password: pass,
    };
    var url = new URL("https://fbapi.sellernext.com/user/login");
    for (let k in data) {
      url.searchParams.append(k, data[k]);
    }

    console.log(url);
    fetch(url, {
      headers: {
        accept: "application/json",
        authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("apiKey", data.data.token);
          alert("Welcome admin");
          navigate("/dashboard");
        } else {
          alert("Invalid Details");
        }
      });

    // localStorage.setItem("lastname", "Smith");
    // localStorage.getItem("lastname");
  };
  return (
    <>
      <div className="App">
        <form onSubmit={fetchhandler}>
          <input
            type="text"
            placeholder="Username"
            required
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <br />

          <button>Login</button>
        </form>
      </div>
    </>
  );
}

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="App">Dashboard</div>
      <div className="logout">
        {" "}
        <a href="#" onClick={() => navigate("/")}>
          SignOut
        </a>
      </div>
      <div className="dashboard">
        <div>Column1</div>
        <div>Column2</div>

        <div>Column3</div>
      </div>
    </>
  );
};
export default App;
