import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios.config";
import Checkbox from "../shared/Checkbox/Checkbox";
import ImageSkeleton from "../shared/imageSkeleton";
import Select from "../shared/select/Select";
import User from "./User";
import UserDetails from "./UserDetails";

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState(-1);
  const [limit, setLimit] = useState(30);
  const [queryParams, setQueryParams] = useState({
    pi: null,
    password: null,
    domain: null,
  });

  const onQueryParamChanged = (e) => {
    const { name, checked } = e.target;
    setQueryParams({ ...queryParams, [name]: checked });
  };

  useEffect(() => {
    axiosInstance
      .get(`/users?limit=${limit}&select=image,ip, password, domain`)
      .then((res) => setUserList(res.data.users))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [limit]);

  if (isLoading)
    return (
      <div className="grid grid-cols-grid-layout gap-4">
        {Array(20)
          .fill(1)
          .map((_, idx) => (
            <ImageSkeleton key={idx} />
          ))}
      </div>
    );

  return (
    <>
      {userId > 0 ? (
        <UserDetails id={userId} setUserId={setUserId} />
      ) : (
        <>
          <div className="flex items-center justify-center mb-5">
            <Checkbox
              label="IP"
              value=""
              onChange={onQueryParamChanged}
              name="ip"
            />
            <Checkbox
              label="Password"
              value=""
              onChange={onQueryParamChanged}
              name="password"
            />
            <Checkbox
              label="Domain"
              value=""
              onChange={onQueryParamChanged}
              name="domain"
            />
          </div>

          <Select
            id="limit"
            label={"limit:"}
            optionList={[30, 50, 100]}
            onChange={(e) => setLimit(e.target.value)}
          />
          <div className="grid grid-cols-grid-layout gap-4">
            {userList.map((user) => (
              <User key={user.id} {...user} setUserId={setUserId} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Users;
