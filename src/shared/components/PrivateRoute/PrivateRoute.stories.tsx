import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {PrivateRoute} from './PrivateRoute';

const meta: Meta<typeof PrivateRoute> = {
  component: PrivateRoute,
};

export default meta;

type Story = StoryObj<typeof PrivateRoute>;

export const Basic: Story = {args: {}};
