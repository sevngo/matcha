import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, MobileStepper, Icon } from '@material-ui/core';
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
