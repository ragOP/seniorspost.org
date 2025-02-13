import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

const fetchWebsiteOptions = async () => {
  const response = await fetch(
    "https://phonepe-be.onrender.com/api/admin/get-all-website-views"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const fetchAnalytics = async (websiteId) => {
  const response = await fetch(`https://phonepe-be.onrender.com/api/user/analytics/${websiteId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch analytics");
  }
  return response.json();
};




const AdminPanel = () => {
  const [selectedWebsite, setSelectedWebsite] = useState(null);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      width="100vw"
      position="relative"
      overflow="hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(45deg, rgb(255, 197, 209) 20%, rgb(252, 207, 183) 80%)",
          zIndex: -1, 
          animation: "gradientFlow 5s ease infinite",
        }}
      />
      <Stack sx={{ padding: "1rem" }}>
        <AdminPanelWebsite setSelectedWebsite={setSelectedWebsite} />
      </Stack>

      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ flex: 1, padding: "1rem", gap: "2rem" }}
      >
        {selectedWebsite && (
          <AdminShowWebsiteButtonDetails selectedWebsite={selectedWebsite} />
        )}
      </Stack>
    </Box>
  );
};

export default AdminPanel;

export const AdminPanelWebsite = ({ setSelectedWebsite }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const {
    data: websiteOptions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["websiteOptions"],
    queryFn: fetchWebsiteOptions,
  });

  const handleChange = (event) => {
    const selectedWebsite = websiteOptions.data.find(
      (option) => option.websiteId === event.target.value
    );
    setSelectedOption(event.target.value);
    setSelectedWebsite(selectedWebsite);
  };

  return (
    <Stack spacing={2} direction="column" alignItems="center" sx={{ width: "100%" }}>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <div>Error loading website options</div>
      ) : (
        <Select
          value={selectedOption}
          onChange={handleChange}
          sx={{ width: "100%" }}
          variant="standard"
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select a website
          </MenuItem>
          {websiteOptions?.data?.map((option) => (
            <MenuItem key={option.websiteId} value={option.websiteId}>
              {option.websiteName || `Website ${option.websiteId}`}
            </MenuItem>
          ))}
        </Select>
      )}
    </Stack>
  );
};

export const AdminShowWebsiteButtonDetails = ({ selectedWebsite }) => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const data = await fetchAnalytics(localStorage.getItem("websiteId"));
        console.log("Fetched analytics data:", data);
        setAnalytics(data.analytics);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    if (selectedWebsite?.websiteId) {
      fetchAnalyticsData();
    }
  }, [localStorage.getItem("websiteId")]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%" }}
    >
      <Box
        sx={{
          padding: "1rem",
          borderRadius: "8px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          component={motion.div}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ color: "rgb(245, 47, 90)" }}
        >
          Selected Website Details
        </Typography>
        <Stack spacing={2}>
          <Typography variant="body2">
            <strong>Website ID:</strong> {selectedWebsite.websiteId}
          </Typography>
          <Typography variant="body2">
            <strong>Visited:</strong> {selectedWebsite.totalVisits}
          </Typography>
          {selectedWebsite.websiteName && (
            <Typography variant="body2">
              <strong>Name:</strong> {selectedWebsite.websiteName}
            </Typography>
          )}
          <Typography variant="body2">
            <strong>Conversion Rate:</strong> {selectedWebsite.conversionPercentage || 0}
          </Typography>
          {selectedWebsite.buttonClicks && (
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Button Clicks:
              </Typography>
              {Object.entries(selectedWebsite.buttonClicks).map(([key, value]) => (
                <Typography key={key} variant="body2">
                  <strong>Button {key}:</strong> {value}
                </Typography>
              ))}
            </Box>
          )}

          {/* Display Analytics */}
          {analytics && (
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Analytics:
              </Typography>
              <Typography variant="body2">
                <strong>Average Session Duration:</strong> {analytics.averageSessionDuration}
              </Typography>
              <Typography variant="body2">
                <strong>Bounce Rate:</strong> {analytics.bounceRate}
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>
    </motion.div>
  );
};
