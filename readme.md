User Login

This app has registration, login, and logout working.

The user can login, update, and view their profile information, such as their username, name, email, and picture.

Heroku Link:

https://vast-forest-1109.herokuapp.com/



    // each item in user.items
          if (items.tradeable === true)
            .myTradeItems(data-id= item._id class= user.name)= item.name
              p= item.description
              img(src= item.url)
              p(data-id= user._id)= user.name
       // .col-sm-6#othersTradable
      // each item in items
          if (tradeable === true && item:not(hasClass("user.name"))
            .othersTradeItems(data-id= item._id)= item.name
              p= item.description
              img(src= item.url)
              p(data-id= user._id)= user.name   