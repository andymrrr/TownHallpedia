export const TAB_BAR_CONSTANTS = {
  COLORS: {
    ACTIVE: '#FFFFFF',
    INACTIVE: 'rgba(255, 255, 255, 0.6)',
    BACKGROUND_START: 'rgba(10, 10, 10, 0.95)',
    BACKGROUND_END: 'rgba(15, 15, 15, 0.98)',
    BORDER: 'rgba(255, 255, 255, 0.1)',
    BORDER_OUTER: 'rgba(200, 200, 200, 0.2)',
  },
  SIZES: {
    ICON: 24,
    INDICATOR_WIDTH: 24,
    INDICATOR_HEIGHT: 2,
    BORDER_RADIUS: 20,
    HEIGHT_BASE: 70,
    PADDING_TOP: 10,
    PADDING_BOTTOM_MIN: 10,
    PADDING_HORIZONTAL: 8,
  },
  TYPOGRAPHY: {
    LABEL_FONT_SIZE: 11,
    LABEL_FONT_WEIGHT: '500' as const,
  },
} as const;

