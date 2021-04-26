import { gql } from "@apollo/client";

export const ADD_TASK = gql`
  mutation AddTask($name: String!, $status: Boolean!) {
    addTask(input: { name: $name, status: $status }) {
      task {
        id
        name
        status
      }
    }
  }
`;

export const REMOVE_TASK = gql`
  mutation RemoveTask($id: ID!) {
    deleteTask(input: { id: $id }) {
      task {
        id
        name
        status
      }
    }
  }
`;

export const EDIT_TASK = gql`
  mutation EditTask($id: ID!, $name: String!, $status: Boolean!) {
    editTask(input: { id: $id, name: $name, status: $status }) {
      task {
        id
        name
        status
      }
    }
  }
`;
