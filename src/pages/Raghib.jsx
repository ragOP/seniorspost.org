import React from 'react';
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
import { Grid2 } from '@mui/material';

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

const AdminPanel = () => {
  const [itemData, setItemData] = React.useState();
  const [axisData, setAxisData] = React.useState();
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
          Navigation Bar
        </Typography>
      </div>


      <Grid2 container spacing={2} sx={{ margin: "1rem", }}>
        <Grid2 item size={{ lg: 4, md: 12, sm: 12, xs: 12 }}>
          <div
            style={{
              backgroundColor: '#141414',
              borderRadius: "1rem",
              padding: '1rem',
              marginTop: '10px',
              color: 'white',
            }}
          >
            <TodoApp />
          </div>
        </Grid2>
        <Grid2 item size={{ lg: 8, md: 12, sm: 12, xs: 12 }}>
          <NavigationAnalytics />
        </Grid2>
      </Grid2>
    </div>
  );
}

export default AdminPanel;


export const NavigationAnalytics = ({ itemData, setItemData, setAxisData, axisData }) => {
  return (

    <Grid2 container spacing={2}>
      <Grid2 item size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
        <div style={{
          backgroundColor: '#141414',
          borderRadius: '10px',
          height: '22rem',
          width: '100%',
          color: 'white',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 0, md: 4 }}
          >
            <BarChart
              {...barChartsParams}
              onItemClick={(event, d) => setItemData(d)}
              onAxisClick={(event, d) => setAxisData(d)}
            />
          </Stack>
        </div>
      </Grid2>

      <Grid2 item size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
        <div style={{
          backgroundColor: '#141414',
          borderRadius: '10px',
          height: '22rem',
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
          height: '22rem',
          width: '100%',
          color: 'white',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <center>Top Pages</center>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <LineChart {...topPagesData} />
          </ul>
        </div>
      </Grid2>

      <Grid2 item size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>

        <div style={{
          backgroundColor: '#141414',
          borderRadius: '10px',
          height: '22rem',
          width: '100%',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: 'white',
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
