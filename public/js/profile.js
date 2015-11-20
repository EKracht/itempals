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
}

function byeKitty(e){
  var $target = $(e.target);
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
  })
  .fail(function(err){
    console.log(err);
  })

}
//https://github.com/jfetter/stuffed/blob/master/public/js/main.js