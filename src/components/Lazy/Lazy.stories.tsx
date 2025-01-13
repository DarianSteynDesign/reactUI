import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {Lazy} from './Lazy';

const meta: Meta<typeof Lazy> = {
  component: Lazy,
};

export default meta;

type Story = StoryObj<typeof Lazy>;

export const Basic: Story = {args: {}};
