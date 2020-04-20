const router = require('express').Router();
const homepageController = require('../controllers/HomepageController');
const tasksController = require('../controllers/TasksController');

router.get('/', homepageController.index);

router.post('/tasks', tasksController.store);

router.put('/update/:id', tasksController.update);

router.delete('/delete/:id', tasksController.delete);

//NEW API 
router.get('/api/tasks', tasksController.get);
router.post('/api/tasks', tasksController.store);
router.put('/api/update/:id', tasksController.update);
router.delete('/api/delete/:id', tasksController.delete);

module.exports = router;
