'use strict';

$(document).ready(init);

function init(){
  var cookie = document.cookie;
  var profile = {};
  profile.name = $('#nameInput').val();
  profile.email = $('#emailInput').val();
  profile.picture = $('#urlInput').val();

  var arr = cookie.split(" ");
  profile._id = arr[1].slice(7);
  var userId = profile._id;

  $.get('/profile/profileInfo')
  .done(function(data){
    $("#username").text(data.username);
    $("#name").text(data.name);
    $("#email").text(data.email);
    $("#picture").attr('src', data.picture);
  })
  .fail(function(error){
  })
  $('.byeKitty').on('click', byeKitty);
  $('.tradeKitty').on('click', tradeKitty);
  $(".accept").on("click", acceptTrade);
  $(".decline").on("click", declineTrade);
}

function acceptTrade(){
  console.log("trade accepted")
  //put request to route to update both users and swap owner field from 
  // one to the other
}

function declineTrade(){
  console.log("trade declined");
  //put request to clear out the trade number and change the up for trade to false
}

function tradeKitty(e){
  var $target = $(e.target)
  $target.parent().toggleClass("trade");
  var kittyId = $target.data('id');
  $.ajax({
    type: "PUT",
    url: "/items",
    data: {kittyId: kittyId}
  })
  .done(function(data){
    location.reload();
    console.log('worked');
  })
  .fail(function(err){
    location.reload();
    console.log('bad');
  });
}




function byeKitty(e){
  var $target = $(e.target);
 debugger;
  var kittyId = $target.data('id');
  $.ajax({
    type: "DELETE",
    url: "/items",
    data: {kittyId: kittyId}
  })
  .done(function(data){
    console.log(data);
  })
  .fail(function(err){
    console.log(err);
  });

  $.ajax({
    type: "DELETE",
    url: "/profile",
    data: {kittyId: kittyId}
  })
  .done(function(data){
    console.log(data);
    location.reload();
  })
  .fail(function(err){
    console.log(err);
    location.reload();
  })

}
//https://github.com/jfetter/stuffed/blob/master/public/js/main.js