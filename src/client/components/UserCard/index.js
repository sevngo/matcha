import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Grid,
} from '@material-ui/core';
import emptyImage from '../../assets/images/emptyImage.png';
import { getUserImage } from '../../api/users';
import { getAge, userPath } from '../../utils';
import useStyles from './styles';
import messages from './messages';
import { equals } from 'ramda';

const UserCard = ({ user, hasDistance, actions }) => {
  const classes = useStyles();
  const { image } = user;
  const imageSrc = image ? getUserImage(user._id, image._id) : emptyImage;
  const distance = parseInt(user.distance) || 1;
  return (
    <Card className={classes.root} elevation={1}>
      <CardActionArea component={Link} to={userPath(user._id)}>
        <CardMedia
          data-testid={image ? 'imageAvailable' : 'imageUnavailable'}
          className={classes.media}
          image={`${imageSrc}`}
        />
        <CardContent>
          <Grid container>
            <Typography gutterBottom={hasDistance} variant="h5">
              {user.username}
            </Typography>
            <Typography variant="h5" className={classes.age}>
              , {getAge(user.birthDate)}
            </Typography>
          </Grid>
          {hasDistance && (
            <Typography variant="body2" color="textSecondary">
              <FormattedMessage
                {...messages.unitDistance}
                values={{ distance }}
              />
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      {actions && <CardActions disableSpacing>{actions}</CardActions>}
    </Card>
  );
};

export default React.memo(UserCard, equals);
