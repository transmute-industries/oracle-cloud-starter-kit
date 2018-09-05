var express = require('express');
var bodyParser = require('body-parser');
var MYPORT = process.env.PORT || '8080'; 
var app = express();
var fs = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));
app.use(express.static('public'));
var router = express.Router();

var listEmployees = [];

try {
	listEmployees= JSON.parse(fs.readFileSync('employeesData.json', 'utf8'));
}catch (err){
	console.log("Error to read the employeesData.json file "+err);
}
var countEmployees = 100+listEmployees.length;

router.use(function (request, response, next) {
  console.log("REQUEST:" + request.method + "   " + request.url);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  response.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// GET
router.route('/:id').get(function (request, response) {
   var idEmployee = request.params.id;
   var employee = listEmployees.filter(e => e.id == idEmployee)[0];
   response.json(employee).end();  
});

// GET
router.route('/').get(function (request, response) {   
   response.json(listEmployees).end();  
});

// GET
router.route('/:searchCriteria/:searchValue').get(function (request, response) {  
	var employees;
	var searchValue = request.params.searchValue;
	var searchCriteria = request.params.searchCriteria;
	if (searchCriteria=="department"){
		employees = listEmployees.filter(e => e.dept == searchValue)
	}else if (searchCriteria=="lastname"){
		employees = listEmployees.filter(e => e.lastName == searchValue)
	}else{
		employees = listEmployees.filter(e => e.title == searchValue)
	}
   response.json(employees).end();  
});

// PUT
router.route('/:id').put(function (request, response) {    
    var idEmployee = request.params.id;
    var body = request.body;	
	var employee ={ id: idEmployee, firstName: body.firstName,
				   lastName: body.lastName, email: body.email, 
				   phone: body.phone, birthDate: body.birthDate,  
				   title: body.title, dept: body.dept};
	listEmployees = listEmployees.filter(e => e.id != idEmployee);
    listEmployees.push(employee);			   
    response.json({"OK":"Success"}).end();  
});

// POST
router.route('/').post(function (request, response) {
    var idEmployee = countEmployees++;
	console.log(idEmployee);
    var body = request.body;	
	var employee ={ id: idEmployee, firstName: body.firstName,
				   lastName: body.lastName, email: body.email, 
				   phone: body.phone, birthDate: body.birthDate,  
				   title: body.title, dept: body.dept};									   
    listEmployees.push(employee);
	response.json({"OK":"Success"}).end();  
});

// DELETE
router.route('/:id').delete(function (request, response) {    
    var idEmployee = request.params.id;
	listEmployees = listEmployees.filter(e => e.id != idEmployee);
	response.json({"OK":"Success"}).end();      
});

// Start the server
app.use('/employees', router);
app.listen(MYPORT);

// Announce ourselves
console.log("Server started on port: " + MYPORT);
