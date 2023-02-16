import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import Pagination from "../shared/Pagination";
import Spinner from "../shared/Spinner";
import TextSkeleton from "../shared/TextSkeleton";
import Post from "./Post";

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  // use query
  const getPostList = async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${currentPage}`
    );

    return data;
  };

  const { isLoading, isError, isFetching, data, error } = useQuery(
    ["posts", currentPage],
    () => getPostList()
  );

  const onClickNextHandler = () => {
    if (currentPage <= 1) return;
    setCurrentPage((prev) => prev + 1);
  };
  const onClickPrevHandler = () => {
    setCurrentPage((prev) => prev - 1);
  };

  if (isError && error.response.status === 404) {
    return <h3>{error.message}</h3>;
  }
  if (isLoading)
    return (
      <div className="grid grid-cols-grid-layout gap-4">
        {Array(12)
          .fill(1)
          .map((_, idx) => (
            <TextSkeleton key={idx} />
          ))}
      </div>
    );
  return (
    <>
      {isFetching ? <Spinner /> : null}

      <div className="grid grid-cols-grid-layout gap-4">
        {data?.map((item) => {
          return <Post key={item.id} {...item} />;
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        lastPage={(100 / limit).toFixed()}
        total={100}
        onClickPrev={onClickPrevHandler}
        onClickNext={onClickNextHandler}
        isNextBtnDisabled={currentPage === (100 / limit).toFixed()}
        isPrevBtnDisabled={currentPage === 1}
      />
    </>
  );
};

export default Posts;
