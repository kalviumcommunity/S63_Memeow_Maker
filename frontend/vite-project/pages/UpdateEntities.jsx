import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateEntities = () => {
  const { id } = useParams(); // Get ID from route params
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch existing entity details when component mounts
  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/entities/${id}`);
        setName(response.data.name);
        setDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching entity:', error);
        alert('Failed to fetch entity');
      }
    };

    if (id) {
      fetchEntity(); // Trigger fetch only if ID is available
    }
  }, [id]); // Include id in dependency array

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      alert('Name and Description are required');
      return;
    }

    try {
      setLoading(true);
      await axios.put(`http://localhost:4000/api/entities/${id}`, {
        name,
        description,
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
    <div>
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
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Entity'}
        </button>
      </form>
    </div>
  );
};

export default UpdateEntities;
