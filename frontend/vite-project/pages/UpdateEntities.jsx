import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateEntities = () => {
  const { id } = useParams(); // Get ID from route params
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users and entity details when component mounts
  useEffect(() => {
    fetchUsers();
    if (id) {
      fetchEntity();
    }
  }, [id]);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users');
    }
  };

  // Fetch existing entity details
  const fetchEntity = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:4000/api/entities/${id}`);
      const entity = response.data;
      setName(entity.name);
      setDescription(entity.description);
      setUserId(entity.userId.toString());
    } catch (error) {
      console.error('Error fetching entity:', error);
      alert('Failed to fetch entity');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim() || !description.trim() || !userId) {
      alert('Name, Description, and User are required');
      return;
    }

    try {
      setLoading(true);
      await axios.put(`http://localhost:4000/api/entities/${id}`, {
        name,
        description,
        userId: parseInt(userId, 10),
      });
      alert('Entity updated successfully');
      navigate('/'); // Redirect to home after update
    } catch (error) {
      console.error('Error updating entity:', error);
      alert('Failed to update entity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-entity-container">
      <h1>Update Entity</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Created By:</label>
          <select
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
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Entity'}
        </button>
      </form>
    </div>
  );
};

export default UpdateEntities;