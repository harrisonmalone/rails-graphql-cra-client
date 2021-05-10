import React from "react";
import { Switch, Route } from "react-router-dom";
import Tasks from "./Tasks";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";
import styled from 'styled-components'

const Container = styled.div`
  max-width: 700px;
  margin: 0px auto;
  padding: 10px;
`;

function Routes() {
  return (
    <Container>
      <Switch>
        <Route exact path="/tasks/create" component={CreateTask} />
        <Route exact path="/tasks/:id/edit" component={EditTask} />
        <Route exact path={["/", "/tasks"]} component={Tasks} />
      </Switch>
    </Container>
  );
}

export default Routes;
