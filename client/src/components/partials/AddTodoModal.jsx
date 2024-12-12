import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { createTodoApi } from "../../services/api.js";

const AddTodoModal = ({ setRefreshList }) => {
  const [todoDesc, setTodoDesc] = useState("");

  async function handleAddTodo() {
    console.log(todoDesc, "Todo Description");
    if (todoDesc === "") {
      toast("Please enter todo description");
      return;
    }

    const result = await createTodoApi({ desc: todoDesc });
    console.log(result);
    if (result.status === 200) {
      // toast("Todo added successfully");
      setRefreshList(new Date());
      setTodoDesc("");
    } else {
      toast(result.data.message);
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="modal mt-5" id="exampleModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">Add New Todo</div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              >
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Enter Todo"
                  rows={3}
                  onChange={(e) => setTodoDesc(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleAddTodo}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setTodoDesc("")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;
