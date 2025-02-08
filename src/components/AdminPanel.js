import React, { useState } from "react";
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

const fetchButtonOptions = async () => {
  const response = await fetch(
    "https://phonepe-be.onrender.com/api/admin/get-all-button-views",
    {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache", 
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const AdminPanel = () => {
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);

  const showWebsiteDetails = selectedButton || selectedWebsite;

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
        <AdminPanelButtons setSelectedButton={setSelectedButton} />
        {showWebsiteDetails && (
          <AdminShowWebsiteButtonDetails
            selectedWebsite={selectedWebsite}
            selectedButton={selectedButton}
          />
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
      (option) => option._id === event.target.value
    );
    setSelectedOption(event.target.value);
    setSelectedWebsite(selectedWebsite);
  };

  return (
    <Stack
      spacing={2}
      direction="column"
      alignItems="center"
      sx={{ width: "100%" }}
    >
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
          {websiteOptions.data.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.websiteName
                ? option.websiteName
                : `Website ${option.websiteId}`}
            </MenuItem>
          ))}
        </Select>
      )}
    </Stack>
  );
};

export const AdminPanelButtons = ({ setSelectedButton }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const {
    data: buttonOptions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["buttonOptions"],
    queryFn: fetchButtonOptions,
  });

  const handleChange = (event) => {
    const selectedButton = buttonOptions.data.find(
      (option) => option._id === event.target.value
    );
    setSelectedOption(event.target.value);
    setSelectedButton(selectedButton);
  };

  return (
    <Stack
      spacing={2}
      direction="column"
      alignItems="center"
      sx={{ width: "100%", padding: "1rem" }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <div>Error loading button options</div>
      ) : (
        <Select
          value={selectedOption}
          onChange={handleChange}
          sx={{ width: "100%" }}
          variant="standard"
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select a button
          </MenuItem>
          {buttonOptions.data.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.buttonId}
            </MenuItem>
          ))}
        </Select>
      )}
    </Stack>
  );
};

export const AdminShowWebsiteButtonDetails = ({
  selectedWebsite,
  selectedButton,
}) => {
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
          Selected Website & Button Details
        </Typography>
        <Stack spacing={2}>
          {selectedWebsite && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ color: "rgb(249, 61, 102)" }}
              >
                Website Details:
              </Typography>
              <Typography variant="body2">
                <strong>ID:</strong> {selectedWebsite._id}
              </Typography>
              <Typography variant="body2">
                <strong>Website ID:</strong> {selectedWebsite.websiteId}
              </Typography>
              <Typography variant="body2">
                <strong>Visited:</strong> {selectedWebsite.visited}
              </Typography>
              {selectedWebsite.websiteName && (
                <Typography variant="body2">
                  <strong>Name:</strong> {selectedWebsite.websiteName}
                </Typography>
              )}
            </motion.div>
          )}
          {selectedButton && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ color: "rgb(249, 61, 102)" }}
              >
                Button Details:
              </Typography>
              <Typography variant="body2">
                <strong>ID:</strong> {selectedButton._id}
              </Typography>
              <Typography variant="body2">
                <strong>Button ID:</strong> {selectedButton.buttonId}
              </Typography>
            </motion.div>
          )}
        </Stack>
      </Box>
    </motion.div>
  );
};
