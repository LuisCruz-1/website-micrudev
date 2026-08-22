export interface NavigationItem {
  label: string;
  href: string;
  activePath?: string;
}

export const navigationItems: readonly NavigationItem[] = [
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Proyectos', href: '/proyectos', activePath: '/proyectos' },
  { label: 'Planes', href: '/planes', activePath: '/planes' },
  { label: 'Stack', href: '/#stack' },
  { label: 'Contacto', href: '/#contacto' },
];

export function isNavigationItemCurrent(item: NavigationItem, pathname: string) {
  return Boolean(item.activePath && (pathname === item.activePath || pathname.startsWith(`${item.activePath}/`)));
}
