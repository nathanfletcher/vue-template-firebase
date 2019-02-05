# vue-template-firebase

## Pre requisite
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
