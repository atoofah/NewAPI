import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { axiosInstance } from "../api/axios.config";
import Checkbox from "../shared/Checkbox/Checkbox";
import ImageSkeleton from "../shared/imageSkeleton";
import Select from "../shared/select/Select";
import User from "./User";
import UserDetails from "./UserDetails";

const Users = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState(-1);
  const [limit, setLimit] = useState(30);
  const [queryParams, setQueryParams] = useState({
    ip: "",
    password: "",
    domain: "",
  });

  // use query
  const getUserList = async () => {
    const { ip, password, domain } = queryParams;
    const { data } = await axiosInstance.get(
      `/users?limit=${limit}&select=image${ip}${password}${domain}`
    );
    // console.log(data);
    return data;
  };

  const { isLoading, isError, isFetching, data } = useQuery(
    ["users", queryParams, limit],
    () => getUserList()
  );

  const onQueryParamChanged = (e) => {
    const { name, checked } = e.target;
    setQueryParams({ ...queryParams, [name]: checked ? `,${name}` : "" });
  };

  // useEffect(() => {
  //   const { ip, password, domain } = queryParams;
  //   axiosInstance
  //     .get(`/users?limit=${limit}&select=image${ip}${password}${domain}`)
  //     .then((res) => setUserList(res.data.users))
  //     .catch((err) => console.log(err))
  //     .finally(() => setIsLoading(false));
  // }, [limit, queryParams]);

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
          <Select
            id="limit"
            label={"limit:"}
            optionList={[30, 50, 100]}
            onChange={(e) => setLimit(e.target.value)}
          />
          <div className="flex items-center justify-center mb-5 mt-5 ">
            <Checkbox
              label="IP"
              onChange={onQueryParamChanged}
              name="ip"
              checked={queryParams.ip}
            />
            <Checkbox
              label="Password"
              onChange={onQueryParamChanged}
              name="password"
              checked={queryParams.password}
            />
            <Checkbox
              label="Domain"
              onChange={onQueryParamChanged}
              name="domain"
              checked={queryParams.domain}
            />
          </div>

          <div className="grid grid-cols-grid-layout gap-4">
            {data.users.map((user) => (
              <User key={user.id} {...user} setUserId={setUserId} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Users;
