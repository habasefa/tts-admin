import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, ListItem } from "@mui/material";
import { ArrowDropDown, ArrowDropUp, ArrowUpward } from "@mui/icons-material";

export const NavItem = (props) => {
  const { href, icon, title, isActive, isParent, ...others } = props;
  const router = useRouter();
  const active = href ? router.pathname === href : false;

  if (!isParent) {
    return (
      <ListItem
        disableGutters
        sx={{
          display: "flex",
          mb: 0.5,
          py: 0,
          px: 2,
        }}
        {...others}
      >
        <NextLink href={href} passHref>
          <Button
            component="a"
            startIcon={icon}
            disableRipple
            sx={{
              backgroundColor: active && "rgba(255,255,255, 0.08)",
              borderRadius: 1,
              color: active ? "secondary.main" : "neutral.300",
              fontWeight: active && "fontWeightBold",
              justifyContent: "flex-start",
              px: 3,
              textAlign: "left",
              textTransform: "none",
              width: "100%",
              "& .MuiButton-startIcon": {
                color: active ? "secondary.main" : "neutral.400",
              },
              "&:hover": {
                backgroundColor: "rgba(255,255,255, 0.08)",
              },
            }}
          >
            <Box sx={{ flexGrow: 1 }}>{title}</Box>
          </Button>
        </NextLink>
      </ListItem>
    );
  } else {
    return (
      <ListItem
        disableGutters
        sx={{
          display: "flex",
          mb: 0.5,
          py: 0,
          px: 2,
        }}
        {...others}
      >
        <Button
          component="a"
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active && "rgba(255,255,255, 0.08)",
            borderRadius: 1,
            color: active ? "secondary.main" : "neutral.300",
            fontWeight: active && "fontWeightBold",
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "& .MuiButton-startIcon": {
              color: active ? "secondary.main" : "neutral.400",
            },
            "&:hover": {
              backgroundColor: "rgba(255,255,255, 0.08)",
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ fontSize: "0.8rem" }}>{title}</Box>
              <Box sx={{ fontSize: "0.7rem" }}>
                {
                  // DrowpdownIcon
                  isActive ? (
                    <Box sx={{ fontSize: "0.7rem" }}>
                      <ArrowDropUp />
                    </Box>
                  ) : (
                    <Box sx={{ fontSize: "0.7rem" }}>
                      <ArrowDropDown />
                    </Box>
                  )
                }
              </Box>
            </Box>
          </Box>
        </Button>
      </ListItem>
    );
  }
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
};
