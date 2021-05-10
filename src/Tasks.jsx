import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { Button, Task } from "./elements";
import { TASKS } from "./queries";
import { REMOVE_TASK } from "./mutations";

function Tasks() {
  const { data, loading, error, refetch } = useQuery(TASKS, {
    fetchPolicy: "no-cache",
  });

  const [removeTodo] = useMutation(REMOVE_TASK);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { fetchTasks: tasks } = data;

  return (
    <>
      <Link to="/tasks/create">
        <Button>Create task</Button>
      </Link>
      <h2>Tasks</h2>
      {tasks.map((task, id) => {
        return (
          <Task key={id}>
            <h3>{task.name}</h3>
            {task.status ? <p>Done ✅</p> : <p>Incomplete ❌</p>}
            <Button
              onClick={async () => {
                await removeTodo({
                  variables: {
                    id: task.id,
                  },
                });
                refetch();
              }}
            >
              Delete
            </Button>
            <Link to={`/tasks/${task.id}/edit`}>
              <Button>Edit</Button>
            </Link>
          </Task>
        );
      })}
    </>
  );
}

export default Tasks;
