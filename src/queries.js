import { gql } from "@apollo/client";

export const TASKS = gql`
  query {
    fetchTasks {
      id
      name
      status
    }
  }
`;

export const TASK = gql`
  query FetchTask($id: ID!) {
    fetchTask(id: $id) {
      id 
      name 
      status
    }
  }
`