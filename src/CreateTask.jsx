import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { Button } from "./elements";
import { TASKS } from "./queries";
import { ADD_TASK } from "./mutations";

function CreateTask({ history }) {
  const [name, setName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("incomplete");

  const [addTask] = useMutation(ADD_TASK, {
    refetchQueries: [
      {
        query: TASKS,
      },
    ],
  });

  function convertStatusToBool() {
    return selectedStatus === "complete";
  }

  async function onCreateFormSubmit(e) {
    e.preventDefault();
    await addTask({
      variables: {
        name: name,
        status: convertStatusToBool(),
      },
    });
    history.push("/");
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
