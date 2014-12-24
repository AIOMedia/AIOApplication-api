var Plugin = require('./Core/Plugin');

var TaskPlugin = new Plugin({
    name: 'Task',
    baseRoute: '/task'
});

module.exports = TaskPlugin;