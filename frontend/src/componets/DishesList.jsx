import React, { useState, useEffect } from 'react';
import Dish from './Dish';
import axios from 'axios';
import io from 'socket.io-client';

const DishesList = () => {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/dishes'); 
        setDishes(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const socket = io('/');
    socket.on('dishUpdated', (updatedDish) => {
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish._id === updatedDish._id ? updatedDish : dish
        )
      );
    });

    return () => {
      socket.disconnect();
    };

  }, []);

  const handleTogglePublished = async (dishId, updatedIsPublished) => {
    try {
      const response = await axios.patch(`/api/dishes/${dishId}/toggle`, { isPublished: updatedIsPublished });
      const updatedDishes = dishes.map(dish => (dish._id === dishId ? { ...dish, isPublished: updatedIsPublished } : dish));
      setDishes(updatedDishes);
    } catch (error) {
      console.error('Error toggling published status:', error);
      
    }
  };

  return (
    <div className="dishes-list">
      {isLoading && <p>Loading dishes...</p>}
      {error && <p>Error loading dishes: {error.message}</p>}
      {dishes.map(dish => (
        <Dish key={dish.dishId} dish={dish} onTogglePublished={handleTogglePublished} />
      ))}
    </div>
  );
};

export default DishesList;
