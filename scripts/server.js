
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const { log } = require('console');
 
// user
const userJson = "./server-data/users.json";
const entersJson = "./server-data/enters.json";
const jsonFileData =  fs.readFileSync(userJson, 'utf-8');
let  parseJsonData = JSON.parse(jsonFileData);
 
const app = express();
const port = 3001;
// cors logic
app.use(cors());
// add parser for post body
app.use(express.json());
 
 
// route logic
app.get('', (req, res) => {
  res.send('Hello World!') 
}) 
 
//************************ */ register****************************
app.post('/register', (req, res) => {
      // find users
      if (req.body?.login) {
        const isUserExist = parseJsonData.users.find((user) => user.login === req.body?.login);
        if (!isUserExist) {
            parseJsonData.users.push(req.body);
            const json = JSON.stringify(parseJsonData);
            fs.writeFileSync(userJson, json, 'utf-8', (data) => {}, (err) => {
              console.log('err write file', err)
            });
 
            // send response
            res.send("ok");
        } else {
          throw new Error('Пользователь уже зарегестрирован');
        }
      } else {
        throw new Error('не найдено свойство login');
      }
      console.log('parseJsonData Registration', parseJsonData);
 
})
 
//************** */ auth**************************************
app.post('/auth', (req, res) => { 
  log('req.body',req.body);
 
    if (req.body?.login && req.body.password) {
      // read file
        const jsonFileData =  fs.readFileSync(userJson, 'utf-8', (err, data) => {}, (err) => {
            console.log('err read file', err);});
 
            // parse data
         const  parseJsonData = JSON.parse(jsonFileData);
         console.log('parseJsonData auth', parseJsonData)
 
        if (Array.isArray(parseJsonData?.users)) {
                 // check psw and login -- must contains password and login  field name
           const isUserExist = parseJsonData?.users.find((user) => user.login === req.body?.login && user.psw === req.body?.psw);
 
            if (isUserExist) { 
                res.send(isUserExist);
            } else {
                // или отправить обьект с текстом ошибки
                 //res.send({error: true, errotText: 'Ошибка - пользователь не найден'});
 
                 // или явно выбросить исключения
                throw new Error('AUTH-Error')
             }
        } 
 
 
    } else {
      throw new Error('не найдено свойство login или password');
    }
  })
 
 
  //************** */ enters**************************************
 
  app.get('', (req, res) => { 
    const jsonFileData =  fs.readFileSync(entersJson, 'utf-8', (err, data) => {}, (err) => {
      console.log('err read file enters', err);});
    res.send(jsonFileData);
  });
 
  /*******************get enter */
  app.get('id', (req, res) => { 
    const jsonFileData =  fs.readFileSync(entersJson, 'utf-8', (err, data) => {}, (err) => {
      console.log('err read file enters', err);});
              // parse data
      const  parseJsonData = JSON.parse(jsonFileData);
      const paramId = req.params.id;
 
 
      const item = parseJsonData.enters.find((enters) => enters.id === paramId);
      if (item) {
        res.send(item);
      } else {
        throw new Error('Не найден по id:', paramId);
      }
  });
 
// run and listen serve
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})