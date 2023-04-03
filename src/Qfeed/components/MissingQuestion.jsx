// import arrowRight from "../assets/arrow-right.svg";
import { Link } from "react-router-dom";

const MissingQuestion = ({ history }) => {
  return (
    <div className='bg-white absolute top-0 left-0 w-full h-screen flex justify-center'>
      <div className='max-w-[450px] p-2 sm:max-w-[400px] mt-28 text-center'>
        <h1 className='text-2xl sm:text-2xl font-bold m-0 mx-auto'>
          Question is missing
        </h1>
        <div className='p-3  rounded-lg border bg-background mt-3 text-center'>
          <p className='text-sm sm:text-base '>
            We can't find this question at the moment. It is either parmanently
            deleted or was never created.
          </p>
          <Link to='/'>
            <button className='cursor:pointer mx-auto px-4 py-[9px] rounded-lg font-semibold text-white bg-brand hover:bg-brand-dark'>
              Return to Qfeed
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MissingQuestion;
