import './App.css';
import React, { useState } from 'react';
import { makeStyles, TextField, CardContent, Typography, CardActions, Card, Button } from '@material-ui/core';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.css';
// import { Spinner } from "reactstrap";
// import Spinner from "./Spinner";
import App from './Spinner';


const useStyles = makeStyles ((theme) => ({
  decor: {
    position: 'absolute',
    width: '90vw',
    top: '3%',
    left: '5%',
    bottom: '3%',
    backdropFilter: 'blur(5px)',
    boxShadow: '0 0 55px black',
    overflowY: 'scroll',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      WebkitAppearance: 'none',
      appearance: 'none',
    }
  },
  root: {
    minWidth: 275,
    textAlign: 'center',
    margin: '1rem 0',
    marginLeft: '0.9rem'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root1: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 'auto 15%',
    marginTop: '2rem',    
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

export default function OutlinedCard() {
  const classes = useStyles();
  const [test, setTest] = useState('');
  const [result, setResult] = useState([]);
  // const [loading, setLoading] = useState(false);


  const onChangeHandler = (e) => {
		setTest(e.target.value);
	};

  const testAccessibility = async (e) => {
    e.preventDefault();

    const newTest = {
			result: test,
		};

		try {
      <App />
			let res = await axios.get(`https://websiteaccessibilityapi.herokuapp.com/api/v1/test?url=${test}`, newTest);
			if (res.data.success) toast.success(res.data.msg);
      setResult(res.data.allResults.issues);
		} catch (err) {
			if (!err.response.data.success) return toast.error(err.response.data.msg);
		}
		setTest("");
	};

  return (
    <>
    <div className={classes.decor}>
      <form className={classes.root1} onSubmit={testAccessibility}>
        <div style={{width: '67.6%'}}>
          <TextField
            id="test"
            label="Website Accessibility Tester"
            style={{ margin: 8 }}
            placeholder="Enter a website..."
            // helperText="Loading ..."
            fullWidth
            type="url"
            name="test"
            value={test}
            onChange={onChangeHandler}
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <CardActions>
            <Button size="small" type='submit'>Submit</Button>
          </CardActions>
        </div>
      </form>

      {/* <Spinner className="loader" type="grow" color="secondary" children={false} />  */}

      {result.map((issues) => (
        <Card className={classes.root} variant="outlined">
            <CardContent key={issues.length}>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {issues.message}
              </Typography>
              <Typography variant="h5" component="h2">
                {(issues.context)}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                CODE: {issues.code}
              </Typography>
            </CardContent>
        </Card>
      ))}

  <Toaster
    position="top-right"
    toastOptions={{
      className: "",
      duration: 10000,
      style: {
        color: "#fff",
      },
      success: {
        style: {
          background: "green",
        },
      },
      error: {
        style: {
          background: "red",
        },
      },
    }}
  />
</div>

  </>
  );
}


//escape HTML

// function escapeHTML(html) {
//   return html
//       .replace(/&/g, '&amp;')
//       .replace(/</g, '&lt;')
//       .replace(/>/g, '&gt;')
//       .replace(/"/g, '&quot;')
//       .replace(/'/g, '&#039;')

// }



