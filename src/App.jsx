import React, { useCallback, useEffect, useState } from "react";
import InfiniteScrollList from "components/infiniteScrollList";
import styled from "styled-components";
import PropTypes from "prop-types";
import HayanMind from "service/hayanmind";
import CommentItem from "components/commentItem/commentItem";
import { START_PAGE } from "utils/constants";

function App({ hayanmind }) {
  const [page, setPage] = useState(START_PAGE);
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    hayanmind.comments(page).then((comments) => {
      setComments((prev) => [...prev, ...comments]);
      setIsLoading(false);

      if (comments.length > 0) {
        setHasMore(true);
        setIsLoading(true);
      } else {
        setHasMore(false);
      }
    });
  }, [hayanmind, page]);

  const loadMore = useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  return (
    <Container>
      <InfiniteScrollList
        hasMore={hasMore}
        loadMore={loadMore}
        isLoading={isLoading}
      >
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </InfiniteScrollList>
    </Container>
  );
}

export default App;

App.propTypes = {
  hayanmind: PropTypes.instanceOf(HayanMind),
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
