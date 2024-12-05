import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constant";
import useAuth from "../../hooks/useAuth";

type FieldType = {
  username: string;
  email: string;
  password: string;
  reEnterPassword: string;
};

const Register: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values: FieldType) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        toast("Registered successfully!", { type: "success" });
        navigate("/login");
      }
    } catch (error) {
      console.error("There was an error registering!", error);
      toast("There was an error registering!", { type: "error" });
    }
  };

  const formik = useFormik<FieldType>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      reEnterPassword: "",
    },
    validate: (values) => {
      const errors: Partial<FieldType> = {};

      if (!values.username) {
        errors.username = "Required";
      }

      if (!values.email) {
        errors.email = "Required";
      }

      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
      } else if (!/[A-Z]/.test(values.password)) {
        errors.password = "Password must contain at least one uppercase letter";
      } else if (!/[a-z]/.test(values.password)) {
        errors.password = "Password must contain at least one lowercase letter";
      } else if (!/[0-9]/.test(values.password)) {
        errors.password = "Password must contain at least one number";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
        errors.password =
          "Password must contain at least one special character";
      }

      if (!values.reEnterPassword) {
        errors.reEnterPassword = "Required";
      } else if (values.password !== values.reEnterPassword) {
        errors.reEnterPassword = "Passwords must match";
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
              placeholder="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.errors.username && (
              <span style={{ color: "red", fontSize: "0.75em" }}>
                {formik.errors.username}
              </span>
            )}
            <Input
              placeholder="email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && (
              <span style={{ color: "red", fontSize: "0.75em" }}>
                {formik.errors.email}
              </span>
            )}
            <Input
              placeholder="password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && (
              <span style={{ color: "red", fontSize: "0.75em" }}>
                {formik.errors.password}
              </span>
            )}
            <Input
              placeholder="re-enter password"
              type="password"
              name="reEnterPassword"
              value={formik.values.reEnterPassword}
              onChange={formik.handleChange}
            />
            {formik.errors.reEnterPassword && (
              <span style={{ color: "red", fontSize: "0.75em" }}>
                {formik.errors.reEnterPassword}
              </span>
            )}
            <Button type="submit">Submit</Button>
            <span>
              have an account? <Link to={"/login"}>login here</Link>
            </span>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
