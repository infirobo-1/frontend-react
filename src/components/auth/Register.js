import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import BackGroundImage from '../../img/VR-edtech.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  h3: {
    [theme.breakpoints.down('md')]: {
      fontSize: '2.5rem',
    },
  },
  image: {
    backgroundImage: `url(${BackGroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      width: '100%', // Fix IE 11 issue.
      //marginTop: theme.spacing(1),
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = ({ setAlert, register, isAuthenticated }) => {
  const classes = useStyles();

  const [formData, setFromData] = useState({
    f_name: '',
    l_name: '',
    email: '',
    password: '',
    password2: '',
    age: '',
    mobile: '',
  });

  const {
    f_name,
    l_name,
    email,
    password,
    password2,
    age,
    mobile,
  } = formData;

  const onChange = async e =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('password do not match', 'danger', 3000);
    } else {
      register({
        f_name,
        l_name,
        email,
        password,
        age,
        mobile,
      });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} square>
        <div className={classes.paper}>
          <Typography className={classes.h3} variant='h3' gutterBottom>
            INFIROBO
          </Typography>
          <Typography variant='subtitle1' gutterBottom>
            Please complete to create your account
          </Typography>
          <form className={classes.form} noValidate onSubmit={e => onSubmit(e)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='fname'
                  name='f_name'
                  value={f_name}
                  onChange={e => onChange(e)}
                  variant='outlined'
                  required
                  fullWidth
                  id='f_name'
                  label='First Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  fullWidth
                  id='l_name'
                  label='Last Name'
                  name='l_name'
                  value={l_name}
                  onChange={e => onChange(e)}
                  autoComplete='lname'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  value={email}
                  onChange={e => onChange(e)}
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  value={password}
                  onChange={e => onChange(e)}
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='password2'
                  value={password2}
                  onChange={e => onChange(e)}
                  label='Confirm Password'
                  type='password'
                  id='password2'
                  autoComplete='current-password'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='age'
                  label='Age'
                  name='age'
                  value={age}
                  onChange={e => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='mobile'
                  value={mobile}
                  onChange={e => onChange(e)}
                  label='Mobile'
                  id='mobile'
                  autoComplete='current-password'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link href='#' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
