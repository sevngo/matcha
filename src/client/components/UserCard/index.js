import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from '@material-ui/core';
import { path } from 'ramda';
import emptyImage from '../../images/emptyImage.png';
import { getUserImage } from '../../api';
import { getAge, userPath } from '../../utils';
import useStyles from './styles';
import messages from './messages';

const UserCard = ({ user }) => {
  const { images } = user;
  const imageId = path([0, '_id'])(images);
  const image = imageId ? getUserImage(user._id, imageId) : emptyImage;
  const classes = useStyles();
  const distance = parseInt(user.distance) || 1;
  return (
    <Card className={classes.card} elevation={1}>
      <CardActionArea component={Link} to={userPath(user._id)}>
        <CardMedia
          className={classes.media}
          image={image}
          title={user.username}
        />
        <CardContent>
          <Grid container justify="space-between" alignItems="center">
            <Typography variant="h6" gutterBottom>
              {user.username}, {getAge(user.birthDate)}
            </Typography>
            <Typography variant="caption">
              <FormattedMessage
                {...messages.unitDistance}
                values={{ distance }}
              />
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UserCard;
