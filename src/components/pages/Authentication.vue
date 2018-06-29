<template>
  <div>
    <div class="centered">
      <h1>Authentication</h1><br>
      <h2>User</h2><br>
      <input v-model="typedUser"><br>
      <h2>Password</h2><br>
      <input type="password" v-model="typedPassword"><br><br><br>
      <button @click="verifyUsers" @click.prevent="login">Login</button><br>
      <!--<p>This page is mocked up.</p>
      <p>You're going to be automatically logged-in.</p>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data: () => ({
    typedUser: '',
    typedPassword: '',
    realUser: false,
    loginPermission: false,
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
        }
      }
    },
    login () {
      if (this.realUser && this.loginPermission) {
        this.state.authenticate(this.typedUser)
      } else if (this.realUser && !this.loginPermission) {
        alert('Wrong Password')
      } else {
        alert('This user does not exist')
      }
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
.authenticated {
  border-color: #00ff00;
  border-style: groove;
  border-width: 4px;
}
.not-authenticated {
  border-color: #ff0000;
  border-style: groove;
  border-width: 4px;
}
.centered{
  text-align: center;
}

</style>
