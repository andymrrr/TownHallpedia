import { TAB_BAR_CONSTANTS } from '../constants/tabBarConstants';

export interface TabConfig {
  name: string;
  title: string;
  iconName: 'home' | 'star' | 'search' | 'magic' | 'building';
  label?: string;
}

export const TABS_CONFIG: TabConfig[] = [
  {
    name: 'ayuntamientos/index',
    title: 'Ayuntamientos',
    iconName: 'home',
    label: 'Ayuntamientos',
  },
  {
    name: 'heroes/index',
    title: 'Héroes',
    iconName: 'star',
    label: 'Héroes',
  },
  {
    name: 'buscar/index',
    title: 'Buscar',
    iconName: 'search',
  },
  {
    name: 'hechizos/index',
    title: 'Hechizos',
    iconName: 'magic',
    label: 'Hechizos',
  },
  {
    name: 'edificios/index',
    title: 'Edificios',
    iconName: 'building',
    label: 'Edificios',
  },
];

export function getTabBarStyle(insetsBottom: number) {
  return {
    position: 'absolute' as const,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    height: TAB_BAR_CONSTANTS.SIZES.HEIGHT_BASE + insetsBottom,
    paddingBottom: Math.max(insetsBottom, TAB_BAR_CONSTANTS.SIZES.PADDING_BOTTOM_MIN),
    paddingTop: TAB_BAR_CONSTANTS.SIZES.PADDING_TOP,
    paddingHorizontal: TAB_BAR_CONSTANTS.SIZES.PADDING_HORIZONTAL,
  };
}

