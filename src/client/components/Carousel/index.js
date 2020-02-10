import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, MobileStepper } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Paper from '../Paper';
import messages from './messages';

const Carousel = ({ children, activeStep, maxSteps, handleStep }) => {
  return (
    <Paper>
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
