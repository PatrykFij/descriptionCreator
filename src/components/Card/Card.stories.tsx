import React from 'react';
import CardComponent from './Card';

export default {
  title: 'Card',
  component: CardComponent,
};

export const Card = () => {
  return (
    <CardComponent title="Title" data-testid="sample">
      content of the card
    </CardComponent>
  );
};

export const CardWithEdit = () => {
  return (
    <CardComponent title="Title" canEdit data-testid="sample">
      content of the card
    </CardComponent>
  );
};
