'use client';

import ImprovedArchitecture from '@/components/data-structures/nexamind/ImprovedArchitecture';
import { store } from '@/redux/store';
import React from 'react';
import { Provider } from 'react-redux';

const NexaMindImprovedArchitectureScreen: React.FC = () => {

  return (
    <Provider store={store}>
        <ImprovedArchitecture />
    </Provider>
  );
};

export default NexaMindImprovedArchitectureScreen;
