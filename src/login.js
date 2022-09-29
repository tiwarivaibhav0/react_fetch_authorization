import "./App.css";
import { useNavigate } from "react-router-dom";
import "@shopify/polaris/build/esm/styles.css";
import {
  Button,
  Form,
  FormLayout,
  Heading,
  Page,
  TextField,
} from "@shopify/polaris";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const fetchhandler = (e) => {
    // e.preventDefault();
    if (user === "" || pass === "") setErr("** All Fields are mandatory");
    else {
      var data = {
        username: user,
        password: pass,
      };
      var url = new URL("https://fbapi.sellernext.com/user/login");
      for (let k in data) {
        url.searchParams.append(k, data[k]);
      }

      // console.log(url);
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
            sessionStorage.setItem("apiKey", data.data.token);
            alert("Welcome admin");
            navigate("/dashboard");
          } else {
            alert("Invalid Details");
          }
        });
    }
  };
  // const handlePassChange = useCallback((newValue) => setPass(newValue), []);

  return (
    <>
      {" "}
      <div className="App form">
        <Page title="LOGIN FORM">
          {" "}
          <Form onSubmit={fetchhandler}>
            <FormLayout>
              <TextField
                label="Username"
                onChange={(e) => {
                  setUser(e);
                  setErr("");
                }}
                value={user}
                requiredIndicator
              />
              <TextField
                type="password"
                label="Password"
                onChange={(e) => {
                  setPass(e);
                  setErr("");
                }}
                value={pass}
                requiredIndicator
              />
              <Button primary submit>
                Login
              </Button>
              {err !== "" && <Heading>{err}</Heading>}
            </FormLayout>
          </Form>
        </Page>
      </div>
    </>
  );
}

export default Login;
