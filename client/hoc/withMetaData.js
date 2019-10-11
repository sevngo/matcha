import React from 'react';
import { split, path } from 'ramda';

const withMetaData = Component => props => {
  const {
    field: { name },
    form: { errors, touched },
  } = props;
  const names = split('.')(name);
  const pathName = path(names);
  const error = pathName(errors);
  const isError = error && pathName(touched);
  return <Component meta={{ error, isError }} {...props} />;
};

export default withMetaData;
