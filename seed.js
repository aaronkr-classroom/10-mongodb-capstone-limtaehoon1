// seed.js
"use strict";

const { default: mongoose } = require("mongoose");
/**
 * Listing 15.9 (p. 224)
 * 새로운 데이터 생성
 */
// 모듈 가져오기
const Imongoose = require("mongoose"),
    Subscriber =require("./models/Subscriber");

// 데이터베이스 연결 설정
mongoose.connect(
    "mongodb+srv://lim021298:ERBJYBO43EvfIngF@ut-node.z7jjt1w.mongodb.net/?retryWrites=true&w=majority&appName=ut-node"
)
mongoose.connection;
// subscribers 배열 생성 (5개 이상)
var subscribers = [
  {
    name: "Thor",
    email: "a@b.com",
    phoneNumber: "true",
  },
  {
    name: "Hurk",
    email: "b@b.com",
    phoneNumber: "false",
  },
  {
    name: "Spider",
    email: "c@b.com",
    phoneNumber: "true",
  },
  {
    name: "Ironman",
    email: "d@b.com",
    phoneNumber: "false",
  },
  {
    name: "wizard",
    email: "e@b.com",
    phoneNumber: "true",
  },
  {
    name: "Doctor",
    email: "f@b.com",
    phoneNumber: "false",
  },
];

// 기존 데이터 제거
/*
Subscriber
    .deleteMany({})
    .exec()
    .then(result => {
        console.log(`Delete ${result.deletedCount} records. `);
    })
    .catch(error => {
        console.log(`error ${error.message}`);
    })
*/
var commands = [];

// 프라미스 생성을 위한 구독자 객체 루프
subscribers.forEach(s => {
    commands.push(
        Subscriber.create({
            name : s.name,
            email : s.email,
            newsletter : s.newsletter

        })
        .then(s => {
            console.log(`Created: ${s.name}`);
        })

    )
})

// 프라미스 생성 후 로깅 작업
Promise.all(commands)
    .then(r => {
        console.log(JSON.stringify(r,null,2));
        mongoose.connection.close();
    })
    .catch(e => {
        console.log(e);
    });
