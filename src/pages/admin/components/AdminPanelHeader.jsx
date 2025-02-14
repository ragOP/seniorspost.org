import { Button, Checkbox, CircularProgress, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchWebsiteOptions } from "../helpers/fetchWebsiteOptions";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import HeightIcon from '@mui/icons-material/Height';

export const AdminPanelHeader = ({
    setSelectedWebsite,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    allTime,
    setAllTime,
    handleSearch,
    loading,
    websiteOptions,
    isLoading,
    error
}) => {
    return (
        <Stack direction="row" alignItems="center" sx={{ gap: "2rem", width: "100%" }}>
            <AdminPanelWebsite
                setSelectedWebsite={setSelectedWebsite}
                websiteOptions={websiteOptions}
                isLoading={isLoading}
                error={error}
            />

            <Stack direction="row" alignItems="center" sx={{ width: "50%", gap: "1rem" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(newDate) => setStartDate(newDate)}
                        disableFuture
                        disabled={allTime}
                    />
                    <Typography>-</Typography>
                    {/* <HeightIcon sx={{ transform: "rotate(90deg)" }} /> */}
                    <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(newDate) => {
                            if (startDate && newDate.isBefore(startDate)) {
                                alert("End date must be after start date");
                            } else {
                                setEndDate(newDate);
                            }
                        }}
                        disableFuture
                        disabled={allTime}
                    />
                </LocalizationProvider>

                <Stack direction="row" alignItems="center" onClick={() => setAllTime(!allTime)}>
                    <Checkbox checked={allTime} />
                    <Typography>All Time</Typography>
                </Stack>
            </Stack>

            <Button variant="contained" disabled={loading} onClick={handleSearch}>
                {loading ? <CircularProgress size={24} /> : "Search"}
            </Button>
        </Stack>
    );
};


export const AdminPanelWebsite = ({ setSelectedWebsite, websiteOptions, isLoading, error }) => {
    const [selectedOption, setSelectedOption] = useState("");


    const handleChange = (event) => {
        const selectedWebsite = websiteOptions.data.find(
            (option) => option.websiteId === event.target.value
        );
        setSelectedOption(event.target.value);
        setSelectedWebsite(selectedWebsite);
    };

    console.log(">>", websiteOptions);

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
                    // sx={{ width: "100%", border: "1px solid #fff", outline: "1px solid #fff" }}
                    variant="outlined"
                    sx={{
                        width: "100%",
                        // backgroundColor: "white",
                        color: "#fff",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                        },
                    }}
                    displayEmpty
                >
                    <MenuItem value="" disabled>
                        Select a website
                    </MenuItem>
                    {websiteOptions?.data &&
                        websiteOptions?.data?.length > 0 &&
                        websiteOptions.data.map((option) => (
                            <MenuItem key={option.websiteId} value={option.websiteId}>
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