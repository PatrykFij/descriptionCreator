import React from 'react';
import DataRowComponent from './DataRow';

export default {
  title: 'DataRow',
  component: DataRowComponent,
};

export const DataRow = () => {
  return <DataRowComponent label="label" value="value" />;
};
