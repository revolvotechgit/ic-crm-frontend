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
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { DataGrid } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Project = () => {
  const theme = useTheme();
  const [value, setValue] = useState("grid");
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([
    {
      id: 1,
      projectName: "Residential Solar Installation - Thompson",
      clientName: "John Thompson",
      projectType: "solar",
      subType: "Panel Installation",
      propertyType: "Residential - Single Family",
      createdOn: "2024-01-15",
      ETA: "2024-02-28",
      budget: "$35,000",
      status: "In Progress",
      location: "123 Sunshine Ave, Phoenix, AZ",
      squareFootage: "2200",
      systemCapacity: "8.5",
      expectedOutput: "12000",
      materials: ["Monocrystalline Panels", "Inverter"],
      notes:
        "South-facing roof, optimal sun exposure. Customer interested in future battery expansion.",
    },
    {
      id: 2,
      projectName: "Commercial Roof Replacement - Office Complex",
      clientName: "Skyline Properties LLC",
      projectType: "roofing",
      subType: "Replacement",
      propertyType: "Commercial - Office",
      createdOn: "2024-01-05",
      ETA: "2024-03-15",
      budget: "$125,000",
      status: "Planning",
      location: "456 Business Park Dr, Houston, TX",
      squareFootage: "15000",
      roofPitch: "2:12",
      materials: ["Flat Roof/EPDM", "Metal"],
      notes: "Complete tear-off required. Adding additional drainage points.",
    },
    {
      id: 3,
      projectName: "Concrete Tile Roofing - Highland Homes",
      clientName: "Sarah Martinez",
      projectType: "roofing",
      subType: "New Installation",
      propertyType: "Residential - Single Family",
      createdOn: "2023-12-01",
      ETA: "2024-01-20",
      status: "Completed",
      budget: "$42,000",
      location: "789 Highland Dr, San Diego, CA",
      squareFootage: "3200",
      roofPitch: "6:12",
      materials: ["Concrete Tiles"],
      notes: "Mediterranean style home. Custom color tiles ordered.",
    },
    {
      id: 4,
      projectName: "Solar Panel Maintenance - Greenview Apartments",
      clientName: "Greenview Management",
      projectType: "solar",
      subType: "Maintenance",
      propertyType: "Residential - Multi Family",
      createdOn: "2024-01-22",
      ETA: "2024-02-05",
      status: "On Hold",
      budget: "$8,500",
      location: "101 Green Ave, Las Vegas, NV",
      squareFootage: "12000",
      systemCapacity: "25",
      expectedOutput: "35000",
      materials: ["Polycrystalline Panels", "Inverter"],
      notes: "Annual maintenance and cleaning. Check for storm damage.",
    },
    {
      id: 5,
      projectName: "Emergency Roof Repair - Storm Damage",
      clientName: "David Wilson",
      projectType: "roofing",
      subType: "Emergency Repair",
      propertyType: "Residential - Single Family",
      createdOn: "2024-01-10",
      ETA: "2024-01-12",
      status: "Completed",
      budget: "$15,000",
      location: "202 Storm Dr, Miami, FL",
      squareFootage: "1800",
      roofPitch: "5:12",
      materials: ["Asphalt Shingles"],
      notes:
        "Hurricane damage. Insurance claim approved. Temporary repairs completed.",
    },
    {
      id: 6,
      projectName: "Solar + Battery Installation - Smith Residence",
      clientName: "Michael Smith",
      projectType: "solar",
      subType: "Battery System",
      propertyType: "Residential - Single Family",
      createdOn: "2023-11-30",
      ETA: "2024-02-22",
      status: "In Progress",
      budget: "$55,000",
      location: "303 Tech Lane, Austin, TX",
      squareFootage: "2800",
      systemCapacity: "10",
      expectedOutput: "14000",
      materials: ["Monocrystalline Panels", "Battery System", "Hybrid System"],
      notes: "Full home backup system. Tesla Powerwall installation included.",
    },
    {
      id: 7,
      projectName: "Clay Tile Roof Installation - Mediterranean Villa",
      clientName: "Isabella Romano",
      projectType: "roofing",
      subType: "New Installation",
      propertyType: "Residential - Single Family",
      createdOn: "2024-01-05",
      ETA: "2024-03-31",
      status: "Planning",
      budget: "$78,000",
      location: "404 Villa Way, Santa Barbara, CA",
      squareFootage: "4500",
      roofPitch: "8:12",
      materials: ["Clay Tiles"],
      notes: "Imported Italian tiles. Complex architectural details.",
    },
    {
      id: 8,
      projectName: "Commercial Solar Array - Shopping Center",
      clientName: "Metro Mall Partners",
      projectType: "solar",
      subType: "Panel Installation",
      propertyType: "Commercial - Retail",
      createdOn: "2023-12-14",
      ETA: "2024-04-30",
      status: "In Progress",
      budget: "$245,000",
      location: "505 Mall Circle, Denver, CO",
      squareFootage: "50000",
      systemCapacity: "175",
      expectedOutput: "250000",
      materials: ["Thin Film Panels", "Inverter", "Battery System"],
      notes: "Parking lot canopy installation. Includes EV charging stations.",
    },
    {
      id: 9,
      projectName: "Roof Inspection & Maintenance - Johnson Building",
      clientName: "Johnson & Associates",
      projectType: "roofing",
      subType: "Maintenance",
      propertyType: "Commercial - Office",
      createdOn: "2024-01-18",
      ETA: "2024-01-25",
      status: "Pending",
      budget: "$4,500",
      location: "606 Business Ave, Seattle, WA",
      squareFootage: "8000",
      roofPitch: "1:12",
      materials: ["Flat Roof/EPDM"],
      notes:
        "Annual inspection and preventive maintenance. Check drainage systems.",
    },
    {
      id: 10,
      projectName: "Metal Roofing Installation - Industrial Warehouse",
      clientName: "Global Logistics Inc",
      projectType: "roofing",
      subType: "New Installation",
      propertyType: "Commercial - Industrial",
      createdOn: "2024-01-22",
      ETA: "2024-03-30",
      status: "Planning",
      budget: "$185,000",
      location: "707 Industrial Park, Chicago, IL",
      squareFootage: "35000",
      roofPitch: "3:12",
      materials: ["Metal"],
      notes:
        "Insulated metal panels. Including skylights and ventilation systems.",
    },
    {
      id: 11,
      projectName: "Solar Shingle Installation - Modern Home",
      clientName: "Emily Chen",
      projectType: "solar",
      subType: "Solar Shingles",
      propertyType: "Residential - Single Family",
      createdOn: "2024-01-08",
      ETA: "2024-02-28",
      status: "Delayed",
      budget: "$65,000",
      location: "808 Modern Dr, Portland, OR",
      squareFootage: "2500",
      systemCapacity: "12",
      expectedOutput: "15000",
      materials: ["Solar Shingles", "Battery System"],
      notes: "Tesla Solar Roof installation. Permit approval delayed.",
    },
    {
      id: 12,
      projectName: "Flat Roof Repair - Commercial Plaza",
      clientName: "Plaza Management Group",
      projectType: "roofing",
      subType: "Repair",
      propertyType: "Commercial - Retail",
      createdOn: "2024-01-20",
      ETA: "2024-02-10",
      status: "In Progress",
      budget: "$28,000",
      location: "909 Plaza Blvd, Dallas, TX",
      squareFootage: "12000",
      roofPitch: "1:12",
      materials: ["Flat Roof/EPDM"],
      notes:
        "Addressing multiple leak points. Installing additional insulation.",
    },
  ]);

  const projectTypes = {
    solar: {
      label: "Solar Installation",
      subtypes: [
        "Panel Installation",
        "Battery System",
        "Solar Shingles",
        "Maintenance",
        "Repair",
      ],
    },
    roofing: {
      label: "Roofing",
      subtypes: [
        "New Installation",
        "Replacement",
        "Repair",
        "Maintenance",
        "Emergency Repair",
      ],
    },
  };

  const roofingMaterials = [
    "Concrete Tiles",
    "Clay Tiles",
    "Metal",
    "Asphalt Shingles",
    "Slate",
    "Flat Roof/EPDM",
    "Green Roof",
    "Solar Shingles",
  ];

  const solarProducts = [
    "Monocrystalline Panels",
    "Polycrystalline Panels",
    "Thin Film Panels",
    "Solar Tiles",
    "Solar Shingles",
    "Battery System",
    "Inverter",
    "Hybrid System",
  ];

  const propertyTypes = [
    "Residential - Single Family",
    "Residential - Multi Family",
    "Commercial - Office",
    "Commercial - Retail",
    "Commercial - Industrial",
    "Institutional",
    "Agricultural",
  ];

  const [newProject, setNewProject] = useState({
    projectName: "",
    createdOn: new Date().toISOString().split("T")[0],
    ETA: "",
    budget: "",
    status: "Planning",
    projectType: "",
    subType: "",
    propertyType: "",
    materials: [],
    squareFootage: "",
    roofPitch: "",
    systemCapacity: "",
    batteryBackup: false,
    expectedOutput: "",
    clientName: "",
    location: "",
    permitRequired: false,
    notes: "",
  });

  const resetForm = () => {
    setNewProject({
      projectName: "",
      createdOn: new Date().toISOString().split("T")[0],
      ETA: "",
      budget: "",
      status: "Planning",
      projectType: "",
      subType: "",
      propertyType: "",
      materials: [],
      squareFootage: "",
      roofPitch: "",
      systemCapacity: "",
      batteryBackup: false,
      expectedOutput: "",
      clientName: "",
      location: "",
      permitRequired: false,
      notes: "",
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

  const navigate = useNavigate();

  const handleProjectClick = (projectId) => {
    const selectedProject = projects.find(
      (project) => project.id === projectId
    );
    navigate(`/projects/${projectId}`, { state: { project: selectedProject } });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "projectName",
      headerName: "Project Name",
      width: 250,
      editable: false,
      renderCell: (params) => (
        <Typography
          sx={{
            cursor: "pointer",
            "&:hover": {
              color: theme.palette.primary.main,
              textDecoration: "underline",
            },
          }}
          onClick={() => handleProjectClick(params.row.id)}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "projectType",
      headerName: "Type",
      width: 130,
      editable: false,
    },
    {
      field: "clientName",
      headerName: "Client",
      width: 150,
      editable: false,
    },
    {
      field: "createdOn",
      headerName: "Created On",
      width: 110,
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
      width: 110,
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
      field: "budget",
      headerName: "Budget",
      width: 120,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
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

  // Add this new function to filter projects
  const filteredProjects = projects.filter((project) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      project.projectName.toLowerCase().includes(searchLower) ||
      project.clientName.toLowerCase().includes(searchLower) ||
      project.location.toLowerCase().includes(searchLower) ||
      project.status.toLowerCase().includes(searchLower) ||
      project.projectType.toLowerCase().includes(searchLower)
    );
  });

  // Add this new component for the list view
  const ProjectListView = ({ projects }) => {
    return (
      <Stack spacing={2}>
        {projects.map((project) => (
          <Card
            key={project.id}
            sx={{
              width: "100%",
              cursor: "pointer",
              "&:hover": {
                boxShadow: 6,
              },
            }}
            onClick={() => handleProjectClick(project.id)}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" component="div">
                    {project.projectName}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {project.clientName}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="body2" color="text.secondary">
                    Type: {projectTypes[project.projectType]?.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: {project.location}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Typography variant="body2" color="text.secondary">
                    Budget: {project.budget}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ETA: {new Date(project.ETA).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Chip
                    label={project.status}
                    sx={{
                      backgroundColor:
                        statusColors[project.status] || theme.palette.grey[300],
                      color: theme.palette.getContrastText(
                        statusColors[project.status] || theme.palette.grey[300]
                      ),
                      fontWeight: 500,
                      width: "100%",
                      mb: 1,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={1}>
                  <Stack direction="column" spacing={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleOpenModal("edit", project)}
                      fullWidth
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteClick(project)}
                      fullWidth
                    >
                      Delete
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Stack>
    );
  };

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
          aria-label="project view tabs"
        >
          <Tab value="grid" label="Grid View" />
          <Tab value="list" label="List View" />
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

      {/* Add Search Box */}
      <Box sx={{ mt: 3, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search projects by name, client, location, status, or type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: theme.palette.background.paper,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.divider,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
        />
      </Box>

      {value === "grid" ? (
        <Box
          sx={{
            height: 580,
            width: "100%",
            mt: 4,
          }}
        >
          <DataGrid
            rows={filteredProjects}
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
      ) : (
        <Box sx={{ mt: 4 }}>
          <ProjectListView projects={filteredProjects} />
        </Box>
      )}

      {/* Add/Edit Project Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {isEditMode ? "Edit Project" : "Add New Project"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="projectName"
                label="Project Name"
                fullWidth
                value={newProject.projectName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="clientName"
                label="Client Name"
                fullWidth
                value={newProject.clientName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Project Type</InputLabel>
                <Select
                  name="projectType"
                  value={newProject.projectType}
                  onChange={handleInputChange}
                  label="Project Type"
                >
                  {Object.entries(projectTypes).map(([key, type]) => (
                    <MenuItem key={key} value={key}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Sub Type</InputLabel>
                <Select
                  name="subType"
                  value={newProject.subType}
                  onChange={handleInputChange}
                  label="Sub Type"
                >
                  {newProject.projectType &&
                    projectTypes[newProject.projectType].subtypes.map(
                      (subtype) => (
                        <MenuItem key={subtype} value={subtype}>
                          {subtype}
                        </MenuItem>
                      )
                    )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Property Type</InputLabel>
                <Select
                  name="propertyType"
                  value={newProject.propertyType}
                  onChange={handleInputChange}
                  label="Property Type"
                >
                  {propertyTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="location"
                label="Project Location"
                fullWidth
                value={newProject.location}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="squareFootage"
                label="Square Footage"
                fullWidth
                value={newProject.squareFootage}
                onChange={handleInputChange}
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">sq ft</InputAdornment>
                  ),
                }}
                required
              />
            </Grid>

            {newProject.projectType === "roofing" && (
              <Grid item xs={12} sm={6}>
                <TextField
                  name="roofPitch"
                  label="Roof Pitch"
                  fullWidth
                  value={newProject.roofPitch}
                  onChange={handleInputChange}
                  placeholder="e.g., 4:12"
                />
              </Grid>
            )}

            {newProject.projectType === "solar" && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="systemCapacity"
                    label="System Capacity"
                    fullWidth
                    value={newProject.systemCapacity}
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">kW</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="expectedOutput"
                    label="Expected Annual Output"
                    fullWidth
                    value={newProject.expectedOutput}
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">kWh</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Materials</InputLabel>
                <Select
                  name="materials"
                  multiple
                  value={newProject.materials}
                  onChange={handleInputChange}
                  label="Materials"
                >
                  {newProject.projectType === "roofing"
                    ? roofingMaterials.map((material) => (
                        <MenuItem key={material} value={material}>
                          {material}
                        </MenuItem>
                      ))
                    : solarProducts.map((product) => (
                        <MenuItem key={product} value={product}>
                          {product}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={newProject.status}
                  onChange={handleInputChange}
                  label="Status"
                >
                  {Object.keys(statusColors).map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="notes"
                label="Project Notes"
                fullWidth
                multiline
                rows={4}
                value={newProject.notes}
                onChange={handleInputChange}
              />
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
