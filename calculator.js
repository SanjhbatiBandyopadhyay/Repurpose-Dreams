function calculatePrice() {
    // Get selected waste type and weight
    let wasteType = document.getElementById("waste-type").value;
    let wasteWeight = parseFloat(document.getElementById("waste-weight").value);
  
    // Define price per kg for each waste type
    let pricePerKg = {
      plastic: 10,
      glass: 15,
      metal: 20,
      paper: 5
    };
  
    // Calculate total price
    if (isNaN(wasteWeight) || wasteWeight <= 0) {
      alert("Please enter a valid weight in kg.");
      return;
    }
  
    let totalPrice = wasteWeight * pricePerKg[wasteType];
  
    // Display the result
    document.getElementById("price-output").innerText = totalPrice.toFixed(2);
  }
  