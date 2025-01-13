import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {UserList} from './UserList';

const meta: Meta<typeof UserList> = {
  component: UserList,
};

export default meta;

type Story = StoryObj<typeof UserList>;

export const Basic: Story = {args: {}};
