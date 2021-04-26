import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { EDIT_TASK } from "./mutations";
import { TASK } from "./queries";
import { Link } from "react-router-dom";
import { Button } from "./elements";

function EditTask(props) {
  const [name, setName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const history = useHistory();

  const [editTask] = useMutation(EDIT_TASK, {
    onCompleted: () => {
      history.push("/");
    },
  });

  function convertStatusToBool() {
    return selectedStatus === "complete";
  }

  const { data, loading } = useQuery(TASK, {
    variables: {
      id: props.match.params.id
    }
  })

  useEffect(() => {
    if (data) {
      const { fetchTask: { name, status } } = data
      setName(name)
      setSelectedStatus(status ? "complete" : "incomplete")
    }
  }, [data])
 
  async function onEditFormSubmit(e) {
    e.preventDefault();
    editTask({
      variables: {
        id: props.match.params.id,
        name: name,
        status: convertStatusToBool(),
      },
    });
  }

  return !loading && (
    <>
      <h2>Edit task</h2>
      <form onSubmit={onEditFormSubmit}>
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

export default EditTask;
