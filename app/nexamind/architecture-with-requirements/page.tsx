'use client';

import ArchitectureWithRequirements from '@/components/nexamind/ArchitectureWithRequirement';
import { store } from '@/redux/store';
import React from 'react';
import { Provider } from 'react-redux';

const NexaMindWithRequirementsScreen: React.FC = () => {

  return (
    <Provider store={store}>
        <ArchitectureWithRequirements />
    </Provider>
  );
};

export default NexaMindWithRequirementsScreen;
