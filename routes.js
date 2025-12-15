const routes = require('next-routes')();

routes
  .add('/campaign/new', '/campaign/new')
  .add('/students', '/students')
  .add('/test/at/:address', '/test/show')
  .add('/test/at/:address/addnew', '/test/edit')
  .add('/test/at/:address/attempt', '/test/attempt')

  .add('/test/at/:address/response', '/test/response') 
  .add('/test/at/:address/res/:personal', '/test/personal')
  
  .add('/test/at/:address/finalize', '/test/finalize');

module.exports = routes;