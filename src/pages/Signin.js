import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../assets/login.png";
import { Container } from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Spinner from "../components/common/Spinner";

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState(false);
  const [error, setError] = useState({ error: false, text: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const redirectUrl = location.state?.from?.pathname || "/home";
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    let userNameTemp = "yasen";
    let passwordTemp = "yasen1234";
    if (username === userNameTemp && password === passwordTemp) {
      setError({ error: false, text: "" });
      navigate(redirectUrl);
      localStorage.setItem("isLogin", true);
    } else {
      setError({ error: true, text: "Username or password is incorrect" });
    }
  };
  return (
    <Container>
      <div className="md:pt-32 md:pb-20">
        <div className="md:grid sm:grid-cols-2 md:grid-cols-2 gap-7 spac-y-4">
          <div>
            <img className="h-[80%] hidden md:inline" src={login} alt="" />
          </div>
          <div>
            <div className="py-7">
              <h2 className="text-[36px] font-semibold">Welcome Back</h2>
              <p className="text-[18px] font-[500]">
                We are Happy to see you again. let's get started
              </p>
            </div>
            <form onSubmit={onSubmit}>
              <div>
                <label className="label">Username</label>
                <input
                  className="input"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="label">Passoword</label>
                <div className="input flex">
                  <input
                    type={eye ? "text" : "password"}
                    className="w-full"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {eye ? (
                    <AiOutlineEye
                      className="text-primary text-[24px] cursor-pointer"
                      onClick={() => setEye(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="text-primary text-[24px] cursor-pointer"
                      onClick={() => setEye(true)}
                    />
                  )}
                </div>
              </div>

              <div className="mb-[12px]">
                <p className="text-red-500 text-[18px]">
                  {error.error && error.text}
                </p>
              </div>
              <div className="flex justify-center items-center mt-8">
                <button
                  className="h-[48px] items-center w-full bg-[#9610FF] hover:bg-indigo-800 px- rounded text-white flex justify-center"
                  type="submit"
                >
                  {loading ? <Spinner /> : "Log in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}
