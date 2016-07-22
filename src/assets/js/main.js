$(document).ready(function(){

  testData.init();

});

var testData = {
  init: function () {

    var employees = [
    {"firstName":"Mark", "lastName":"Moyer"},
    {"firstName":"Anne", "lastName":"Peters"},
    {"firstName":"Helga","lastName": "Moyer"}
];

    var text = '{ "employees" : [' + '{ "firstName":"John" , "lastName":"Doe" },' +
                                     '{ "firstName":"Anna" , "lastName":"Smith" },' +
                                     '{ "firstName":"Peter" , "lastName":"Jones" } ]}';
    var obj = JSON.parse(text);

    document.getElementById("demo").innerHTML =
      employees[0].firstName + " " + employees[0].lastName;


    // obj.name + "<br>" +
    // obj.street + "<br>" +
    // obj.phone;

  }
}
