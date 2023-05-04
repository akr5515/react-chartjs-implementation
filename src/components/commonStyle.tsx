/* eslint-disable import/prefer-default-export */
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  //////////////////my end
  timePeriodRowBtn: {
    height: "26px",
    backgroundColor: "#F1F1FB",
    borderRadius: "4px",
    fontSize: "13px",
    color: "#313133",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px",
    paddingLeft: "10px",
    "& p": {
      paddingRight: "9px",
    },
    "&:hover": {
      backgroundColor: "#F1F1FB",
    },
    "& svg": {
      marginTop: "2px",
      width: "9px",
      height: "5px",
    },
  },

  cardSelectBoxPlaceholderDashboard: {
    flexGrow: 2,
    lineHeight: 1,
    fontSize: "13px",
    marginTop: "-2px",
    "@media screen and (max-width: 1366px)": {
      fontSize: "12px",
    },
  },

  timePeriodRowMenu: {
    backgroundColor: "#fff",
    boxShadow: "0px 3px 6px #00000029",
    width: "140.5px",
    borderRadius: "6px",
    zIndex: 1300,

    "&:before": {
      content: '""',
      position: "absolute",
      right: "12px",
      width: "12px",
      height: "12px",
      backgroundColor: "#fff",
      borderRadius: "1px",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: -1,
    },
    "& .MuiList-root": {
      paddingTop: 0,
      paddingBottom: 0,
      "& .MuiListItem-root": {
        display: "flex",
        justifyContent: "space-between",
        "& p": {
          fontSize: "13px",
          justifyContent: "start",
          color: "#313133",
        },
        padding: "5px 12.5px",

        "&:hover": {
          backgroundColor: "#EAEAEB",
        },
      },
      "& .MuiListItem-root:first-child": {
        borderTopRightRadius: "6px",
        borderTopLeftRadius: "6px",
      },
      "& .MuiListItem-root:not(:last-child)": {
        borderBottom: "0.5px solid rgba(147, 149, 152, 0.5)",
      },
    },
    '&[data-popper-placement*="top"]': {
      boxShadow: "0px 3px 6px #00000029;",
      "&:before": {
        bottom: "-12px",
      },
    },
    '&[data-popper-placement*="bottom"]:before': {
      top: "0",
    },
  },
}));
