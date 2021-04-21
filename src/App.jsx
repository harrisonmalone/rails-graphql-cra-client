import { useQuery, gql } from "@apollo/client";

const NOTES = gql`
  query {
    fetchNotes {
      id
      title
      body
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(NOTES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.fetchNotes.map((note, id) => {
    return (
      <h1 key={id}>{note.title}</h1>
    )
  });
}

export default App;
