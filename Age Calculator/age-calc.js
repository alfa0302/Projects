const  dateInput = document.querySelector('.dob');
const calBtn = document.querySelector('.calBtn');
const today = new Date();


calBtn.addEventListener('click',()=>{

  const dob = new Date(dateInput.value);
  let ageYears = today.getFullYear() - dob.getFullYear();
  let ageMonths = today.getMonth() - dob.getMonth();
  let ageDays = today.getDate() - dob.getDate();

  if (ageDays < 0) {
    ageMonths--; // Decrement the month count
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // Borrow days from the previous month
}

// Adjust if months difference is negative
  if (ageMonths < 0) {
      ageYears--; // Decrement the year count
      ageMonths += 12; // Borrow months from the previous year
  }
if(dateInput.value){
  document.querySelector('.age').innerHTML = `You are <span>${ageYears}</span> years, <span>${ageMonths}</span> months and <span>${ageDays}</span> days old`
} 
})
