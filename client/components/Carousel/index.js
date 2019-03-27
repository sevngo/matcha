import React, { useState, Fragment } from 'react';
import { length } from 'ramda';
import { Button, MobileStepper, withStyles } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import * as constants from '../../utils/constants';
import userImage from '../../images/user.png';

const styles = theme => ({
  img: {
    width: '100%',
  },
});

const Component = ({ images, classes }) => {
  const [activeStep, handleStep] = useState(0);
  const maxSteps = length(images);
  return (
    <Fragment>
      <img className={classes.img} src={images[activeStep]} alt={images[activeStep]} />
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={() => handleStep(activeStep + 1)}
            disabled={activeStep === maxSteps - 1}
          >
            {constants.next}
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={() => handleStep(activeStep - 1)}
            disabled={activeStep === 0}
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
  images: [userImage],
};

export default withStyles(styles)(Component);
