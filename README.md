# Tasks App For Learning Apollo GraphQL

## Description

A basic app for learning GraphQL. No features as such are mandatory. Basic CRUD functionality is what I aim to have with perhaps user accounts and authentication.

## Questions

1. When I delete a task I'm currently getting the error below.

<img width="763" alt="Screen Shot 2021-04-27 at 9 03 15 am" src="https://user-images.githubusercontent.com/23084767/116161643-743b1100-a737-11eb-94f9-0deae6c6c91b.png">

2. When I add a new task I had to turn off `React.StrictMode` to not get this warning.

<img width="765" alt="Screen Shot 2021-04-27 at 9 04 54 am" src="https://user-images.githubusercontent.com/23084767/116161728-a77da000-a737-11eb-9ca7-8408f1620bd7.png">

## Current Functionality

https://user-images.githubusercontent.com/23084767/116162115-7ce01700-a738-11eb-8a5f-baa947fb6f6b.mov

## Update on 30/04/2021

- Struggled with understanding how to work with creating a todo and redirecting, what ended up working was removing `React.StrictMode` and then having a fetchPolicy of `network-only` to refetch the newly added data in the db
- `StrictMode` double renders and it seemed that it was calling my graphql endpoint twice for some reason?
- Update worked straight away which was cool, no errors or any other config needed, updating resources seems like the best feature of apollo
- Deleting resource was also fairly simple, I run the delete mutation and then pass to it a refetchQuery
- However for some reason after the delete the `fetchTasks` query is sent twice, not too sure why this is happening