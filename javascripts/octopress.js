function renderDeliciousLinks(items) {
  var output = '<ul class="divided">';
  for (var i=0,l=items.length; i<l; i++) {
    output += '<li><a href="' + items[i].u + '" title="Tags: ' + (items[i].t == "" ? "" : items[i].t.join(', ')) + '">' + items[i].d + '</a></li>';
  }
  output += '</ul>';
  $('#delicious').html(output);
}


function getFlickrAlbum() {
	var flickrSlideshow = jQuery('div.hero');
	var flickrAlbum = jQuery(flickrSlideshow).data('flickr-set');
	var flickrUserId = jQuery(flickrSlideshow).data('flickr-id');

	var flickrUrl = "https://www.flickr.com/services/feeds/photoset.gne?set="+flickrAlbum+"&nsid="+flickrUserId+"&lang=en-us&format=json&jsoncallback=?";

	var flickrPic = 0;

	var flickrPicTitle = jQuery('div.credit p'); 

    $.getJSON(flickrUrl, function(data){
		
		$.each(data.items,function(){(new Image).src=this.media.m.replace('m.jpg', 'b.jpg')});
		
		setInterval(function() {
			flickrSlideshow.fadeOut("1000", function () {
				item = data.items[flickrPic];
				flickrSlideshow.css('background-image', 'url('+ item.media.m.replace('m.jpg', 'b.jpg') + ')').fadeIn(1000);
				flickrPicTitle.html("<a href='" + item.link + "' target='_new'>" + item.title +"</a>");
			});
			if (flickrPic < data.items.length-2) {
				flickrPic++;
			} else {
				flickrPic = 0;
			}
		}, 30000);

		
    });
	
}

jQuery(function(){
  var gravatarImage = jQuery('img.gravatar'),
      email         = jQuery(gravatarImage).data('gravatar');
  if (email) {
    jQuery(gravatarImage).attr({src: "http://www.gravatar.com/avatar/" + CryptoJS.MD5(email) + "?s=250"}).removeAttr('data-gravatar');
  };

	getFlickrAlbum();

});
