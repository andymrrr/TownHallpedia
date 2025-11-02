import { HeaderVariant, HeaderVariantStyles } from './types';

export const HEADER_VARIANT_STYLES: Record<HeaderVariant, HeaderVariantStyles> = {
  compact: {
    titleSize: 20,
    subtitleSize: 13,
    paddingVertical: 12,
  },
  default: {
    titleSize: 24,
    subtitleSize: 14,
    paddingVertical: 14,
  },
  large: {
    titleSize: 28,
    subtitleSize: 15,
    paddingVertical: 16,
  },
};

export const COMPACT_HEADER_PADDING = {
  top: 12,
  bottom: 16,
} as const;

export const BACK_BUTTON_SIZE = 34;
export const TITLE_ICON_SIZE = 18;
export const BACK_ICON_SIZE = 22;
export const TITLE_ICON_MARGIN = 8;

