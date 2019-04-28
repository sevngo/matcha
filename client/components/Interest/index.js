import React from 'react';
import { withStyles, Chip } from '@material-ui/core';
import styles from './styles';

const color = {
  PHP: '#3f51b5',
  Javascript: '#ffeb3b',
  Python: '#2196f3',
  Flask: '#9e9e9e',
  C: '#ffeb3b',
  'C++': '#ffc107',
  Golang: '#ffc107',
  React: '#03a9f4',
  Node: '#8bc34a',
  Express: '#607d8b',
  MongoDB: '#4caf50',
  Vue: '#009688',
  Angular: '#f44336',
  MySQL: '#00bcd4',
  PostgreSQL: '#0097a7',
  Ruby: '#e91e63',
  Sinatra: '#263238',
  Scala: '#795548',
  Scalatra: '#ff5722',
  Slim: '#795548',
  Rust: '#673ab7',
  Java: '#ff9800',
  Crow: '#cddc39',
};

const Interest = ({ interest, classes }) => (
  <Chip label={interest} style={{ backgroundColor: color[interest] }} className={classes.chip} />
);

export default withStyles(styles)(Interest);
