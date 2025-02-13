import React, { useState } from "react";
import {
  Box,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import AdminShowWebsiteButtonDetails from "./components/AdminShowWebsiteButtonDetails";
import { AdminPanelHeader } from "./components/AdminPanelHeader";
import dayjs from "dayjs";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { fetchWebsiteOptions } from "./helpers/fetchWebsiteOptions";

const AdminPanel = () => {
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [selectedWebsiteData, setSelectedWebsiteData] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [allTime, setAllTime] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    data: websiteOptions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["websiteOptions"],
    queryFn: fetchWebsiteOptions,
  });

  const handleSearch = async () => {
    if (!allTime && (!startDate || !endDate)) {
      alert("Please select both start and end dates or enable 'All Time'");
      return;
    }

    setLoading(true);
    try {
      if (allTime) {
        console.log(11111)
        const getCurrentWebsiteData = websiteOptions?.data?.find((website) => website?.websiteId?.toString() === selectedWebsite?.websiteId?.toString());
        setSelectedWebsiteData(getCurrentWebsiteData)
        return
      }

      const formattedStartDate = allTime ? null : dayjs(startDate).format("YYYY-MM-DD");
      const formattedEndDate = allTime ? null : dayjs(endDate).format("YYYY-MM-DD");


      const url = "https://phonepe-be.onrender.com/api/admin/get-all-website-views2"
      const finalUrl = formattedStartDate && formattedEndDate ? `${url}?startDate=${formattedStartDate}&endDate=${formattedEndDate}` : url

      const response = await axios.get(finalUrl);

      if (response?.data?.data?.length === 0) {
        alert("No data found for the selected date range");
      }
      console.log("DATA>>>>", response?.data)
      const getCurrentWebsiteData = response?.data?.data?.find((website) => website?.websiteId?.toString() === selectedWebsite?.websiteId?.toString());
      if (!getCurrentWebsiteData) {
        alert("No data found for the selected website");
        return;
      }

      setSelectedWebsiteData(getCurrentWebsiteData)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

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
        <AdminPanelHeader
          setSelectedWebsite={setSelectedWebsite}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          allTime={allTime}
          setAllTime={setAllTime}
          handleSearch={handleSearch}
          loading={loading}
          websiteOptions={websiteOptions}
          isLoading={isLoading}
          error={error}
        />
      </Stack>

      <Stack
        alignItems="center"
        sx={{ flex: 1, padding: "1rem", gap: "2rem" }}
      >
        {/* <AdminPanelButtons setSelectedButton={setSelectedButton} /> */}
        {selectedWebsiteData && (
          <AdminShowWebsiteButtonDetails
            selectedWebsite={selectedWebsiteData}
          />
        )}
      </Stack>
    </Box>
  );
};

export default AdminPanel;

// export const AdminPanelButtons = ({ setSelectedButton }) => {
//   const [selectedOption, setSelectedOption] = useState("");
//   const {
//     data: buttonOptions,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["buttonOptions"],
//     queryFn: fetchButtonOptions,
//   });

//   const handleChange = (event) => {
//     const selectedButton = buttonOptions.data.find(
//       (option) => option._id === event.target.value
//     );
//     setSelectedOption(event.target.value);
//     setSelectedButton(selectedButton);
//   };

//   return (
//     <Stack
//       spacing={2}
//       direction="column"
//       alignItems="center"
//       sx={{ width: "100%", padding: "1rem" }}
//     >
//       {isLoading ? (
//         <CircularProgress />
//       ) : error ? (
//         <div>Error loading button options</div>
//       ) : (
//         <Select
//           value={selectedOption}
//           onChange={handleChange}
//           sx={{ width: "100%" }}
//           variant="standard"
//           displayEmpty
//         >
//           <MenuItem value="" disabled>
//             Select a button
//           </MenuItem>
//           {buttonOptions.data.map((option) => (
//             <MenuItem key={option._id} value={option._id}>
//               {option.buttonId}
//             </MenuItem>
//           ))}
//         </Select>
//       )}
//     </Stack>
//   );
// };

