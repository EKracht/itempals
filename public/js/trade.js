"use strict";

$(document).ready(init);

function init() {
	$(".myTradeItems").on('click', moveToTradeMat);
	$(".othersTradeItems").on('click', moveToTradeMat)
	$("#sendTrade").on('click', sendTrade);
}

function moveToTradeMat(){
	//clear items off of for trade lists
	// and display them on the trade mat
	var item = $(this)// assuming this is the my trade Items
	if ($(this).hasClass(myTradeItems)){
		var $putHere = $("#myItem")
		var $grabHere = $(".myTradeItems")
	}else{
		var $grabHere = $(".othersTradeItems")
		var $putHere = $("#othersItem")
	}
	//this. delete from $grabHere
	//this. append to $putHere
}

function sendTrade(event){
	//clear items off of trade mat
	$("#myItem").empty();
	$("#othersItem").empty();
	// ajax request. put/update 
	 //in route:
		// change item.tradeable to false item.proposedInTrade to true -- used proposedInTrade field
		// to filter and populate the proposed trades area in user profile. 
		// on both item and user.items.findItemByIdAndUpdate item.tradeable item.proposedInTrade
}