import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="text-Black p-4 flex justify-between items-center border-t-4 border-[#6947BF]">
      <div className="text-2xl font-bold">
        <Link to="/">ZuAI</Link>
      </div>
      <div className="space-x-4">
        <Link
          to="/login"
          className="hover:underline bg-[#EAF0F2] border-2 rounded-full py-2 px-4"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="hover:underline text-white bg-[#6947BF] border-2 border-[#6947BF] rounded-full py-2 px-4"
        >
          Join Now
        </Link>
      </div>
    </header>
  );
}

export default Header