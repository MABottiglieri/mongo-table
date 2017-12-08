var dbDocs = { clients : [], urls : [], campains : [] };
var statusList = ['active','expired','suspended','canceled']; //genera checkbox group
var headers = ['Client','Order','OriginalUrl','ShortUrl','Package','Multiplier','Allowed','Forbidden','Created','Status']; //genera menù tendina
var table = { columns : [], data : [] };

$(document).ready(function(){
  console.log('start');
  $.fn.bootstrapTable.columnDefaults.sortable=true;
  setTableHeaders(table,headers);

  getDocs("clients",function(){
    getDocs("campains",function(){
      getDocs("urls",function(){
        console.log("dbDocs: ",dbDocs);

        setTableRows();
        $('#table').bootstrapTable(table);
      });
    });
  });

  $('#button-refresh').attr('onClick', 'refreshColumns(headers)');
  $('#button-backgroundColor').attr('onClick', 'setBackgroundColor()');
  setDropdownMenu('#dropdown-menu-columns',headers);
  setCheckboxMenu('#filter-checkbox',statusList);
  setFilterGeneral('#filter-general');
});
function setBackgroundColor(){
  $("#table > tbody > tr:contains('active')").toggleClass("green");
  $("#table > tbody > tr:contains('expired')").toggleClass("orange");
  $("#table > tbody > tr:contains('suspended')").toggleClass("yellow");
  $("#table > tbody > tr:contains('canceled')").toggleClass("red");

  $('#filter-checkbox > label > input[name="active"]').parent().toggleClass("green");
  $('#filter-checkbox > label > input[name="expired"]').parent().toggleClass("orange");
  $('#filter-checkbox > label > input[name="suspended"]').parent().toggleClass("yellow");
  $('#filter-checkbox > label > input[name="canceled"]').parent().toggleClass("red");
};
function setTableRows(){
  console.log("dbDocs.urls:",dbDocs.urls);
  dbDocs.urls.forEach(function(url){
    //url.createdAt = url.createdAt.split(".")[0].split("T").join(" ").split("-").join("/"); //formattazione della data
    var thisCampain = dbDocs.campains.filter(function(campaign){return campaign._id == url.campaign })[0];
    var thisClient = dbDocs.clients.filter(function(client){return client._id == thisCampain.client })[0];

    var thisRow = {
      Client: thisClient.name,
      Order: thisCampain.order,
      OriginalUrl: url.url,
      ShortUrl:url.shortUrl,
      Package:thisCampain.package.name,
      Multiplier:url.multiplier,
      Allowed:thisCampain.package.allowed,
      Forbidden:thisCampain.package.forbidden,
      Created:url.createdAt,
      Status:url.status
    };

    table.data.push(thisRow); console.log("thisRow: ",thisRow);
  })
};
function setFilterCheckbox(checkbox){
  checkbox.checked ? $("#table > tbody > tr:contains('"+checkbox.name+"')").show() : $("#table > tbody > tr:contains('"+checkbox.name+"')").hide();
};
function setFilterGeneral(id){
  $(id).keyup(function () {
    var text = $(this).val(); console.log(text);
    var LowerText = text.toLowerCase(); console.log(LowerText);
    var UpperText = text.toUpperCase(); console.log(UpperText);
    var CapitalizedText = LowerText.substr(0,1).toUpperCase()+LowerText.substr(1); console.log(CapitalizedText);

    if( text == ""){ $('#table > tbody > tr').show() }
    else {
      $('#table > tbody > tr').hide();

      $("#table > tbody > tr:contains('"+text+"')").show();
      $("#table > tbody > tr:contains('"+LowerText+"')").show();
      $("#table > tbody > tr:contains('"+UpperText+"')").show();
      $("#table > tbody > tr:contains('"+CapitalizedText+"')").show();
    };
  });
};
function getDocs(collection, callback){
  $.getJSON( "/"+collection, function( data ) {
    dbDocs[collection] = data.docs;
    callback(collection);
  });
};
function setTableHeaders(table,list){
  list.forEach(function(e){
    table.columns.push({ field: e, title: e });
  });
};
function setCheckboxMenu(id,list){
  list.forEach(function(e){
    var checkbox = '<label class="checkbox-inline"><input type="checkbox" checked="true" name="'+e+'">'+e+'</label>';
    $(id).append(checkbox);
    $('#filter-checkbox > label > input[name="'+e+'"]').attr('onchange', 'setFilterCheckbox(this)');
  });
};
function setDropdownMenu(id,list){
  list.forEach(function(e,index){
    var li = [
      '<li role="menuitem">',
      '<label><input type="checkbox" name="'+e+'" value="'+index+'" checked="checked">'+e+'</label>',
      '</li>'
    ].join("\n");
    $(id).append(li);
    $('#dropdown-menu-columns > li > label > input[name="'+e+'"]').attr('onchange', 'setCheckedVisibility(this)');
  });
};
function setCheckedVisibility(checkbox){
  checkbox.checked ? $('#table').bootstrapTable('showColumn', checkbox.name):$('#table').bootstrapTable('hideColumn', checkbox.name);
  $("#menu-columns").click();
};
function refreshColumns(list){
  list.forEach(function(e,index){
    $('#dropdown-menu-columns > li > label > input[name="'+e+'"]')[0].checked ? console.log("ok"): $('#dropdown-menu-columns > li > label > input[name="'+e+'"]').click();
  });
};
//$('.searchable tr').hide();
//$('.searchable tr').show();

//$('#table').bootstrapTable('hideRow', {index:1});
//$('#table').bootstrapTable('showRow', {index:1});

//$('#table').bootstrapTable('showColumn', 'name');
//$('#table').bootstrapTable('hideColumn', 'name');

//$('#table').bootstrapTable('refresh');
//$('#table').bootstrapTable('filterBy', { stars: ["star 1","star 2"] }); ///// non funziona
