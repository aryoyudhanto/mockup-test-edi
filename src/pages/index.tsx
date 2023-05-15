import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import CustomInput from "../components/CustomInput";
import Button from "../components/Button";
import logo from '../assets/85f05b1bc2f2355c406d096fc8f8a476.png'

const index = () => {
    const [passType, setPassType] = useState<string>("password");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [_cookie, setCookie] = useCookies();
    const navigate = useNavigate();
  
    function loginHandler(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      axios
        .post(`https://reqres.in/api/login`, {
          email: email,
          password: password,
        })
        .then((res) => {
          const { token } = res.data;
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Login success",
            showConfirmButton: false,
            timer: 2000,
          });
          setCookie("token", token);
          navigate("/home");
        })
        .catch((err) => {
          const { data } = err.response;
          const { error } = data;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error + ", try again!",
            showConfirmButton: true,
          });
        });
    }
  
    function tooglePass() {
      if (passType === "password") {
        setPassType("text");
      }
      if (passType === "text") {
        setPassType("password");
      }
    }
  
    return (
      <div className="w-full flex justify-center items-center px-5 md:px-16 py-8">
        <section className="w-1/2 hidden xl:flex">
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000"
            alt="login-art"
            width={1000}
            height={1000}
          />
        </section>
        <section className="my-14 md:my-20 xl:w-1/2 md:px-20">
          <div className="w-full bg-gray-100 rounded-2xl px-5 md:px-14 pt-10 pb-10 flex flex-col gap-10 shadow-lg shadow-gray-500">
            <div className="flex flex-col items-center">
              <img src={logo} alt="" className="my-5" width={150} height={20} />
              <p className="font-bold text-lg tracking-widest text-black uppercase">
                login
              </p>
            </div>
            <form onSubmit={loginHandler}>
              <CustomInput
                label="Email"
                labelSet="text-black"
                inputSet="text-black w-full"
                placeholder="youremail@email.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <CustomInput
                label="Password"
                labelSet="text-black"
                inputSet="text-black w-full my-2"
                placeholder="Password"
                type={passType}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex my-5">
                <input type="checkbox" onClick={() => tooglePass()} />
                <label className="text-sm mx-2 capitalize">show password</label>
              </div>
              <Button
                buttonSet="w-full rounded-lg bg-blue-700 font-bold py-3 hover:bg-blue-600 text-white border-0 mt-14"
                label="LOGIN"
                type="submit"
              />
            </form>
          </div>
        </section>
      </div>
    );
}

export default index