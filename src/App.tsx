import { faker } from "@faker-js/faker";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ScriptableContext,
  ArcElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect, useMemo, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Box, FormControl, IconButton, Typography } from "@mui/material";

import "./App.css";
import {
  labels,
  labelsDate,
  labelsWeekDay,
  translationLanguageData,
  translationsOptions,
} from "./constants";
import { useStyles } from "./components/commonStyle";
import { ReactComponent as DropDownIcon } from "./images/avatar-arrow.svg";
import PopperCustom from "./components/popperCustom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
  ChartDataLabels
);

export const dataForDoughnutChart = {
  labels: ["Bangladesh", "USA", "Canada", "Germany", "Finland", "Italy"],

  datasets: [
    {
      // label: '# of Votes',
      data: [450, 345, 200, 75, 50, 30],
      backgroundColor: [
        "#428BFF",
        "#69B6F8",
        "#B27EEF",
        "#FF9964",
        "#5BDFB4",
        "#D9DBE6",
      ],
      borderColor: [
        "#428BFF",
        "#69B6F8",
        "#B27EEF",
        "#FF9964",
        "#5BDFB4",
        "#D9DBE6",
      ],
      // borderWidth: 1,

      // hoverBackgroundColor: 'red',
      // hoverBorderColor: 'blue',
      hoverBorderWidth: "14",
      hoverBorderJoinStyle: "miter",
      // hoverOffset: '10',
    },
  ],
};

const optionsForDoughnut = {
  cutout: 60,

  layout: {
    // padding: {
    //   left: 2,
    //   right: 2,
    // },
    padding: 8,
  },
  plugins: {
    datalabels: {
      display: (context: { active: any }) => !!context.active,
      color: "#ffff",
      font: {
        size: 9,
      },
      // formatter: (val: string) => `${val} kg`,
      formatter: (
        value: any,
        context: {
          chart: { data: { labels: { [x: string]: any } } };
          dataIndex: string | number;
        }
      ) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/restrict-template-expressions
        `${context.chart.data.labels[context.dataIndex]}\n    ${value}`,
    },
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false, // <-- this option disables tooltips
    },
  },
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
};

export const options = {
  scales: {
    x: {
      ticks: {
        font: {
          size: 11,
          fontWeight: "500",
        },
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        // stepSize: 100,
        font: {
          size: 11,
          color: "#313133",
        },
        padding: 8,
      },
      suggestedMin: 0,
      suggestedMax: 1200,
      grid: {
        drawTicks: false,
        drawBorder: false,
      },
    },
  },
  responsive: true,
  plugins: {
    datalabels: {
      display: false,
    },
    legend: {
      position: "top" as const,
      display: false,
      labels: {
        font: {
          size: 14,
        },
      },
    },
    title: {
      display: true,
      text: "",
    },

    tooltip: {
      enabled: true,
      pointStyle: false,
      yAlign: "bottom",
      displayColors: false,
      titleAlign: "center",
      // titleMarginBottom: 20,
      titleFont: {
        size: 11,
        weight: 300,
      },

      bodyAlign: "center",
      callbacks: {
        // eslint-disable-next-line consistent-return
        label: (tooltipItem: { label: string }) => {
          if (tooltipItem?.label) {
            return ` Tue, Mar 9, 2023 `;
          }
        },

        // eslint-disable-next-line consistent-return
        title: (tooltipItem: [{ formattedValue: string }]) => {
          if (tooltipItem[0].formattedValue) {
            return `    ${tooltipItem[0].formattedValue}    `;
          }
        },
      },
    },
  },
};

const App = () => {
  const classes = useStyles();

  // start area chart time selector popper
  const [rowElAreaChart, setRowElAreaChart] = useState<null | HTMLElement>(
    null
  );

  const rowSelectMenuOpenAreaChart = Boolean(rowElAreaChart);
  const [areaChartTimeSelected, setAreaChartTimeSelected] =
    useState<string>("Previous Month");

  const handleRowMenuOpenAreaChart = (event: React.MouseEvent<HTMLElement>) => {
    setRowElAreaChart(event.currentTarget);
  };

  const handleRowMenuCloseAreaChart = () => {
    setRowElAreaChart(null);
  };

  const rowSelectIdAreaChart = rowSelectMenuOpenAreaChart
    ? "simple-popper"
    : undefined;
  const popperOnclickHandlerAreaChart = (val: string) => {
    setAreaChartTimeSelected(val);
    setRowElAreaChart(null);
  };

  // end area chart time selector popper

  // start translation from time selector popper
  const [rowElTranslationFrom, setRowElTranslationFrom] =
    useState<null | HTMLElement>(null);

  const rowSelectMenuOpenTranslationFrom = Boolean(rowElTranslationFrom);
  const [translationFromTimeSelected, setTranslationFromTimeSelected] =
    useState<string>("Previous Month");

  const handleRowMenuOpenTranslationFrom = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setRowElTranslationFrom(event.currentTarget);
  };

  const handleRowMenuCloseTranslationFrom = () => {
    setRowElTranslationFrom(null);
  };

  const rowSelectIdTranslationFrom = rowSelectMenuOpenTranslationFrom
    ? "simple-popper"
    : undefined;
  const popperOnclickHandlerTranslationFrom = (val: string) => {
    setTranslationFromTimeSelected(val);
    setRowElTranslationFrom(null);
  };

  // end translation from time selector popper

  // start translation to time selector popper
  const [rowElTranslationTo, setRowElTranslationTo] =
    useState<null | HTMLElement>(null);

  const rowSelectMenuOpenTranslationTo = Boolean(rowElTranslationTo);
  const [translationToTimeSelected, setTranslationToTimeSelected] =
    useState<string>("Previous Month");

  const handleRowMenuOpenTranslationTo = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setRowElTranslationTo(event.currentTarget);
  };

  const handleRowMenuCloseTranslationTo = () => {
    setRowElTranslationTo(null);
  };

  const rowSelectIdTranslationTo = rowSelectMenuOpenTranslationTo
    ? "simple-popper"
    : undefined;
  const popperOnclickHandlerTranslationTo = (val: string) => {
    setTranslationToTimeSelected(val);
    setRowElTranslationTo(null);
  };

  // end translation to time selector popper

  const data = useMemo(() => {
    const theData = {
      labels:
        // eslint-disable-next-line no-nested-ternary
        areaChartTimeSelected === "This Year" ||
        areaChartTimeSelected === "Previous Year" ||
        areaChartTimeSelected === "This Week" ||
        areaChartTimeSelected === "Previous Week"
          ? areaChartTimeSelected === "This Week" ||
            areaChartTimeSelected === "Previous Week"
            ? labelsWeekDay
            : labels
          : labelsDate,
      datasets: [
        {
          fill: true,
          label: "",
          // pointColor: '#fff',
          // pointHighlightFill: '#fff',

          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          data:
            // eslint-disable-next-line no-nested-ternary
            areaChartTimeSelected === "This Year" ||
            areaChartTimeSelected === "Previous Year" ||
            areaChartTimeSelected === "This Week" ||
            areaChartTimeSelected === "Previous Week"
              ? areaChartTimeSelected === "This Week" ||
                areaChartTimeSelected === "Previous Week"
                ? labelsWeekDay.map(() =>
                    faker.datatype.number({ min: 300, max: 1100 })
                  )
                : labels.map(() =>
                    faker.datatype.number({ min: 300, max: 1100 })
                  )
              : labelsDate.map(() =>
                  faker.datatype.number({ min: 300, max: 1100 })
                ),
          borderColor: "rgb(53, 162, 235)",
          borderWidth: 2,
          pointBackgroundColor: "#fff",
          // pointHoverRadius: 5,
          hoverBackgroundColor: "rgb(53, 162, 235)",
          // borderDash: [21, 21],

          backgroundColor: (context: ScriptableContext<"line">) => {
            const { ctx } = context.chart;
            const gradient = ctx.createLinearGradient(0, 0, 0, 560);
            gradient.addColorStop(0, "rgba(179, 223, 255, 1)");
            gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");

            return gradient;
          },
        },
      ],
    };

    return theData;
  }, [areaChartTimeSelected]);

  // Dummy area chart footer label
  const [areaChartFooterLabel, setAreaChartFooterLabel] =
    useState<string>("March 2023");
  useEffect(() => {
    if (
      areaChartTimeSelected === "This Year" ||
      areaChartTimeSelected === "Previous Year"
    ) {
      setAreaChartFooterLabel("2023");
    } else {
      setAreaChartFooterLabel("March 2023");
    }
  }, [areaChartTimeSelected]);

  return (
    <Box
      style={{
        margin: "0",
        padding: "40px",
        paddingTop: "30px",
        paddingBottom: "30px",
        fontSize: "30px",
        backgroundColor: "#F8F8F8",
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "20px auto",
          backgroundColor: "#fff",
          padding: "24px 19px 13px 23px",
          borderRadius: "8px",
          border: "1px solid rgba(222, 223, 223, 0.5)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: "18px", fontWeight: "400" }}>
            Area Chart
          </Typography>
          <FormControl sx={{ marginLeft: "-6px" }}>
            {/* custom select start */}
            <IconButton
              size="large"
              aria-label="3"
              aria-controls={rowSelectIdAreaChart}
              aria-describedby={rowSelectIdAreaChart}
              color="inherit"
              aria-haspopup="true"
              onClick={handleRowMenuOpenAreaChart}
              sx={{
                backgroundColor: "#FBFBFB !important",
              }}
              className={classes.timePeriodRowBtn}
            >
              <Typography className={classes.cardSelectBoxPlaceholderDashboard}>
                {areaChartTimeSelected}
              </Typography>
              <DropDownIcon />
            </IconButton>

            <PopperCustom
              rowSelectId={rowSelectIdAreaChart}
              rowSelectMenuOpen={rowSelectMenuOpenAreaChart}
              rowEl={rowElAreaChart}
              handleRowMenuClose={handleRowMenuCloseAreaChart}
              translationsOptions={translationsOptions}
              isSelected={areaChartTimeSelected}
              popperOnclickHandler={(val) => popperOnclickHandlerAreaChart(val)}
            />
            {/* custom select end */}
          </FormControl>
        </Box>
        {/* @ts-expect-error will remove soon */}
        <Line height={65} options={options} data={data} />
        <Typography
          sx={{ fontSize: "13px", fontWeight: "400", textAlign: "center" }}
        >
          {areaChartFooterLabel}
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "#fff",
          maxWidth: "1200px",
          margin: "auto",
          borderRadius: "8px",
          border: "1px solid rgba(222, 223, 223, 0.5)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            paddingLeft: "20px",
            paddingTop: "12px",
            paddingRight: "14px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: "15px" }}>
              Countries color label
            </Typography>
            <FormControl sx={{ marginLeft: "-6px" }}>
              {/* custom select start */}
              <IconButton
                size="large"
                aria-label="3"
                aria-controls={rowSelectIdTranslationFrom}
                aria-describedby={rowSelectIdTranslationFrom}
                color="inherit"
                aria-haspopup="true"
                onClick={handleRowMenuOpenTranslationFrom}
                sx={{
                  backgroundColor: "#FBFBFB !important",
                }}
                className={classes.timePeriodRowBtn}
              >
                <Typography
                  className={classes.cardSelectBoxPlaceholderDashboard}
                >
                  {translationFromTimeSelected}
                </Typography>
                <DropDownIcon />
              </IconButton>

              <PopperCustom
                rowSelectId={rowSelectIdTranslationFrom}
                rowSelectMenuOpen={rowSelectMenuOpenTranslationFrom}
                rowEl={rowElTranslationFrom}
                handleRowMenuClose={handleRowMenuCloseTranslationFrom}
                translationsOptions={translationsOptions}
                isSelected={translationFromTimeSelected}
                popperOnclickHandler={(val) =>
                  popperOnclickHandlerTranslationFrom(val)
                }
              />
              {/* custom select end */}
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Box
              sx={{
                width: "50%",
              }}
            >
              {translationLanguageData.map((translation) => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginLeft: "5px",
                    marginBottom: "6px",
                  }}
                >
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Box
                      sx={{
                        height: "8px",
                        width: "8px",
                        marginTop: "5px",
                        backgroundColor: `${translation.color}`,
                      }}
                    />
                    <Typography sx={{ fontSize: "9px", marginTop: "2px" }}>
                      {translation.language}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: "10px", weight: "500" }}>
                      {translation.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ width: "35%", marginRight: "15px" }}>
              <Doughnut
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                data={dataForDoughnutChart as any}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                options={optionsForDoughnut as any}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#fff",
          margin: "auto",
          maxWidth: "1200px",
          borderRadius: "8px",
          border: "1px solid rgba(222, 223, 223, 0.5)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            paddingLeft: "20px",
            paddingTop: "12px",
            paddingRight: "14px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: "15px" }}>
              Countries label
            </Typography>
            <FormControl sx={{ marginLeft: "-6px" }}>
              {/* custom select start */}
              <IconButton
                size="large"
                aria-label="3"
                aria-controls={rowSelectIdTranslationTo}
                aria-describedby={rowSelectIdTranslationTo}
                color="inherit"
                aria-haspopup="true"
                onClick={handleRowMenuOpenTranslationTo}
                sx={{
                  backgroundColor: "#FBFBFB !important",
                }}
                className={classes.timePeriodRowBtn}
              >
                <Typography
                  className={classes.cardSelectBoxPlaceholderDashboard}
                >
                  {translationToTimeSelected}
                </Typography>
                <DropDownIcon />
              </IconButton>

              <PopperCustom
                rowSelectId={rowSelectIdTranslationTo}
                rowSelectMenuOpen={rowSelectMenuOpenTranslationTo}
                rowEl={rowElTranslationTo}
                handleRowMenuClose={handleRowMenuCloseTranslationTo}
                translationsOptions={translationsOptions}
                isSelected={translationToTimeSelected}
                popperOnclickHandler={(val) =>
                  popperOnclickHandlerTranslationTo(val)
                }
              />
              {/* custom select end */}
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Box
              sx={{
                width: "50%",
              }}
            >
              {translationLanguageData.map((translation) => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginLeft: "5px",
                    marginBottom: "6px",
                  }}
                >
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Box
                      sx={{
                        height: "18px",
                        width: "18px",
                        marginTop: "5px",
                        backgroundColor: `${translation.color}`,
                      }}
                    />
                    <Typography sx={{ fontSize: "19px", marginTop: "2px" }}>
                      {translation.language}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: "20px", weight: "500" }}>
                      {translation.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ width: "35%", marginRight: "15px" }}>
              <Doughnut
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                data={dataForDoughnutChart as any}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                options={optionsForDoughnut as any}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
