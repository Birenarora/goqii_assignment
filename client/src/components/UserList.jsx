import React from "react";

function UserList({ users, onEdit, onDelete }) {
  return (
    <div>
      <h2>Users List</h2>
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date Of Birth</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        {(users && users.length > 0) ? users.map((user) => {
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.dob}</td>
                    <td><button onClick={() => onEdit(user)}>Edit</button><button onClick={() => onDelete(user.id)}>Delete</button></td>
                </tr>
            )
        }) : <tr><td>No Data</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
