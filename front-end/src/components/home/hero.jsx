import {
  createStyles,
  Overlay,
  Container,
  Title,
  Button,
  Text,
  rem,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  hero: {
    position: "relative",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  },

  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: `calc(${theme.spacing.xl} * 6)`,
    zIndex: 1,
    position: "relative",

    [theme.fn.smallerThan("sm")]: {
      height: rem(500),
      paddingBottom: `calc(${theme.spacing.xl} * 3)`,
    },
  },

  title: {
    color: theme.white,
    fontSize: rem(60),
    fontWeight: 900,
    lineHeight: 1.1,
    marginTop: rem(20),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(40),
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,
    marginTop: rem(20),

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

export default function HeroContent() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container}>
        <Title className={classes.title}>TO_DO Task Manager</Title>
        <Text className={classes.description} size="xl" mt="xl">
          To-Do application offers an essential tool for effective daily
          activity management. With its user-friendly interface, You can
          streamline tasks, priorities, and goals. It enables efficient
          organization, aiding users in staying focused and ensuring nothing
          slips through the cracks.{" "}
        </Text>

        <Button
          variant="gradient"
          size="xl"
          radius="xl"
          className={classes.control}
          onClick={() => navigate("/login")}
        >
          Get started
        </Button>
      </Container>
    </div>
  );
}
