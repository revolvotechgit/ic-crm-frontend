import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Container,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from "@mui/material";
import {
  TrendingUp,
  People,
  AttachMoney,
  ShowChart,
  ArrowUpward,
  AccessTime,
} from "@mui/icons-material";

function Home() {
  // Example data for statistics
  const stats = [
    {
      title: "Total Users",
      value: "2,300",
      icon: <People sx={{ fontSize: 40, color: "primary.main" }} />,
      trend: "+14%",
    },
    {
      title: "Total Revenue",
      value: "$45,000",
      icon: <AttachMoney sx={{ fontSize: 40, color: "primary.main" }} />,
      trend: "+21%",
    },
    {
      title: "Active Sessions",
      value: "1,420",
      icon: <ShowChart sx={{ fontSize: 40, color: "primary.main" }} />,
      trend: "+8%",
    },
    {
      title: "Growth Rate",
      value: "24.5%",
      icon: <TrendingUp sx={{ fontSize: 40, color: "primary.main" }} />,
      trend: "+2.5%",
    },
  ];

  // Example data for recent activities
  const recentActivities = [
    {
      user: "John Doe",
      action: "Created a new project",
      time: "2 minutes ago",
      avatar:
        "https://ui-avatars.com/api/?name=John+Doe&background=4f46e5&color=fff",
    },
    {
      user: "Jane Smith",
      action: "Updated dashboard layout",
      time: "5 minutes ago",
      avatar:
        "https://ui-avatars.com/api/?name=Jane+Smith&background=10b981&color=fff",
    },
    {
      user: "Mike Johnson",
      action: "Added new team members",
      time: "10 minutes ago",
      avatar:
        "https://ui-avatars.com/api/?name=Mike+Johnson&background=f59e0b&color=fff",
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header Section */}
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
            Dashboard Overview
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome back, John Doe
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {stat.title}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: "600" }}
                        color="text.primary"
                      >
                        {stat.value}
                      </Typography>
                    </Box>
                    {stat.icon}
                  </Box>

                  <Box sx={{ width: "100%", mt: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={70}
                      sx={{
                        bgcolor: "background.default",
                        "& .MuiLinearProgress-bar": {
                          bgcolor: "primary.main",
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <ArrowUpward
                      sx={{ color: "success.main", fontSize: 20, mr: 0.5 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "success.main", fontWeight: 500 }}
                    >
                      {stat.trend} from last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Activity and Chart Section */}
        <Grid container spacing={3}>
          {/* Recent Activity */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" color="text.primary" sx={{ mb: 3 }}>
                Recent Activity
              </Typography>
              <List>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar src={activity.avatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography color="text.primary">
                            {activity.user}
                          </Typography>
                        }
                        secondary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 0.5,
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
                              {activity.time}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.primary"
                              sx={{ ml: 2 }}
                            >
                              {activity.action}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Performance Overview */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" color="text.primary" sx={{ mb: 3 }}>
                Performance Overview
              </Typography>
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="body1" color="text.secondary">
                  Performance metrics will be displayed here
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
