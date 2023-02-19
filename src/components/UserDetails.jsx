import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery, useQueryClient } from "react-query";
import { axiosInstance } from "../api/axios.config";
import useFetcher from "../hooks/useFetcher";
import ImageSkeleton from "../shared/imageSkeleton";
import CachedEmoji from "./CachedEmoji";

const UserDetails = ({ id, setUserId }) => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [user, setUser] = useState({});
  // useEffect(() => {
  //   axiosInstance
  //     .get(`/users/${id}`)
  //     .then((res) => setUser(res.data))
  //     .catch((err) => console.log(err))
  //     .finally(() => setIsLoading(false));
  // }, []);
  const queryClient = useQueryClient();
  const isCached = queryClient.getQueryData(["user", id]);
  // use query
  const { isLoading, data } = useFetcher(
    ["user", id],
    `https://dummyjson.com/users/${id}`
  );

  if (isLoading) return <ImageSkeleton isCenter />;
  return (
    <div className="flex flex-col items-center">
      <CachedEmoji isCached={isCached} />
      <div className="cursor-pointer" onClick={() => setUserId(-1)}>
        back
      </div>
      <LazyLoadImage
        alt={data.firstName}
        height={300}
        src={data.image}
        width={250}
        effect="blur"
      />
    </div>
  );
};

export default UserDetails;
