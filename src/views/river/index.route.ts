export default [
  {
    name: 'Draw',
    path: '/draw',
    component: () => import(/* webpackChunkName: "draw" */ './draw')
  },
  {
    name: 'Input',
    path: '/input',
    component: () => import(/* webpackChunkName: "input" */ './input')
  }
];
