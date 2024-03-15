import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path:'/lista-ejercicios',
    title: 'Lista de ejercicios',
    icon: 'bi bi-card-text',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/actividad-fisica',
    title: 'Actividad Fisica',
    icon: 'bi bi-bicycle',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path:'/dieta',
    title: 'Dieta',
    icon: 'bi bi-egg-fried',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/suenio',
    title: 'Sueño',
    icon: 'bi bi-moon-stars-fill',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/objetivos',
    title: 'Objetivos',
    icon: 'bi bi-trophy-fill',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/about',
    title: '¿Quienes somos?',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  }
];
