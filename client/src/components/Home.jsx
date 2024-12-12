import React, { use, useEffect, useState } from "react";
import Header from "./partials/Header.jsx";
import Todo from "./partials/Todo.jsx";
import AddTodoModal from "./partials/AddTodoModal.jsx";
import { getTodoListApi, getToken } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {
  const navigation = useNavigate();
  const [list, setList] = useState([]);
  const [refreshList, setRefreshList] = useState();
  const [searchText, setSearchText] = useState("");
  const[filteredText, setFilteredText] = useState([]);

  useEffect(() => {
    if(searchText === ""){
      setFilteredText(list);
    }else{
      const filteredList = list.filter(todo => todo.desc.toLowerCase().includes(searchText.toLowerCase().trim()));
      setFilteredText(filteredList);
    }
  }, [searchText, list]);


  useEffect(() => {
    if (!getToken()) {
      navigation("/login");
    }
    fetchTodoList();
  }, [refreshList]);

  async function fetchTodoList() {
    // console.log("Fetching Todo List");
    const result = await getTodoListApi();
    console.log("todolist ", result);
    if (result.status === 200 && result.data.status === 200) {
      setList(result.data.data.todos.reverse());
    }
  }

  return (
    <div>
      <Header searchText = {searchText} setSearchText = {setSearchText}/>
      <ToastContainer />

      <div className="container">
        <div className="row justify-content-center mt-4">
          {filteredText.map((todo, index) => {
            return <Todo key={todo._id} todo={todo} setRefreshList={setRefreshList}/>;
          })}
          {
            filteredText.length === 0 && <div className="alert alert-danger">No Todo Found</div>
          }
        </div>
      </div>
      <div
        className=""
        style={{ position: "fixed", right: 50, bottom: 50, zIndex: 1030 }}
      >
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn btn-primary"
        >
          ADD
        </button>
      </div>
      <AddTodoModal setRefreshList={setRefreshList} />
    </div>
  );
};

export default Home;
