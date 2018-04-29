  console.log("Main Scripts");
  function get(url, data = {}) {
    var d = [];
    $.ajax({
        async: false,
        url: url,
        type: 'GET',
        dataType: 'JSON',
        data: data
      })
      .done(function(a) {
        console.log(a);
        d = a;
      })
      .fail(function() {
        return false;
      })
      .always(function() {
        console.log("complete");
      });
    return d;
  }
  function post(url, data = {}) {
    var d = [];
    $.ajax({
        async: false,
        url: url,
        type: 'POST',
        dataType: 'JSON',
        data: data
      })
      .done(function(a) {
        d = a;
      })
      .fail(function() {
        return false;
      })
      .always(function() {
        console.log("complete");
      });
    return d;
  }
  function test() {
    console.log("Just Test");
  }
  function builder(input,button,id) {
    var inputboiler = [];
    for (var i = 0; i < input.length; i++) {
      temp = [
        '<div class="form-group">',
        '<label>'+input[i].label+'</label>',
        '<input class="form-control" type="'+input[i].type+'" value="'+input[i].value+'" name="'+input[i].name+'">',
        '</div>'
      ];
      inputboiler[i] = temp.join("");
    }
    indexinput = inputboiler.length;
    buttontemp = [
      '<div class="form-group">',
      '<button class="btn btn-'+button.class+'" type="'+button.type+'">'+button.name+'</button>',
      '</div>'
    ];
    inputboiler[indexinput] = buttontemp.join("");
    cookinginput = inputboiler.join("");
    cookingform = [
      '<form method="post" onsubmit="return false" id="'+id+'">',
      cookinginput,
      '</form>'
    ];
    return cookingform.join("");
  }
