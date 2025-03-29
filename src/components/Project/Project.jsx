import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  DialogContentText,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { DataGrid } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";

const Project = () => {
  const theme = useTheme();
  const [value, setValue] = useState("one");
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([
    {
      id: 1,
      projectName: "Website Redesign",
      createdOn: "2023-10-15",
      ETA: "2024-02-28",
      budget: "$10,000",
      status: "In Progress",
    },
    {
      id: 2,
      projectName: "Mobile App Development",
      createdOn: "2023-11-05",
      ETA: "2024-05-15",
      budget: "$15,000",
      status: "On Hold",
    },
    {
      id: 3,
      projectName: "API Integration",
      createdOn: "2023-12-01",
      ETA: "2024-01-20",
      status: "Completed",
      budget: "$20,000",
    },
    {
      id: 4,
      projectName: "Database Migration",
      createdOn: "2023-09-22",
      ETA: "2023-12-15",
      status: "Completed",
      budget: "$25,000",
    },
    {
      id: 5,
      projectName: "UI/UX Overhaul",
      createdOn: "2024-01-10",
      ETA: "2024-04-30",
      status: "In Progress",
      budget: "$30,000",
    },
    {
      id: 6,
      projectName: "Payment System Upgrade",
      createdOn: "2023-11-30",
      ETA: "2024-03-22",
      status: "Delayed",
      budget: "$35,000",
    },
    {
      id: 7,
      projectName: "Security Audit",
      createdOn: "2024-01-05",
      ETA: "2024-01-31",
      status: "Pending",
      budget: "$40,000",
    },
    {
      id: 8,
      projectName: "Cloud Infrastructure Setup",
      createdOn: "2023-08-14",
      ETA: "2023-10-30",
      status: "Completed",
      budget: "$45,000",
    },
    {
      id: 9,
      projectName: "Marketing Dashboard",
      createdOn: "2023-12-18",
      ETA: "2024-02-14",
      status: "In Progress",
      budget: "$50,000",
    },
    {
      id: 10,
      projectName: "Customer Portal",
      createdOn: "2024-01-22",
      ETA: "2024-06-30",
      status: "Planning",
      budget: "$55,000",
    },
  ]);

  const [newProject, setNewProject] = useState({
    projectName: "",
    createdOn: new Date().toISOString().split("T")[0],
    ETA: "",
    budget: "",
    status: "Planning",
  });

  const resetForm = () => {
    setNewProject({
      projectName: "",
      createdOn: new Date().toISOString().split("T")[0],
      ETA: "",
      budget: "",
      status: "Planning",
    });
    setIsEditMode(false);
    setSelectedProject(null);
  };

  const handleOpenModal = (mode = "create", project = null) => {
    setIsEditMode(mode === "edit");
    if (mode === "edit" && project) {
      setNewProject({ ...project });
      setSelectedProject(project);
    } else {
      resetForm();
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProject = () => {
    if (isEditMode) {
      // Update existing project
      setProjects(
        projects.map((project) =>
          project.id === selectedProject.id
            ? { ...newProject, id: project.id }
            : project
        )
      );
    } else {
      // Add new project
      const newId = Math.max(...projects.map((p) => p.id)) + 1;
      setProjects([...projects, { ...newProject, id: newId }]);
    }
    handleCloseModal();
  };

  const handleDeleteClick = (project) => {
    setSelectedProject(project);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    setProjects(
      projects.filter((project) => project.id !== selectedProject.id)
    );
    setDeleteConfirmOpen(false);
    setSelectedProject(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const statusColors = {
    Completed: theme.palette.success.main,
    "In Progress": theme.palette.info.main,
    "On Hold": theme.palette.warning.main,
    Delayed: theme.palette.error.main,
    Pending:
      theme.palette.mode === "dark"
        ? theme.palette.grey[600]
        : theme.palette.grey[500],
    Planning: theme.palette.primary.main,
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "projectName",
      headerName: "Project Name",
      width: 200,
      editable: false,
    },
    {
      field: "createdOn",
      headerName: "Created On",
      width: 150,
      editable: false,
      valueFormatter: (params) => {
        if (!params.value) return "";
        const date = new Date(params.value);
        return date instanceof Date && !isNaN(date)
          ? date.toLocaleDateString()
          : "Invalid Date";
      },
    },
    {
      field: "ETA",
      headerName: "ETA",
      width: 150,
      editable: false,
      valueFormatter: (params) => {
        if (!params.value) return "";
        const date = new Date(params.value);
        return date instanceof Date && !isNaN(date)
          ? date.toLocaleDateString()
          : "Invalid Date";
      },
    },
    { field: "budget", headerName: "Budget", width: 150, editable: false },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            backgroundColor:
              statusColors[params.value] || theme.palette.grey[300],
            color: theme.palette.getContrastText(
              statusColors[params.value] || theme.palette.grey[300]
            ),
            fontWeight: 500,
            width: "100%",
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1, mt: 1.5 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleOpenModal("edit", params.row)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleDeleteClick(params.row)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ ml: 4 }}>
      <Box sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "left",
            flexDirection: "column",
            mb: 4,
          }}
        >
          <Typography variant="h4" color="text.primary">
            Projects Overview
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage your projects
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
          maxWidth: "x1",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Board view" />
          <Tab value="two" label="Tree view" />
        </Tabs>
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
            onClick={() => handleOpenModal("create")}
          >
            Add Project
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          height: 580,
          width: "100%",
          mt: 4,
        }}
      >
        <DataGrid
          rows={projects}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            boxShadow: 2,
            border: "none",
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.primary,
            },
          }}
        />
      </Box>

      {/* Add/Edit Project Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {isEditMode ? "Edit Project" : "Add New Project"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="projectName"
                label="Project Name"
                fullWidth
                value={newProject.projectName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="createdOn"
                label="Created On"
                type="date"
                fullWidth
                value={newProject.createdOn}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="ETA"
                label="ETA"
                type="date"
                fullWidth
                value={newProject.ETA}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="budget"
                label="Budget"
                fullWidth
                value={newProject.budget}
                onChange={handleInputChange}
                placeholder="$0"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="status"
                label="Status"
                select
                fullWidth
                value={newProject.status}
                onChange={handleInputChange}
                required
              >
                {Object.keys(statusColors).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button
            onClick={handleAddProject}
            variant="contained"
            color="primary"
          >
            {isEditMode ? "Save Changes" : "Add Project"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the project "
            {selectedProject?.projectName}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Project;
