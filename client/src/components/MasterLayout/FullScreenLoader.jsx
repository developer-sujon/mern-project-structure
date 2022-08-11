//External lib Import
import { useSelector } from "react-redux";

const FullScreenLoader = () => {
  const loader = useSelector((state) => state.setting.isLoading);

  return (
    <div className={loader ? "loading__overlay" : "hidden"}>
      <div className="indeterminate"></div>
    </div>
  );
};

export default FullScreenLoader;
