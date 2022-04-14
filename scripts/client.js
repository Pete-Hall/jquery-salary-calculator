$(document).ready(onReady);

let company = [];

function onReady() {
  $('#submitEmployeeButton').on('click', submitEmployee);
  $('#employeeInfoOut').on('click', '.deleteEmployeeButton', deleteEmployee);
}

function deleteEmployee() {
  console.log('in deleteEmployee');
}

function displayInfo() {
  console.log('in displayInfo');
  let el = $('#employeeInfoOut');
  el.empty();
  for(let i = 0; i < company.length; i++) {
    el.append(`<li>${company[i].firstName} ${company[i].lastName} ${company[i].idNumber} ${company[i].jobTitle} $${company[i].annualSalary} <button class="deleteEmployeeButton">Delete</button></li>`);
  }
}

function submitEmployee() {
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
  // calculate monthly cost & display to DOM & if > $20,000 add red bg color
  monthlyCost();
  // display employee info to DOM
  displayInfo();
  // clear input fields
  $('#firstNameIn').val('');
  $('#lastNameIn').val('');
  $('#idNumberIn').val('');
  $('#jobTitleIn').val('');
  $('#annualSalaryIn').val('');
}

function monthlyCost() {
  console.log('in monthlyCost');
  let monthlyCost = 0;
  let el = $('#monthlyCostOut');
  el.empty();
  for(let i = 0; i < company.length; i++) {
    monthlyCost += Number(company[i].annualSalary) / 12;
  }
  el.append(`$${monthlyCost}`);
  console.log('monthlyCost:', monthlyCost);
  // if the total monthly cost exceeds $20,000, add a red background color to the total monthly cost.
  if(monthlyCost > 20000) {
    el.css('background-color', 'red');
  }
}