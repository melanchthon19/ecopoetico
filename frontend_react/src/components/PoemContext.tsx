import { ReactNode, createContext, useLayoutEffect, useState } from 'react';

export const PoemContext = createContext<PoemContextType | undefined>(undefined);

export default function PoemProvider({ children }: { children: ReactNode }) {
  const [currentPoemSimilars, setCurrentPoem] = useState<Poem | undefined>(undefined);
  const [similarPoemsList] = useState<Poem[]>([]);
  const [poems, setPoems] = useState<Poem[]>([]);
  const [myPoems, setMyPoems] = useState<Poem[]>([]);
  const [navBarColor, setNavBarColor] = useState('default');

  const [showTutorial, setShowTutorial] = useState(true);
  const [showTravelPopOver, setShowTravelPopOver] = useState(showTutorial);
  const apiUrl = import.meta.env.VITE_API_URL;
  const emptyCards = true;

  useLayoutEffect(() => {
    const getPoems = async () => {
      const response = await fetch(`${apiUrl}/api/poems?random=true`);
      const data = await response.json();
      return data;
    };
    getPoems().then((data) => emptyCards ? addEmptyCards(data) : setPoems(data));
  }, []);

  useLayoutEffect(() => {
    if (!localStorage.getItem('showTutorial')) {
      setShowTutorial(true);
      localStorage.setItem('showTutorial', 'true');
    } else {
      setShowTutorial(localStorage.getItem('showTutorial') === 'true');
    }
    setShowTravelPopOver(showTutorial);
  }, [showTutorial]);

  function addPoemSimilars(poem: Poem) {
    setCurrentPoem(poem);
    similarPoemsList.push(poem);
  }

  function addEmptyCards(poems: Poem[]) {
    const emptyCardsCount = Math.floor(poems.length * 0.5); // 50% of the cards will be empty cards
    for (let i = 0; i < emptyCardsCount; i++) {
      const emptyCard: Poem = { id: null, slug: '', title: '', author: '', content: '', keywords: '', similars: []};
      const randomIndex = Math.floor(Math.random() * poems.length);
      poems.splice(randomIndex, 0, emptyCard);
    }
    setPoems(poems);
  }

  async function getAllPoems() {
    setPoems([]);
    const response = await fetch(`${apiUrl}/api/poems?random=true`);
    const data = await response.json();
    emptyCards ? addEmptyCards(data) : setPoems(data);
  }

  async function getSimilarPoems(pid: string) {
    setPoems([]);
    const response = await fetch(`${apiUrl}/api/poems/${pid}/similar`);
    const data = await response.json();
    emptyCards ? addEmptyCards(data) : setPoems(data);
  }

  const contextValue: PoemContextType = {
    currentPoemSimilars,
    addPoemSimilars,
    similarPoemsList,
    poems,
    getAllPoems,
    getSimilarPoems,
    myPoems,
    setMyPoems,
    navBarColor,
    setNavBarColor,
    showTutorial,
    setShowTutorial,
    showTravelPopOver,
    setShowTravelPopOver,
  };
  return <PoemContext.Provider value={contextValue}>{children}</PoemContext.Provider>;
}
