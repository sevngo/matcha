import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, MobileStepper, Paper } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import messages from './messages';

const Carousel = ({ children, activeStep, maxSteps, handleStep }) => {
  return (
    <Paper elevation={1}>
      {children}
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
            <KeyboardArrowRightIcon />
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={() => handleStep(activeStep - 1)}
            disabled={activeStep === 0 || !maxSteps}
          >
            <KeyboardArrowLeftIcon />
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
