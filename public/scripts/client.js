$(document).ready(function() { 
  $('form').on('submit', function(event){
    event.preventDefault();  
    const length = $('textarea').val().length; 
    if (length === 0) {
      document.getElementById('error1').classList.remove('hide');
      $('.error1').slideDown(); 
      return
    } else if (length > 140) { 
      document.getElementById('error2').classList.remove('hide');
      $('.error2').slideDown(); 
      return
    } 
    $.ajax({
      method: 'POST', 
      data: $(this).serialize(), 
      url: '/tweets', 
      success: function() { 
        $('form')[0].reset(); 
        $('.counter').text('140'); 
        loadTweets();
      }
    }) 
  }) 
  const loadTweets = function() {
    $.ajax({
      method: 'GET', 
      datatype: JSON, 
      url: '/tweets', 
      success: function(data){ 
        renderTweets(data)
      }
    }) 
  } 
  loadTweets() 
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }; 

  const renderTweets = function(tweets) {
    // loops through tweets  
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  }
    
  const createTweetElement = function(tweet) {
  
    const element = `
    <article class="tweet-container"> 
            <header class="tweet-header">
              <div class = 'user'> 
                <span><img src="${tweet.user.avatars}" width="20" height="20" ></img></span>
                <span class = 'name'> ${tweet.user.name} </span>  
              </div> 
              <span class = 'username'> ${tweet.user.handle} </span>  
            </header> 
            <p class="older-tweets"> ${escape(tweet.content.text)}</p> 
            <footer> 
              <span class = 'date'> ${timeago.format(tweet.created_at)} </span>
              <div class = 'user'> 
                <span><i id = 'footer-pic1' class="fa-solid fa-flag"></i></span>
                <span><i id = 'footer-pic2' class="fa-solid fa-retweet"></i></span> 
                <span><i id = 'footer-pic3' class="fa-solid fa-heart"></i></span>
              </div> 
            </footer>
          </article>
    ` 
    return element;
    } 
    
    
}); 

