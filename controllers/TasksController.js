const Task = require('../models/Task');

exports.store = (req, res) => {
  let task = {};
  task.description = req.body.description;
  Task.create(task).then((id) => {
    if(req.xhr || req.headers.accept.indexOf('json') > -1){
      Task.find(id).then((task) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        res.json(task)});
    }else{
      res.redirect('/');
    }
  });
}


exports.update = (req, res) => {
  let id = req.params.id;
  console.log("ID", id);
  Task.find(id).then((task) => {
    Task.done(task).then((taskDone) => {
      if(req.xhr || req.headers.accept.indexOf('json') > -1){
        res.json(task);
      }else{
        res.redirect('/');
      }
    })
  }).then((result) => {
    //res.redirect('/');
  })

}

exports.delete = (req, res) =>{
  let id = req.params.id;
  console.log("iddd", id);
  Task.find(id).then((task) =>{
    Task.delete(task).then((taskDeleted) => {
      if(req.xhr || req.headers.accept.indexOf('json') > -1){
        res.json(task);
      }else{
        res.redirect('/');
      }
    })
  }).then((result) =>{
    //res.redirect('/');
  })
}

exports.get = (req, res) => {
  let tasks = Task.all().then((tasks) => {
    //Esto me permite hacer la petición desde cualquier url
    res.header("Access-Control-Allow-Origin", "*");
    res.send(tasks);
    //res.json(tasks);
    //res.render('homepage/index', {tasks: tasks});
  });
}
 

