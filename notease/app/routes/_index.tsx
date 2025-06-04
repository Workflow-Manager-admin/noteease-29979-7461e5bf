import { useState } from "react";
import { Box, AppBar, Toolbar, TextField, Chip, Stack, Fab, Card, CardContent, Typography, IconButton } from "@mui/material";
import { Add as AddIcon, Search as SearchIcon, Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

// Temporary type definitions until we connect with backend
type Note = {
  id: string;
  title: string;
  content: string;
  categories: string[];
};

type Category = {
  id: string;
  name: string;
};

export default function NotesPage() {
  // State for notes and categories (temporary mock data)
  const [notes] = useState<Note[]>([
    {
      id: "1",
      title: "Welcome to NoteEase",
      content: "This is your first note. Click the + button to create more notes.",
      categories: ["Getting Started"],
    },
  ]);

  const [categories] = useState<Category[]>([
    { id: "1", name: "Getting Started" },
    { id: "2", name: "Personal" },
    { id: "3", name: "Work" },
  ]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Stub functions for actions
  const handleSearch = (searchTerm: string) => {
    console.log("Searching for:", searchTerm);
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAddNote = () => {
    console.log("Adding new note");
  };

  const handleEditNote = (noteId: string) => {
    console.log("Editing note:", noteId);
  };

  const handleDeleteNote = (noteId: string) => {
    console.log("Deleting note:", noteId);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Top AppBar with Search */}
      <AppBar position="fixed" sx={{ backgroundColor: "#1976D2" }}>
        <Toolbar>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search notes..."
            size="small"
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: "action.active" }} />,
              sx: { 
                backgroundColor: "white",
                borderRadius: 1,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent'
                }
              }
            }}
          />
        </Toolbar>
      </AppBar>

      {/* Category Filters */}
      <Box sx={{ pt: 8, px: 2, pb: 2 }}>
        <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', py: 2 }}>
          {categories.map((category) => (
            <Chip
              key={category.id}
              label={category.name}
              onClick={() => handleCategoryToggle(category.id)}
              color={selectedCategories.includes(category.id) ? "primary" : "default"}
              sx={{ 
                backgroundColor: selectedCategories.includes(category.id) ? "#1976D2" : "#FFFFFF",
                color: selectedCategories.includes(category.id) ? "#FFFFFF" : "inherit"
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Notes List */}
      <Box sx={{ px: 2, pb: 10 }}>
        <Stack spacing={2}>
          {notes.map((note) => (
            <Card key={note.id}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {note.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {note.content}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                      {note.categories.map((category) => (
                        <Chip
                          key={category}
                          label={category}
                          size="small"
                          sx={{ backgroundColor: "#FFC107" }}
                        />
                      ))}
                    </Stack>
                  </Box>
                  <Box>
                    <IconButton onClick={() => handleEditNote(note.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteNote(note.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: "#1976D2"
        }}
        onClick={handleAddNote}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}

export function meta() {
  return [
    { title: "NoteEase" },
    { name: "description", content: "A simple and intuitive notes application" },
  ];
}
