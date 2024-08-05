"use client";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
import myColorScheme from "./colorscheme";

export default function Pantrylist() {
  const newColorScheme = myColorScheme.newColorScheme;
  const buttonStyle = myColorScheme.buttonStyle;
  const tableStyle = myColorScheme.tableStyle;

  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [editItemModalOpen, setEditItemModalOpen] = useState(false);

  const [pantryList, setPantryList] = useState([]);
  const [editRowInfo, setEditRowInfo] = useState({});
  const [itemName, setItemName] = useState("");

  const updatePantrylist = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const docs = await getDocs(snapshot);
    const pantry = [];
    docs.forEach((doc) => {
      pantry.push({ name: doc.id, ...doc.data() });
    });
    setPantryList(pantry);
  };

  const addItem = async (itemInfo) => {
    const docRef = await doc(collection(firestore, "pantry"), itemInfo.name);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        ...itemInfo,
        quantity: docSnap.data().quantity + 1,
      })
        .then(() => {
          updatePantrylist();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setDoc(docRef, {
        ...itemInfo,
        quantity: 1,
      })
        .then(() => {
          updatePantrylist();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deleteItem = async (itemName) => {
    const docRef = doc(firestore, "pantry", itemName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().quantity == 1) {
      await deleteDoc(docRef);
      updatePantrylist();
    } else if (docSnap.exists() && docSnap.data().quantity > 1) {
      await updateDoc(docRef, {
        quantity: docSnap.data().quantity - 1,
      })
        .then(() => {
          updatePantrylist();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Item does not exist");
    }
  };

  const editItem = async (newItemName, itemInfo) => {
    if (newItemName == itemInfo.name) {
      return;
    }
    const newdocRef = doc(firestore, "pantry", newItemName);
    const newdocSnap = await getDoc(newdocRef);
    if (newdocSnap.exists()) {
      alert("Item already exists");
      console.log(itemInfo);
    } else {
      const docRef = doc(firestore, "pantry", itemInfo.name);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          name: newItemName,
        })
          .then(() => {
            updatePantrylist();
            setEditRowInfo({});
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Item does not exist");
      }
    }
  };

  useEffect(() => {
    updatePantrylist();
  }, []);

  return (
    <Box
      width={"100%"}
      alignItems={"center"}
      justifyItems={"center"}
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      paddingTop={2}
    >
      {/* Add Item Button */}
      <Button
        sx={buttonStyle}
        variant="contained"
        onClick={() => {
          setAddItemModalOpen(true);
        }}
      >
        Add Item
      </Button>

      {/* Add Item Modal */}
      <Modal
        open={addItemModalOpen}
        onClose={() => {
          setAddItemModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            borderRadius: 4,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" color={"black"}>
            Add Item
          </Typography>

          <Stack padding={2} display={"flex"} flexDirection={"row"} gap={2}>
            <TextField
              id="outlined-basic"
              label="Item Name"
              variant="outlined"
              onChange={(e) => setItemName(e.target.value)}
            ></TextField>
            <Button
              variant="contained"
              onClick={() => {
                addItem({ name: itemName });
                setAddItemModalOpen(false);
                setItemName("");
              }}
              sx={buttonStyle}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Edit Item Modal */}
      <Modal
        open={editItemModalOpen}
        onClose={() => {
          setEditItemModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            borderRadius: 4,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" color={"black"}>
            Edit Item
          </Typography>

          <Stack padding={2} display={"flex"} flexDirection={"row"} gap={2}>
            <TextField
              id="outlined-basic"
              label="Item Name"
              variant="outlined"
              onChange={(e) => setItemName(e.target.value)}
              value={itemName}
            ></TextField>
            <Button
              variant="contained"
              onClick={() => {
                editItem(itemName, editRowInfo);
                setEditItemModalOpen(false);
                setItemName("");
              }}
            >
              Update
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Pantry List Table */}
      <Stack width={"90%"} display={"flex"}>
        <TableContainer component={Paper}>
          <Table sx={tableStyle} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ color: newColorScheme.lightBlue }}
                  align="center"
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{ color: newColorScheme.lightBlue }}
                  align="center"
                >
                  Quantity
                </TableCell>
                <TableCell
                  sx={{ color: newColorScheme.lightBlue }}
                  align="center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pantryList.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ color: newColorScheme.lightBlue }}
                    align="center"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    sx={{ color: newColorScheme.lightBlue }}
                    align="center"
                  >
                    {row.quantity}
                  </TableCell>
                  <TableCell align="center" width={"20%"}>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Button
                        variant="contained"
                        onClick={() => {
                          deleteItem(row.name);
                        }}
                        sx={buttonStyle}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
}
