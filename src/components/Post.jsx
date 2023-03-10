import { useQueryClient } from "react-query";
import { txtSlicer } from "../utils/func";
import CachedEmoji from "./CachedEmoji";

const Post = ({ id, title, body, setPostId }) => {
  return (
    <div
      className="flex flex-col  border-2 border-indigo-500 rounded-md mb-5 p-4"
      onClick={() => setPostId(id)}
    >
      <div> id:{id}</div>
      <h1> title:{title}</h1>
      <div> body:{txtSlicer(body, 80)}</div>
    </div>
  );
};

export default Post;
