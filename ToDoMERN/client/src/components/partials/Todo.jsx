import React from "react";
import moment from "moment";
import { deleteTodoApi, markTodoApi } from "../../services/api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Todo({ todo, setRefreshList }) {
  const navigation = useNavigate();

  const handleMark = async () => {
    const result = await markTodoApi({
      todo_id: todo._id,
    });

    if (result.data.status === 200) {
      setRefreshList(new Date());
      // toast(result.data.message);
    } else {
      toast("Failed to Mark");
    }
  };

  const handleDelete = async () => {
    const result = await deleteTodoApi({
      todo_id: todo._id,
    });
    console.log("delete todo", result);
    if (result.data.status === 200) {
      setRefreshList(new Date());
      toast("Todo Deleted Successfully");
      // navigation("/");
    } else {
      toast("Failed to Delete");
    }
  };
  return (
    <div>
      <div className="col sm-3 mx-3 my-2 alert bg-light">
        <div className="card-header">
          {todo.isCompleted ? "Completed" : "Not Completed"}
        </div>
        <div className="card-body">
          <h4 className="card-title" style = {{textDecoration : todo.isCompleted? 'line-through' : 'none' }}>{todo.desc}</h4>
          <p className="card-text">{moment(todo.date).fromNow()}</p>
          <div
            className="actionButtons"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div className="deleteButton">
              <button
                className="btn"
                style={{ backgroundColor: "red" }}
                onClick={handleDelete}
              >
                Delete
              </button>{" "}
            </div>
            <div className="markTodo">
              <button
                onClick={handleMark}
                className="btn"
                style={{ backgroundColor: "lightgreen" }}
              >
                {todo.isCompleted ? "Mark Uncomplete" : "Mark Complete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
