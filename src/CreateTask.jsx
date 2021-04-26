import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { ADD_TASK } from "./mutations";
import { TASKS } from "./queries";
import { Link } from "react-router-dom";
import { Button } from "./elements";

function CreateTask() {
  const [name, setName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("incomplete");
  const history = useHistory();

  const [addTask] = useMutation(ADD_TASK, {
    update: (cache, { data }) => {
      const cachedData = cache.readQuery({
        query: TASKS,
      });
      cache.writeQuery({
        query: TASKS,
        data: {
          fetchTasks: [data.addTask.task, ...cachedData.fetchTasks],
        },
      });
    },
    onCompleted: () => {
      history.push("/");
    },
  });

  function convertStatusToBool() {
    return selectedStatus === "complete";
  }

  async function onCreateFormSubmit(e) {
    e.preventDefault();
    addTask({
      variables: {
        name: name,
        status: convertStatusToBool(),
      },
    });
  }

  return (
    <>
      <h2>Create task</h2>
      <form onSubmit={onCreateFormSubmit}>
        <label htmlFor="name">Name:</label>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <p>Select a status:</p>
        <div>
          <label htmlFor="complete">Complete</label>
          <input
            type="radio"
            name="complete"
            id="complete"
            value="complete"
            checked={selectedStatus === "complete"}
            onChange={() => setSelectedStatus("complete")}
          />
        </div>
        <div>
          <label htmlFor="incomplete">Incomplete</label>
          <input
            type="radio"
            name="incomplete"
            id="incomplete"
            value="incomplete"
            checked={selectedStatus === "incomplete"}
            onChange={() => setSelectedStatus("incomplete")}
          />
        </div>
        <Button type="submit">Submit</Button>
        <Link to="/">
          <Button>Back</Button>
        </Link>
      </form>
    </>
  );
}

export default CreateTask;
