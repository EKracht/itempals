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
  var cookie = document.cookie;
  var arr = cookie.split(" ");
  var userId = arr[1].slice(7);
  var item = {name: itemName, description: itemDescription, url: itemUrl, userId: userId}
  $.post("/profile", item)
    .done(function(data){
      // window.location.replace('/profile');
      console.log(data.name);
      console.log(data.description);
      console.log(data.url);
      var $item = $('<tr>');
      var $name = $('<td>').text(data.name);
      var $description = $('<td>').text(data.description);
      var $url = $('<td>').text(data.url);
      $item.append($name, $description, $url);
      console.log($item);
      $('#userItemsOnly').append($item);
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
