import { StyleSheet, Platform } from 'react-native';
import { TAB_BAR_CONSTANTS } from '../constants/tabBarConstants';

export const tabBarBackgroundStyles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    borderTopLeftRadius: TAB_BAR_CONSTANTS.SIZES.BORDER_RADIUS,
    borderTopRightRadius: TAB_BAR_CONSTANTS.SIZES.BORDER_RADIUS,
    borderWidth: 1,
    borderColor: TAB_BAR_CONSTANTS.COLORS.BORDER,
    borderBottomWidth: 0,
  },
  border: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: TAB_BAR_CONSTANTS.SIZES.BORDER_RADIUS,
    borderTopRightRadius: TAB_BAR_CONSTANTS.SIZES.BORDER_RADIUS,
    borderWidth: 1,
    borderColor: TAB_BAR_CONSTANTS.COLORS.BORDER_OUTER,
    borderBottomWidth: 0,
    pointerEvents: 'none',
  },
});

export const tabButtonStyles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconContainer: {
    marginBottom: 4,
  },
  indicatorLine: {
    width: TAB_BAR_CONSTANTS.SIZES.INDICATOR_WIDTH,
    height: TAB_BAR_CONSTANTS.SIZES.INDICATOR_HEIGHT,
    backgroundColor: TAB_BAR_CONSTANTS.COLORS.ACTIVE,
    borderRadius: 1,
    marginTop: 2,
    marginBottom: 4,
  },
  label: {
    color: TAB_BAR_CONSTANTS.COLORS.ACTIVE,
    fontSize: TAB_BAR_CONSTANTS.TYPOGRAPHY.LABEL_FONT_SIZE,
    fontWeight: TAB_BAR_CONSTANTS.TYPOGRAPHY.LABEL_FONT_WEIGHT,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'sans-serif-medium',
    }),
  },
});

