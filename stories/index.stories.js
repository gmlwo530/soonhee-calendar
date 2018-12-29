import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';

import { Calendar } from '../src/index';

const state = {
  type: 2,
  styles: {
    headerTextColor: "yellow",
    fontFamiliy: "cursive"
  },
  rawDayTextObject: {
    "20181220":"dfdf",
    "20181221":"dfdfdd",
    "20181201" : "테스트",
  }
}

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Calendar', module)
  .add('start calendar', () => (
    <Calendar type={state.type} styles={state.styles} rawDayTextObject={state.rawDayTextObject}/>
  ));
