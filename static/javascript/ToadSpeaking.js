function ToadSpeaking(speach){
	var options = {
			strings: speach,
			typeSpeed: 0,
            showCursor: false,
            backDelay: 500,
            contentType: 'html',
			callback: function(){
				var x = $('#story').text();
				$('#help-text').html('');
				$('#help-text').append('<span id="story">'+x+'</span>');
				window[term].resume();

			}
		};
	$('#story').text('');
	$('#story').typed(options);
};