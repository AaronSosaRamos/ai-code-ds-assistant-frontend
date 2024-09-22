'use client';

import NexaMindForm from '@/components/nexamind/Form';
import { store } from '@/redux/store';
import React from 'react';
import { Provider } from 'react-redux';

const NexaMindScreen: React.FC = () => {
  return (
    <Provider store={store}>
      <NexaMindForm />
    </Provider>
  );
};

export default NexaMindScreen;
