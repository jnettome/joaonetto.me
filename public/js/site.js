$(function() {
  var s_requested = (window.location.href).split("/#/"),
      _sections = new Array(),
      _current_section = '';

  /* register each section in _sections array, with the top offset of section */
  $('.page-section').each(function(i) {
    section_name = $(this).attr('id');
    var target_section = $('#'+section_name),
        target_offset = target_section.offset(),
        target_top = target_offset.top;
    eval('_sections["'+section_name+'"] = '+target_top+';');
  });

  /* navigate to registered sections */
  var site_navigate_to = function(section_name) {
    if(typeof(_sections[section_name]) != 'undefined') {
      $('html,body').animate({ scrollTop:_sections[section_name] }, 750);
    }
  };
  
  /* change site navigation style in menu anchors */
  $('.navbar a').live('click', function(e) { if(pieces = ($(this).attr('href')).split("/#/")) { site_navigate_to(pieces[1]); } });
  
  /* when user scrolls the page, finds current section */
  var scroll_trigger = function(e) {
    currentX = (e.currentTarget.pageYOffset + ($('.navbar').height() / 2));
    /* change nav color if needed */
    if(currentX >= parseInt(_sections['work'])) { $('.navbar').addClass('white'); } else { $('.navbar').removeClass('white'); }
    
    /* change url if needed */
    if(currentX < parseInt(_sections['work'])
      && !(new RegExp("/#/home")).test(window.location.href)) { window.location.href = '/#/home'; _current_section = 'home'; }
    else if(currentX >= parseInt(_sections['work'])
      && currentX < parseInt(_sections['blog'])
      && !(new RegExp("/#/work")).test(window.location.href)) { window.location.href = '/#/work'; _current_section = 'work'; }
    else if(currentX >= parseInt(_sections['blog'])
      && currentX < parseInt(_sections['contact'])
      && !(new RegExp("/#/blog")).test(window.location.href)) { window.location.href = '/#/blog'; _current_section = 'blog'; }
    else if(currentX >= parseInt(_sections['contact'])
      && !(new RegExp("/#/contact")).test(window.location.href)) { window.location.href = '/#/contact'; _current_section = 'contact'; }
  }
  $(window).bind('scroll', scroll_trigger);
  
  /* if requested url has a section, navigate to that */
  if(s_requested.length > 0) { site_navigate_to(s_requested[1]); }
  
  /* home section - cycle */
  var _home_cycle = {
    before: function(current, next) { $(current).parent().animate({ width:$(next).outerWidth() }, 300); },
    fx:'scrollVert',
    random:1,
    timeout:3000,
    speed:500,
    nowrap:1
  };
  $('#slider-code .slider').cycle(_home_cycle);
  $('#slider-adj .slider').cycle(_home_cycle);
  $('#slider-prod .slider').cycle(_home_cycle);
  
  /* work section - image slider */
  if($('#work .job-media')) {
    $('#work .job-media').hover(function() {
      $(this).find('.navigation a').animate({ marginLeft:510, opacity:1 }, 200);
      }, function() {
      $(this).find('.navigation a').animate({ marginLeft:0, opacity:0 }, 300);
    });
    $('.job-slides li a').cycle({ fx:'fade', speed:'fast', timeout:0, next:'.nav-right', prev:'.nav-left' });
  }
  
  var __a = {
    before: function(current, next) { $(current).parent().animate({ width:$(next).outerWidth() }, 100, 'linear'); },
    fx:'scrollDown', random:0, slideExpr:'span', speed:300, prev:$('#slider-contact-first .prev'), next:$('#slider-contact-first .next')
  }, __c = {
    before: function(current, next) { $(current).parent().animate({ width:$(next).outerWidth() }, 100, 'linear'); },
    fx:'scrollDown', random:0, slideExpr:'span', speed:300, prev:$('#slider-contact-third .prev'), next:$('#slider-contact-third .next')
  };
  $('#slider-contact-first .slider').cycle(__a).cycle('pause');
  $('#slider-contact-third .slider').cycle(__c).cycle('pause');
});