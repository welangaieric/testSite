$(function(){
   // Sample data
const amounts = [10, 20, 15, 25, 30, 10, 15, 25];
const dates = ["2023-01-01", "2023-01-02", "2023-01-01", "2023-01-03", "2023-01-05", "2023-01-02", "2023-01-04", "2023-01-06"];
let finalamount = []
let finaldate = []
for(let i = 0;i<amounts.length;i+=2){
    finalamount.push(amounts[i])
    finaldate.push(dates[i])
}
console.log(finalamount)
console.log(finaldate)
// // Step 1: Create a dictionary to store sums
// const sums = {};

// // Step 2: Iterate through arrays, updating sums
// for (let i = 0; i < amounts.length; i++) {
//   const date = dates[i];
//   const amount = amounts[i];

//   if (sums[date]) {
//     sums[date] += amount;
//   } else {
//     sums[date] = amount;
//   }
// }

// // Step 3: Create a new array with unique dates and their summed amounts
// const uniqueDates = Object.keys(sums);
// const finalArray = uniqueDates.map(date => ({ date, amount: sums[date] }));

// // Step 4: Create the final array with dates in intervals of 6 days
// const finalResult = [];
// const startDate = new Date(uniqueDates[0]);
// const endDate = new Date(uniqueDates[uniqueDates.length - 1]);
// let currentDate = startDate;

// while (currentDate <= endDate) {
//   const currentDateStr = currentDate.toISOString().split('T')[0];
//   const foundEntry = finalArray.find(entry => entry.date === currentDateStr);

//   if (foundEntry) {
//     finalResult.push(foundEntry);
//   } else {
//     finalResult.push({ date: currentDateStr, amount: 0 });
//   }

//   currentDate.setDate(currentDate.getDate() + 6);
// }

// console.log(finalResult);

})