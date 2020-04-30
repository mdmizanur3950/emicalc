// Listen for Submit
const loanForm = document.querySelector('#loan-form');

loanForm.addEventListener('submit', function(e) {
  
  // Hide Result
  document.querySelector('.result').style.display = 'none';

  // Show Loader
  document.querySelector('.loading').style.display = 'block';

  setTimeout(calculateResults, 2500);

  e.preventDefault();

});

// Calculate Results
function calculateResults() {

  // UI Vars
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');

  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const monthlyInstallment = document.querySelector('#monthly-installment');
  const totalInterest = document.querySelector('#total-interest');


  const principal = parseFloat(amount.value);
  const interestPerMonth = parseFloat(interest.value) / 100 / 12;
  const numberOfMonth = parseFloat(years.value) * 12;

  // Calculate the interest
  const x = Math.pow(1 + interestPerMonth, numberOfMonth);
  const monthly = (principal * interestPerMonth * x) / (x - 1);
  console.log(monthly);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    monthlyInstallment.value = (((monthly * numberOfMonth) - principal)/12).toFixed(2);
    totalInterest.value = ((monthly * numberOfMonth) - principal).toFixed(2);
    totalPayment.value = (monthly * numberOfMonth).toFixed(2);

    // Show Result
    document.querySelector('.result').style.display = 'block';

    // Hide Loader
    document.querySelector('.loading').style.display = 'none';
    
  } else {
    showErrorMessage('Please check your numbers');
  }

}

// Error Mesage
function showErrorMessage(error) {

  // Hide Result
  document.querySelector('.result').style.display = 'none';

  // Hide Loader
  document.querySelector('.loading').style.display = 'none';
  
  // Create A Div
  const errorDiv = document.createElement('div');

  // add Class to error div
  errorDiv.className = 'alert alert-danger';

  // create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // get Elements
  const card = document.querySelector('.card');
  const result = document.querySelector('.result');

  // Insert the error after the submit btn
  card.insertBefore(errorDiv, result);
  
  // Clear the Error message
  setTimeout(clearError, 2000);

}

// Clear Error Div
function clearError() {
  document.querySelector('.alert').remove();
}