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

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;

    try {
      setLoading(true);
      const { data: responseData } = await axios.post(
        "https://my-to-do-api.onrender.com/register",
        {
          name,
          email,
          password,
        },
      );
      console.log(responseData);
      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        setData({ name: "", email: "", password: "" });
        setLoading(false);
        toast.success(
          "Congratulations Registation Successful! You can now Login",
        );
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      console.log(error.toString());
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
        Welcome to TO_DO!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Register Your Free Account
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            placeholder="Enter your username"
            required
            name="name"
            value={data.name}
            onChange={handleInputChange}
          />
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
          <Button fullWidth mt="xl" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
