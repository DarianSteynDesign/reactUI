import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {Products} from './Products';

const meta: Meta<typeof Products> = {
  component: Products,
};

export default meta;

type Story = StoryObj<typeof Products>;

export const Basic: Story = {args: {}};
