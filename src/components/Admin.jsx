import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  GetCandidateForAdmin,
  handleAddCandidate,
  handleLogoutapi,
} from "../API/Candidate";
import { NavLink, json, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Logout from "./Logout";
import {
  SetDataOnLocalStorage,
  getDataFromLocalStorage,
} from "../helper/helper";
import { FaChevronRight } from "react-icons/fa";
import { GetResultData } from "../API/Result";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";

function Admin() {
  const [candidates, setCandidates] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  // const [expanded, setExpanded] = useState(null);
  const [addCandidate, setAddCanddate] = useState(false);
  const [newCandidatename, setNewCandidatename] = useState("");
  const [resultDeclared, setResultDeclared] = useState(null);
  const [winnerCandidate, setWinnerCandidate] = useState("");

  const fetchAllCantodate = async () => {
    const data = await GetCandidateForAdmin(params?.id);
    console.log(data?.data?.data);
    if (data?.status == 403) {
      toast.error(data.error ? data.error : "your session expired");
      await handleLogoutapi();
      const logoutMessage = "logged out";
      SetDataOnLocalStorage(logoutMessage);
      navigate("/login");
    }
    setCandidates(data?.data?.data);
    console.log(`alll  candifate Data`, data?.data?.data);
  };

  useLayoutEffect(() => {
    fetchAllCantodate();
    const resultData = JSON.parse(localStorage.getItem("result"));
    if (resultData) {
      setResultDeclared(resultData);
      console.log(`candidates`, candidates);
      const winner = candidates.filter(
        (candidate) => candidate?._id == resultDeclared?.winnerCandidate
      );
      console.log(winner);
      setWinnerCandidate(winner[0]?.name);
    }
  }, [params.id]);

  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : null);
  // };

  const handleDeclareVote = async (req, res) => {
    try {
      const DeclareVotePromise = new Promise(async (resolve, reject) => {
        const response = await GetResultData(params?.id);
        console.log();
        if (response?.data?.success == true) {
          localStorage.setItem("result", JSON.stringify(response?.data?.data));
          setResultDeclared(response?.data?.data);
          const winner = candidates.filter(
            (candidate) =>
              candidate?._id == response?.data?.data?.winnerCandidate
          );
          console.log(`candidateeeess`, candidates);
          setWinnerCandidate(winner[0]?.name);
          resolve();
        } else {
          reject(
            response.data.message
              ? response.data.message
              : "some thing went wrong"
          );
        }
      });
      await toast.promise(DeclareVotePromise, {
        loading: "Declaring Result...",
        success: "Result Declared",
        error: (error) => error || "failed to Declare Result",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNewCandidate = async (e) => {
    try {
      const userData = getDataFromLocalStorage();
      if (newCandidatename.length <= 0) {
        return toast.error("Please Enter a candidate Name");
      }

      const currentUsername = userData?.username;

      const response = await handleAddCandidate(
        newCandidatename,
        currentUsername
      );
      if (response?.data?.success == true) {
        toast.success("candidate added successfully");
        fetchAllCantodate();
        setAddCanddate(false);
      } else {
        toast.error("failed to add candidate");
      }
      console.log(`response`, response?.data);
    } catch (error) {
      toast.error("failed to add candidate");
      setAddCanddate(false);
    }
  };

  return (
    <div className=" w-full h-screen bg-orange-500 flex justify-center items-center">
      {/* <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <Logout />
      </div> */}
      <div className="md:w-[60%] sm:w-[70%] w-[90%] h-[80%] bg-white rounded-xl flex justify-evenly items-center flex-col  ">
        {resultDeclared && resultDeclared.ResultDeclared == true ? (
          <div className="flex flex-col items-center justify-around">
            <h1 className="text-2xl font-semibold">Result Declared </h1>
            <div className="h-[50%]">
              <img
                src="https://w7.pngwing.com/pngs/105/877/png-transparent-gold-colored-winner-medal-illustration-medal-trophy-winner-medal-green-emblem-logo-trophies-thumbnail.png"
                alt="cup"
                className=" border-2 border-black h-[100%] "
              />
            </div>
            <h1 className=" text-2xl font-semibold">
              {winnerCandidate} is winner
            </h1>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5 w-full overflow-auto">
            {candidates &&
              candidates.length > 0 &&
              candidates.map((data, index) => (
                <div
                  key={index}
                  className=" w-[90%] h-[50%] py-2 px-4 shadow-sm shadow-gray-400 flex gap-3"
                >
                  <NavLink
                    to={`/candidate/${data?._id}`}
                    className="w-full h-full"
                  >
                    <div
                      key={index}
                      className=" w-full h-full flex items-center justify-between"
                    >
                      <span>{data?.name}</span>
                      <span>
                        {" "}
                        {data?.voters_id.length > 0
                          ? data?.voters_id.length
                          : 0}{" "}
                        votes
                      </span>

                      {/* <ul>
                    {data?.voters_id?.length > 0 &&
                      data?.voters_id.map((users, index) => (
                        <li
                          className="transition-transform duration-1000"
                          key={index}
                        >
                          {users?.username}
                        </li>
                      ))}
                  </ul> */}

                      <button
                      // onClick={(e) => {
                      //   setAccordian(data?.username);
                      // }}
                      >
                        <FaChevronRight className="text-black font-bold text-xl" />
                      </button>
                    </div>
                  </NavLink>
                </div>
              ))}
            <button
              onClick={() => {
                handleDeclareVote();
              }}
              className="bg-orange-500 w-[30%] text-xl py-2 px-8 border-2 border-black rounded-xl shadow-md shadow-zinc-800 text-white font-semibold"
            >
              {" "}
              Declare Result
            </button>
          </div>
        )}
      </div>
      {addCandidate && (
        <div className="absolute w-full h-screen backdrop-filter backdrop-blur-lg flex justify-center items-center">
          <div className="w-[50%] h-[30%] rounded-xl bg-white shadow-md shadow-black">
            <div className="w-full flex justify-center items-center flex-col h-full gap-4">
              <input
                type="text"
                onChange={(e) => {
                  setNewCandidatename(e.target.value);
                }}
                className="w-[80%] h-[50px] border-2 border-black rounded-xl  pl-7"
              />
              <div className="flex items-center gap-5 justify-center">
                <button
                  onClick={(e) => {
                    handleAddNewCandidate(e);
                  }}
                  className="bg-orange-500 py-2 px-8 border-2 border-black rounded-xl shadow-md shadow-orange-500 font-semibold text-white"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setAddCanddate(false);
                  }}
                  className="bg-white py-2 px-8 border-2 border-black rounded-xl shadow-md shadow-zinc-800 font-semibold text-black"
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <button
          onClick={() => {
            setAddCanddate(true);
          }}
          className="bg-orange-500 w-[50%] text-xl py-2 px-8 border-2 border-black rounded-xl shadow-md shadow-zinc-800 text-white font-semibold"
        >
          Add Candidate
        </button> */}
    </div>
  );
}

export default Admin;
