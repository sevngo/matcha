import React, { Fragment } from 'react';
import { length, path } from 'ramda';
import { Button, MobileStepper, withStyles } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import * as constants from '../../utils/constants';
import userImage from '../../images/user.png';

const styles = {
  img: {
    width: '100%',
  },
};

const Component = ({ userId, images, classes, activeStep, handleStep }) => {
  const maxSteps = length(images);
  const imageId = path([activeStep, '_id'])(images);
  const image = imageId ? `/api/users/${userId}/images/${images[activeStep]._id}` : userImage;
  return (
    <Fragment>
      <img className={classes.img} src={image} alt="image" />
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={() => handleStep(activeStep + 1)}
            disabled={activeStep === maxSteps - 1 || !imageId}
          >
            {constants.next}
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={() => handleStep(activeStep - 1)}
            disabled={activeStep === 0 || !imageId}
          >
            <KeyboardArrowLeft />
            {constants.back}
          </Button>
        }
      />
    </Fragment>
  );
};

Component.defaultProps = {
  images: [],
};

export default withStyles(styles)(Component);
