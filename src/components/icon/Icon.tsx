import { Text } from 'react-native';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: object;
}

const iconMap: Record<string, string> = {
  'star': 'star',
  'emoji-events': 'emoji_events',
  'trophy': 'emoji_events',
  'lock': 'lock',
  'lock-open': 'lock_open',
  'check': 'check',
  'close': 'close',
  'add': 'add',
  'remove': 'remove',
  'home': 'home',
  'settings': 'settings',
  'person': 'person',
  'notifications': 'notifications',
  'search': 'search',
  'menu': 'menu',
  'arrowback': 'arrow_back',
  'arrowforward': 'arrow_forward',
  'heart': 'favorite',
  'flash': 'flash_on',
  'fire': 'local_fire_department',
  'diamond': 'diamond',
};

export function Icon({ name, size = 24, color = '#000', style }: IconProps) {
  const iconName = iconMap[name] || name.replace(/-/g, '_');

  return (
    <Text
      style={[
        {
          fontFamily: 'Material Icons',
          fontSize: size,
          color,
          lineHeight: size,
        },
        style,
      ]}
    >
      {iconName}
    </Text>
  );
}

export interface FontAwesomeProps {
  name: string;
  size?: number;
  color?: string;
  style?: object;
}

const faIconMap: Record<string, string> = {
  trophy: '\uf091',
  star: '\uf005',
  heart: '\uf004',
  check: '\uf00c',
  times: '\uf00d',
  plus: '\uf067',
  minus: '\uf068',
  home: '\uf015',
  user: '\uf007',
  cog: '\uf013',
  bell: '\uf0f3',
  search: '\uf002',
  bars: '\uf0c9',
  lock: '\uf023',
  unlock: '\uf09c',
  diamond: '\uf219',
};

export function FontAwesome({
  name,
  size = 24,
  color = '#000',
  style,
}: FontAwesomeProps) {
  const iconChar = faIconMap[name] || name;

  return (
    <Text
      style={[
        {
          fontFamily: 'FontAwesome',
          fontSize: size,
          color,
          lineHeight: size,
        },
        style,
      ]}
    >
      {iconChar}
    </Text>
  );
}
