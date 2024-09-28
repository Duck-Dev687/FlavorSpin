// Your Tasty API Key
const apiKey = '708341e91cmsha693c16a8a30723p1a731bjsndff5df3759ec'; // Replace with your actual API key
const wheel = document.getElementById('wheel');
const recipeItem = document.getElementById('recipe-item');

// Fetch a list of recipes from Tasty API
async function fetchRecipes() {
  const response = await fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'tasty.p.rapidapi.com',
      'x-rapidapi-key': apiKey
    }
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.results; // Return the list of recipes
}

// Spin the wheel and display a random recipe
async function spinWheel() {
  // Show loading image
  recipeItem.style.display = 'none';
  wheel.classList.add('spinning'); // Add spinning class

  // Fetch recipes
  const recipes = await fetchRecipes();

  // Pick a random recipe from the list
  const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];

  // Wait for a brief moment before stopping the wheel
  setTimeout(() => {
    wheel.classList.remove('spinning'); // Remove spinning class
    recipeItem.style.display = 'block'; // Show recipe item
    displayRecipe(randomRecipe); // Display the recipe
  }, 500); // Match the duration of the spinning animation
}

// Display the recipe details on the page
function displayRecipe(recipe) {
  const recipeImage = document.getElementById('recipe-image');
  const recipeTitle = document.getElementById('recipe-title');
  const recipeLink = document.getElementById('recipe-link');

  recipeImage.src = recipe.thumbnail_url || 'https://via.placeholder.com/300';
  recipeTitle.textContent = recipe.name;
  recipeLink.href = recipe.original_video_url || recipe.url; // Link to the recipe
}

// Event listener for wheel click
wheel.addEventListener('click', spinWheel);

document.addEventListener("DOMContentLoaded", function() {
  const colors = ["#81C784", "#FF6F61", "#FFD54F", "#FFB74D"];
  const heading = document.getElementById('colorful-heading');
  const text = heading.textContent;

  // Clear the original text
  heading.textContent = '';

  // Loop through each letter, wrap in span, and assign a random color
  text.split('').forEach(letter => {
    const span = document.createElement('span');
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    span.textContent = letter;
    span.style.color = randomColor;
    heading.appendChild(span);
  });
});
