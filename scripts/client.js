$(document).ready(onReady);

let company = [];

function onReady() { // click handlers
  $('#submitEmployeeButton').on('click', submitEmployee);
  // $('#employeeInfoOut').on('click', '.deleteEmployeeButton', deleteEmployee); // BASE mode to delete <li>
  $('#employeeInfoTable').on('click', '.deleteEmployeeButton', deleteEmployee); // STRETCH: change delete button to delete the table row
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
  //let el = $('#employeeInfoOut'); // BASE mode displays info as a <ul>
  let elTable = $('#employeeInfoTable'); // part of STRETCH
  //el.empty();
  elTable.empty();
  for(let i = 0; i < infoToDisplay.length; i++) {
    // el.append(`<li>${infoToDisplay[i].firstName} ${infoToDisplay[i].lastName} ${infoToDisplay[i].idNumber} ${infoToDisplay[i].jobTitle} $${infoToDisplay[i].annualSalary} <button class="deleteEmployeeButton" data-index="${i}">Delete</button></li>`); // BASE mode displays info as a <ul>
    elTable.append(`<tr><td>${infoToDisplay[i].firstName}</td><td>${infoToDisplay[i].lastName}</td><td>${infoToDisplay[i].idNumber}</td><td>${infoToDisplay[i].jobTitle}</td><td>${Number(infoToDisplay[i].annualSalary).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td><td><button class="deleteEmployeeButton" data-index="${i}">Delete</button></td></tr>`); // STRETCH: display info as a <table> to look like the wireframe and include currency format
    //console.log('in displayInfo testing currency format:', Number(infoToDisplay[i].annualSalary).toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
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
  //el.append(`$${monthlyCost.toFixed(2)}`); // .toFixed() dictates how many decimal points to keep the number at. Floating point issue
  el.append(`${monthlyCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`); // https://stackoverflow.com/questions/9372624/formatting-a-number-as-currency-using-css and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
  console.log('monthlyCost:', monthlyCost);
  console.log('monthlyCost LocaleString:', monthlyCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })); 
  // if the total monthly cost exceeds $20,000, add a red background color to the total monthly cost.
  if(monthlyCost > 20000) {
    //el.css('background-color', 'red');
    el.addClass("monthlyOverBudget");
  }
  else { // removes the background color if the total monthly cost is ever not > 20000
    //el.css('background-color', '');
    el.removeClass("monthlyOverBudget");
  }
}

function submitEmployee() { // stores the input field's information into the company and displays it on the DOM
  console.log('in submitEmployee');
  // checks for duplicate ID number since the ID number should be unique
  for(let i = 0; i < company.length; i++) {
    if($('#idNumberIn').val() === company[i].idNumber) {
      alert('Duplicate ID number, cannot add this employee');
      return false;
    }
  }
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
