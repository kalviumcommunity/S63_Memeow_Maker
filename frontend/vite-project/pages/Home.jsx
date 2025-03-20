import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch existing entities from the server
  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/entities');
        setEntities(response.data);
      } catch (error) {
        console.error('Error fetching entities:', error);
        alert('Failed to fetch entities');
      }
    };

    fetchEntities();
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !description.trim()) {
      alert('Name and Description are required');
      return;
    }

    const newEntity = { name, description };

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:4000/api/entities', newEntity);
      setEntities([...entities, response.data]);
      setName('');
      setDescription('');
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
      setEntities(entities.filter((entity) => entity._id !== id));
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
    <div className="add-entity-container">
      <h1>Add Entity</h1>
      <form onSubmit={handleSubmit}>
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
          {loading ? 'Adding...' : 'Add Entity'}
        </button>
      </form>

      <h2>Entities List</h2>
      <ul>
        {entities.map((entity) => (
          <li key={entity._id}>
            <strong>{entity.name}</strong>: {entity.description}
            <button onClick={() => handleUpdate(entity._id)}>Edit</button>
            <button onClick={() => handleDelete(entity._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
