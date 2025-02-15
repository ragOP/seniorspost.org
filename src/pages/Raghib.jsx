import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { mobileOS, valueFormatter } from './admin/webUsageStats.js';
import TodoApp from '../pages/admin/Todo.jsx'
import { LineChart } from '@mui/x-charts/LineChart';
import { Grid2 } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchWebsiteOptions } from './admin/helpers/fetchWebsiteOptions.js';

const AdminPanel = () => {

  const {
    data: responseData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["websiteOptions"],
    queryFn: fetchWebsiteOptions,
  });

  const allWebsites = responseData?.data || [];

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
          <NavigationAnalytics allWebsites={allWebsites} />
        </Grid2>
      </Grid2>
    </div>
  );
}

export default AdminPanel;

export const NavigationAnalytics = ({ allWebsites }) => {

  const totalWebsites = allWebsites?.length || 0;
  const converstionRateTotal = allWebsites?.reduce((acc, curr) => acc + Number(curr.conversionPercentage), 0) || 0;
  const bounceRateTotal = allWebsites?.reduce((acc, curr) => acc + Number(curr.bounceRate), 0) || 0;
  const viewsTotal = allWebsites?.reduce((acc, curr) => acc + (100 - (Number(curr.conversionPercentage) + Number(curr.bounceRate))), 0) || 0;

  const pieChartData = [
    {
      label: "Conversion rate",
      value: converstionRateTotal / totalWebsites || 0,
    },
    {
      label: "Bounce rate",
      value: bounceRateTotal / totalWebsites || 0,
    },
    {
      label: "Views",
      value: viewsTotal / totalWebsites || 0,
    }
  ]

  const aggregateVisitsByDay = (websitesData) => {
    const visitTotals = {};

    websitesData.forEach((website) => {
      website.history.forEach((day) => {
        if (!visitTotals[day.date]) {
          visitTotals[day.date] = 0;
        }
        visitTotals[day.date] += day.totalVisits;
      });
    });

    return Object.entries(visitTotals).map(([label, value]) => ({ label, value }));
  };
  const aggregateHistory = aggregateVisitsByDay(allWebsites);
  console.log(pieChartData)

  const barChartsParams = {
    series: [
      {
        id: "series-1",
        data: aggregateHistory?.map((day) => day?.value) || [],
        label: "Conversion %",
        color: "white",

      }
    ],
    xAxis: [
      {
        data: aggregateHistory?.map((day) => day?.label) || [],
        scaleType: 'band',
        id: 'axis1',
        tick: {
          style: {
            fill: '#fff',
          },
        },
      },
    ],

    yAxis: [
      {
        tick: {
          style: {
            fill: '#fff',
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
      '& .MuiChartsBar-root .MuiChartsBar-label': {
        color: 'white !important', // Ensure bar labels are white
      },
      '& .MuiChartsLegend-root text': {
        fill: 'white !important',
      },
      '& .MuiChartsLegend-series text': {
        fill: 'white !important',
      },
    },
  };

  const topPagesData = {
    series: [
      {
        id: 'top-pages',
        data: allWebsites?.map((website) => website?.totalVisits) || [],
        label: 'Page Views',
        color: 'white',
      },
    ],
    xAxis: [
      {
        data: allWebsites?.map((website) => website.websiteName) || [],
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
      '& .MuiChartsLegend-root text': {
        fill: 'white !important',
      },
      '& .MuiChartsLegend-series text': {
        fill: 'white !important',
      },
    },
  };


  return (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
        <div
          style={{
            backgroundColor: '#141414',
            borderRadius: '10px',
            height: '22rem',
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
            sx={{ width: '100%' }}
          >
            <BarChart
              {...barChartsParams}
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
                data: pieChartData,
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'red' },
              },
            ]}
            height={200}
            sx={{
              '& .MuiChartsLegend-root text': {
                fill: 'white !important',
              },
              '& .MuiChartsLegend-series text': {
                fill: 'white !important',
              },
            }}
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
          <LineChart
            {...topPagesData}
          />
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
            />
          </Stack>
        </div>
      </Grid2>
    </Grid2>
  )
}
