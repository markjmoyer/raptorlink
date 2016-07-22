/**
 * Initialize State Indicator
 * Adds a class to the BODY that indicates if the UI should render as Desktop,
 * Tablet or Mobile view.
 *
 */
setState = function(){

  $('body').restive({

    breakpoints: ['767','1024','10000'],
    classes: ['mobile','tablet','desktop'],
    turbo_classes: 'is_portrait=portrait,is_landscape=landscape,is_retina=retina,is_tv=tv',
    force_dip: true

  });

};

/**
 * Initialize functions on document ready
 *
 */
$(document)
  .ready(function(){
    setState();
  });
