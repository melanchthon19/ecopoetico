import { useContext } from 'react';
import { PoemContext } from '../components/PoemContext';
import { Container } from '@mui/material';

export default function Print() {
  const { similarPoemsList } = useContext(PoemContext) as PoemContextType;
  return (
    <Container>
      {similarPoemsList &&
        similarPoemsList.map((poem: Poem) => {
          return (
            <div key={poem.id}>
              <h1>{poem.title}</h1>
              <p>{poem.author}</p>
              <p>{poem.content}</p>
            </div>
          );
        })}
    </Container>
  );
}
