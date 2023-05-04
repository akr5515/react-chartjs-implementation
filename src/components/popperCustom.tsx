import {
  ClickAwayListener,
  List,
  ListItem,
  Popper,
  Typography,
  Box,
} from "@mui/material";
import { useStyles } from "./commonStyle";
import { ReactComponent as CheckIcon } from "../images/Right_blue.svg";

export type PopperType = {
  rowSelectId: string | undefined;
  rowSelectMenuOpen: boolean;
  rowEl: null | HTMLElement;
  handleRowMenuClose: () => void;
  translationsOptions: string[];
  isSelected: string;
  popperOnclickHandler: (val: string) => void;
};

const PopperCustom = ({
  rowSelectId,
  rowSelectMenuOpen,
  rowEl,
  handleRowMenuClose,
  translationsOptions,
  isSelected,
  popperOnclickHandler,
}: PopperType) => {
  const classes = useStyles();

  return (
    <Popper
      placement="bottom-end"
      id={rowSelectId}
      open={rowSelectMenuOpen}
      anchorEl={rowEl}
      popperOptions={{
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [7, 8],
            },
          },
        ],
      }}
      className={classes.timePeriodRowMenu}
    >
      <ClickAwayListener onClickAway={handleRowMenuClose}>
        <List>
          {translationsOptions.length > 0 &&
            translationsOptions.map((optionList: string) => (
              <ListItem
                button
                onClick={() => popperOnclickHandler(optionList)}
                sx={{
                  backgroundColor: isSelected === optionList ? "#EAEAEB" : "",
                }}
              >
                <Typography>{optionList}</Typography>
                <Box sx={{ marginTop: "-3px", marginRight: "-5px" }}>
                  {isSelected === optionList && <CheckIcon />}
                </Box>
              </ListItem>
            ))}
        </List>
      </ClickAwayListener>
    </Popper>
  );
};

export default PopperCustom;
