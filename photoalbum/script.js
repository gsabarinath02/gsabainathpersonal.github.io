const toggle = document.getElementById('toggle');

toggle.addEventListener('change', function() {
  if (this.checked) {
    // switch to grayscale mode
  } else {
    // switch to color mode
  }
});

const photos = document.querySelectorAll('.photo');

toggle.addEventListener('change', function() {
  if (this.checked) {
    photos.forEach(photo => photo.style.filter = 'grayscale(100%)');
  } else {
    photos.forEach(photo => photo.style.filter = 'none');
  }
  
});
