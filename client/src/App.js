import React, { useState, useEffect } from "react";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "./services/UserService";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [addUserFlag, setAddUserFlag] = useState(false)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleSave = async (user) => {
    let payload = {};
    payload = {
      name: user.name,
      email: user.email,
      password: user.password,
      date_of_birth: user.date_of_birth,
    };
    try {
      if (user.id) {
        payload = { ...payload, id: user.id.toString(), action: "modifyUser" };

        const response = await updateUser(payload);

        if (response.data) {
          alert(response.data.message);
        }
      } else {
        const response = await createUser(payload);

        if (response.data) {
          alert(response.data.message);
        }
      }
      fetchData();
      setCurrentUser(null);
      setAddUserFlag(false)
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setAddUserFlag(true)
  };

  const handleDelete = async (id) => {
    const payload = {
      id: id.toString(),
      action: "deleteUser",
    };

    try {
      const response = await deleteUser(payload);
      if (response.data) {
        alert(response.data.message);
      }
      fetchData();
      setAddUserFlag(false)
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Goqii Assignment</h1>
      <button onClick={() => setAddUserFlag(!addUserFlag)}>Add User</button>
      {addUserFlag && <UserForm currentUser={currentUser} onSave={handleSave} />}
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
