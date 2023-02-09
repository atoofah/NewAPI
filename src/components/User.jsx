import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const User = ({ id, image, setUserId }) => {
  return (
    <div
      className="flex justify-center text-center border-2 border-indigo-500 rounded-md hover:bg-indigo-500 duration-300 cursor-pointer"
      onClick={() => setUserId(id)}
    >
      <LazyLoadImage
        alt={image.alt}
        src={`${image}?size=150x150&set=set1`}
        effect="blur"
      />
    </div>
  );
};

export default User;
