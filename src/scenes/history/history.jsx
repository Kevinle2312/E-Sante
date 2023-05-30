import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { token } from "../../theme";
import { mockData } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import {green} from "@mui/material/colors";
import MasterGetPeople from './getPeople'

const History = () => {
  <MasterGetPeople/>
  const accessToken = localStorage.getItem("token")
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const data = localStorage.getItem('people')
  console.log(data)
  const columns = [
    {
      field: "gender",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "firstname",
      headerName: "First Name",
      flex: 1,
    },{
      field: "lastname",
      headerName: "Last Name",
      flex: 1,
    },{
      field: "birthyear",
      headerName: "Birth Year",
      flex: 1,
    },{
      field: "height",
      headerName: "Height",
      flex: 1,
    },{
      field: "weightStart",
      headerName: "Waight Start",
      flex: 1,
    },{
      field: "weightGoal",
      headerName: "Weight Goal",
      flex: 1,
    },


    // {
    //   field: "accessLevel",
    //   headerName: "Access Level",
    //   flex: 1,
    //   renderCell: ({ row: { access } }) => {
    //     return (
    //       <Box
    //         width="60%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           access === "admin"
    //             ? colors.greenAccent[600]
    //             : access === "manager"
    //               ? colors.greenAccent[700]
    //               : colors.greenAccent[700]
    //         }
    //         borderRadius="4px"
    //       >
    //         {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
    //         {access === "manager" && <SecurityOutlinedIcon />}
    //         {access === "user" && <LockOpenOutlinedIcon />}
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {access}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
  ];

  return (
    <Box
      display="flex"
      justifyContent="flex-end" // Aligns the content to the right side
      alignItems="flex-start" // Aligns the content to the top
      height="100vh" // Adjust the height as needed
    >
      <Box flexGrow={1} width="calc(100% - 270px)">
        {/* Leave space for the fixed sidebar */}
        <Box m="20px">
          <Header title="WEIGHT" subtitle="Managing the Weight" />
          <Box
            mt="40px"
            height="75vh" // Adjust the height as needed
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <DataGrid checkboxSelection rows={data} columns={columns} />
          </Box>
        </Box>
      </Box>
    </Box>

  );
};

export default History;
