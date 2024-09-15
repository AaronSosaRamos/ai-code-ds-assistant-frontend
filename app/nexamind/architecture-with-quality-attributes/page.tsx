'use client';

import ArchitectureWithQualityAttributes from '@/components/data-structures/nexamind/ArchitectureWithQualityAttributes';
import { store } from '@/redux/store';
import React from 'react';
import { Provider } from 'react-redux';

const NexaMindArchitectureWithQualityAttributesScreen: React.FC = () => {

  return (
    <Provider store={store}>
        <ArchitectureWithQualityAttributes />
    </Provider>
  );
};

export default NexaMindArchitectureWithQualityAttributesScreen;
