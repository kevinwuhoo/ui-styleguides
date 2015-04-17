$(function () {
  $('[data-toggle="tooltip"]').tooltip()

  // grid hover name fade
  $('.img-overlay-wrapper').hover(
  function() {
    $(this).find('.site-name').fadeOut('fast')
    $(this).find('.img-overlay').fadeOut('fast')
  }, function(){
    $(this).find('.site-name').fadeIn('fast')
    $(this).find('.img-overlay').fadeIn('fast')
  })

  // full screen nav hover
  $('.nav-text').hover(function(){
    $(this).css('background-color', $(this).data('color'))
  }, function() {
    if(!$(this).hasClass('js-scrollspy-bg-colored')) {
      $(this).css('background-color', 'transparent')
    }
  })

  $('.nav-wrapper').on('activate.bs.scrollspy', function (e) {
    $('.js-scrollspy-bg-colored').css('background-color', 'transparent')
    $('.js-scrollspy-bg-colored').removeClass('js-scrollspy-bg-colored')

    var $targetText = $(e.target).find('.nav-text')
    $targetText.css('background-color', $targetText.data('color'))
    $targetText.addClass('js-scrollspy-bg-colored')
  })
})
