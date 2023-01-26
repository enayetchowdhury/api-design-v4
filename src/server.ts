//const express = require('express');
//const app = express();

import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import {protect} from './modules/auth';
import {createNewUser,signin} from './handlers/user';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // if (req.method === 'OPTIONS') {
    //     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    //     return res.status(200).json({});
    // }
    req.sshh_secret = "This is a secret.";
    next();
});

app.get('/', (req, res, next) => {
    // console.log("Hello from the server.");
    res.status(200);
    res.json({message: "hello"});
});

app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signin);

app.use((err, req, res, next) => {
   if(err.type === 'auth'){
       return res.status(401).json({message: "You are not authorized to access this resource."});
   }
   else if (err.type === 'input'){
       return res.status(400).json({message: "Invalid Input."});
   }
    else {
        console.log(err);
        return res.status(500).json({message: "Something went wrong."});
   }    
});

export default app;