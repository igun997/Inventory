$(document).ready(function() {
  $.getScript(base_url+"assets/main/main.js")
  .done(function( script, textStatus ) {
    
  })
  .fail(function( jqxhr, settings, exception ) {
    swal("Error","Failed to Get Main Scripts","error");
  });
});
