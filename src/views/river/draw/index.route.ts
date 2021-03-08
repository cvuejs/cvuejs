export default {
  name: 'Draw',
  path: '/draw',
  component: () => import(/* webpackChunkName: "draw" */ '.')
};
