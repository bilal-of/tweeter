$(document).ready(function() {
  $("textarea").keyup(update);
  $("textarea").keydown(update);
  function update() {
    let max = 140; 
    let length = $(this).val().length; 
    $('.counter').text(max - length); 
    if (length > max) {  
      $(".counter").addClass('red');
    } 
  }
});