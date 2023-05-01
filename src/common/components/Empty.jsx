import empty from "../assets/empty.svg";

const Empty = ({ msg }) => {
  return (
    <div className="text-center bg- h-auto">
      <img src={empty} className="h-40 w-40 m-auto my-8 " alt="" />

      <p className="text-xs text-secondary-text">{msg}</p>
    </div>
  );
};

export default Empty;
