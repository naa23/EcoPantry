import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const fetchRecipeItems = async () => {
    setLoading(true);
    try {
      const response = await UserService.FetchRecipeItems(); 
      const { items } = response.data;
      setRecipes(items);
    } catch (error) {
      console.error("Error fetching recipe items:", error);
    } finally {
      setTimeout(() => setLoading(false), 4000);
    }
  };

  useEffect(() => {
    fetchRecipeItems();
  }, []);

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className='mt-10 flex flex-col items-center'>
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-200 text-xl">
          <p>Loading recipes...</p>
          <div className="loader mt-4"></div>
        </div>
      ) : (
        <div className='grid grid-cols-3 gap-40 mt-6 items-center justify-center'>
          {recipes.map((recipe, index) => (
            <div key={index} className='w-[250px] h-auto rounded-3xl bg-white p-4 flex flex-col items-center'>
              <img src={recipe.imageUrl} alt={recipe.name} className='w-36 h-36 mt-4 rounded-2xl' />
              <p className='font-bold text-lg mt-4 text-center'>{recipe.name}</p>
              <p className='mt-2 text-gray-700'>{recipe.time}</p>
              <button 
                onClick={() => handleViewRecipe(recipe)}
                className='bg-green-100 hover:bg-green-600 rounded-lg text-sm text-green-600 hover:text-white font-semibold mt-4 w-28 h-10'>
                View Recipe
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedRecipe && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='relative bg-white rounded-lg p-6 w-96'>
            <button 
              onClick={closeModal} 
              className='absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold'
              aria-label="Close modal">
              &times;
            </button>
            <img src={selectedRecipe.imageUrl} alt={selectedRecipe.name} className='w-full h-40 rounded-lg' />
            <h3 className='text-xl font-bold mt-4'>{selectedRecipe.name}</h3>
            <p className='mt-2 text-gray-700'>{selectedRecipe.time}</p>
            <p className='mt-4 text-sm'>{selectedRecipe.instructions}</p>
          </div>
        </div>
      )}

      {!loading && (
        <div className='flex items-center justify-center bg-gray-300 w-full h-[100px] mt-60'>
          <p>Created By Team Steam Sustain | © All Rights Reserved</p>
        </div>
      )}

      <style>
        {`
          .loader {
            border: 4px solid #f3f3f3; /* Light grey */
            border-top: 4px solid #3498db; /* Blue */
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Recipes;
