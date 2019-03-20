<template>
  <form @submit="verifyUsers" @submit.prevent="login">
    <div class="centered">
      <h1>Authentication</h1><br>

      <h2>User</h2><br>

      <input v-model="typedUser"><br>

      <h2>Password</h2><br>

      <input type="password" v-model="typedPassword"><br><br><br>

      <button type="submit">Login</button><br>

      <div class="centered" v-if="loginFail">
        <h4>Wrong credentials</h4>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'AboutPage',
  data: () => ({
    typedUser: '',
    typedPassword: '',
    realUser: false,
    loginPermission: false,
    loginFail: false,
    users: [
      {
        id: 1,
        user: 'Pancudinho',
        password: 'Spider'
      }
    ]
  }),

  props: {
    state: Object
  },

  methods: {
    verifyUsers () {
      for (let i = 0; i < this.users.length; i++) {
        if ((this.typedUser === this.users[i].user) && (this.typedPassword === this.users[i].password)) {
          this.realUser = true
          this.loginPermission = true
        } else if ((this.typedUser === this.users[i].user) && (this.typedPassword !== this.users[i].password)) {
          this.realUser = true
          this.loginPermission = false
        } else {
          this.realUser = false
          this.loginPermission = false
        }
      }
    },

    login () {
      this.loginFail = false

      if (this.realUser && this.loginPermission) {
        return this.state.authenticate(this.typedUser)
      }

      this.loginFail = true
    }
  }
}
</script>

<style scoped>
.margin-layout {
  margin: 20px
}
input{
  padding: 0.2em 0.1em;
  margin: 0.2em 0.2em;
  width:266px;
  background: #ffffff;
  border-radius: 5px;
  text-align: center;
  font: 40 35px/0.1 'Arizonia', Helvetica, sans-serif;
  color: #2b2b2b;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
}
h4{
  color: #ff0000;
}
.centered{
  text-align: center;
}

</style>
