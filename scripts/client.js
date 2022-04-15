$(document).ready(onReady);

let company = [];

function onReady() { // click handlers
  $('#submitEmployeeButton').on('click', submitEmployee);
  $('#employeeInfoOut').on('click', '.deleteEmployeeButton', deleteEmployee);
}

function deleteEmployee() { // removes an employee from the DOM, removes their info from the total monthly salary and updates the DOM
  console.log('in deleteEmployee');
  // remove employee from DOM
  // $(this).parent().remove();
  // STRETCH: remove employee's salary from the reported total
  // get this item's index (updating displayInfo to include data-index="${i}")
  console.log($(this).data('index'));
  company.splice($(this).data('index'), 1);
  // redisplay the updated company array onto the DOM
  displayInfo(company);
}

function displayInfo(infoToDisplay) {  // when called, displays info to the DOM and the total monthly cost to the DOM. In this case, we will be using the company info
  console.log('in displayInfo');
  let el = $('#employeeInfoOut');
  el.empty();
  for(let i = 0; i < infoToDisplay.length; i++) {
    el.append(`<li>${infoToDisplay[i].firstName} ${infoToDisplay[i].lastName} ${infoToDisplay[i].idNumber} ${infoToDisplay[i].jobTitle} $${infoToDisplay[i].annualSalary} <button class="deleteEmployeeButton" data-index="${i}">Delete</button></li>`);
  }
  // display monthly cost to DOM
  monthlyCost(company);
}

function monthlyCost(arrayToAdd) { // when called, calculates the total monthly cost of the array and displays it to the DOM. In this case, we will be using the company's annual salaries
  console.log('in monthlyCost');
  // calculate monthly cost
  let monthlyCost = 0;
  let el = $('#monthlyCostOut');
  el.empty();
  for(let i = 0; i < arrayToAdd.length; i++) {
    monthlyCost += Number(arrayToAdd[i].annualSalary) / 12;
  }
  el.append(`$${monthlyCost}`);
  console.log('monthlyCost:', monthlyCost);
  // if the total monthly cost exceeds $20,000, add a red background color to the total monthly cost.
  if(monthlyCost > 20000) {
    el.css('background-color', 'red');
  }
  else { // removes the background color if the total monthly cost is ever not > 20000
    el.css('background-color', '');
  }
}

function submitEmployee() { // stores the input field's information into the company and displays it on the DOM
  console.log('in submitEmployee');
  // collect form info
  let employee = {
    firstName: $('#firstNameIn').val(),
    lastName: $('#lastNameIn').val(),
    idNumber: $('#idNumberIn').val(),
    jobTitle: $('#jobTitleIn').val(),
    annualSalary: $('#annualSalaryIn').val()
  }
  // store the info
  company.push(employee);
  // display employee and monthly cost info to DOM
  displayInfo(company);
  // clear input fields
  $('#firstNameIn').val('');
  $('#lastNameIn').val('');
  $('#idNumberIn').val('');
  $('#jobTitleIn').val('');
  $('#annualSalaryIn').val('');
}
