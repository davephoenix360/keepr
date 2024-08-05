import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Button, Modal, Stack } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import myColorScheme from "./colorscheme";

export default function RecipeCard({ recipe }) {
  const [recipeViewOpen, setRecipeViewOpen] = useState(false);

  const handleRecipeViewOpen = () => {
    setRecipeViewOpen(true);
  };
  const handleRecipeViewClose = () => {
    setRecipeViewOpen(false);
  };

  return (
    <Box>
      <Card sx={{ maxWidth: 500 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={recipe.title}
          subheader="September 14, 2016"
        />
        {/* <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Paella dish"
          /> */}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {recipe.summary}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <Button
            onClick={handleRecipeViewOpen}
            variant="outlined"
            sx={myColorScheme.buttonStyle + { right: 0 }}
          >
            View
          </Button>
        </CardActions>
        <Modal
          open={recipeViewOpen}
          onClose={handleRecipeViewClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Card sx={{ maxWidth: "80%", height: "80%", borderRadius: "10px", alignItems: "center", justifyContent: "center", overflow: "scroll" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={recipe.title}
              subheader="September 14, 2016"
            />
            <Stack padding={2} display={"flex"} flexDirection={"row"} gap={2} alignItems={"center"} justifyContent={"space-between"} >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Ingredients
                </Typography>
                {recipe.ingredients.map((ingredient) => (
                  <Typography variant="body2" color="text.secondary" key={ingredient}>
                    {ingredient}
                  </Typography>
                ))}
              </CardContent>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Nutritional Facts
                </Typography>
                {recipe.nutritionFacts.map((nutrient) => (
                  <Typography variant="body2" color="text.secondary" key={nutrient}>
                    {nutrient}
                  </Typography>
                ))}
              </CardContent>
            </Stack>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Instructions
              </Typography>
              {recipe.instructions.map((instruction) => (
                <Typography variant="body2" color="text.secondary" key={instruction}>
                  {instruction}
                </Typography>
              ))}
            </CardContent>
            {/* Close modal */}
            
            <Box width={"100%"} display={"flex"} justifyContent={"center"} alignContent={"center"}>
              <Button onClick={handleRecipeViewClose} sx={{...myColorScheme.buttonStyle}}>
                Close
              </Button>
            </Box>
          </Card>
        </Modal>
      </Card>
    </Box>
  );
}
