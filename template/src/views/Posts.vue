<template>
    <div class="about">
        <h1>This is the Posts page</h1>
    </div>
</template>

<script>
    import firebase from '../Firebase.js'
    export default {
        name: 'posts',
        data() {
            return {
                ref: firebase.firestore().collection('songs'),
            }
        },
        created() {
            this.ref.onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id)
                });
            })
        },
        methods: {}
    }
</script>