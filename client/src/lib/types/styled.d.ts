import 'styled-components';

declare module 'styled-components' {
  export interface IDefaultThemeCommonStyles {
    textWhite: string;
    textDark: string;
    white: string;
    red: string;
    outline: string;
    primary: string;
    primaryHovered: string;
    disabled: string;
    secondary: string;
    border: string;
  }

  export interface IDefaultTheme {
    background: string;
    backgroundSecondary: string;
    text: string;
    text02: string;
    icon: string;
    input: string;
    common: IDefaultThemeCommonStyles;
  }

  export interface IDefaultThemes {
    dark: IDefaultTheme;
    white: IDefaultTheme;
  }
}
