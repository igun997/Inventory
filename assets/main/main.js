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
  function table(columns=[],row=[],id) {
    thead = [];
    tbody = [];
    for (var i = 0; i < columns.length; i++) {
      thead[i] = "<th>"+columns[i]+"</th>";
    }
    for (var i = 0; i < row.length; i++) {
      tbody[i] = "<th>"+row[i]+"</th>";
    }
    cookingtable = [
      '<table class="table" id="'+id+'">',
      '<thead>',
      thead.join(""),
      '</thead>',
      '<tbody>',
      tbody.join(""),
      '</tbody>',
      '</table>'
    ];
    return cookingtable.join("");

  }
  function builder(input,button,id) {
    var inputboiler = [];
    for (var i = 0; i < input.length; i++) {
      if (input[i].value == undefined) {
        val = "";
      }else {
        val = input[i].value;
      }
      if (input[i].id == undefined) {
        ids = "";
      }else {
        ids = input[i].id;
      }
      if (input[i].step == undefined) {
        steps = "";
      }else {
        steps = "step='"+input[i].step+"'";
      }
      if (input[i].type == "select2") {
        temp = [
          '<div class="form-group">',
          '<label>'+input[i].label+'</label>',
          '<select class="form-control " id="'+ids+'" name="'+input[i].name+'" '+steps+'></select>',
          '</div>'
        ];
      }else if (input[i].type == "hidden") {
        temp = [
          '<div class="form-group">',
          '<input type="text" hidden id="'+ids+'" value="'+val+'" name="'+input[i].name+'">',
          '</div>'
        ];
      }else if (input[i].type == "disabled") {
        temp = [
          '<div class="form-group">',
          '<label>'+input[i].label+'</label>',
          '<input type="text" class="form-control" disabled id="'+ids+'" value="'+val+'">',
          '</div>'
        ];
      }else {
        temp = [
          '<div class="form-group">',
          '<label>'+input[i].label+'</label>',
          '<input class="form-control" type="'+input[i].type+'" id="'+ids+'" value="'+val+'" name="'+input[i].name+'" '+steps+'>',
          '</div>'
        ];
      }
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
