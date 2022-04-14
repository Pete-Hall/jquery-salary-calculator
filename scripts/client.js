$(document).ready(onReady);

let company = [];

function onReady() {
  $('#submitEmployeeButton').on('click', submitEmployee)
}

function displayInfo() {
  console.log('in displayInfo');
  let el = $('#employeeInfoOut');
  el.empty();
  for(let i = 0; i < company.length; i++) {
    el.append(`<li>${company[i].firstName} ${company[i].lastName} ${company[i].idNumber} ${company[i].jobTitle} $${company[i].annualSalary}</li>`);
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
  // calculate monthly cost & display to DOM
  monthlyCost();
  // display employee info to DOM
  displayInfo();
  // clear input fields
  $('#firstNameIn').val('');
  $('#lastNameIn').val('');
  $('#idNumberIn').val('');
  $('#jobTitleIn').val('');
  $('#annualSalaryIn').val('');
  // if the total monthly cost exceeds $20,000, add a red background color to the total monthly cost.
}

function monthlyCost() {
  console.log('in monthlyCost');
  let monthlyCost = 0;
  let el = $('#monthlyCostOut');
  el.empty();
  for(let i = 0; i < company.length; i++) {
    monthlyCost += Number(company[i].annualSalary) / 12;
  }
  el.append(monthlyCost);
  console.log('monthlyCost:', monthlyCost);
}