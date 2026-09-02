export interface NavigationItem {
  label: string;
  href: string;
  homeHref?: string;
  sectionId?: string;
  activePath?: string;
}

export const navigationItems: readonly NavigationItem[] = [
  { label: 'Servicios', href: '/#servicios', homeHref: '#servicios', sectionId: 'servicios' },
  { label: 'Proyectos', href: '/proyectos', homeHref: '#projects-preview', sectionId: 'projects-preview', activePath: '/proyectos' },
  { label: 'Stack', href: '/#stack', homeHref: '#stack', sectionId: 'stack' },
  { label: 'Planes', href: '/planes', homeHref: '#precios', sectionId: 'precios', activePath: '/planes' }
];

export function isNavigationItemCurrent(item: NavigationItem, pathname: string) {
  return Boolean(item.activePath && (pathname === item.activePath || pathname.startsWith(`${item.activePath}/`)));
}
