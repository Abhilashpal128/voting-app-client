import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  SetDataOnLocalStorage,
  getDataFromLocalStorage,
} from "../helper/helper";
import {
  GetCandidateForUser,
  handleLogoutapi,
  handleUserVote,
} from "../API/Candidate";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Logout from "./Logout";

function Home() {
  const [userInfo, setUserInfo] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedacndidate] = useState("");
  const [doneVote, setDoneVote] = useState(false);
  const [resultDeclared, setResultDeclared] = useState(null);
  const [winnerCandidate, setWinnerCandidate] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const getAllCandidate = async () => {
    const candidateData = await GetCandidateForUser(params.id);
    setCandidates(candidateData?.data?.data);
    const resultData = localStorage.getItem("result");
    const resultDataCandidate = JSON.parse(resultData);
    console.log(`resultDataCandidate`, typeof resultDataCandidate);
    if (resultData) {
      setResultDeclared(JSON.parse(resultData));
      console.log(`typeof candidates`, candidates);
      console.log(`typeof candidates`, resultData);

      console.log(`sjlfhdsihfgbehj`, resultDataCandidate?.winnerCandidate);

      const winner = candidateData?.data?.data.filter(
        (candidate) => candidate?._id == resultDataCandidate?.winnerCandidate
      );
      console.log(`winner`, winner);
      console.log(`winner name`, winner[0]?.name);
      setWinnerCandidate(winner[0]?.name);
    }

    console.log(`candidatesData`, candidateData);
    if (candidateData?.status == 403) {
      toast.error(
        candidateData.error ? candidateData.error : "your session expired"
      );
      await handleLogoutapi();
      const logoutMessage = "logged out";
      SetDataOnLocalStorage(logoutMessage);
      navigate("/login");

      // const sessionData = JSON.stringify(data);
      // console.log(`session destroyed: ${data?.data}`);
    }
    // setCandidates(candidateData?.data?.data);
  };

  useLayoutEffect(() => {
    const userData = getDataFromLocalStorage();
    setUserInfo(userData);
    getAllCandidate();

    console.log(`params.id`, params.id);
  }, [params.id, doneVote]);

  const handleVote = async (e) => {
    e.preventDefault();
    try {
      if (selectedCandidate.length <= 0) {
        toast.error("select atleast one candidate");
      } else {
        const handleVotePromise = new Promise(async (resolve, reject) => {
          const data = await handleUserVote(selectedCandidate, userInfo._id);
          console.log(`received datatattata`, data);
          if (data.status === 403) {
            toast.error("session expired");
            navigate("/login");
          }
          if (data?.data?.success == false) {
            reject();
          } else {
            resolve();
            setDoneVote(true);
            SetDataOnLocalStorage(data?.data?.data);
            console.log(data?.data?.data);
          }
        });
        await toast.promise(handleVotePromise, {
          loading: "processing...",
          success: "voting done",
          error: "failed to vote",
        });
      }
    } catch (error) {
      console.log(`hii errr`, error);
    }
  };
  // {
  //   userInfo?.vote && console.log(`dataatat voterId`, userInfo?.vote);
  // }

  return (
    <div className="w-full h-screen bg-zinc-700 flex justify-center items-center">
      {/* <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <Logout />
      </div> */}
      <div className="md:w-[60%] sm:w-[70%] w-[90%] h-[80%] bg-white rounded-xl flex justify-evenly items-center flex-col ">
        {userInfo?.vote == null ? (
          <div className="flex flex-col gap-5 text-4xl font-bold items-center">
            {candidates &&
              candidates.map((data) => (
                //   <div className="flex items-center gap-5 p-4 border-2 border-black">
                <label
                  key={data?._id}
                  className=" flex gap-3 items-center p-2 border-2 border-black cursor-pointer"
                >
                  <input
                    type="radio"
                    name="candidates"
                    value={data?._id}
                    className="w-6 h-6"
                    onChange={() => {
                      setSelectedacndidate(data?._id);
                    }}
                  />
                  <span>{data?.name}</span>
                </label>

                //   </div>
              ))}

            <button
              onClick={(e) => {
                handleVote(e);
              }}
              className="bg-zinc-800 w-[50%] text-xl py-2 px-8 border-2 border-black rounded-xl shadow-md shadow-zinc-800 text-white font-semibold"
            >
              Vote
            </button>
          </div>
        ) : resultDeclared && resultDeclared.ResultDeclared == true ? (
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
          <div className="text-xl font-bold text-center ">
            <img
              src="https://www.shutterstock.com/image-vector/check-mark-icon-tick-symbol-600nw-1938875785.jpg"
              alt="done"
            />
            Voting Done
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
