<template>
  <div class="row justify-center" style="height: 100vh">
    <div class="col-xs-12 col-sm-6 flex">
      <div class="column self-center q-mx-auto">
        <img class="q-mx-auto" src="~assets/quasar-logo-vertical.svg" :width="$q.screen.gt.md ? '450' : '300'" />
      </div>
    </div>
    <div class="column q-gutter-y-lg q-pa-md self-center q-mx-auto">
      <div :class=" $q.screen.gt.md ? 'text-h4 text-weight-bold text-center' : 'text-h5 text-weight-bold text-center'" >
        Acceso
      </div>
      <q-input v-model="username"
               label="Usuario"
               ref="username"
               :rules="[ val => val.length > 0 || 'Capture un nombre de usuario válido']"
               lazy-rules
               filled
               placeholder="Nombre del usuario o Correo electrónico"
               clearable>
        <template v-slot:prepend>
          <q-icon name="email" />
        </template>
      </q-input>
      <q-input filled
               v-model="password"
               label="Password"
               ref="password"
               :rules="[ val => val.length >= 6 || 'La clave debe contener al menos 6 caracteres']"
               lazy-rules
               :type="isPwd ? 'password' : 'text'"
               placeholder="Clave de acceso">
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd" />
        </template>
      </q-input>
      <q-btn color="positive" label="Continuar" :loading="loading" @click="continuar">
        <template v-slot:loading>
          <q-spinner-gears />
        </template>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      loading: false,
      username: '',
      password: '',
      isPwd: true
    }
  },
  methods: {
    continuar () {
      const username = this.username
      const password = this.password
      this.$store.dispatch('auth/login', { username, password })
      // const username = this.username
      // const password = this.password

      // this.$refs.username.validate()
      // this.$refs.password.validate()
      // if (!this.$refs.username.hasError && !this.$refs.password.hasError) {
      //   this.$store.dispatch('auth/login', { username, password })
      //     .then(() => {
      //     })
      //     .catch(error => {
      //       console.log(error.message)
      //     })
      // }

    }
  },
  beforeMount () {
  }
}
</script>

<style scoped>
@media screen and (min-width: 360px) and (max-width: 737px) {
  div.container-logo {
    height: 200px !important;
    width: 100% !important;
  }
}
</style>