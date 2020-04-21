const Task = require('../models/Task');

exports.store = (req, res) => {
  let task = {};
  task.description = req.body.description;
  Task.create(task).then((id) => {
    if(req.xhr || req.headers.accept.indexOf('json') > -1){
      Task.find(id).then((task) => {
        //res.header("Access-Control-Allow-Origin", "*");
        //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        //res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
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
    if(typeof(task)=='undefined'){
      res.status(404).json({error: "El recurso no existe"});
    }
    Task.delete(task).then((status) => {
      res.json({status: status});
      /*if(req.xhr || req.headers.accept.indexOf('json') > -1){
        res.json(task);
      }else{
        res.redirect('/');
      }*/
    }).catch((error) =>{
      res.status(500).json({error: "Hubo un error en el servidor"});
    });
  }).catch((error) =>{
    res.status(500).json({error: "Hubo un error en el servidor"});
  })
}

exports.get = (req, res) => {
  let tasks = Task.all().then((tasks) => {
    //Esto me permite hacer la petición desde cualquier url
    //res.header("Access-Control-Allow-Origin", "*");
    res.send(tasks);
    //res.json(tasks);
    //res.render('homepage/index', {tasks: tasks});
  });
}

exports.getInfo = (req, res) => {
  let id = req.params.id;
  console.log("id to find", id);
  Task.find(id).then((task) =>{
    if(typeof(task)=='undefined'){
      res.status(404).json({error: "El recurso no existe"});
    }
    res.json(task);   
  }).catch((error) =>{
    res.status(500).json({error: "Hubo un error en el servidor"});
  });
}
 

