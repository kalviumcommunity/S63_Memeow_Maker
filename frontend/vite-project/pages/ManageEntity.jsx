import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ManageEntities = () => {
  const [entities, setEntities] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Parse URL parameters when component mounts
    const searchParams = new URLSearchParams(location.search);
    const userParam = searchParams.get('user');
    if (userParam) {
      setSelectedUser(userParam);
    }
    
    // Fetch users when component mounts
    fetchUsers();
  }, [location.search]);

  useEffect(() => {
    // Fetch entities when selectedUser changes
    fetchEntities();
    
    // Update URL when selectedUser changes (but not on initial load)
    if (selectedUser) {
      navigate(`/ManageEntity?user=${selectedUser}`, { replace: true });
    } else if (location.search) {
      navigate('/ManageEntity', { replace: true });
    }
  }, [selectedUser, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchEntities = async () => {
    try {
      setLoading(true);
      let url;
      
      if (selectedUser) {
        // Use the correct endpoint for filtering by user ID
        url = `http://localhost:4000/api/entities?userId=${selectedUser}`;
      } else {
        url = 'http://localhost:4000/api/entities';
      }

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
    <div className="manage-entities-container slide-up">
      <h1>Manage Entities</h1>
      
      <div className="card p-4 mb-4">
        <h2 className="mb-3">Filter Options</h2>
        
        {/* Dropdown to filter by user */}
        <div className="filter-container">
          <label htmlFor="user-filter">Filter by User:</label>
          <select
            id="user-filter"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="mb-3"
          >
            <option value="">All Entities</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.username})
              </option>
            ))}
          </select>
          
          {selectedUser && (
            <button 
              className="btn-secondary mt-2"
              onClick={() => setSelectedUser('')}
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center p-5">
          <p>Loading entities...</p>
        </div>
      ) : (
        <div className="entities-list">
          <h2>
            {selectedUser 
              ? `Entities by ${users.find(u => u.id.toString() === selectedUser)?.name || 'Selected User'}` 
              : 'All Entities'}
          </h2>
          
          {entities.length === 0 ? (
            <div className="text-center p-5">
              <p>No entities found.</p>
              <p className="mt-2">
                {selectedUser 
                  ? 'Try selecting a different user or clear the filter.' 
                  : 'Add some entities to get started!'}
              </p>
            </div>
          ) : (
            <div className="entity-grid">
              {entities.map(entity => (
                <div key={entity.id} className="entity-item card">
                  <h3>{entity.name}</h3>
                  <p>{entity.description}</p>
                  <p className="entity-creator">
                    <span className="badge badge-secondary">
                      Created by: {entity.creator ? entity.creator.name : 'Unknown'}
                    </span>
                  </p>
                  <div className="entity-actions mt-3">
                    <button 
                      className="btn-secondary"
                      onClick={() => navigate(`/update/${entity.id}`)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageEntities;