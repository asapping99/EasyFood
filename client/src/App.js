import React, { useEffect, useState } from 'react';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/api/recipes')
      .then(res => res.json())
      .then(setRecipes)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>EasyFood Recipes</h1>
      <ul>
        {recipes.map(r => (
          <li key={r.id}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
