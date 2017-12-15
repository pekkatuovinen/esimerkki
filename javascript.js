$("#personalcodeform").submit(function() {
	var formData = new FormData($('#personalcodeform')[0]);
	//var editorText = CKEDITOR.instances.texteditor1.getData();
	//formData.append('editor1', editorText);
	var url = "loginform.php";

	$.ajax({
			type: "POST",
			url: url,
			enctype: 'multipart/form-data',
			dataType: "json",
			//data: $("#registerform").serialize(),
			success: function(data){
				obj = JSON.parse(JSON.stringify(data));
				$(obj).each(function(index, value){
					var error = value.error;
					var user = value.user;
					
					if( error ){
						grecaptcha.reset();
						alert(error);
					}else if( user ){
						$('#personalcodeform')[0].reset();
						location.assign(user);
					}
				});
			},
			data: formData,
			cache: false,
			contentType: false,
			processData: false
		 });

	return false;
});

$("#feedbackform").submit(function() {
	var formData = new FormData($('#feedbackform')[0]);
	//var editorText = CKEDITOR.instances.texteditor1.getData();
	//formData.append('editor1', editorText);
	var url = "contactform.php";

	$.ajax({
			type: "POST",
			url: url,/*
			enctype: 'multipart/form-data',*/
			dataType: "json",
			//data: $("#registerform").serialize(),
			success: function(data){
				obj = JSON.parse(JSON.stringify(data));
				$(obj).each(function(index, value){
					var error = value.error;
					var done = value.done;
					
					if( error ){
						alert(error);
					}else if( done ){
						$('#feedbackform')[0].reset();
						alert(done);
					}
				});
			},
			data: formData,
			cache: false,
			contentType: false,
			processData: false
		 });

	return false;
});

$("#requestform").submit(function() {
	var formData = new FormData($('#requestform')[0]);
	//var editorText = CKEDITOR.instances.texteditor1.getData();
	//formData.append('editor1', editorText);
	var url = "askform.php";

	$.ajax({
			type: "POST",
			url: url,/*
			enctype: 'multipart/form-data',*/
			dataType: "json",
			//data: $("#registerform").serialize(),
			success: function(data){
				obj = JSON.parse(JSON.stringify(data));
				$(obj).each(function(index, value){
					var error = value.error;
					var done = value.done;
					
					if( error ){
						alert(error);
					}else if( done ){
						$('#requestform')[0].reset();
						alert(done);
					}
				});
			},
			data: formData,
			cache: false,
			contentType: false,
			processData: false
		 });

	return false;
});

$(".showhideextras").on("click", function(){
	$(".customerimage_inner_extra_thumbs").slideToggle(2000, 'easeOutCubic', function(){
		if( $(".customerimage_inner_extra_thumbs").is(":visible") ){
			$(".showhideextras").text("Piilota tunnelmakuvat");
		}else{
			$(".showhideextras").text("Näytä tunnelmakuvat");
		}
	});
});



var timeleft = 0;
var alv = 0;
var total = 0;
var sumtotal = 0;
var monelle = "";
var allsele = "";
var allselected = true;
	
function updateStuff(){
	alv = 0;
	total = 0;
	totalfull = 0;
	sumtotal = 0;
	monelle = "";
	allsele = "";
	
	$(".imageselections:checked").each(function(){
		//console.debug($(this));
		total = parseFloat(total) + parseFloat($(this).attr("value"));
		allsele = allsele + $(this).attr("name") + ";";
		total = total.toFixed(2);
	});
	
	$(".imageselections").each(function(){
		
		totalfull = parseFloat(totalfull) + parseFloat($(this).attr("value"));
		totalfull = totalfull.toFixed(2);
	});
	
	if( total == 0 ){
		$(".hideable").fadeOut();
		return false;
	}else{
		$(".hideable").fadeIn();
	}
	
	$("#customerselected").val(allsele);
	
	var checkedlength = $(".imageselections:checked").length;
	
	if(checkedlength == 8 ){
		monelle = "kahdeksalle";
	}else if(checkedlength == 7 ){
		monelle = "seitsemälle";
	}else if(checkedlength == 6 ){
		monelle = "kuudelle";
	}else if(checkedlength == 5 ){
		monelle = "viidelle";
	}else if(checkedlength == 4 ){
		monelle = "neljälle";
	}else if(checkedlength == 3 ){
		monelle = "kolmelle";
	}else if(checkedlength == 2 ){
		monelle = "kahdelle";
	}else if(checkedlength == 1 ){
		monelle = "";
	}
	
	$("#sel_howmany").text(" "+ monelle +" ");
	$("#sel_howmanyorder").text(" "+ monelle +" ");
	
	
	if(checkedlength ==  $(".imageselections").length ){
		allselected = true;
		$("#alldiscountleft, #alldiscountright").removeClass("overline");
		$("#alldiscountleftorder, #alldiscountrightorder").removeClass("overline");
		
	}else{
		allselected = false;
		$("#alldiscountleft, #alldiscountright").addClass("overline");
		$("#alldiscountleftorder, #alldiscountrightorder").addClass("overline");
	}
	
	if( allselected == true ){
		sumtotal = parseFloat(total) * 0.8;
	}else{
		sumtotal = parseFloat(total);
	}
	
	if( timeleft > 0 ){
		sumtotal = parseFloat(sumtotal) * 0.7;
		$("#timediscountleft, #timediscountright").removeClass("overline");
		$("#timediscountrow").removeClass("hidden");
		$("#alvrow").removeClass("lightgraybackground");
		
		$("#timediscountleftorder, #timediscountrightorder").removeClass("overline");
		$("#timediscountroworder").removeClass("hidden");
		$("#alvroworder").removeClass("lightgraybackground");
		
	}else{
		$("#timediscountleft, #timediscountright").addClass("overline");
		$("#timediscountrow").addClass("hidden");
		$("#alvrow").addClass("lightgraybackground");
		
		$("#timediscountleftorder, #timediscountrightorder").addClass("overline");
		$("#timediscountroworder").addClass("hidden");
		$("#alvroworder").addClass("lightgraybackground");
	}
	alv = sumtotal - (sumtotal/1.24);
	alv = alv.toFixed(2);
	sumtotal = sumtotal.toFixed(2);
	
	$("#sel_howmuchalv").text(alv.replace(".", ",") + " €");
	$("#sel_howmuch").text(total.replace(".", ","));
	$("#sel_howmuchtotal").text(sumtotal.replace(".", ",") + " €");
	
	$("#sel_howmuchalvorder").text(alv.replace(".", ",") + " €");
	$("#sel_howmuchorder").text(total.replace(".", ","));
	$("#sel_howmuchtotalorder").text(sumtotal.replace(".", ",") + " €");
	
	if( ( timeleft > 0 || allselected == true ) && total != 0 ){
		//console.log("sumtotal:"+sumtotal+" totalfull:"+totalfull);
		var eachprice = sumtotal / checkedlength;
		eachprice = eachprice.toFixed(2);
		eachprice = eachprice.replace(".", ",") + " €";
		$("#imageselectionform .discountedprice").text( eachprice );
		$("#imageselectionform .icr-text").addClass( "overlined" );
		
	}else{
		$("#imageselectionform .discountedprice").css( "display", "none" );
		$("#imageselectionform .icr-text").removeClass( "overlined" );
	}
}

function topScrolledShiiitz(){
	if($(window).scrollTop() >= 150){
		//$("#top").addClass("scrolled");
		$('#scrollToBottom').fadeOut(200,function(){
			$('#scrollToTop').fadeIn(200);
		});
		
	}else{
		//$("#top").removeClass("scrolled");
		$('#scrollToTop').fadeOut(200,function(){
			$('#scrollToBottom').fadeIn(200);
		});
	}
}
$(document).on("ready", function(){
	//var height = $(window).height();
	//var scrollTop = $(window).scrollTop();
	//console.log($(window).scrollTop());
	topScrolledShiiitz();
	
	$(window).on("scroll", function(){
		topScrolledShiiitz();
	});
	
	$('#scrollToTop').on("click", function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});
	
	$('#scrollToBottom').on("click", function(){
		$('html, body').animate({scrollTop : $(document).height()},800);
		return false;
	});
	
	initializeClock($("#cd").val(), $("#tn").val());
});


function getTimeRemaining(endtime, timenow){
  var t = Date.parse(endtime) - new Date().getTime();
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}


function initializeClock(endtime, timenow){
	
	var clock = $("#sel_howquicktime");
	var clock2 = $("#sel_howquicktimeorder");
	
	if(timenow && endtime){
		function updateClock(){
			var t = getTimeRemaining(endtime, timenow);
			var hours = ('0' + t.hours).slice(-2);
			var minutes = ('0' + t.minutes).slice(-2);
			var seconds = ('0' + t.seconds).slice(-2);
			
			clock.html(hours + ":" + minutes + ":" + seconds);
			//clock2.html(hours + ":" + minutes + ":" + seconds);
			//clock.children('#hours').html(hours + ":");
			//clock.children('#minutes').html(minutes + ":");
			//clock.children('#seconds').html(seconds);
			//console.log(t.total);
			if(t.total<=0){
				timeleft = 0;
				clock.html("");
				clock2.html("");
				clearInterval(timeinterval);
			}else{
				timeleft = 1;
			}
		}
		updateClock(); // run function once at first to avoid delay
		var timeinterval = setInterval(updateClock,1000);
	}
}
