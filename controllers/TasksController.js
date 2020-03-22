const Task = require('../models/Task');

exports.store = (req, res) => {
  let task = {};
  task.description = req.body.description;
  Task.create(task).then((id) => {
    if(req.xhr || req.headers.accept.indexOf('json') > -1){
      Task.find(id).then((task) => res.json(task));
    }else{
      res.redirect('/');
    }
  });
}


exports.update = (req, res) => {
  let id = req.params.id;
  console.log("ID", id);
  Task.find(id).then((task) => {
    return Task.done(task)
  }).then((result) => {
    res.redirect('/');
  })

}

exports.delete = (req, res) =>{
  let id = req.params.id;
  console.log("iddd", id);
  Task.find(id).then((task) =>{
    return Task.delete(task)
  }).then((result) =>{
    res.redirect('/');
  })
}

