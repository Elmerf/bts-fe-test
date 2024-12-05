import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Input,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ChecklistItem } from ".";

interface TodoListCardProps {
  checklistId: string;
  title: string;
  status: boolean;
  items: ChecklistItem[];
  onItemChecked: (checklistId: string, itemId: string) => void;
  onAddItem: (checklistId: string, itemName: string) => void;
  onDeleteTodo: (checklistId: string) => void;
  onDeleteItem: (checklistId: string, itemId: string) => void;
}

const TodoListCard: React.FC<TodoListCardProps> = ({
  checklistId,
  title,
  status,
  items,
  onItemChecked,
  onAddItem,
  onDeleteTodo,
  onDeleteItem,
}) => {
  const [newItemName, setNewItemName] = useState("");

  const handleAddItem = () => {
    if (newItemName.trim()) {
      onAddItem(checklistId, newItemName);
      setNewItemName("");
    }
  };
  return (
    <Card sx={{ margin: "16px 0", boxShadow: 2, minWidth: "40ch" }}>
      <CardHeader
        title={title}
        subheader={`Status: ${status ? "Completed" : "Incomplete"}`}
        action={
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onDeleteTodo(checklistId)}
          >
            Delete ToDo
          </Button>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={item.itemCompletionStatus}
                  onClick={() => onItemChecked(checklistId, item.id)}
                />
                <span
                  style={{
                    textDecoration: item.itemCompletionStatus
                      ? "line-through"
                      : "none",
                  }}
                >
                  {item.name}
                </span>
              </div>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => onDeleteItem(checklistId, item.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </Typography>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "16px" }}
        >
          <Input
            placeholder="New Item"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddItem}
                >
                  Add Item
                </Button>
              </InputAdornment>
            }
            style={{ flex: 1 }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoListCard;
