import { LocalStorage, Loading, Dialog, AppVisibility } from 'quasar'
import axios from "axios"

// const authy = (id, pass) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (id && pass) {
//         resolve()
//       } else {
//         reject('Usuario incorrecto')
//       }   
//     }, 1000);
//   })
// }

const initialState = () => ({
  token: LocalStorage.getItem('token') || '',
  userInfo: {},
  loggedIn: false  
})

const state = initialState()

const mutations = {
  reset (state) {
    const newState = initialState()
    Object.keys(newState).forEach(key => {
      state[key] = newState[key]
    })
  },
  setToken (state, value) {
    if (value === '') {
      state.token = ''
      LocalStorage.remove('token')      
    } else {
      state.token = value
      LocalStorage.set('token', value)
    }
  },
  setLoggedIn (state, value) {
    state.loggedIn = value
  },
  setUserInfo (state, value) {
    state.userInfo = value
  }
}

const actions = {
  reset ({ commit }) {
    commit('reset')
  },
  login ({ commit, dispatch }, payload) {    
    axios.post("http://127.0.0.1:8000/api/", payload)
      .then((response) => {       
        // const { data } = response.data
        commit('setToken', response.data.token)
        commit('setUserInfo', { user: response.data.user })
        this.$router.push({ path: 'inicio' })        
      })
      .catch((error) => {        
        Dialog.create({
          title: 'Error',
          message: 'Usuario o contraseña incorrectos'
        })        
      })
  },
  logout ({ commit }) {
    const params = {
      token: LocalStorage.getItem('token')
    }
    axios.get("http://127.0.0.1:8000/api/logout", { params: params })
      .then((response) => {
        commit('reset')
        commit('setToken', '')
        this.$router.push('/')
      })    
  },
  // login ({ commit, dispatch }, payload) {
  //   commit('setMessage', null)
  //   Loading.show()
  //   authy(payload.username, payload.password)
  //     .then(h => {
  //       commit('setLoggedIn', true)
  //       commit('setUserInfo', { username: payload.username, pass: payload.password })
  //     })
  //     .catch(console.log)
  //   // api.post('/rpc/authy', { username: payload.username, pass: payload.password })
  //   //   .then(response => {
  //   //     commit('setToken', response.data.token)
  //   //     // dispatch('userInfo')
  //   //     // dispatch('usuario/selectTarea', {}, { root: true }) // Ajuste para llamar un "action" de otro store
  //   //     // dispatch('usuario/selectMensajes', {}, { root: true })
  //   //     Loading.hide()
  //   //     this.$router.push({ name: 'inicio' })
  //   //   })
  //   //   .catch(error => {
  //   //     Loading.hide()
  //   //     if (error.response) {
  //   //       Dialog.create({
  //   //         title: 'Error',
  //   //         message: error.response.data.message
  //   //       })
  //   //     } else {
  //   //       Dialog.create({
  //   //         title: 'Error',
  //   //         message: 'El servicio no se encuentra disponible de momento'
  //   //       })
  //   //     }
  //   //     commit('setToken', '')
  //   //   })
  // },
  // logout ({ commit }) {
  //   Loading.show()
  //   api.post('/rpc/logout')
  //     .then(response => {
  //       Loading.hide()
  //       commit('setToken', '')
  //       // commit('setUserInfo', {})
  //       this.$router.push('/')
  //     })
  //     .catch((_error) => {
  //       Loading.hide()
  //       commit('setToken', '')
  //       this.$router.push('/')
  //     })
  // },
  // userInfo ({ commit }) {
  //   Loading.show()
  //   api.post('/rpc/userinfo')
  //     .then(response => {
  //       Loading.hide()
  //       commit('setUserInfo', response.data)
  //     })
  //     .catch(_error => {
  //       Loading.hide()
  //       commit('setUserInfo', {})
  //     })
  // },
  // passwordCheck ({ commit }, password) {
  //   return new Promise((resolve, reject) => {
  //     api.post('/rpc/password_check', { password: password })
  //       .then(response => {
  //         resolve(response)
  //       })
  //       .catch(error => {
  //         reject(error)
  //       })
  //   })
  // }
}

const getters = {
  loggedIn: state => state.loggedIn,
  userInfo: state => state.userInfo
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
