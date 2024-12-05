import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Box, Button, Input, Stack } from "@mui/material";
import axios from "axios";
import { BASE_URL, LOCAL_KEYS } from "../../constant";
import { deleteItem, readItem } from "../../utils/localStorage";
import TodoListCard from "./TodoListCard";
import { toast } from "react-toastify";

export type ChecklistItem = {
  id: string;
  name: string;
  itemCompletionStatus: boolean;
};

type Checklist = {
  id: string;
  name: string;
  checklistCompletionStatus: boolean;
  items?: ChecklistItem[];
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [newChecklist, setNewChecklist] = useState<string>("");

  const [checklists, setChecklists] = useState<Checklist[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleNewChecklist = async () => {
    if (!newChecklist) {
      return;
    }

    await axios.post(
      `${BASE_URL}/checklist`,
      { name: newChecklist },
      {
        headers: {
          Authorization: `Bearer ${readItem(LOCAL_KEYS.TOKEN)}`,
        },
      }
    );

    await getAllChecklists();

    setNewChecklist("");
  };

  const getAllChecklists = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/checklist`, {
        headers: {
          Authorization: `Bearer ${readItem(LOCAL_KEYS.TOKEN)}`,
        },
      });
      setChecklists(response.data?.data);
    } catch (error) {
      console.error("There was an error fetching the checklists!", error);
      throw error;
    }
  }, []);

  useEffect(() => {
    getAllChecklists();
  }, [getAllChecklists]);

  const onDeleteTodo = async (checklistId: string) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/checklist/${checklistId}`,
        {
          headers: {
            Authorization: `Bearer ${readItem(LOCAL_KEYS.TOKEN)}`,
          },
        }
      );

      if (response.status === 200) {
        toast("Checklist deleted successfully!", { type: "success" });
        await getAllChecklists();
      }
    } catch (error) {
      toast("Unable to delete checklist!", { type: "error" });

      console.error("There was an error deleting the checklist!", error);
      throw error;
    }
  };

  const onDeleteItem = async (checklistId: string, itemId: string) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/checklist/${checklistId}/item/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${readItem(LOCAL_KEYS.TOKEN)}`,
          },
        }
      );

      if (response.status === 200) {
        toast("Item deleted successfully!", { type: "success" });
        await getAllChecklists();
      }
    } catch (error) {
      console.error("There was an error deleting the item!", error);
      throw error;
    }
  };

  const onAddItem = async (checklistId: string, itemName: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/checklist/${checklistId}/item`,
        { itemName: itemName },
        {
          headers: {
            Authorization: `Bearer ${readItem(LOCAL_KEYS.TOKEN)}`,
          },
        }
      );
      if (response.status === 200) {
        toast("Item added successfully!", { type: "success" });
        await getAllChecklists();
      }
    } catch (error) {
      console.error("There was an error adding the item!", error);
      throw error;
    }
  };

  const onItemChecked = async (checklistId: string, itemId: string) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/checklist/${checklistId}/item/${itemId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${readItem(LOCAL_KEYS.TOKEN)}`,
          },
        }
      );
      if (response.status === 200) {
        toast("Item updated successfully!", { type: "success" });
        await getAllChecklists();
      }
    } catch (error) {
      console.error("There was an error updating the item!", error);
      throw error;
    }
  };

  const onLogout = () => {
    deleteItem(LOCAL_KEYS.TOKEN);
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        gap: "1rem",
        padding: "1em",
      }}
    >
      <Stack direction={"row"}>
        <Input
          value={newChecklist}
          onChange={(e) => setNewChecklist(e.target.value)}
          placeholder="Checklist Baru..."
          sx={{ maxWidth: "100ch", marginInline: "auto" }}
          endAdornment={
            <Button
              variant="contained"
              size="small"
              onClick={handleNewChecklist}
            >
              +
            </Button>
          }
        />
        <Button onClick={onLogout}>Logout</Button>
      </Stack>
      <span style={{ textAlign: "center" }}>Checklist:</span>
      <Stack gap={"1em"} direction={"row"} flexWrap={"wrap"}>
        {checklists.map((checklist) => (
          <TodoListCard
            onItemChecked={onItemChecked}
            onAddItem={onAddItem}
            onDeleteTodo={onDeleteTodo}
            onDeleteItem={onDeleteItem}
            checklistId={checklist.id}
            key={checklist.id}
            status={checklist.checklistCompletionStatus}
            title={checklist.name}
            items={checklist.items || []}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Dashboard;
