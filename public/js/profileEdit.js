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
    .done(function(user){
      user.items.forEach(function(item, index, all){
      var url = item.url;
      var name = item.name;
      var description = item.description;
      console.log(description, item.description)
        var $item = $('<tr>').data("id", item._id);
        var $name = $('<td>').text(name);
        var $description = $('<td>').text(description);
        var $src = $("<img>").attr("src", url);
        var $url = $('<td>').append($src);
        var $trash = $('<td>').append("<button>");
        var $trade = $('<td>').append("<button>");
        $item.append($name, $description, $url);
        console.log($item);
        $('#userItemsOnly').append($item);
      })
      //window.location.replace('/profile');
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
  })
  .fail(function(err){
    console.log(err);
  })
}
