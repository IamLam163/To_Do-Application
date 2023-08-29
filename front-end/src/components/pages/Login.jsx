import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    try {
      setLoading(true);
      const response = await axios.post(
        "https://my-to-do-api.onrender.com/login",
        {
          email,
          password,
        },
      );
      const { data: responseData } = response;
      console.log("Response Data:", responseData);
      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        setData({ email: "", password: "" });
        setLoading(false);
        console.log("Authenticated User:", responseData.user);
        localStorage.setItem("responseData", JSON.stringify(responseData));
        toast.success("Login Successful");
        console.log("User_Id:", responseData.user.id);
        navigate(`/todo/usertasks`);
        // navigate(`/todo/usertasks/${responseData.user.id}`);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back! Please Sign In
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor
          size="sm"
          component="button"
          onClick={() => navigate("/register")}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            placeholder="email@user.dev"
            required
            name="email"
            value={data.email}
            onChange={handleInputChange}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            name="password"
            value={data.password}
            onChange={handleInputChange}
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          To go Back Home, Click {" "}
          <Anchor
            size="sm"
            component="button"
            onClick={() => navigate("/")}
          >
            Home
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}
