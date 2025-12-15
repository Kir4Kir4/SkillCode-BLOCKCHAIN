'use strict';

var routes = require('next-routes')();

routes.add('/campaign/new', '/campaign/new').add('/students', '/students').add('/test/at/:address', '/test/show').add('/test/at/:address/addnew', '/test/edit').add('/test/at/:address/attempt', '/test/attempt').add('/test/at/:address/response', '/test/response').add('/test/at/:address/res/:personal', '/test/personal').add('/test/at/:address/finalize', '/test/finalize');

module.exports = routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJyZXF1aXJlIiwiYWRkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFNBQVMsQUFBZjs7QUFFQSxPQUNHLEFBREgsSUFDTyxBQURQLGlCQUN3QixBQUR4QixpQkFFRyxBQUZILElBRU8sQUFGUCxhQUVvQixBQUZwQixhQUdHLEFBSEgsSUFHTyxBQUhQLHFCQUc0QixBQUg1QixjQUlHLEFBSkgsSUFJTyxBQUpQLDRCQUltQyxBQUpuQyxjQUtHLEFBTEgsSUFLTyxBQUxQLDZCQUtvQyxBQUxwQyxpQkFPRyxBQVBILElBT08sQUFQUCw4QkFPcUMsQUFQckMsa0JBUUcsQUFSSCxJQVFPLEFBUlAsbUNBUTBDLEFBUjFDLGtCQVVHLEFBVkgsSUFVTyxBQVZQLDhCQVVxQyxBQVZyQzs7QUFZQSxPQUFPLEFBQVAsVUFBaUIsQUFBakIiLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IkY6L1RML1VFVC9CTE9DS0NIQUlOL1NraWxsY29kZSJ9