import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageEntities = () => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');

  // Example User List for Dropdown
  const users = [
    { id: 'cat-name', label: 'Cat Name' },
    { id: 'meme-suggestion', label: 'Meme Suggestion' }
  ];

  useEffect(() => {
    fetchEntities();
  }, [selectedUser]);

  const fetchEntities = async () => {
    try {
      setLoading(true);
      const url = selectedUser
        ? `http://localhost:4000/api/entities?created_by=${selectedUser}`
        : 'http://localhost:4000/api/entities';

      const response = await axios.get(url);
      setEntities(response.data);
    } catch (error) {
      console.error('Error fetching entities:', error);
      alert('Failed to fetch entities');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manage-entities-container">
      <h1>Manage Entities</h1>

      {/* Dropdown to filter by created_by */}
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">All Entities</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.label}
          </option>
        ))}
      </select>

      {loading ? <p>Loading...</p> : (
        <ul>
          {entities.map(entity => (
            <li key={entity._id}>
              <strong>{entity.name}</strong>: {entity.description}
              <p>Created by: {entity.created_by}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageEntities;
