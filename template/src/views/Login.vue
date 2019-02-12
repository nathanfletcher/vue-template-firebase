<template>
    <div class="about">
        <h1>This the Login page</h1>
        <div class="login-card-wide mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">Welcome</h2>
            </div>
            <div class="mdl-card__supporting-text">
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input id="email" class="mdl-textfield__input" type="text" v-model="email">
                    <label class="mdl-textfield__label" for="email">Email</label>
                </div>

                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input id="pass" class="mdl-textfield__input" type="password" v-model="password"
                        v-on:keyup.enter="login()">
                    <label class="mdl-textfield__label" for="pass">Password</label>
                </div>
            </div>
            <div class="mdl-card__actions mdl-card--border">
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" @click="login">
                    Sign In
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            login: function (i) {
                if (!this.email || !this.password) {
                    alert("Please enter your username/email and password!")
                }
                link.post(`/AppUsers/login`, {
                    username: this.email,
                    password: this.password,
                })
                    .then(response => {
                        if (response.status == 200) {
                            console.log("data from loopback ", response.data)

                            this.$store.commit('setToken', response.data.token);
                            this.$store.commit('setProfile', response.data);
                            this.$store.commit('setHeaders', {
                                accept: 'application/json',
                                authorization: `${response.data.token}`
                            });

                            //updating axios
                            link.defaults.headers.common['Authorization'] = response.data.token;

                            // console.log("Returned Data",JSON.stringify(this.$store.getters.getHeaders))
                            this.$router.push("/")
                            return
                        }

                        // return response
                    })
                    .catch(e => {
                        //this.errors.push(e)
                        console.log("THERE WAS A LOGIN ERROR")
                        //console.log(e.name)
                        alert("your username or passoword is incorrect")
                    })
            }
        }
    }
</script>