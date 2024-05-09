import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RegisterUser } from "../API/LoginSignUp";
import { useNavigate } from "react-router-dom";
import { TbLockSquareRounded } from "react-icons/tb";
import { SetDataOnLocalStorage } from "../helper/helper";

function SignUp() {
  const [contactNumber, setContactNumber] = useState();
  const [inputError, setInputError] = useState({
    username: "some value",
    password: "some value",
    email: "some value",
    contact: 1,
  });
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const username = e.target.username.value;
      const password = e.target.password.value;
      const email = e.target.email.value;
      const contact = e.target.contact.value;
      const UserData = {
        username,
        password,
        email,
        contact,
      };

      if (!username) {
        setInputError((prevState) => ({
          ...prevState,
          username: "",
        }));
      }
      if (!email) {
        setInputError((prevState) => ({
          ...prevState,
          email: "",
        }));
      }
      if (!contact) {
        setInputError((prevState) => ({
          ...prevState,
          contact: 0,
        }));
      }
      if (!password) {
        return setInputError((prevState) => ({
          ...prevState,
          password: "",
        }));
      }

      const isValidNumber = contactNumber.length == 10;
      console.log(`isValidNumber`, isValidNumber);

      if (isValidNumber === true) {
        const registerPromise = new Promise(async (resolve, reject) => {
          const apicall = await RegisterUser(UserData);
          if (apicall.success === false) {
            reject(apicall?.error);
            toast.error(apicall.error);
          } else {
            resolve();
            e.target.reset();
            navigate(`/home/${apicall?.data?.data?._id}`);
            console.log(apicall?.data?.data);
            SetDataOnLocalStorage(apicall?.data?.data);
          }
        });

        await toast.promise(registerPromise, {
          loading: "Processing...",
          success: "Successfully registered",
          error: (error) => error || "Failed to register",
        });
      } else {
        toast.error("Enter valid number");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-800 flex justify-center items-center">
      <div className="md:w-[60%] sm:w-[70%] w-[90%] h-[80%] bg-white rounded-xl flex justify-center items-center gap-6 flex-col">
        <div className="flex gap-2 items-center justify-center">
          <h1 className="text-xl font-bold">Register</h1>
          <div>
            <TbLockSquareRounded className="text-2xl" />
          </div>
        </div>
        <form
          onSubmit={(e) => {
            handleRegisterSubmit(e);
          }}
          className="md:w-[50%] sm:w-[80%] w-[90%] flex justify-center items-center flex-col gap-3 border-2 border-black rounded-lg py-7 "
        >
          <div className="w-full flex flex-col items-center">
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              className={` w-[80%] h-[50px] border-2  rounded-xl  pl-7 ${
                inputError?.username == "" ? "border-red-500" : "border-black"
              }`}
              onKeyUp={() => {
                setInputError((prevState) => ({
                  ...prevState,
                  username: "some value",
                }));
              }}
            />

            {inputError?.username == "" && (
              <p className="text-red-500">Username should not be empty</p>
            )}
          </div>
          <div className="w-full flex flex-col items-center">
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className={` w-[80%] h-[50px] border-2  rounded-xl  pl-7 ${
                inputError?.email == "" ? "border-red-500" : "border-black"
              }`}
              onKeyUp={() => {
                setInputError((prevState) => ({
                  ...prevState,
                  email: "some value",
                }));
              }}
            />

            {inputError?.email == "" && (
              <p className="text-red-500  ">email should not be empty</p>
            )}
          </div>
          <div className="w-full flex flex-col items-center">
            <input
              type="tel"
              id="contact"
              onChange={(e) => {
                setContactNumber(e.target.value);
              }}
              placeholder="Enter Phone Number"
              className={` w-[80%] h-[50px] border-2  rounded-xl  pl-7 ${
                inputError?.contact == 0 ? "border-red-500" : "border-black"
              }`}
              onKeyUp={() => {
                setInputError((prevState) => ({
                  ...prevState,
                  contact: 1,
                }));
              }}
              // className="w-[80%] py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-zinc-800 appearance-none"
            />

            {inputError?.contact == 0 && (
              <p className="text-red-500">contact should not be empty</p>
            )}
          </div>
          <div className="w-full flex flex-col items-center">
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className={` w-[80%] h-[50px] border-2  rounded-xl  pl-7 ${
                inputError?.password == "" ? "border-red-500" : "border-black"
              }`}
              onKeyUp={() => {
                setInputError((prevState) => ({
                  ...prevState,
                  password: "some value",
                }));
              }}
            />
            {inputError?.password == "" && (
              <p className="text-red-500 ">password should not be empty</p>
            )}
          </div>
          <input
            type="submit"
            value="Register"
            className="bg-zinc-800 py-2 px-8 border-2 border-black rounded-xl shadow-md shadow-zinc-800 text-white font-semibold"
          />
          <div className="flex">
            <span> Already have an account?</span>

            <NavLink to="/login" className="text-blue-600 underline">
              login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
