import { Typography, Box, useTheme } from "@mui/material";

var c = "#3a3042";

const Header = ({title, subtitle} : { title: string, subtitle: string }) : JSX.Element => {
  return (
    <Box mb="30px">
      <Typography
        variant="h3"
        color="#3A3042"
        fontWeight="bold"
        sx={{ m: "0 0 6px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={c}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;