import React, { useState } from "react";
import { Container, Box, Typography, Button, useTheme } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { DataGrid } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";

const Project = () => {
  const theme = useTheme();
  const [value, setValue] = useState("one");
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
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "ETA",
      headerName: "ETA",
      width: 150,
      editable: false,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
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
      renderCell: () => (
        <Box sx={{ display: "flex", gap: 1, mt: 1.5 }}>
          <Button size="small" variant="outlined">
            Edit
          </Button>
          <Button size="small" variant="outlined" color="error">
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const rows = [
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
          rows={rows}
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
    </Container>
  );
};

export default Project;
