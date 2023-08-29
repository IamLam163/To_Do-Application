import { useContext, useState } from "react";
import { Container, Button, TextInput, createStyles, rem } from "@mantine/core";
import { UserContext } from "../../context/userContext.jsx";
import axios from "axios";

const useStyles = createStyles((theme, { floating }) => ({
  root: {
    position: "relative",
  },

  label: {
    position: "absolute",
    zIndex: 2,
    top: rem(7),
    left: theme.spacing.sm,
    pointerEvents: "none",
    color: floating
      ? theme.colorScheme === "dark"
        ? theme.white
        : theme.black
      : theme.colorScheme === "dark"
      ? theme.colors.dark[3]
      : theme.colors.gray[5],
    transition: "transform 150ms ease, color 150ms ease, font-size 150ms ease",
    transform: floating
      ? `translate(-${theme.spacing.sm}, ${rem(-28)})`
      : "none",
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
  },

  required: {
    transition: "opacity 150ms ease",
    opacity: floating ? 1 : 0,
  },

  input: {
    "&::placeholder": {
      transition: "color 150ms ease",
      color: !floating ? "transparent" : undefined,
    },
  },
}));

export default function AddtaskButton({ onAddTask }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const { user } = useContext(UserContext);
  const { classes } = useStyles({
    floating: value.trim().length !== 0 || focused,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      user;
      const response = await axios.post("/todo/addtask", {
        name: value,
        owner: user.id,
      });
      const { data } = response;
      console.log("Task Created Successfully:", data.task);
      onAddTask(data.task);
      setValue("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} autoComplete="off">
        <TextInput
          label="Add To-Do"
          placeholder="Please Name your task"
          required
          classNames={classes}
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          mt="md"
          autoComplete="off"
        />
        <Button
          fullWidth
          mt="sm"
          type="submit"
          style={{
            width: "20%",
            background: "green",
            color: "white",
            fontSize: "14px",
            transition: "transform 0.2s ease",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Add
        </Button>
      </form>
    </Container>
  );
}
