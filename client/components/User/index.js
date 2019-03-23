import React from 'react';
import { Link } from 'react-router-dom';
import {
  withStyles,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import userImage from '../../images/user.png';
import Interests from '../Interests';

const styles = theme => ({
  card: {
    width: 300,
  },
  media: {
    height: 250,
  },
  root: {
    padding: theme.spacing(3),
  },
  mt1: {
    marginTop: theme.spacing(1),
  },
});

const Component = ({ user, classes }) => {
  const image = user.image ? user.images[0] : userImage;
  return (
    <Card className={classes.card} elevation={24}>
      <CardActionArea component={Link} to={`/user/${user._id}`}>
        <CardMedia className={classes.media} image={image} title={user.username} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.firstName} {user.lastName}
          </Typography>
          <Interests interests={user.interests} />
          <Typography noWrap className={classes.mt1}>
            {user.biography}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default withStyles(styles)(Component);
