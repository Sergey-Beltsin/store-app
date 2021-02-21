import { IDefaultThemes, IDefaultThemeCommonStyles } from 'styled-components';

const primary: string = '#2754E2';
const primaryHovered: string = '#1038A5';
const secondary: string = '#E29B2C';

const backgroundDark: string = '#232323';
const backgroundDarkSecondary: string = '#2D2D2D';
const backgroundWhite: string = '#EEEEEE';
const backgroundWhiteSecondary: string = '#DEDEDE';

const textDark: string = '#111111';
const textWhite: string = '#E1E1E1';

const red: string = '#FF162E';
const white: string = '#FFFFFF';

const border: string = '#B8B8B8';
const outline: string = '#727272';
const iconWhite: string = '#FFFFFF';
const iconDark: string = '#000000';
const inputWhite: string = '#D7D7D7';
const inputDark: string = '#111111';

export const commonStyles: IDefaultThemeCommonStyles = {
  primary,
  primaryHovered,
  secondary,
  textWhite,
  textDark,
  white,
  red,
  outline,
  border,
};

export const theme: IDefaultThemes = {
  dark: {
    background: backgroundDark,
    backgroundSecondary: backgroundDarkSecondary,
    text: textWhite,
    common: commonStyles,
    icon: iconWhite,
    input: inputDark,
  },
  white: {
    background: backgroundWhite,
    backgroundSecondary: backgroundWhiteSecondary,
    text: textDark,
    common: commonStyles,
    icon: iconDark,
    input: inputWhite,
  },
};
