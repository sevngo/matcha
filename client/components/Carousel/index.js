import React from 'react';
import { length, path } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { Button, MobileStepper, Icon, Paper } from '@material-ui/core';
import emptyImage from '../../images/emptyImage.png';
import useStyles from './styles';
import messages from './messages';

const Carousel = ({ children, userId, images, activeStep, handleStep }) => {
  const classes = useStyles();
  const maxSteps = length(images);
  const imageId = path([activeStep, '_id'])(images);
  const image = imageId ? `/api/users/${userId}/images/${images[activeStep]._id}` : emptyImage;
  return (
    <Paper elevation={24}>
      {children && <div className={classes.header}>{children}</div>}
      <img className={classes.img} src={image} alt="image" />
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={() => handleStep(activeStep + 1)}
            disabled={activeStep === maxSteps - 1 || !maxSteps}
          >
            <FormattedMessage {...messages.next} />
            <Icon>keyboard_arrow_right</Icon>
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={() => handleStep(activeStep - 1)}
            disabled={activeStep === 0 || !maxSteps}
          >
            <Icon>keyboard_arrow_left</Icon>
            <FormattedMessage {...messages.back} />
          </Button>
        }
      />
    </Paper>
  );
};

Carousel.defaultProps = {
  images: [],
};

export default Carousel;
