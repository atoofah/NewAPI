const Tab = ({ isActive, children, onClick }) => {
  return (
    <div
      className={`mx-3 ${
        isActive
          ? "bg-indigo-600 hover:bg-indigo-700 "
          : "bg-gray-600 hover:bg-gary-700"
      } rounded-md p-2 cursor-pointer duration-300 text-sm`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Tab;
