# vue-template-firebase

## Before You Begin...
make sure you have [`Node.js`](https://nodejs.org/en/download/) installed and also [`vue-cli`](https://cli.vuejs.org/guide/installation.html)

## Project setup
```
npm install
```

## Firebase Config
create a file called `Firebase.js` then put this bit of code in it with your firebase credentials
```
import * as firebase from 'firebase';

var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };
firebase.initializeApp(config);

export default firebase;
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### To Add Pages to this template
Assuming you want to add an *About* page
1. Create a file called `About.vue` inside ```src > views ```. This represents the body of the page. Copy and paste the following template code in it:
```
<template>
  <div><!-- Your whole page content should fall under this one div tag -->

  </div>
</template>

<script>
  export default {
        name: 'about',
        data() {
            return {
                
            }
        },
        created() {
            
        },
        methods: {

        }
    }
</script>

<style scoped>
  /* Your CSS style for only this page goes here */
</style>
```
2. Add the route to the page by going to ```src > router.js``` and doing the following
    - import the page you just created at the top of the page `import About from './views/About.vue'`
    - Add the route details to the `routes:[]` array like so:
    ```
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        requiresAuth: false
       }
    },
    ```
    **NOTE:** setting the `requiresAuth` to true will let Firebase check for authentication first. if not, it'll redirect back to the homepage. Details of that are in the code below, located in `main.js`
    ```
    router.beforeEach((to, from, next) => {
      const currentUser = Firebase.auth().currentUser;
      const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
      if (requiresAuth && !currentUser) {
        next('/');
      } else if (requiresAuth && currentUser) {
        next();
      } else {
        next();
      }
    });
    ```
    
    3. Add the route to the navbar inside `App.vue` like so:
    ```<router-link to="/about">About</router-link> ```
    
### That's it!
You can design the pages any how you like after this. Enjoy


