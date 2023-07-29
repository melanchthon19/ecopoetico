const getPoems = async () => {
  const response = await fetch('http://localhost:8000/api/poems');
  const data = await response.json();
  return data;
};
const poems = await getPoems();

export default function Home() {
  return (
    <>
      {poems.map((poem: Poem, index: number) => {
        return (
          <div key={index}>
            <h1>{poem.title}</h1>
            <p>{poem.content}</p>
          </div>
        );
      })}
    </>
  );
}
