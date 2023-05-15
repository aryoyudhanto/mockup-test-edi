import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import Logo from "../assets/85f05b1bc2f2355c406d096fc8f8a476.png";

const Navbar = () => {
  const [cookie, _setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  function onLogout() {
    Swal.fire({
      title: "Are you sure want to logout?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Logout successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        removeCookie("token");
        navigate("/");
      }
    });
  }

  return (
    <div className="navbar bg-white shadow-md sticky top-0 z-50">
      <div className="flex-1 ml-5 md:ml-10">
        <Link to="/">
          <img
            src={Logo}
            className="btn btn-ghost"
            alt="logo-pgn"
            width={150}
            height={20}
          />
        </Link>
      </div>
      <div className="flex-none mr-0 md:mr-5">
        <ul className="menu menu-horizontal p-0">
          <li className="text-black font-bold">Test Project</li>
        </ul>
      </div>
      <div className="dropdown dropdown-end mr-5 md:mr-10 ">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="logo-user"
              width={20}
              height={20}
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 p-2 shadow-xl menu menu-compact dropdown-content bg-white rounded-box w-52"
        >
          <li className="text-black">
            <Link to="/home">
              <p className="active:bg-gray-500">Home</p>
            </Link>
            {cookie.token ? (
              <>
                <Link to="/mudik">
                  <p className="active:bg-gray-500">Tiket Mudik</p>
                </Link>
                <Link to="/verif">
                  <p className="active:bg-gray-500">Verifikasi Tiket</p>
                </Link>
                <p className="active:bg-gray-500" onClick={() => onLogout()}>
                  Logout
                </p>
              </>
            ) : (
              <p
                className="active:bg-gray-500"
                onClick={() => navigate("/login")}
              >
                Login
              </p>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
