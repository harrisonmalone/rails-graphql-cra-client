import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { TASKS } from "./queries";
import { REMOVE_TASK } from "./mutations";
import { Button, Task } from "./elements";

function Tasks() {
  const { data, loading, error } = useQuery(TASKS);
  const [removeTodo] = useMutation(REMOVE_TASK, {
    update: (cache, { data }) => {
      const cachedData = cache.readQuery({
        query: TASKS,
      });
      cache.writeQuery({
        query: TASKS,
        data: {
          fetchTasks: cachedData.fetchTasks.filter(
            (task) => task.id !== data.deleteTask.task.id
          ),
        },
      });
    },
  });
  
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
              onClick={() => {
                removeTodo({
                  variables: {
                    id: task.id,
                  },
                });
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
