'use strict';

$(document).ready(init);

function init(){
  $('#cancel').on('click', cancel);
  $('#saveProfile').on('click', saveProfile);
  $("#items").on("click", addItemToUser);
}

function addItemToUser(){
  var itemName = $("#itemNameInput").val();
  var itemUrl = $("#itemURLInput").val();
  var itemDescription = $("#itemDescriptionInput").val();
  var item = {name: itemName, description: itemDescription, url: itemUrl}
  $.post("/profile", item)
    .done(function(data){
    })
    .fail(function(err){
      console.error(err)
    })
}

function cancel(){
  console.log('hi');
  window.location.replace('/profile');
}

function saveProfile(){
  var profile = {};
  profile.name = $('#nameInput').val();
  profile.email = $('#emailInput').val();
  profile.picture = $('#urlInput').val();
  var cookie = document.cookie;
  var arr = cookie.split(" ");
  profile._id = arr[1].slice(7); // put cookie Id in profile object

  $.ajax({
    url: '/profile',
    type: "PUT",
    data: profile
  })
  .done(function(data){
    console.log('wtf', data);
    window.location.replace('/profile');
  })
  .fail(function(err){
    console.log(err);
  })
}
