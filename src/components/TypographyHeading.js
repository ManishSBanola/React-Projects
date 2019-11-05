import React from "react";
import Typography from "@material-ui/core/Typography";

const TypographyHeading = ({
  align,
  color,
  gutterBottom,
  variant,
  component,
  value,
  className
}) => {
  return (
    <Typography
      align={align}
      color={color}
      gutterBottom={gutterBottom}
      variant={variant}
      component={component}
      className={className}
    >
      {value}
    </Typography>
  );
};

export default TypographyHeading;
