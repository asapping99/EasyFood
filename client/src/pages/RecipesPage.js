import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, CardContent, Typography, Container } from '@mui/material';

function RecipesPage() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const load = async () => {
    const res = await fetch(`/api/recipes?page=${page}&size=10`);
    const data = await res.json();
    if (data.length < 10) setHasMore(false);
    setItems(prev => [...prev, ...data]);
    setPage(p => p + 1);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <InfiniteScroll
        dataLength={items.length}
        next={load}
        hasMore={hasMore}
        loader={<h4>로딩중...</h4>}
      >
        {items.map(r => (
          <Card key={r.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{r.title}</Typography>
              <Typography>{r.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </InfiniteScroll>
    </Container>
  );
}

export default RecipesPage;
