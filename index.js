const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

app.use("/images", express.static("public/images"));
app.use(cors());

const recipes = [
  {
    id: 1,
    title: "Overnight Oats",
    image: "oats1.png",
    ingredients: [
      "1/2 cup rolled oats",
      "1/2 cup milk (dairy or plant-based)",
      "1/4 cup Greek yogurt",
      "1 tbsp chia seeds",
      "1 tbsp honey or maple syrup",
      "Fresh fruit or nuts (optional)",
    ],
    instructions: [
      "1. In a jar or container, combine the oats, milk, yogurt, chia seeds, and sweetener.",
      "2. Stir well until everything is combined.",
      "3. Add any additional toppings like fruit or nuts if desired.",
      "4. Cover the jar and refrigerate overnight, or for at least 6 hours.",
      "5. In the morning, give it a stir and enjoy!",
    ],
  },
  {
    id: 2,
    title: "Green Smoothie",
    image: "smoothie1.png",
    ingredients: [
      "1 cup spinach",
      "1 banana",
      "1/2 cup frozen mango",
      "1/2 cup almond milk",
      "1 tbsp chia seeds",
      "1 tsp honey (optional)",
    ],
    instructions: [
      "1. Add the spinach, banana, mango, and almond milk to a blender.",
      "2. Blend until smooth and creamy.",
      "3. Add chia seeds and blend again for a few seconds.",
      "4. Pour into a glass and enjoy your smoothie!",
    ],
  },
  {
    id: 3,
    title: "Quinoa Salad",
    image: "salad1.png",
    ingredients: [
      "1 cup cooked quinoa",
      "1/2 cup cherry tomatoes, halved",
      "1/4 cup cucumber, diced",
      "1/4 cup red bell pepper, diced",
      "1/4 cup feta cheese",
      "2 tbsp olive oil",
      "1 tbsp lemon juice",
      "Salt and pepper to taste",
    ],
    instructions: [
      "1. In a bowl, combine the cooked quinoa, cherry tomatoes, cucumber, and bell pepper.",
      "2. Add feta cheese on top.",
      "3. Drizzle with olive oil and lemon juice.",
      "4. Season with salt and pepper, then toss to combine.",
      "5. Serve immediately or refrigerate for later.",
    ],
  },
];

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Example route to fetch all items
app.get("/api/recipes", (req, res) => {
  try {
    const recipesWithImages = recipes.map((recipe) => ({
      ...recipe,
      imageURL: `http://localhost:${port}/images/${recipe.image}`, // Full URL to the image
    }));
    res.status(200).json({
      statusCode: 200,
      message: "Successfully fetch",
      recipe: recipesWithImages,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching api" });
  }
});

app.get("/api/recipes/:id", (req, res) => {
  const recipeId = parseInt(req.params.id);

  // Find the recipe by ID
  const recipesWithImages = recipes.map((recipe) => ({
    ...recipe,
    imageURL: `http://localhost:${port}/images/${recipe.image}`, // Full URL to the image
  }));
  const recipe = recipesWithImages.find((r) => {
    if (r.id === recipeId) {
      // Add imageURL to the found recipe
      return {
        ...r,
        imageURL: `http://localhost:${port}/images/${r.image}`, // Full URL to the image
      };
    }
    return false; // Return false if not matching
  });

  if (recipe) {
    res.status(200).json({
      statusCode: 200,
      message: "Recipe found",
      recipe, // Include the recipe data with imageURL
    });
  } else {
    res.status(404).json({ message: "Recipe not found" }); // Return 404 if not found
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
