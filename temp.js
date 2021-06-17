import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
      zIndex:'999'
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    props.setOpen(false);
  };
  const vertical = "bottom";
  const horizontal = "left";
  return (
		<div className={classes.root}>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{ vertical, horizontal }}
				key={vertical + horizontal}
        style={{zIndex:'10000'}}
			>
				<Alert onClose={handleClose} severity={props.severity}>
					{props.message}
				</Alert>
			</Snackbar>
		</div>
	);
}
