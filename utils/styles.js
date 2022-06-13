import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#093562",
    "& a": {
      color: "#fff",
      marginLeft: 10,
      fontWeight: 500,
      textDecoration: "none",
    },
    backdropFilter: 'brightness(60%)'

  },
  section: {
    margin: "10px 0",
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },

  middle: {
    flexGrow: 1
  },

  main: {
    minHeight: "80vh",
    marginTop: "5rem",
    marginBottom: "5rem",

  },

  link: {
    display: "flex",
    gap: ".5rem",
    alignItems: "center",
  },

  deleteBtn: {
    backgroundColor: "#F8585B",
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20
  },
  form: {
    maxWidth: 800,
    margin: '10px auto'
  },
  navBtn: {
    color: '#fff',
    textTransform: 'initial'
  },
  error: {
    color: '#f04040'
  }
});

export default useStyles;
