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

  $.get('/profile/profileInfo')
  .done(function(data){
    $("#username").text(data.username);
    $("#name").text(data.name);
    $("#email").text(data.email);
    $("#picture").attr('src', data.picture);
  })
  .fail(function(error){
  })
}
