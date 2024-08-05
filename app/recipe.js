"use server";
import React from "react";

async function chef(ingredients) {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content:
              "Provide a detailed recipe for dish with these pantry ingredients: " + ingredients + ". Include the following sections:\n" +
              "Title: The name of the dish.\n" +
              "Estimated prep time: Time required for preparation.\n" +
              "Cook time: Time required for cooking.\n" +
              "Ingredients: A bulleted list of ingredients with quantities and measurements.\n" +
              "Nutritional facts (per serving): Calories, protein, carbohydrates, fat, fiber.\n" +
              "Instructions: Numbered steps for preparing the dish.\n" +
              "Chef notes: Optional additional tips or recommendations.\n" +
              "Summary: A summary of the dish.\n" +
              "\n" +
              "Example output format:\n" +
              "Title: Cheesy Beef and Rice Casserole\n\n" +
              "Estimated prep time: 30 minutes\n\n" +
              "Cook time: 45 minutes\n\n" +
              "Ingredients:\n" +
              "- 1 pound ground beef\n" +
              "- 1/2 cup water\n" +
              "- 1/4 cup brown sugar\n" +
              "- 1/4 cup onion powder\n" +
              "- 1/4 cup garlic powder\n" +
              "- 1/4 cup paprika\n" +
              "- 1/4 teaspoon salt\n" +
              "- 1/4 teaspoon pepper\n\n" +
              "Nutritional facts (per serving):\n" +
              "- Calories= 500\n" +
              "- Protein= 30\n" +
              "- Carbohydrates= 50\n" +
              "- Fat= 20\n" +
              "- Fiber= 5\n\n" +
              "Instructions:\n" +
              "1. In a large mixing bowl, combine the ground beef, water, brown sugar, onion powder, garlic powder, paprika, salt, and pepper.\n" +
              "2. Mix until well combined.\n" +
              "3. Set aside for 15 minutes to let the meat absorb flavors.\n" +
              "4. In a large skillet, heat oil over medium heat.\n" +
              "5. Add the meat to the skillet and cook, stirring occasionally, until browned and cooked through, about 5 minutes.\n" +
              "6. Transfer the meat to a plate and set aside.\n" +
              "7. In a large mixing bowl, combine the cooked rice, cooked vegetables, and cooked meat.\n" +
              "8. Mix well and serve immediately.\n\n" +
              "Chef notes: Add some additional toppings if you like.\n\n" +
              "Summary: A classic dish that's easy to make and has a rich and creamy texture.",
          },
        ],
      }),
    });

    const data = await res.json();

    // CHeck if data is valid
    if (!data) {
      return null;
    } else {
      return data.choices[0].message.content;
    }
  } catch (error) {
    return null;
  }
}

export default chef;
