function renderDeliciousLinks(items) {
  var output = '<ul class="divided">';
  for (var i=0,l=items.length; i<l; i++) {
    output += '<li><a href="' + items[i].u + '" title="Tags: ' + (items[i].t == "" ? "" : items[i].t.join(', ')) + '">' + items[i].d + '</a></li>';
  }
  output += '</ul>';
  $('#delicious').html(output);
}

function isMobileDevice() {
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		return true;
	}
	return false;
}

function changeFlickrPic(flickrSlideshow, item) {
	var flickrPicTitle = jQuery('div.credit p'); 
	var flickrPic = item.media.m;

	if(!isMobileDevice()) flickrPic = item.media.m.replace('m.jpg', 'b.jpg');

	flickrSlideshow.fadeOut("1000", function () {
		flickrSlideshow.css('background-image', 'url('+ flickrPic + ')').fadeIn(1000);
		flickrPicTitle.html("<a href='" + item.link + "' target='_new'>" + item.title +"</a>");
	});
}

function getFlickrAlbum() {
	var flickrSlideshow = jQuery('div.hero');
	var flickrAlbum = jQuery(flickrSlideshow).data('flickr-set');
	var flickrUserId = jQuery(flickrSlideshow).data('flickr-id');

	var flickrUrl = "https://www.flickr.com/services/feeds/photoset.gne?set="+flickrAlbum+"&nsid="+flickrUserId+"&lang=en-us&format=json&jsoncallback=?";

    $.getJSON(flickrUrl, function(data){
		var flickrPic = Math.floor(Math.random() * data.items.length); 
		var i = 0;
		
		$.each(data.items,function(){
			var image = new Image();
			if(isMobileDevice()) {
				image.src=this.media.m.replace('m.jpg', 'b.jpg')
			} else {
				image.src=this.media.m;
			}
			if (i==flickrPic) {
				image.onload = function() {
					changeFlickrPic(flickrSlideshow, data.items[flickrPic]);
				}	
			}
			i++;
		});
		
		setInterval(function() {
			flickrPic = Math.floor(Math.random() * data.items.length); 
			changeFlickrPic(flickrSlideshow, data.items[flickrPic]);
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
