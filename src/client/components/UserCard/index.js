import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  Card as MCard,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from '@material-ui/core';
import { path } from 'ramda';
import emptyImage from '../../images/emptyImage.png';
import Interests from '../Interests';
import { getUserImage } from '../../api';
import { getAge, userPath } from '../../utils';
import useStyles from './styles';
import messages from './messages';

const UserCard = ({ user }) => {
  const { images } = user;
  const imageId = path([0, '_id'])(images);
  const image = imageId ? getUserImage(user._id, imageId) : emptyImage;
  const classes = useStyles();
  return (
    <MCard className={classes.card} elevation={1}>
      <CardActionArea component={Link} to={userPath(user._id)}>
        <CardMedia className={classes.media} image={image} title={user.username} />
        <CardContent>
          <Grid container justify="space-between" alignItems="center">
            <Typography variant="h6" gutterBottom>
              {user.username}, {getAge(user.birthDate)}
            </Typography>
            <Typography variant="caption">
              <FormattedMessage
                {...messages.unitDistance}
                values={{ distance: parseFloat(user.distance).toFixed(1) }}
              />
            </Typography>
          </Grid>
          <Interests interests={user.interests} />
          <Typography noWrap className={classes.mt1}>
            {user.biography}
          </Typography>
        </CardContent>
      </CardActionArea>
    </MCard>
  );
};

export default UserCard;
