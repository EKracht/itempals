'use strict';

$(document).ready(init);

function init(){
  $('#cancel').on('click', cancel);
  $('#saveProfile').on('click', saveProfile);
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
