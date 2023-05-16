import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { BiEditAlt } from "react-icons/bi";
import Swal from "sweetalert2";
import axios from "axios";

import { WrappingCard } from "../components/Card";
import { DatasType } from "../utils/type";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import CustomInput from "../components/CustomInput";

const Home = () => {
  const [datas, setdatas] = useState<DatasType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [inputTask, setInputTask] = useState<string>("");
  const [idTask, setIdTask] = useState<number>();
  const [editTask, setEditTask] = useState<string>("");

  const [cookie, _setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    if (!cookie.token) {
      navigate("/");
    }
  }, []);

  function fetchData() {
    axios
      .get(`https://api.todoist.com/rest/v2/tasks`, {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
      })
      .then((res) => {
        setdatas(res.data);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sorry, something wrong wrong ",
        });
      })
      .finally(() => setLoading(false));
  }

  function submitTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .post(
        `https://api.todoist.com/rest/v2/tasks`,
        {
          content: inputTask,
        },
        {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
        }
      )
      .then(() => {
        fetchData();
        navigate(0);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sorry, something wrong wrong. Failed add new task",
        });
      });
  }

  function editTaskId(id: number) {
    axios
      .post(
        `https://api.todoist.com/rest/v2/tasks/${id}`,
        {
          content: editTask,
        },
        {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
        }
      )
      .then(() => {
        fetchData();
        navigate(0);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sorry, something wrong wrong. Failed update task",
        });
      });
  }

  function onDelete(id: number) {
    Swal.fire({
      title: "Are you sure want to delete?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://api.todoist.com/rest/v2/tasks/${id}`, {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
          })
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              text: "Delete task successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            fetchData();
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Failed delete task",
            });
          });
      }
    });
  }

  return (
    <Layout>
      <WrappingCard judul="CRUD test">
        {loading ? (
          <>
            <p className="text-center text-3xl animate-pulse font-bold">
              Loading...
            </p>
          </>
        ) : (
          <>
            <label
              htmlFor="my-modal-1"
              className="btn capitalize bg-blue-700 text-white border-none mb-5 hover:bg-blue-600 hover:scale-105 transition"
            >
              Create New Task
            </label>
            <Modal no="1" titleModal="Create New Task">
              <form onSubmit={submitTask}>
                <div className="flex py-2 w-full">
                  <div className="flex items-center justify-center w-1/6 mx-2">
                    <p className="font-semibold text-black text-center">Task</p>
                  </div>
                  <div className="flex items-center justify-center w-5/6 mx-2">
                    <CustomInput
                      type="text"
                      inputSet="text-black w-full font-normal mt-2 mb-5"
                      onChange={(e) => setInputTask(e.target.value)}
                    />
                  </div>
                </div>

                <div className="modal-action">
                  <label
                    htmlFor="my-modal-1"
                    className="w-24 text-sm text-center border-2 border-blue-700 rounded-xl py-1 text-blue-700 font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
                  >
                    Cancel
                  </label>
                  <button
                    type="submit"
                    className="w-24 text-sm text-center border-2 border-blue-700 rounded-xl py-1 text-blue-700 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900 hover:text-white  active:scale-90 "
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Modal>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-sm font-bold text-left text-black  w-[40%]"
                  >
                    Tasks
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-sm font-bold text-left text-black  w-[40%]"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-sm font-bold text-center text-black  w-[10%]"
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-sm font-bold text-center text-black  w-[10%]"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              {datas ? (
                datas.map((item) => {
                  return (
                    <>
                      <tbody className="divide-y divide-black">
                        <tr>
                          <td
                            className="px-6 py-4 text-sm font-medium text-black whitespace-nowrap w-[40%]"
                            // onClick={() => onClickDetail(item.id)}
                          >
                            {item.content.substring(0, 45)}
                          </td>
                          <td
                            className="px-6 py-4 text-sm text-black whitespace-nowrap w-[40%]"
                            // onClick={() => onClickDetail(item.id)}
                          >
                            {item.is_completed === false ? (
                              <p>Not Complete</p>
                            ) : (
                              <p>Complete</p>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap w-[10%]">
                            <label
                              htmlFor={`my-modal-2`}
                              className={`normal-case text-pink-airbnb bg-transparent`}
                              onClick={() => setIdTask(item.id)}
                            >
                              <div className="flex flex-col items-center justify-center cursor-pointer hover:scale-125 transition">
                                <BiEditAlt
                                  size={20}
                                  className="text-yellow-600"
                                />
                              </div>
                            </label>
                            <Modal no="2" titleModal="Edit Task">
                              <div className="flex py-2 w-full">
                                <div className="flex items-center justify-center w-1/6 mx-2">
                                  <p className="font-semibold text-black text-center">
                                    Task
                                  </p>
                                </div>
                                <div className="flex items-center justify-center w-5/6 mx-2">
                                  <CustomInput
                                    type="text"
                                    inputSet="text-black w-full font-normal"
                                    onChange={(e) =>
                                      setEditTask(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="modal-action">
                                <label
                                  htmlFor="my-modal-2"
                                  className="w-24 text-sm text-center border-2 border-blue-700 rounded-xl py-1 text-blue-700 font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
                                >
                                  Cancel
                                </label>
                                <button
                                  onClick={() =>
                                    editTaskId(idTask ? idTask : 1)
                                  }
                                  className="w-24 text-sm text-center border-2 border-blue-700 rounded-xl py-1 text-blue-700 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900 hover:text-white  active:scale-90 "
                                >
                                  Edit
                                </button>
                              </div>
                            </Modal>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap w-[10%]">
                            <div className="flex flex-col items-center justify-center cursor-pointer hover:scale-125 transition">
                              <MdDeleteForever
                                size={20}
                                className="text-red-500"
                                onClick={() => onDelete(item.id)}
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </>
                  );
                })
              ) : (
                <></>
              )}
            </table>
          </>
        )}
      </WrappingCard>
    </Layout>
  );
};

export default Home;
