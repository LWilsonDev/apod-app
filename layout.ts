export enum AppColors {
  dark = "#111111",
  semiDark = "#333333",
  light = "#FFF",
}

export enum spacing {
  small = 5,
  regular = 10,
  double = 20,
}

export const BUTTON_SIZE = 49;
export const PEEP_SIZE = 60;
export const BORDER_RADIUS = 20;

export const OPACITY = 0.9;

export const configNoSpring = {
  damping: 200,
  clamping: {overshootClamping: false},
};
export const configWithSpring = {
  damping: 10,
  clamping: {overshootClamping: true},
};
