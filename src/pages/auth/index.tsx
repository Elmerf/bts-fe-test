import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

type FieldType = {
  username: string;
  password: string;
};

const Auth: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (values: FieldType) => {
    login(values.username, values.password);
  };

  const formik = useFormik<FieldType>({
    initialValues: { username: "", password: "" },
    validate: (values) => {
      const errors: Partial<FieldType> = {};

      if (!values.username) {
        errors.username = "Required";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
    validateOnChange: false,
    onSubmit: handleSubmit,
  });

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.primary.dark,
      }}
    >
      <Card sx={{ minWidth: "48ch" }}>
        <CardHeader title="Login to Your Account" />
        <CardContent>
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Input
              name="username"
              placeholder="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.errors.username && (
              <span style={{ color: "red", fontSize: "0.75em" }}>
                {formik.errors.username}
              </span>
            )}
            <Input
              name="password"
              placeholder="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && (
              <span style={{ color: "red", fontSize: "0.75em" }}>
                {formik.errors.password}
              </span>
            )}
            <Button type="submit">Submit</Button>
            <span>
              Don't have an account? <Link to={"/register"}>register here</Link>
            </span>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Auth;
