/* Fetching projects on document load by making an ajax call */
$(document).ready(function(){
	$.ajax({
	    url: "/projects?page=1",
	    type: "GET",

	    success: function(data) {
	        populate(data); 
	    }
	});
});

/* Pagination support implemented using twbsPagination */
/* Pagination plugin logic implemented as follows */
$(function () {
    var obj = $('#pagination').twbsPagination({
        totalPages: 418,
        visiblePages: 3,
        onPageClick: function (event, page) {
            $('.page-content').text('Page ' + page);
        }
    });
});

/* Loading projects data in a card using jQuery */ 
/* Making ajax call to api from client side */
function populate(data) {
    var html_append="";
    var count="";
	$('.loader-wrapper').hide();
    $('.to-top').css('display','flex');
    $('.to-bottom').css('display','flex');
    $('.project-count-per-page').css('display','flex');
    $('.grid-wrapper').css('display','grid');
    $('.grid-wrapper').css('grid-template-rows','repeat('+data.per_page/4+', 1fr)');
    $('.page-navigation').show();
    if($(window).width() >= 768 && $(window).width() < 1200)
    {
        $('.grid-wrapper').css('grid-template-rows','repeat('+data.per_page/3+', 1fr)');
    }
    if($(window).width() >= 576 && $(window).width() < 768)
    {
        $('.grid-wrapper').css('grid-template-rows','repeat('+data.per_page/2+', 1fr)');
    }
    if($(window).width() < 576)
    {
        $('.grid-wrapper').css('grid-template-rows','repeat('+data.per_page+', 1fr)');
    }
    
	for (var i = 0; i<data.per_page; i++) {
        /* Creating a card for each project */
        html_append += "<div class='card'>";
        if(data.projects[i].image_url)
        html_append += "<img class='card-img-top' src='"+data.projects[i].image_url+"' alt='No image'></img>";
        else
        html_append += "<img class='card-img-top' src='Default.png' alt='No image'></img>";
        html_append += "<div class='card-body'>";
		html_append += "<h5 class='card-title'>"+data.projects[i].name+"</h5>";
        html_append += "<p class='card-text data'>" + data.projects[i].summary + "</p>";      
        html_append += "<div class='card-text owner'>Owner ID : ";
        html_append += "<div class='project-owner'>" + data.projects[i].owner_id;
        html_append += "<div class='tooltip'><div class='owner-data'>";
        html_append += "<p class='tooltip-text'>Fetching the owner details ...</p>";
        html_append += "<div class='tooltip-loader'></div>";
        html_append += "</div></div></div></div>";
        html_append += "<div class='grid-stats'>"
        html_append += "<i class='fa fa-comment' title='Comments'></i><p class='card-text stats'>" + data.projects[i].comments + " </p>";
        html_append += "<i class='fa fa-users' title='Followers'></i><p class='card-text stats'>" + data.projects[i].followers + " </p>";
        html_append += "<img src='https://dev.hackaday.io/img/logo.svg' title='Skulls' class='skulls-logo' width='18px' height='18px'><p class='card-text stats'>";
        html_append += data.projects[i].skulls + " </p>";
        html_append += "<i class='fa fa-eye' title='Views'></i><p class='card-text stats'>" + data.projects[i].views + " </p>";
        html_append += "</div></div></div>";
    }
    /* Appending data from Javascript to respective element in Html */
    count = "<div class='project-count-data'><p>Showing Projects: "+((data.page-1)*50+1)+" to "+((data.page-1)*50+data.per_page)+"</p></div>";
    $('.project-count-per-page').html(count);   
	$('.grid-wrapper').append(html_append);   

    /* Handling owner details by jQuery */
    /* Implemented mouseenter and mouseleave jQuery to implement the tooltip */
    $('.project-owner').mouseenter(function() {
        html_append = "";
        var apikey = "N1eKqagx67HWl1wn";
        var owner_id = $(this).clone().children().remove().end().text();
        var owner_url = "http://api.hackaday.io/v1/users/" + owner_id + "?api_key=" + apikey;
        
        $.ajax({
            url: owner_url,
            type: "GET",

            success: function(data) {
                $('.tooltip-text').hide();
                $('.tooltip-loader').hide();
                /* Creating a modal-type view for owner data on mouse hover */
                html_append += "<div class='to-empty'>";
                html_append += "<div class='owner-text'><b>Username:</b> " + data.username + "</div>";
                html_append += "<div class='owner-text'><b>Screen Name:</b> " + data.screen_name + "</div>";
                html_append += "<div class='owner-text'><b>About me:</b> " + data.about_me + "</div>";
                html_append += "<div class='owner-text'><i class='fa fa-map-marker' title='Location'></i> " + data.location + "</div>";
                html_append += "<div class='owner-stats'>"
                html_append += "<div class='owner-text'><i class='fa fa-code-fork' title='Projects'></i> " + data.projects + "</div>";
                html_append += "<div class='owner-text'><img src='https://dev.hackaday.io/img/logo.svg' title='Skulls' class='skulls-logo' width='18px' height='18px'> " + data.skulls + "</div>";
                html_append += "<div class='owner-text'><i class='fa fa-users' title='Followers'></i> " + data.followers + "</div>";
                html_append += "</div></div>";
    
                $('.owner-data').append(html_append);
            }
         });
    });

    $('.project-owner').mouseleave(function() {
        $('.to-empty').remove();
        $('.tooltip-text').show();
        $('.tooltip-loader').show();
    });
}

/* Pagination Logic */
$(document).on('click', '.page-item', function(e){
    var page = $('.page-item.active').text(); 
    $('.grid-wrapper').css('display','none');
    $('.to-top').css('display','none');
    $('.to-bottom').css('display','none');
    $('.project-count-per-page').css('display','none');
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    $('.loader-wrapper').show();
    $('.page-navigation').hide();
    $('.grid-wrapper').empty();
    $.ajax({
        url: "/projects?page=" + page,
        type: "GET",

        success: function(data) {
            console.log(data);
            populate(data);
        }
     });
});

/* Scroll to top on projects load */
$(document).on('click', '.to-top', function(e){
    $('html, body').animate({ scrollTop: 0 }, 3000);
});

/* Scroll to bottom on projects load */
$(document).on('click', '.to-bottom', function(e){
    $('html, body').animate({ scrollTop: $(document).height() }, 3000);
});