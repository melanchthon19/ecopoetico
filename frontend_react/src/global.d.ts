type Poem = {
  id: number;
  slug: string;
  title: string;
  author: string;
  content: string;
  similars: number[];
  keywords: string;
};
interface PoemContextType {
  currentPoemSimilars: Poem | undefined;
  addPoemSimilars: (poem: Poem) => void;
  similarPoemsList: Poem[];
  poems: Poem[];
  getAllPoems: () => void;
  getSimilarPoems: (pid: string) => void;
  myPoems: Poem[];
  setMyPoems: (poems: Poem[]) => void;
}