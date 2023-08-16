/// <reference types="vite/client" />

interface PoemContextType {
  currentPoemSimilars: Poem | undefined;
  addPoemSimilars: (poem: Poem) => void;
  similarPoemsList: Poem[];
  poems: Poem[];
  getAllPoems: () => void;
  getSimilarPoems: (pid: string) => void;
}