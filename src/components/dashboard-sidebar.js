import { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Badge, Box, Button, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Cog as CogIcon } from "../icons/cog";
import { Lock as LockIcon } from "../icons/lock";
import { Selector as SelectorIcon } from "../icons/selector";
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import { Upload as UploadIcon } from "../icons/upload";
import { User as UserIcon } from "../icons/user";
import { UserAdd as UserAddIcon } from "../icons/user-add";
import { Users as UsersIcon } from "../icons/users";
import { XCircle as XCircleIcon } from "../icons/x-circle";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import { useSelector } from "react-redux";
import { selectUser } from "redux/userSlice";
import {
  AccountBalanceRounded,
  AddTask,
  AssignmentInd,
  AssignmentIndOutlined,
  Bolt,
  BusinessCenter,
  CalendarViewDayTwoTone,
  Edit,
  Engineering,
  HubRounded,
  More,
  Payment,
  PersonAdd,
  PersonAddAlt1Outlined,
  PlusOne,
  Receipt,
  WindowOutlined,
} from "@mui/icons-material";

const items = [
  {
    href: "/dashboard",
    icon: <WindowOutlined />,
    title: "Home",
    role: ["SUPERADMIN", "ADMINONE", "ADMINTWO", "ADMINTHREE"],
  },
  {
    href: "/jobs",
    icon: <Bolt />,
    title: "Jobs",
    role: ["SUPERADMIN", "ADMINONE", "ADMINTWO", "ADMINTHREE"],
  },
  {
    href: "/",
    icon: <More />,
    title: "General",
    role: ["SUPERADMIN", "ADMINONE", "ADMINTWO", "ADMINTHREE"],

    items: [
      {
        href: "/newParent",
        icon: <PersonAdd />,
        title: "New Parents",
        role: ["SUPERADMIN"],
      },

      {
        href: "/parents",
        icon: <AssignmentInd />,
        title: "Active Parents",
        role: ["SUPERADMIN", "ADMINTWO", "ADMINTHREE"],
      },
      {
        href: "/newTutor",
        icon: <PersonAddAlt1Outlined fontSize="small" />,
        title: "New Tutors",
        role: ["SUPERADMIN", "ADMINONE"],
      },
      {
        href: "/tutors",
        icon: <AssignmentIndOutlined fontSize="small" />,
        title: "Active Tutors",
        role: ["SUPERADMIN", "ADMINONE", "ADMINTWO"],
      },
    ],
  },

  {
    href: "/",
    icon: <BusinessCenter />,
    title: "Service",
    role: ["SUPERADMIN", "ADMINONE", "ADMINTWO", "ADMINTHREE"],
    items: [
      {
        href: "/reports",
        icon: <CalendarViewDayTwoTone />,
        title: "Weekly Reports",
        role: ["SUPERADMIN", "ADMINONE"],
      },
      {
        href: "/tutorFollowup",
        icon: <PlusOne />,
        title: "Progress Report",
        role: ["SUPERADMIN", "ADMINONE"],
      },
      {
        href: "/parentFollowup",
        icon: <Edit />,
        title: "Admin Notes",
        role: ["SUPERADMIN", "ADMINONE"],
      },
    ],
  },
  {
    href: "/",
    icon: <AccountBalanceRounded />,
    title: "Finance",
    role: ["SUPERADMIN", "ADMINONE", "ADMINTWO", "ADMINTHREE"],

    items: [
      {
        href: "/timeSheets",
        icon: <Receipt />,
        title: "TimeSheet",
        role: ["SUPERADMIN", "ADMINONE"],
      },
      {
        href: "/parentFinances",
        icon: <Payment />,
        title: "Client",
        role: ["SUPERADMIN", "ADMINTHREE"],
      },
      {
        href: "/tutorFinances",
        icon: <Engineering />,
        title: "Vendor",
        role: ["SUPERADMIN", "ADMINTHREE"],
      },
    ],
  },
  {
    href: "/task",
    icon: <AddTask />,
    title: "Task",
    role: ["SUPERADMIN"],
  },
];

export const DashboardSidebar = (props) => {
  const user = useSelector(selectUser);
  const userRole = user.user?.role;
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("xl"), {
    defaultMatches: true,
    noSsr: false,
  });

  // Track the drop down section state
  const [openDropdown, setOpenDropdown] = useState("General");

  const handleDropdown = (title) => {
    if (openDropdown === title) {
      setOpenDropdown("");
    } else {
      setOpenDropdown(title);
    }
  };

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                // backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                flex: 1,
                alignSelf: "center",
                // ml: "3px",
                py: "18px",
                borderRadius: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <img
                  src="/static/images/tts_logo.svg"
                  height={60}
                  width={60}
                  style={{ marginRight: "10px" }}
                />
                <Typography color="inherit" variant="h6">
                  Temaribet Tutoring Services
                </Typography>
                {/* <Typography color="neutral.400" variant="body2">
                  Administrator : Dashboard
                </Typography> */}
              </div>
              {/* <SelectorIcon
                sx={{
                  color: "neutral.500",
                  width: 14,
                  height: 14,
                }}
              /> */}
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 2,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items
            .filter((item) => item.role?.includes(userRole))
            .map((item) => (
              <>
                <NavItem
                  key={item.title}
                  icon={item.icon}
                  href={item.href}
                  title={item.title}
                  dropDownIcon={<UploadIcon fontSize="small" />}
                  isActive={item.title === openDropdown}
                  isParent={item.items && item.items.length > 0}
                  onClick={() => handleDropdown(item.title)}
                />

                {item.items && item.title === openDropdown && (
                  <Box sx={{ pl: 2 }}>
                    {item.items
                      .filter((subItem) => subItem.role?.includes(userRole))
                      .map((subItem) => (
                        <NavItem
                          key={subItem.title}
                          icon={subItem.icon}
                          href={subItem.href}
                          title={subItem.title}
                        />
                      ))}
                  </Box>
                )}
              </>
            ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="persistent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
