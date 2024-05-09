import React, { useState } from "react";
import { LoginUser } from "../API/LoginSignUp";
import toast from "react-hot-toast";
import { SetDataOnLocalStorage } from "../helper/helper";
import { NavLink, useNavigate } from "react-router-dom";
import { TbLockSquareRounded } from "react-icons/tb";

function Login() {
  const navigate = useNavigate();

  const [inputError, setInputError] = useState({
    password: "some value",
    email: "some value",
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = e.target.loginemail.value;
      const password = e.target.loginpassword.value;
      const formData = {
        email,
        password,
      };

      if (!email) {
        setInputError((prevState) => ({
          ...prevState,
          email: "",
        }));
      }

      if (!password) {
        return setInputError((prevState) => ({
          ...prevState,
          password: "",
        }));
      }

      const loginPromise = new Promise(async (resolve, reject) => {
        const response = await LoginUser(formData);
        if (response.success === false) {
          reject(response?.error);
          e.target.reset();
        } else {
          resolve();
          e.target.reset();
          console.log(`response`, response?.data?.data);
          SetDataOnLocalStorage(response?.data?.data);
          if (response?.data?.data?.isAdmin == true) {
            navigate(`/admin/${response?.data?.data?._id}`);
          } else {
            navigate(`/home/${response?.data?.data?._id}`);
          }
        }
      });

      await toast.promise(loginPromise, {
        loading: "loging in...",
        success: "Logged in successfully",
        error: (error) => error || "failed to login",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-800 flex justify-center items-center">
      <div className="md:w-[60%] sm:w-[70%] w-[90%] h-[80%] bg-white rounded-xl flex justify-center items-center gap-6 flex-col">
        <div className="flex gap-2 items-center justify-center">
          <h1 className="text-xl font-bold">Sign In</h1>
          <div>
            <TbLockSquareRounded className="text-2xl" />
          </div>
        </div>
        <form
          onSubmit={(e) => {
            handleLoginSubmit(e);
          }}
          className=" md:w-[50%] sm:w-[80%] w-[90%] flex justify-center items-center flex-col gap-4 border-2 border-black rounded-lg py-7 "
        >
          <div className="w-full flex flex-col items-center">
            <input
              onKeyUp={() => {
                setInputError((prevState) => ({
                  ...prevState,
                  email: "some value",
                }));
              }}
              type="email"
              id="loginemail"
              placeholder="Enter email"
              className={` w-[80%] h-[50px] border-2  rounded-xl  pl-7 ${
                inputError?.email == "" ? "border-red-500" : "border-black"
              }`}
            />
            {inputError?.email == "" && (
              <p className="text-red-500  ">email should not be empty</p>
            )}
          </div>
          <div className="w-full flex flex-col items-center">
            <input
              onKeyUp={() => {
                setInputError((prevState) => ({
                  ...prevState,
                  password: "some value",
                }));
              }}
              type="password"
              id="loginpassword"
              placeholder="Enter Password"
              className={` w-[80%] h-[50px] border-2  rounded-xl  pl-7 ${
                inputError?.password == "" ? "border-red-500" : "border-black"
              }`}
            />
            {inputError?.password == "" && (
              <p className="text-red-500 ">password should not be empty</p>
            )}
          </div>
          <input
            type="submit"
            value="Login"
            className="bg-zinc-800 py-2 px-8 border-2 border-black rounded-xl shadow-md shadow-zinc-800 font-semibold text-white"
          />
          <div className="flex">
            <span> don't have an account?</span>

            <NavLink to="/" className="text-blue-600 underline">
              register
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
