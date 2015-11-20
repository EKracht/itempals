"use strict";

$(document).ready(init);

function init() {
	$('.kittyPic').on('click', selectKitty);
	$('.yourKittyMat').on('click', moveYourKitty);
	$('.otherKittyMat').on('click', moveOtherKitty);
	$('#proposeTrade').on('click', proposeTrade);
}

function proposeTrade(e){
	console.log('button for propose');
	var $bigMat = $(e.target).parent().parent().parent();
	var $uKitty = $bigMat.find('.myKitty');
	var $oKitty = $bigMat.find('.otherKitty');
	var uId = $uKitty.data('id');
	var oId = $oKitty.data('id');
	var url = uId + 'FOR' + oId;
	
	$.ajax({
		type: "PUT",
		url: "/items",
		data: {tradeNumber: url}
	})
	.done(function(data){
		console.log(data);
	})
	.fail(function(err){
		console.log(err);
	})
}

function selectKitty(e){
	var $target = $(e.target).parent().parent();
	var isSelected = $target.hasClass('selected');

	if (isSelected) {
		$target.removeClass('selected');
	} else {
		$('.selected').removeClass('selected');
		$target.addClass('selected');
	}
}

function moveYourKitty(e){
	var $mat = $(e.target);
	var isCorrectClass = $('.selected').hasClass('myKitty');

	if (isCorrectClass) {
		var $selectedKitty = $('.selected').detach();
		$selectedKitty.removeClass('selected');
		$mat.prepend($selectedKitty)
	}
}

function moveOtherKitty(e){
	var $mat = $(e.target);
	var isCorrectClass = $('.selected').hasClass('otherKitty');

	if (isCorrectClass) {
		var $selectedKitty = $('.selected').detach();
		$selectedKitty.removeClass('selected');
		$mat.prepend($selectedKitty)
	}
}



// 	$(".myTradeItems").on('click', moveToTradeMat);
// 	$(".othersTradeItems").on('click', moveToTradeMat)
// 	$("#sendTrade").on('click', sendTrade);

// function moveToTradeMat(){
// 	//clear items off of for trade lists
// 	// and display them on the trade mat
// 	var item = $(this)// assuming this is the my trade Items
// 	if ($(this).hasClass(myTradeItems)){
// 		var $putHere = $("#myItem")
// 		var $grabHere = $(".myTradeItems")
// 	}else{
// 		var $grabHere = $(".othersTradeItems")
// 		var $putHere = $("#othersItem")
// 	}
// 	//this. delete from $grabHere
// 	//this. append to $putHere
// }

// function sendTrade(event){
// 	//clear items off of trade mat
// 	$("#myItem").empty();
// 	$("#othersItem").empty();
// 	// ajax request. put/update 
// 	 //in route:
// 		// change item.tradeable to false item.proposedInTrade to true -- used proposedInTrade field
// 		// to filter and populate the proposed trades area in user profile. 
// 		// on both item and user.items.findItemByIdAndUpdate item.tradeable item.proposedInTrade
// }