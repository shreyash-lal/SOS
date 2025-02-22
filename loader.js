function showLoader() {
    document.getElementById('loader').style.display = 'flex';
  }
  
  function hideLoader() {
    document.getElementById('loader').style.display = 'none';
  }
  
  // Example of when to show/hide the loader
  showLoader();  // Show the loader
  setTimeout(hideLoader, 3000);