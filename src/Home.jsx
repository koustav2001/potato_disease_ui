import React, { useEffect, useState } from "react";
import Avatar from "./assets/pngegg.png";
import steps from "./steps";
import { BsUpload } from "react-icons/bs";
import axios from "axios";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  let confidence = 0;

  const sendFile = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      });
      if (res.status === 200) {
        setData(res.data);
      }
    }
  };

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    sendFile();
  }, [preview]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 md:p-2 p-2">
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="lg:flex-grow text-2xl text-slate-200 pl-4">
            Potato Disease Prediction
          </div>
          <div>
            <img className="h-16 pr-4" src={Avatar} alt="logo" />
          </div>
        </div>
      </nav>
      <div className="flex justify-center items-center h-screen w-full gap-16 md:flex-row flex-col mt-72 md:mt-0">
        <div className="w-[21rem] h-[35rem] flex justify-center items-end bg-gray-800 rounded-lg flex-col">
          {selectedFile == null ? (
            <p className="flex items-center justify-center text-2xl text-center text-white mx-auto mb-2 shadow-xl">
              Upload Image
            </p>
          ) : (
            <p className="flex items-center justify-center text-2xl text-center text-white mx-auto mb-2 shadow-xl">
              {data ? data.class : ""}
            </p>
          )}
          <div className="flex justify-center items-center bg-slate-700 w-[19rem] h-[30rem] rounded-lg mb-4 mx-auto overflow-hidden">
            {selectedFile == null ? (
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-medium text-indigo-600"
              >
                <div className="flex items-center justify-center flex-col">
                  <span className="text-6xl">
                    <BsUpload />
                  </span>
                  <p>Image Upload Here</p>
                </div>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={onSelectFile}
                />
              </label>
            ) : (
              <div className="flex flex-col items-center justify-center">
                {!data ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  <>
                    <img className="w-[19rem] h-[23rem] mt-44" src={preview} />
                    <div className="h-12 text-slate-100 font-bold mt-6 text-2xl">
                      Confidence : {confidence}%
                    </div>
                    <button
                      onClick={clearData}
                      className="bg-white mb-[11.5rem] h-12 text-slate-700 font-bold w-full"
                    >
                      Clear
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        {/* text area */}
        <div className="w-[21rem] h-[35rem] flex justify-center items-end bg-gray-800 rounded-lg flex-col">
          <p className="flex items-center justify-center text-2xl text-center text-white mx-auto mb-2">
            {!data ? "" : "Steps To Cure"}
          </p>
          {data ? (
            <>
              {data.class == "Late Blight" ? (
                <div className="flex items-start bg-gray-500 w-[19rem] h-[30rem] rounded-lg mb-4 mx-4 overflow-y-scroll">
                  {steps &&
                    steps.map((item) => (
                      <div className="flex items-start flex-wrap gap-4 mt-2">
                        {item.name == "Late Blight" ? (
                          <>
                            <p className="ml-2 text-slate-50 text-lg">
                              ● {item.text1}
                            </p>
                            <p className="ml-2 text-slate-50 text-lg">
                              ● {item.text2}
                            </p>
                            <p className="ml-2 text-slate-50 text-lg">
                              ● {item.text3}
                            </p>
                            <p className="ml-2 text-slate-50 text-lg">
                              ● {item.text4}
                            </p>
                            <p className="ml-2 text-slate-50 text-lg">
                              ● {item.text5}
                            </p>
                            <p className="ml-2 text-slate-50 text-lg">
                              ● {item.text6}
                            </p>
                            <p className="ml-2 text-slate-50 text-lg">
                              ● {item.text7}
                            </p>
                            <p className="ml-2 text-slate-50 text-lg">
                              ● {item.text8}
                            </p>
                            <p className="ml-2 text-slate-50 text-lg">
                              ● {item.text9}
                            </p>
                            <p className="ml-2 text-slate-50 text-lg">
                              ● {item.text10}
                            </p>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                ""
              )}
              {data.class == "Early Blight" ? (
                <div className="flex items-start bg-gray-500 w-[19rem] h-[30rem] rounded-lg mb-4 mx-4 overflow-y-scroll">
                  {steps &&
                    steps.map((item) => (
                      <div className="flex items-start flex-wrap gap-4 mt-2">
                        {item.name == "Early Blight" ? (
                          <>
                            <p className="ml-2 text-slate-50 text-lg">
                              ● {item.text1}
                            </p>
                            <p className="ml-2 text-slate-50 text-lg">
                              ● {item.text2}
                            </p>
                            <p className="ml-2 text-slate-50 text-lg">
                              ● {item.text3}
                            </p>
                            <p className="ml-2 text-slate-50 text-lg">
                              ● {item.text4}
                            </p>
                            <p className="ml-2 text-slate-50 text-lg">
                              ● {item.text5}
                            </p>
                            <p className="ml-2 text-slate-50 text-lg">
                              ● {item.text6}
                            </p>
                            <p className="ml-2 text-slate-50 text-lg">
                              ● {item.text7}
                            </p>
                            <p className="ml-2 text-slate-50 text-lg">
                              ● {item.text8}
                            </p>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                ""
              )}
              {data.class == "Healthy" ? (
                <div className="flex items-start bg-gray-500 w-[19rem] h-[30rem] rounded-lg mb-4 mx-4 overflow-y-scroll">
                  <div className="flex items-start flex-wrap gap-4 mt-2">
                    <p className="ml-2 text-slate-50 text-lg">
                      ● No Treatment Required
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <div className="flex items-center bg-gray-600 w-[19rem] h-[30rem] rounded-lg mb-4 mx-4">
              <div className="flex items-center flex-wrap gap-4 mt-2">
                <p className="ml-2 text-slate-50 text-center text-lg">
                  Upload An Image To Know Characterstics
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>
        {`
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 20px;
  }
  ::-webkit-scrollbar-thumb {
    background: #14b8a6;
    border-radius: 20px;
  }
`}
      </style>
    </>
  );
};

export default Home;
