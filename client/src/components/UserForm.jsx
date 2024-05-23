import React, { useEffect, useState } from 'react'

function UserForm({ currentUser, onSave }) {

    const [user, setUser] = useState({ name: '', email: '', password: '', date_of_birth: '' });

    useEffect(() => {
        if (currentUser) {
            setUser(currentUser);
        } else {
            setUser({ name: '', email: '', password: '', date_of_birth: '' });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(user);
        setUser({ name: '', email: '', password: '', date_of_birth: '' });
    };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={user.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={user.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={user.password} onChange={handleChange} required />
            </div>
            <div>
                <label>Date of Birth:</label>
                <input type="date" name="date_of_birth" value={user.date_of_birth} onChange={handleChange} required />
            </div>
            <button type="submit">Save</button>
        </form>
    </div>
  )
}

export default UserForm