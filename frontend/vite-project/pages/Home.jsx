import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]);
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch users and entities when component mounts
  useEffect(() => {
    fetchUsers();
    fetchEntities();
  }, []);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/users');
      setUsers(response.data);
      // Set default selected user if users exist
      if (response.data.length > 0) {
        setUserId(response.data[0].id.toString());
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // Fetch existing entities from the server
  const fetchEntities = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/entities');
      setEntities(response.data);
    } catch (error) {
      console.error('Error fetching entities:', error);
      alert('Failed to fetch entities');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !description.trim() || !userId) {
      alert('Name, Description, and User are required');
      return;
    }

    const newEntity = { name, description, userId: parseInt(userId, 10) };

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:4000/api/entities', newEntity);
      setEntities([...entities, response.data]);
      setName('');
      setDescription('');
      // Keep the selected user
    } catch (error) {
      console.error('Error adding entity:', error);
      alert('Failed to add entity. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/entities/${id}`);
      setEntities(entities.filter((entity) => entity.id !== id));
    } catch (error) {
      console.error('Error deleting entity:', error);
      alert('Failed to delete entity.');
    }
  };

  // Handle update (redirect to UpdateEntities page)
  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="add-entity-container slide-up">
      <h1>Add New Entity</h1>
      
      <div className="card p-4 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="entity-name">Name:</label>
            <input
              id="entity-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter entity name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="entity-description">Description:</label>
            <textarea
              id="entity-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter entity description"
              rows="3"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="entity-user">Created By:</label>
            <select
              id="entity-user"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            >
              <option value="">Select a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.username})
                </option>
              ))}
            </select>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Entity'}
          </button>
        </form>
      </div>

      <div className="entities-list">
        <h2>Entities List</h2>
        {loading ? (
          <p className="text-center">Loading entities...</p>
        ) : entities.length === 0 ? (
          <p className="text-center">No entities found.</p>
        ) : (
          <ul>
            {entities.map((entity) => (
              <li key={entity.id} className="entity-item">
                <h3>{entity.name}</h3>
                <p>{entity.description}</p>
                <p className="entity-creator">
                  Created by: {entity.creator ? entity.creator.name : 'Unknown'}
                </p>
                <div className="entity-actions">
                  <button 
                    onClick={() => handleUpdate(entity.id)}
                    className="btn-secondary"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(entity.id)}
                    className="btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;