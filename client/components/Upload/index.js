import React, { Fragment } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

const Component = ({ id }) => {
  console.log(id);
  return (
    <Fragment>
      <FilePond server={`/api/users/${id}/images`} />
    </Fragment>
  );
};

export default Component;
