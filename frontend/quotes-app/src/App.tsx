import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import useQuotes from "./hooks/useQuotes";
import useTags from "./hooks/useTags";

const App: React.FC = () => {
  const [count, setCount] = useState<number>(1);

  const { tags, loading: loadingTags, error } = useTags();
  const { quotes, loading: loadingQuotes, fetchQuotes } = useQuotes();

  const onRefresh = (count: number, tags: string[]) => {
    fetchQuotes(count, tags);
    setCount(count);
  }

  useEffect(() => {
    fetchQuotes(count, []);
  }, []);

  return (
    <div>
      <Header
        error={error}
        loading={loadingTags}
        availableTags={tags}
        onRefresh={onRefresh}
      />
      <Content isLoading={loadingQuotes} quotes={quotes} quoteCount={count} />
    </div>
  );
};

export default App;
