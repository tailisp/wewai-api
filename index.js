const express = require('express');
const bodyParser = require('body-parser'); 
const firebase = require('firebase');
 
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDBpc8GkRVgMYazqWnTx9P31Q_RjFR2vAo",
    authDomain: "wewai-ef932.firebaseapp.com",
    databaseURL: "https://wewai-ef932.firebaseio.com",
    projectId: "wewai-ef932",
    storageBucket: "wewai-ef932.appspot.com",
    messagingSenderId: "764402652437",
    appId: "1:764402652437:web:d22f9b9792b792f74c851c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Expressのセットアップ
const app = express();
app.use(bodyParser.json());

app.get('/messages', async (req, res) => {
    saveForFireStore("memoテスト")
    res.send(messages);
  });
  
  app.post('/messages', async (req, res) => {
    res.send(message);
  });

// Expressを起動する
const port = '8080';
app.listen(port, () => console.log(`app start listening on port ${port}`));

// firebaseにデータを保存する
function saveForFireStore(memo) {
    var db = firebase.firestore();
    db.collection("reviews").add({
        memo: memo,
        key: "KeyExampleXXX",
    })
    .then(function(docRef) {
        console.log("書き込み成功！");
    })
    .catch(function(error) {
        console.log("書き込み失敗...");
    });
}

// firebaseからデータを取得して反映させる
function fetchForFireStore(key) {
    var reviews = [];
    var db = firebase.firestore();
    db.collection("reviews").where("key", "==", key)
    .get()
    .then(function(querySnapshot) {
        showReviews(querySnapshot);
    })
    .catch(function(error) {
        console.log("取得失敗...", error);
    });
} 