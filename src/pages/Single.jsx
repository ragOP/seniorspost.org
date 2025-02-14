import React, { useState } from 'react';
import { Button } from '@cred/neopop-web/lib/components';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import { BarChart } from '@mui/x-charts/BarChart';
import { color } from 'framer-motion';
import { PieChart } from '@mui/x-charts/PieChart';
import { desktopOS, valueFormatter, mobileOS } from './webUsageStats.ts';
import TodoApp from '../pages/admin/Todo.jsx'
import { LineChart } from '@mui/x-charts/LineChart';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createTheme, Grid2, MenuItem, Select, ThemeProvider, useMediaQuery } from "@mui/material";
import { ScoreMeter } from '@cred/neopop-web/lib/components';
import { colorPalette, FontVariant } from '@cred/neopop-web/lib/primitives';
import { AdminPanelWebsite } from './admin/components/AdminPanelHeader.jsx';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "white !important", // Input text color
          },
          "& .MuiInputLabel-root": {
            color: "white !important", // Label text color
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white !important", // Border color
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white !important", // Hover border color
          },
          "& .MuiSvgIcon-root": {
            color: "white !important", // Calendar icon color
          },
        },
      },
    },
  },
});
const topPagesData = {
  series: [
    {
      id: 'top-pages',
      data: [10, 20, 30, 40, 50],
      label: 'Page Views',
      color: 'white',
    },
  ],
  xAxis: [
    {
      data: ['food allowance', 'engmedts22', 'hackers313', 'Pagecdcd 4', 'Page 5'],
      scaleType: 'band',
      id: 'axis1',
      tick: {
        style: {
          fill: 'white', // Set x-axis label color to red
        },
      },
    },
  ],
  yAxis: [
    {
      tick: {
        style: {
          fill: 'white', // Set y-axis label color to red
        },
      },
    },
  ],
  height: 200,
  sx: {
    '& .MuiTypography-root': {
      color: 'white', // Set all typography to red
    },
    '& .MuiChartsAxis-root text': {
      fill: 'white !important', // Force x and y-axis text to red
    },
    '& .MuiChartsAxis-tickLabel': {
      fill: 'white !important', // Ensure tick labels are red
    },
    '& .MuiChartsAxis-line': {
      stroke: 'white !important', // Ensure x and y-axis lines are red
    },
    '& .MuiChartsAxis-tick': {
      stroke: 'white !important', // Ensure tick marks are red
    },
  },
};



// import { HighlightedCode } from '@mui/docs/HighlightedCode';

const barChartsParams = {
  series: [
    {
      id: 'series-1',
      data: [3, 4, 1, 6, 5],
      label: 'A',
      stack: 'total',
      highlightScope: {
        highlight: 'item',
      },
      color: 'green',
    },
    {
      id: 'series-2',
      data: [4, 3, 1, 5, 28],
      label: 'B',
      stack: 'total',
      highlightScope: {
        highlight: 'item',
      },
    },
    {
      id: 'series-3',
      data: [4, 2, 5, 4, 1],
      label: 'C',
      highlightScope: {
        highlight: 'item',
      },
    },
  ],
  xAxis: [
    {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      scaleType: 'band',
      id: 'axis1',
      tick: {
        style: {
          fill: '#fff', // Change x-axis label color to white
        },
      },
    },
  ],
  yAxis: [
    {
      tick: {
        style: {
          fill: '#fff', // Change y-axis label color to white
        },
      },
    },
  ],
  height: 300,
  sx: {
    '& .MuiTypography-root': {
      color: 'white', // Set all typography to red
    },
    '& .MuiChartsAxis-root text': {
      fill: 'white !important', // Force x and y-axis text to red
    },
    '& .MuiChartsAxis-tickLabel': {
      fill: 'white !important', // Ensure tick labels are red
    },
    '& .MuiChartsAxis-line': {
      stroke: 'white !important', // Ensure x and y-axis lines are red
    },
    '& .MuiChartsAxis-tick': {
      stroke: 'white !important', // Ensure tick marks are red
    },
  },
};

const Single = () => {
  const [itemData, setItemData] = React.useState();
  const [axisData, setAxisData] = React.useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div style={{ height: '100vh', maxHeight: "100vh", backgroundColor: '#000', overflowY: "auto" }}>
      <div
        style={{
          backgroundColor: '#141414',
          borderRadius: "1rem",
          margin: "1rem",
          padding: '25px',
          marginTop: '10px',
          color: 'white',
        }}
      >
        <Typography
          color="#F08D32"
          fontSize={20}
          fontType="serif-heading"
          fontWeight={700}
        >
          Dashboard analytics for website Food allowances
        </Typography>
      </div>

      {/* <div
        style={{
          backgroundColor: '#141414',
          borderRadius: "1rem",
          margin: "1rem",
          padding: "1rem",
          marginTop: '10px',
          color: 'white',
          gap: "1rem",
          // width: "100%",
        }}
      > */}
      <Grid2 container spacing={2} sx={{
        margin: "1rem",
        padding: "1rem",
        backgroundColor: '#141414',
        borderRadius: "1rem",
      }}>

        <Grid2 item size={{ lg: 7, md: 12, sm: 12, xs: 12 }}>
          <AdminPanelWebsite />
        </Grid2>

        <Grid2 item size={{ lg: 3, md: 12, sm: 12, xs: 12 }}>
          <Stack direction="row" spacing={1} sx={{}}>
            <ThemeProvider theme={theme}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack direction="row" spacing={2}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </ThemeProvider>
          </Stack>
        </Grid2>

        <Grid2 item size={{ lg: 2, md: 12, sm: 12, xs: 12 }}>
          <Stack direction="row" spacing={1} sx={{ mt: "0.25rem", width: "100%" }}>
            <Button
              colorMode="light"
              kind="elevated"
              onClick={function noRefCheck() { }}
              size="big"
            >
              All Data
            </Button>

            <Button
              colorMode="light"
              kind="elevated"
              onClick={function noRefCheck() { }}
              size="big"
              style={{
                height: 'auto',
              }}
            >
              Submit
            </Button>
          </Stack>
        </Grid2>
      </Grid2>
      {/* </div> */}

      <Grid2 container spacing={2} sx={{ margin: "1rem", }}>
        <Grid2 item size={{ lg: 4, md: 12, sm: 12, xs: 12 }}>
          <ButtonCallDetails />
        </Grid2>
        <Grid2 item size={{ lg: 8, md: 12, sm: 12, xs: 12 }}>
          <PageAnalytics />
        </Grid2>
      </Grid2>
    </div>
  );
}

export default Single;


export const ButtonCallDetails = () => {

  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <div
      style={{
        backgroundColor: '#141414',
        borderRadius: '10px',
        color: 'white',
        display: "flex",
        height: isMobile ? "20rem" : "33rem",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "1rem" : "4rem 1rem",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ flexWrap: 'wrap' }}>
        <Button
          colorMode="light"
          kind="elevated"
          onClick={function noRefCheck() { }}
          size="big"
          style={{
            margin: '10px',
            height: 'auto',
          }}
        >
          Q 1 (Yes) :   10
        </Button>

        <Button
          colorMode="light"
          kind="elevated"
          onClick={function noRefCheck() { }}
          size="big"
          style={{
            margin: '10px',
            height: 'auto',
          }}
        >
          Q 1 (No) :22
        </Button>

        <Button
          colorMode="light"
          kind="elevated"
          onClick={function noRefCheck() { }}
          size="big"
          style={{
            margin: '10px',
            height: 'auto',
          }}
        >
          Q2 (Yes) :121
        </Button>

        <Button
          colorMode="light"
          kind="elevated"
          onClick={function noRefCheck() { }}
          size="big"
          style={{
            margin: '10px',
            height: 'auto',
          }}
        >
          Q2 (No) :33
        </Button>
      </Stack>

      <Button
        colorMode="light"
        kind="elevated"
        onClick={function noRefCheck() { }}
        size="big"
        style={{
          marginTop: "3rem",
          height: 'auto',
        }}
      >
        Call (123232)
      </Button>

    </div>
  )
}

export const PageAnalytics = ({ itemData, axisData, setItemData, setAxisData }) => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
        <div
          style={{
            backgroundColor: '#141414',
            borderRadius: '10px',
            height: '20rem',
            width: '100%',
            color: 'white',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 0, md: 4 }}
            sx={{ width: '80%' }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <BarChart
                {...barChartsParams}
                onItemClick={(event, d) => setItemData(d)}
                onAxisClick={(event, d) => setAxisData(d)}
              />
            </Box>
          </Stack>
        </div>
      </Grid2>

      <Grid2 item size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
        <div style={{
          backgroundColor: '#141414',
          borderRadius: '10px',
          height: '20rem',
          width: '100%',
          color: 'white',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <PieChart
            series={[
              {
                data: mobileOS,
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'red' },
                valueFormatter,
              },
            ]}
            height={200}
          />
        </div>
      </Grid2>

      <Grid2 item size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
        <div style={{
          backgroundColor: '#141414',
          borderRadius: '10px',
          height: '20rem',
          width: '100%',
          color: 'white',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>

          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              paadding: "50px",
            }}
          >
            <ScoreMeter
              colorConfig={{
                dotColor: "",
                indicatorColors: {
                  decrement: "#FFB098",
                  increment: "#5CDDBE",
                  neutral: "#e2e2e2",
                },
                meterBorderColor: "#3D3D3D",
                meterStrokeBackground: "#0d0d0d",
                meterStrokeColor: {
                  average: "#EDFE79",
                  excellent: "#06C270",
                  poor: "#F29947",
                },
                scoreColor: "#ffffff",
                scoreContainerBackground: "#161616",
                scoreContainerBorder: "#0d0d0d",
              }}
              colorMode="dark"
              lowerLimit={300}
              reading={770}
              scoreDesc="Good"
              type="average"
              upperLimit={900}
            />
          </div>
        </div>
      </Grid2>

      {/* <Grid2 item size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
        <div style={{
          backgroundColor: '#141414',
          borderRadius: '10px',
          height: '30rem',
          width: '100%',
          color: 'white',
        }}>
          <center>Top Pages</center>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <LineChart {...topPagesData} />
          </ul>
        </div>
      </Grid2> */}

      <Grid2 item size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
        <div style={{
          backgroundColor: '#141414',
          borderRadius: '10px',
          height: '20rem',
          width: '100%',
          color: 'white',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 0, md: 4 }}
            sx={{ width: '100%' }}
          >
            <BarChart
              {...barChartsParams}
              onItemClick={(event, d) => setItemData(d)}
              onAxisClick={(event, d) => setAxisData(d)}
            />
          </Stack>
        </div>
      </Grid2>
    </Grid2>
  )
}