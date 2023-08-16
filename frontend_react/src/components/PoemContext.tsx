import { ReactNode, createContext, useLayoutEffect, useState } from 'react';

export const PoemContext = createContext<PoemContextType | undefined>(undefined);

export default function PoemProvider({ children }: { children: ReactNode }) {
  const [currentPoemSimilars, setCurrentPoem] = useState<Poem | undefined>(undefined);
  const [similarPoemsList] = useState<Poem[]>([]);
  const [poems, setPoems] = useState<Poem[]>([]);

  useLayoutEffect(() => {
    const getPoems = async () => {
      const response = await fetch('http://localhost:8000/api/poems?random=true');
      const data = await response.json();
      return data;
    };
    getPoems().then((data) => setPoems(data));
  }, []);

  function addPoemSimilars(poem: Poem) {
    setCurrentPoem(poem);
    similarPoemsList.push(poem);
  }

  async function getAllPoems() {
    setPoems([]);
    const response = await fetch('http://localhost:8000/api/poems?random=true');
    const data = await response.json();
    setPoems(data);
  }

  async function getSimilarPoems(pid: string) {
    setPoems([]);
    const response = await fetch(`http://localhost:8000/api/poems/${pid}/similar`);
    const data = await response.json();
    setPoems(data);
  }

  const contextValue: PoemContextType = {
    currentPoemSimilars,
    addPoemSimilars,
    similarPoemsList,
    poems,
    getAllPoems,
    getSimilarPoems,
  };
  return <PoemContext.Provider value={contextValue}>{children}</PoemContext.Provider>;
}
