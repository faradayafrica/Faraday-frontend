import "../../styles/loader.scss";

function Loader({ msg }) {
  return (
    <>
      <div className="p-3 border-brand-highlight rounded-lg border bg-background">
        <div className="text-xl w-full scale-[60%] row  items-center justify-center mx-auto">
          <div className=" w-100 text-center mb-6">{msg}</div>

          <div className="loader"></div>
        </div>
      </div>
    </>
  );
}

export default Loader;
