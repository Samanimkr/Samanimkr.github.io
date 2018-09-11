//Nav Link To: #Home
$(".nav_links a:nth-of-type(1)").click(function() {
    $('html,body').animate({scrollTop: $("#home").offset().top},'slow');
});
//Nav Link To: #Portfolio
$(".nav_links a:nth-of-type(2)").click(function() {
    $('html,body').animate({scrollTop: $("#portfolio").offset().top},'slow');
});
//Nav Link To: #Contact
$(".nav_links a:nth-of-type(3)").click(function() {
    $('html,body').animate({scrollTop: $("#contact").offset().top},'slow');
});
//button link to: #Contact
$("#hire").click(function() {
    $('html,body').animate({scrollTop: $("#contact").offset().top},'slow');
});
