$(document).ready(function(){

  testData.init();
  activeNavClass.init();

});

var activeNavClass = {
  init: function () {

    // when li is clicked the menu list item gets background color #c00016
    $('ul.nav li').on('click', function () {
      $('ul.nav li').removeClass('active');
      $(this).addClass('active');
    });

  }
};




var testData = {
  init: function () {

//     var employees = [
//     {"firstName":"Mark", "lastName":"Moyer"},
//     {"firstName":"Anne", "lastName":"Peters"},
//     {"firstName":"Helga","lastName": "Moyer"}
// ];
//
//     var text = '{ "employees" : [' + '{ "firstName":"John" , "lastName":"Doe" },' +
//                                      '{ "firstName":"Anna" , "lastName":"Smith" },' +
//                                      '{ "firstName":"Peter" , "lastName":"Jones" } ]}';
//     var obj = JSON.parse(text);
//     document.getElementById("demo").innerHTML =
//       employees[0].firstName + " " + employees[0].lastName;

  }
}
