import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  useTheme,
} from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const ProjectDetails = () => {
  const theme = useTheme();
  const { id } = useParams();
  const location = useLocation();
  const projectData = location.state?.project;

  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [openEmployeeModal, setOpenEmployeeModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Initialize project state with data passed from Project component
  const [project, setProject] = useState(
    projectData || {
      id: parseInt(id),
      projectName: "Loading...",
      clientName: "Loading...",
      status: "Loading...",
    }
  );

  useEffect(() => {
    if (projectData) {
      setProject(projectData);
    }
  }, [projectData]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Site Assessment",
      description: "Conduct initial site assessment and measurements",
      status: "Completed",
      assignedTo: "Mike Johnson",
      dueDate: "2024-02-15",
      priority: "High",
    },
    {
      id: 2,
      title: "Permit Application",
      description: "Submit permit applications to local authorities",
      status: "In Progress",
      assignedTo: "Sarah Wilson",
      dueDate: "2024-02-20",
      priority: "Medium",
    },
  ]);

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Mike Johnson",
      role: "Solar Technician",
      assignedTasks: ["Site Assessment"],
    },
    {
      id: 2,
      name: "Sarah Wilson",
      role: "Project Manager",
      assignedTasks: ["Permit Application"],
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Not Started",
    assignedTo: "",
    dueDate: "",
    priority: "Medium",
  });

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
  });

  const handleTaskModalOpen = (task = null) => {
    if (task) {
      setSelectedTask(task);
      setNewTask(task);
    } else {
      setSelectedTask(null);
      setNewTask({
        title: "",
        description: "",
        status: "Not Started",
        assignedTo: "",
        dueDate: "",
        priority: "Medium",
      });
    }
    setOpenTaskModal(true);
  };

  const handleEmployeeModalOpen = (employee = null) => {
    if (employee) {
      setSelectedEmployee(employee);
      setNewEmployee(employee);
    } else {
      setSelectedEmployee(null);
      setNewEmployee({ name: "", role: "" });
    }
    setOpenEmployeeModal(true);
  };

  const handleTaskModalClose = () => {
    setOpenTaskModal(false);
    setSelectedTask(null);
  };

  const handleEmployeeModalClose = () => {
    setOpenEmployeeModal(false);
    setSelectedEmployee(null);
  };

  const handleTaskSave = () => {
    if (selectedTask) {
      // Update existing task
      setTasks(
        tasks.map((task) =>
          task.id === selectedTask.id ? { ...newTask, id: task.id } : task
        )
      );
    } else {
      // Add new task
      const newId = Math.max(...tasks.map((t) => t.id)) + 1;
      setTasks([...tasks, { ...newTask, id: newId }]);
    }
    handleTaskModalClose();
  };

  const handleEmployeeSave = () => {
    if (selectedEmployee) {
      // Update existing employee
      setEmployees(
        employees.map((emp) =>
          emp.id === selectedEmployee.id ? { ...newEmployee, id: emp.id } : emp
        )
      );
    } else {
      // Add new employee
      const newId = Math.max(...employees.map((e) => e.id)) + 1;
      setEmployees([
        ...employees,
        { ...newEmployee, id: newId, assignedTasks: [] },
      ]);
    }
    handleEmployeeModalClose();
  };

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEmployeeDelete = (employeeId) => {
    setEmployees(employees.filter((emp) => emp.id !== employeeId));
  };

  const statusColors = {
    Completed: theme.palette.success.main,
    "In Progress": theme.palette.info.main,
    "Not Started":
      theme.palette.mode === "dark"
        ? theme.palette.grey[600]
        : theme.palette.grey[500],
    Blocked: theme.palette.error.main,
  };

  const priorityColors = {
    High: theme.palette.error.main,
    Medium: theme.palette.warning.main,
    Low: theme.palette.info.main,
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
          <Typography variant="h4" color="text.primary" gutterBottom>
            {project.projectName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Client: {project.clientName}
          </Typography>
          <Chip
            label={project.status}
            sx={{
              backgroundColor:
                statusColors[project.status] || theme.palette.grey[300],
              color: theme.palette.getContrastText(
                statusColors[project.status] || theme.palette.grey[300]
              ),
              fontWeight: 500,
              width: "120px",
              height: "32px",
              fontSize: "0.875rem",
            }}
          />
        </Box>

        <Grid container spacing={4}>
          {/* Tasks Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 2, height: "100%" }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" color="text.primary">
                    Tasks
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AssignmentIcon />}
                    onClick={() => handleTaskModalOpen()}
                    sx={{ textTransform: "none" }}
                  >
                    Add Task
                  </Button>
                </Box>
                <List>
                  {tasks.map((task) => (
                    <React.Fragment key={task.id}>
                      <ListItem
                        sx={{
                          backgroundColor: theme.palette.background.paper,
                          transition: "background-color 0.2s ease",
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              variant="subtitle1"
                              color="text.primary"
                            >
                              {task.title}
                            </Typography>
                          }
                          secondary={
                            <Stack direction="column" spacing={1}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {task.description}
                              </Typography>
                              <Stack direction="row" spacing={1}>
                                <Chip
                                  label={task.status}
                                  size="small"
                                  sx={{
                                    backgroundColor: statusColors[task.status],
                                    color: theme.palette.getContrastText(
                                      statusColors[task.status]
                                    ),
                                  }}
                                />
                                <Chip
                                  label={task.priority}
                                  size="small"
                                  sx={{
                                    backgroundColor:
                                      priorityColors[task.priority],
                                    color: theme.palette.getContrastText(
                                      priorityColors[task.priority]
                                    ),
                                  }}
                                />
                                <Chip
                                  label={task.assignedTo}
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    borderColor: theme.palette.primary.main,
                                  }}
                                />
                                <Chip
                                  label={new Date(
                                    task.dueDate
                                  ).toLocaleDateString()}
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    borderColor: theme.palette.primary.main,
                                  }}
                                />
                              </Stack>
                            </Stack>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => handleTaskModalOpen(task)}
                            sx={{
                              color: theme.palette.text.secondary,
                              transition: "color 0.2s ease",
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            onClick={() => handleTaskDelete(task.id)}
                            sx={{
                              color: theme.palette.text.secondary,
                              transition: "color 0.2s ease",
                              "&:hover": {
                                color: theme.palette.error.main,
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Employees Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 2, height: "100%" }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" color="text.primary">
                    Assigned Employees
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    onClick={() => handleEmployeeModalOpen()}
                    sx={{ textTransform: "none" }}
                  >
                    Add Employee
                  </Button>
                </Box>
                <List>
                  {employees.map((employee) => (
                    <React.Fragment key={employee.id}>
                      <ListItem
                        sx={{
                          backgroundColor: theme.palette.background.paper,
                          transition: "background-color 0.2s ease",
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              variant="subtitle1"
                              color="text.primary"
                            >
                              {employee.name}
                            </Typography>
                          }
                          secondary={
                            <Stack direction="column" spacing={1}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Role: {employee.role}
                              </Typography>
                              <Stack direction="row" spacing={1}>
                                {employee.assignedTasks.map((task, index) => (
                                  <Chip
                                    key={index}
                                    label={task}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                      borderColor: theme.palette.primary.main,
                                    }}
                                  />
                                ))}
                              </Stack>
                            </Stack>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => handleEmployeeModalOpen(employee)}
                            sx={{
                              color: theme.palette.text.secondary,
                              transition: "color 0.2s ease",
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            onClick={() => handleEmployeeDelete(employee.id)}
                            sx={{
                              color: theme.palette.text.secondary,
                              transition: "color 0.2s ease",
                              "&:hover": {
                                color: theme.palette.error.main,
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Notes Section */}
        <Box sx={{ mt: 4 }}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Project Notes
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  whiteSpace: "pre-wrap",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[900]
                      : theme.palette.grey[100],
                  p: 2,
                  borderRadius: 1,
                  minHeight: "100px",
                }}
              >
                {project.notes || "No notes available for this project."}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Task Modal */}
      <Dialog
        open={openTaskModal}
        onClose={handleTaskModalClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <DialogTitle>{selectedTask ? "Edit Task" : "Add New Task"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                sx={{
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                sx={{
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={newTask.status}
                  label="Status"
                  onChange={(e) =>
                    setNewTask({ ...newTask, status: e.target.value })
                  }
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <MenuItem value="Not Started">Not Started</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Blocked">Blocked</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={newTask.priority}
                  label="Priority"
                  onChange={(e) =>
                    setNewTask({ ...newTask, priority: e.target.value })
                  }
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Assign To</InputLabel>
                <Select
                  value={newTask.assignedTo}
                  label="Assign To"
                  onChange={(e) =>
                    setNewTask({ ...newTask, assignedTo: e.target.value })
                  }
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  {employees.map((emp) => (
                    <MenuItem key={emp.id} value={emp.name}>
                      {emp.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask({ ...newTask, dueDate: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
                sx={{
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
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTaskModalClose}>Cancel</Button>
          <Button
            onClick={handleTaskSave}
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
          >
            {selectedTask ? "Save Changes" : "Add Task"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Employee Modal */}
      <Dialog
        open={openEmployeeModal}
        onClose={handleEmployeeModalClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <DialogTitle>
          {selectedEmployee ? "Edit Employee" : "Add New Employee"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Employee Name"
                value={newEmployee.name}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, name: e.target.value })
                }
                sx={{
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Role"
                value={newEmployee.role}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, role: e.target.value })
                }
                sx={{
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
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEmployeeModalClose}>Cancel</Button>
          <Button
            onClick={handleEmployeeSave}
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
          >
            {selectedEmployee ? "Save Changes" : "Add Employee"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProjectDetails;
