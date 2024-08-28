import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="text-Black p-4 flex justify-between items-center border-t-4 border-[#6947BF] sticky top-0 z-50 bg-white">
      <div className="text-2xl font-bold text-black">
        <Link to="/">ZuAI</Link>
      </div>
      <div className="space-x-4">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="hover:underline bg-[#5B6170] border-2  text-[#EAF0F2] rounded-full py-2 px-4"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:underline bg-[#EAF0F2] text-[#5B6170] border-2 rounded-full py-2 px-4"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="hover:underline text-white bg-[#6947BF] border-2 border-[#6947BF] rounded-full py-2 px-4"
            >
              Join Now
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;