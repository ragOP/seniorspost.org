import React,{useState} from 'react';
import { Button } from '@cred/neopop-web/lib/components';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import { BarChart } from '@mui/x-charts/BarChart';
import { color } from 'framer-motion';
import { PieChart } from '@mui/x-charts/PieChart';
import { desktopOS, valueFormatter ,mobileOS}  from './webUsageStats.ts';
import TodoApp from   '../pages/admin/Todo.jsx'
import { LineChart } from '@mui/x-charts/LineChart';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {  createTheme, ThemeProvider } from "@mui/material";
import { ScoreMeter } from '@cred/neopop-web/lib/components';

import { colorPalette, FontVariant } from '@cred/neopop-web/lib/primitives';

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
      color: '#fff', // Ensure the text color for any typography is white
    },
  },
};

const Single = () => {
  const [itemData, setItemData] = React.useState();
  const [axisData, setAxisData] = React.useState();
  const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
  return (
    <div>
      <div style={{ 
        backgroundColor:'#141414' ,
        borderTopLeftRadius: '100px', 
        borderTopRightRadius: '100px', 
        padding: '25px', 
        marginTop: '10px', 
        color: 'white',
       
      }}>
     <Typography
  color="#F08D32"
  fontSize={20}
  fontType="serif-heading"
  fontWeight={700}
>
  Dashboard analytics for website Food allowances
</Typography>
      </div>
      <div style={{ 
        backgroundColor:'#141414' ,
        borderTopLeftRadius: '100px', 
        borderTopRightRadius: '100px', 
        padding: '25px', 
        marginTop: '10px', 
        color: 'white',
       
      }}>
  

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

    <Button
    colorMode="light"
    kind="elevated"
    onClick={function noRefCheck() {}}
    size="big"
    style={{
      margin:'10px',
      // Control button padding for better spacing
      height: 'auto', // Ensure the height is auto to fit content
    }}
  >
  All Data
  </Button>
    <Button
    colorMode="light"
    kind="elevated"
    onClick={function noRefCheck() {}}
    size="big"
    style={{
      margin:'10px',
      // Control button padding for better spacing
      height: 'auto', // Ensure the height is auto to fit content
    }}
  >
  Submit
  </Button>
      </div>
      <div style={{ 
        backgroundColor:'#141414' ,
        borderRadius: '10px',
      height: '300px', 
      width: '500px', 
        marginLeft: '420px', 
        marginTop: '10px',
        color: 'white',
        
       
      }}>
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

      <Stack direction="column" sx={{ width: { xs: '100%', md: '40%' } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography>Click on the chart</Typography>
          <IconButton
            aria-label="reset"
            size="small"
            onClick={() => {
              setItemData(null);
              setAxisData(null);
            }}
          >
            {/* <UndoOutlinedIcon fontSize="small" /> */}
          </IconButton>
        </Box>
        <pre style={{ backgroundColor: '#333', color: '#fff', padding: '10px', borderRadius: '5px' }}>
          {`// Data from item click
${itemData ? JSON.stringify(itemData, null, 2) : '// The data will appear here'}

// Data from axis click
${axisData ? JSON.stringify(axisData, null, 2) : '// The data will appear here'}`}
        </pre>
      </Stack>
    </Stack>
      </div>
      <div style={{ 
        backgroundColor:'#141414' ,
        borderRadius: '10px',
      height: '300px', 
      width: '500px', 
        marginLeft: '950px', 
        marginTop: '-300px',
        color: 'white',
        
       
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
      <div style={{ 
        backgroundColor:'#141414' ,
        borderRadius: '10px',
      height: '300px', 
      width: '500px', 
        marginLeft: '420px', 
        marginTop: '10px',
        color: 'white',
        
       
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
      <div style={{ 
        backgroundColor:'#141414' ,
        borderRadius: '10px',
      height: '300px', 
      width: '500px', 
        marginLeft: '950px', 
        marginTop: '-300px',
        color: 'white',
        
       
      }}>
 <center>Top Pages</center>
<ul style={{ listStyleType: 'none', padding: 0 }}>


  <LineChart {...topPagesData} />
  
</ul>
      </div>
    


      <div style={{ 
        backgroundColor:'#141414' ,
        borderRadius: '10px',
      height: '600px', 
      width: '400px', 
        marginTop: '-615px', 
        color: 'white',
        
       
      }}>
       <Button
    colorMode="light"
    kind="elevated"
    onClick={function noRefCheck() {}}
    size="big"
    style={{
      margin:'10px',
      // Control button padding for better spacing
      height: 'auto', // Ensure the height is auto to fit content
    }}
  >
   Q 1 (Yes) :   10
  </Button>
  <Button
    colorMode="light"
    kind="elevated"
    onClick={function noRefCheck() {}}
    size="big"
    style={{
      margin:'10px',
      // Control button padding for better spacing
      height: 'auto', // Ensure the height is auto to fit content
    }}
  >
   Q 1 (No) :22
  </Button>
  <Button
    colorMode="light"
    kind="elevated"
    onClick={function noRefCheck() {}}
    size="big"
    style={{
      margin:'10px',
      // Control button padding for better spacing
      height: 'auto', // Ensure the height is auto to fit content
    }}
  >
   Q2 (Yes) :121
  </Button>
  <Button
    colorMode="light"
    kind="elevated"
    onClick={function noRefCheck() {}}
    size="big"
    style={{
      margin:'10px',
      // Control button padding for better spacing
      height: 'auto', // Ensure the height is auto to fit content
    }}
  >
   Q2 (No) :33
  </Button>
  <Button
    colorMode="light"
    kind="elevated"
    onClick={function noRefCheck() {}}
    size="big"
    style={{
      margin:'120px',
      // Control button padding for better spacing
      height: 'auto', // Ensure the height is auto to fit content
    }}
  >
Call (123232)
  </Button>
     
      </div>
      <div style={{ 
        backgroundColor:'#141414' ,
        borderRadius: '10px',
      height: '300px', 
      width: '500px', 
        marginLeft: '420px', 
        marginTop: '10px',
        color: 'white',
        
       
      }}>
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

      <Stack direction="column" sx={{ width: { xs: '100%', md: '40%' } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography>Bounce rate </Typography>
          <IconButton
            aria-label="reset"
            size="small"
            onClick={() => {
              setItemData(null);
              setAxisData(null);
            }}
          >
            {/* <UndoOutlinedIcon fontSize="small" /> */}
          </IconButton>
        </Box>
        <pre style={{ backgroundColor: '#333', color: '#fff', padding: '10px', borderRadius: '5px' }}>
          {`// Data from item click
${itemData ? JSON.stringify(itemData, null, 2) : '// The data will appear here'}

// Data from axis click
${axisData ? JSON.stringify(axisData, null, 2) : '// The data will appear here'}`}
        </pre>
      </Stack>
    </Stack>
      </div>

    
    </div>
  );
}

export default Single;
