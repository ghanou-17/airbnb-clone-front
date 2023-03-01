import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import UserService from "../../public/services/users.service";
import { useRouter } from "next/router";

const ProfilCard = (props) => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(currentUser.user);
  const [editing, setEditing] = useState(false);
  const [modal, setmodal] = useState(false);

  useEffect(() => {
    loadProfil();
  }, []);

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  async function loadProfil() {
    try {
      const response = await props.user;
      response && setUser(props.user);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p className="text-2xl font-bold text-center mt-52">Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const editUser = () => {
    let jwt = JSON.parse(localStorage.getItem("Auth"));

    let form = {
      avatar: user.avatar,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    UserService.editMe(jwt, form).then(() => {
      router.reload();
    });
  };

  return (
    <div className="mx-auto mt-52 border border-slate-200 p-8 rounded-lg xl:w-1/3 lg:w-1/2 md:w-1/2 sm:w-3/4">
      {user && (
        <>
          {editing ? (
            <div className="relative">
              <input
                className="rounded-xl w-full p-2 px-3  bg-white"
                type="text"
                value={user.firstName}
                onChange={(e) => {
                  const newUser = { ...user };
                  newUser.firstName = e.target.value;
                  setUser(newUser);
                }}
                placeholder={user.firstName}
              />
              <br />
              <input
                className="mt-2 rounded-xl w-full p-2 px-3 bg-white"
                type="text"
                value={user.lastName}
                onChange={(e) => {
                  const newUser = { ...user };
                  newUser.lastName = e.target.value;
                  setUser(newUser);
                }}
                placeholder={user.lastName}
              />
              <br />
              <input
                className="mt-2 rounded-xl w-full p-2 px-3 bg-white"
                type="text"
                value={user.email}
                onChange={(e) => {
                  const newUser = { ...user };
                  newUser.email = e.target.value;
                  setUser(newUser);
                }}
                placeholder={user.email}
              />
              <br />

              <div className="flex justify-between">
                {currentUser && currentUser.isAdmin ? (
                  <div className="mt-4">
                    Admin:{" "}
                    <span
                      className="ml-2 cursor-pointer font-bold rounded-full border p-1"
                      onClick={() => {
                        const newUser = { ...user };
                        newUser.isAdmin = !newUser.isAdmin;
                        setUser(newUser);
                      }}
                    >
                      {user.isAdmin ? "YES" : "NO"}{" "}
                    </span>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <button
                type="button"
                className="rounded mt-6 bg-slate-900 absolute right-0 border py-2 px-4 text-white"
                onClick={() => editUser()}
              >
                Valider
              </button>
            </div>
          ) : (
            <div className="flex justify-between">
              <div className="py-2">
                <li className="my-1">
                  FIRSTNAME: <span className="font-bold">{user.firstName}</span>{" "}
                </li>
                <li className="my-1">
                  LASTNAME: <span className="font-bold">{user.lastName}</span>{" "}
                </li>
                <li className="my-1">
                  EMAIL: <span className="font-bold">{user.email}</span>{" "}
                </li>
                <li className="my-1">
                  {" "}
                  You are a{" "}
                  <span className="font-bold">
                    {" "}
                    {user.type == "OWNER" ? "OWNER" : "CUSTOMER"}
                  </span>{" "}
                </li>
                {currentUser && currentUser.isAdmin && (
                  <li className="my-1">
                    ADMIN:{" "}
                    <span className="font-bold">
                      {user.isAdmin ? "YES" : "NO"}
                    </span>{" "}
                  </li>
                )}
              </div>
            </div>
          )}
          <div className="flex w-full justify-center">
            <button
              className="rounded mt-2 w-20 bg-red-600 text-white border py-2 px-3"
              onClick={() => setEditing(!editing)}
            >
              {" "}
              Edit
            </button>
          </div>
        </>
      )}
      {modal && (
        <div className="fixed top-24 mx-auto">
          <Alert type="success">
            <div>
              <span>User editing successfull ! </span>{" "}
              <span
                className="w-full cursor-pointer"
                onClick={() => setmodal(false)}
              >
                X
              </span>
            </div>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default ProfilCard;
