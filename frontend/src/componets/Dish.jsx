
import React from 'react';
import './Dish.css'; 

const Dish = ({ dish, onTogglePublished }) => {
  const handleTogglePublished = () => {
    onTogglePublished(dish._id, !dish.isPublished); 
  };

  return (
    <div className="dish">
      <img src={dish.imageUrl} alt={dish.dishName} />
      <h3>{dish.dishName}</h3>
      <button style={{
        backgroundColor: dish.isPublished ? 'green' : 'red',
        color: 'white',
        padding: '10px 20px'
      }}
      onClick={handleTogglePublished}>
        {dish.isPublished ? 'Unpublish' : 'Publish'}
      </button>
    </div>
  );
};

export default Dish;