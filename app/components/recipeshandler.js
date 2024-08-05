"use client";
import React, { useEffect, useState } from "react";
import RecipeCard from "./recipecard";
import chef from "../recipe";
import { Box, Button, Stack } from "@mui/material";
import myColorScheme from "./colorscheme";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../utils/firebase";

function RecipesHandler() {
  const newColorScheme = myColorScheme.newColorScheme;
  const [recipe, setRecipe] = useState(null);
  const [ingredientString, setIngredientString] = useState("");

  function parseRecipe(recipeString) {
    console.log(recipeString);
    const sections = recipeString.split("\n\n");
    // Remove the last section if it's empty
    if (sections[sections.length - 1] === "") {
      sections.pop();
    }

    const recipeData = {};

    sections.forEach((section) => {
      const [label, content] = section.split(":");
      const trimmedLabel = label.trim();

      switch (trimmedLabel.toLowerCase()) {
        case "title":
          recipeData.title = content.trim();
          break;
        case "estimated prep time":
          recipeData.prepTime = content.trim();
          break;
        case "cook time":
          recipeData.cookTime = content.trim();
          break;
        case "ingredients":
          recipeData.ingredients = content
            .trim()
            .split("\n")
            .map((ingredient) => ingredient.trim());
          break;
        case "nutritional facts (per serving)":
          recipeData.nutritionFacts = content
            .trim()
            .split("\n")
            .map((fact) => fact.trim());
          break;
        case "instructions":
          recipeData.instructions = content
            .trim()
            .split("\n")
            .map((instruction) => instruction.trim());
          break;
        case "chef notes":
          recipeData.chefNotes = content.trim();
          break;
        case "summary":
          recipeData.summary = content.trim();
          break;
        default:
          console.error("Unknown section:", trimmedLabel);
      }
    });

    return recipeData;
  }

  const updateIngredientlist = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const docs = await getDocs(snapshot);
    let pantry_items = "";
    docs.docs.forEach((doc) => {
      pantry_items += doc.data().name;
      //Don't add a comma after the last ingredient
      if (doc.data().name !== docs.docs[docs.docs.length - 1].data().name) {
        pantry_items += ", ";
      }
    });
    setIngredientString(pantry_items);
  };

  async function handleGetNewRecipe() {
    updateIngredientlist();
    const newRecipe = await chef(ingredientString);
    setRecipe(parseRecipe(newRecipe));
  }

  useEffect(() => {
    updateIngredientlist();
  }, []);

  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyItems={"center"}
      alignItems={"center"}
      gap={2}
      paddingTop={2}
    >
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          sx={myColorScheme.buttonStyle}
          onClick={() => {
            handleGetNewRecipe();
          }}
        >
          Get New Recipe
        </Button>
        <Button variant="contained" sx={myColorScheme.buttonStyle}>
          Save Recipe
        </Button>
      </Stack>

      {recipe !== null && <RecipeCard recipe={recipe} />}
    </Box>
  );
}

export default RecipesHandler;
