
import { Notify, LocalStorage, AppVisibility } from 'quasar'

const canUserAccess = async () => {
  try {
    const params = { 
      token: LocalStorage.getItem('token')
    }
    const r = await axios.get("http://127.0.0.1:8000/api/access", { params: params })
    return r.access
  } catch (error) {
    return false
  }
}

export default ({ router, store }) => {
  router.beforeEach((to, from, next) => {
    // const loggedIn = store.getters['auth/loggedIn']
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (canUserAccess()) {
        next();  
      } else {
        next({ name: "login" });
      }
    } else {
      next();
    }
  });
  // router.beforeEach(async (to, from, next) => {
  //   const loggedIn = store.getters['auth/loggedIn']
  //   const locked = store.getters['auth/locked']
  //   if (loggedIn && locked) {
  //     if (to.path === '/usuario/bloqueo') { next() } else { next(false) }
  //   } else if (!loggedIn && to.path !== '/') {
  //     next('/')
  //   } else if (loggedIn && to.path === '/') {
  //     next({ name: 'inicio' })
  //   } else {
  //     const canAccess = await canUserAccess(to)
  //     if (canAccess) {
  //       next()
  //     } else {
  //       if (to.name) {
  //         Notify.create({
  //           color: 'negative',
  //           message: '¡No tiene permiso!',
  //           caption: 'El incidente ha sido reportado',
  //           icon: 'lock',
  //           position: 'center'
  //         })
  //         // next(false)
  //         store.dispatch('auth/logout')
  //       } else {
  //         Notify.create({ color: 'negative', message: 'Ruta no existe' })
  //         next({ path: '/error' })
  //       }
  //     }
  //   }
  // })
}