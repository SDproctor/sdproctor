import React, { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("https://api.amaanatmedical.com/api/users");

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
          //console.log(data)
        } else {
          // Handle error response
          console.error("Failed to fetch users data");
        }
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    getUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://api.amaanatmedical.com/api/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("User deleted successfully");
        // Update the users state after successful deletion
        setUsers(users.filter((user) => user.id !== userId));
      } else {
        console.error("Failed to delete user");
        // Handle error scenarios
      }
    } catch (error) {
      console.error("Error while deleting user", error);
    }
  };

  return (
    <div className="user-container">
      <h1>Admin's Page (Users)</h1>

      <table style={{ borderSpacing: "30px" }}>
        <thead>
          <tr style={{ color: "#03045E" }}>
            <th style={{ width: "25%" }}>Name</th>
            <th style={{ width: "30%" }}>Email</th>
            <th>Role</th>
            <th style={{ width: "20%" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, id) => {
            return (
              <tr key={id} id="tr">
                <td style={{ marginTop: "10em" }}>{user.name}</td>
                <td>{user.email}</td>
                <td>Users</td>
                <td id="action">
                  <button id="delete-btn" onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export { Users };
