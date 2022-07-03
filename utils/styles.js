import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>({
  navbar: {
    backgroundColor: "#093562",
    height: 70,
    "& a": {
      color: "#fff",
      marginLeft: 10,
      fontWeight: 500,
      textDecoration: "none",
    },
    backdropFilter: 'brightness(60%)'

  },
  toolbar: {
    justifyContent: 'space-between',
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
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
  },
  navBtn: {
    color: '#fff',
    textTransform: 'initial'
  },
  error: {
    color: '#f04040'
  },
  reviewForm: {
    maxWidth: 800,
    width: '100%',
  },
  reviewItem: {
    marginRight: '1rem',
    borderRight: '1px #808080 solid',
    paddingRight: '1rem',
  },
  mt1: { marginTop: '1rem' },
  searchForm: {
    border: '1px solid #ffffff',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    width: '400px',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  searchInput: {
    paddingLeft: 5,
    width: '350px',
    color: '#000000',
    '& ::placeholder': {
      color: '#606060',
    },
  },
  iconButton: {
    backgroundColor: '#f8c040',
    padding: 5,
    marginLeft: 14,
    borderRadius: '0 5px 5px 0',
    '& span': {
      color: '#000000',
    },
  },
  sort: {
    marginRight: 5,
  },
}));

export default useStyles;
