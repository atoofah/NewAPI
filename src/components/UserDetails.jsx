import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "react-query";
import { axiosInstance } from "../api/axios.config";
import ImageSkeleton from "../shared/imageSkeleton";

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

  // use query
  const getUser = async () => {
    const { data } = await axiosInstance.get(`/users/${id}`);
    console.log(data);
    return data;
  };

  const { isLoading, isError, isFetching, data } = useQuery(["user", id], () =>
    getUser()
  );

  if (isLoading) return <ImageSkeleton isCenter />;
  return (
    <div className="flex flex-col items-center">
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
