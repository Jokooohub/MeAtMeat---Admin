// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Beef", "Pork", "Chicken", "Lamb", "Duck", "Turkey", "Rabbit", "Frozen Food"],
    datasets: [{
      data: [25, 20, 15, 10, 8, 7, 5, 10], // Sample data
      backgroundColor: [
        '#FF6384', // Beef
        '#36A2EB', // Pork
        '#FFCE56', // Chicken
        '#4BC0C0', // Lamb
        '#9966FF', // Duck
        '#FF9F40', // Turkey
        '#8B0000', // Rabbit (New Color)
        '#36A2EB'  // Frozen Food
      ],
      hoverBackgroundColor: [
        '#FF4364', // Beef
        '#2E92CB', // Pork
        '#EFAE36', // Chicken
        '#3BA0A0', // Lamb
        '#8856DF', // Duck
        '#E98F30', // Turkey
        '#6B0000', // Rabbit (Darker Shade for Hover)
        '#2E92CB'  // Frozen Food
      ],
      hoverBorderColor: "rgba(234, 236, 244, 1)"
    }]    
    
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});
