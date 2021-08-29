export enum AppColors {
  dark = "#000",
  semiDark = "#333333",
  light = "#FFF",
  accent = "#0BB7F9",
}

export enum Spacing {
  small = 5,
  regular = 10,
  double = 20,
}

export enum FontSize {
  small = 14,
  regular = 18,
  large = 26,
}

export enum LineHeight {
  regular = 26,
  large = 32,
}

export const BUTTON_SIZE = 49;
export const PEEP_BTN_HEIGHT = 50;
export const BORDER_RADIUS = 20;
export const MENU_ICON_SIZE = 30;

export const OPACITY = 0.9;

export const configNoSpring = {
  damping: 200,
  clamping: {overshootClamping: false},
};
export const configWithSpring = {
  damping: 10,
  clamping: {overshootClamping: true},
};
