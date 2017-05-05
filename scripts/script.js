

var data = [
  {
    type:'html',
    html:'<div class="logo"><img style="max-height: 100vh;" src="assets/raccoon-logo.svg"/><h1>Switch Feed</h1></div>',
    time:5000
  },
  {
    type:'html',
    html:'<div class="table-container"><table><thead><tr><th>Feature</th><th>Status</th></tr></thead> <tbody> <tr><td>Posting</td><td class="available">Available</td></tr><tr><td>Commenting</td><td class="available">Available</td></tr><tr><td>Board Topics</td><td class="available">Available</td></tr> <tr><td>Anonymous</td><td class="available">Available</td></tr> <tr><td>Ephemeral Content</td><td class="available">Available</td></tr> <tr><td>Uncensored</td><td class="available">Available</td></tr> <tr><td>Locality: Global</td><td class="available">Available</td></tr> <tr><td>Voting</td><td class="upcoming">Upcoming</td></tr> </tbody> </table</div>',
    time: 8000
  },
  {
    type:'html',
    html:'<div class="table-container"><table><thead><tr><th>Feature</th><th>Status</th></tr></thead> <tbody> <tr><td>Reply to Comment</td><td class="upcoming">Upcoming</td></tr><tr><td>Board Notifications</td><td class="upcoming">Upcoming</td></tr> <tr><td>Avatar Reactions</td><td class="upcoming">Upcoming</td></tr> <tr><td>Board activity</td><td class="upcoming">Upcoming</td></tr> <tr><td>Current viewers</td><td class="proposed">Proposed</td></tr> <tr><td>Image upload</td><td class="proposed">Proposed</td></tr> <tr><td>Locality: freinds</td><td class="proposed">Proposed</td></tr> <tr><td>link embedding</td><td class="upcoming">Upcoming</td></tr> </tbody> </table</div>',
    time: 8000
  },
  {
    type:'html',
    html:'<div class="announcement"><h1>Switch Feed is a browser extension for Chrome that adds an anonymous posting board to your Facebook News Feed!</h1></div>',
    time:8000
  },
  {
    type:'fetch',
    html:'',
    time:8000
  },
  {
    type:'html',
    html:'<div class="feature"><h1>Ephemeral Posting</h1><img src="assets/ephemeral.png" alt="ephemeral"/><p>Posts are permanently deleted after 24 hours.</p></div>',
    time: 5000
  },
  {
    type:'post',
    html:'',
    time:8000
  },
  {
    type:'html',
    html:'<div class="feature"><h1>Open Interaction</h1><img src="assets/community.png" alt="community"/><p>Engage with the larger facebook community beyond your friend list</p></div>',
    time: 5000
  },
  {
    type:'post',
    html:'',
    time:8000
  },
  {
    type:'html',
    html:'<div class="feature"><h1>Crowd Moderation</h1><img src="assets/moderation.png" alt="moderation"/><p>Each board will feature its own distinct level of moderation ranging from no moderation to heavy moderation tools.</p></div>',
    time: 5000
  },
  {
    type:'post',
    html:'',
    time:8000
  },
  {
    type:'html',
    html:'<div class="feature"><h1>Free from arbitrary Facebook censorship</h1><img src="assets/no-censorship.png" alt="no-censorship"/><p>Switch Feed is a safe space...</p></div>',
    time:5000
  },
  {
    type:'post',
    html:'',
    time:8000
  },
  {
    type:'html',
    html:'<div class="feature"><h1>Anonymous</h1><img src="assets/anonymous.png" alt="anonymous"/><p>No personal information is tracked, stored, or publicly displayed anywhere in Switch Feed.</p></div>',
    time:5000
  },
  {
    type:'post',
    html:'',
    time:8000
  },
  {
    type:'html',
    html:'<div class="feature"><h1>Topic Boards</h1><img src="assets/boards.png" alt="boards"/><p>Switch Feed has boards that feature different topics for discussion.</p></div>',
    time:5000
  },
  {
    type:'post',
    html:'',
    time:8000
  },
  {
    type:'html',
    html:'<div class="feature"><h1>Escape your social filter bubble</h1><img src="assets/social-bubble.png" alt="social bubble"/><p>Experience the unexpected with Switch Feed.</p>',
    time: 5000
  },
  {
    type:'post',
    html:'',
    time:8000
  },
  {
    type:'html',
    html:'<div class="announcement"><h1>BETA now available on the chrome web store.</h1><img src="assets/google-play-badge.svg"/><p>Download it today!</p></div>',
    time:8000
  },
  {
    type:'post',
    html:'',
    time:8000
  },
  {
    type:'html',
    html:'<div class="announcement"><h1>Go to http://switchfeed.net to find the download link.</h1></div>',
    time: 5000
  },
  {
    type:'post',
    html:'',
    time:8000
  }
]

var boards = ['random','qa','meta','politics']
var selectedBoard = ''

var response = []

var i = 0;
// console.log(data.length)

var commentTimeoutId;
var intervalId;

$(document).ready( () => {
  loop()
  var elem = document.getElementById("body");

  elem.onclick = function() {
    req = elem.requestFullScreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen;
    req.call(elem);
  }
})


var loop = () => {

  setTimeout( () => {
    console.log(data)
    commentTimeoutId ? window.clearTimeout(commentTimeoutId) : console.log('no timeout')

    if(data[i].type == 'fetch'){
      getPostResponse(()=> {
        //pick a random post to display
        updatePost(response[random(0,response.length)],i)
    })
    } else if (data[i].type == 'post') {
      updatePost(response[random(0,response.length)])
    } else {
      $('#test').html(data[i].html)
    }

    $('#countdown').css('background-color','white')
    window.clearTimeout(intervalId)
    countDown(data[i].time - 1000)

    // console.log(i)


    loop()

    // console.log(data[i].time)

  }, data[i].time);

  if(i < data.length-1){
    i++
    console.log(i)
  } else {
    i = 0
    console.log(i)
  }

}


var countDown = (time) => {

  $('#countdown').css('background-color','#5D92ff')
  // var max = time;
  var interval = $(window).width() / (time/1000)
  console.log(interval)
  // var t = time
  var width = 0;
  intervalId = setInterval( () => {
    // t--
    $('#countdown').css('width',width)
    width += interval
  }, 1000)
}

var getPostResponse = (callback) => {
  selectedBoard = boards[random(0,boards.length-1)]
  fetch(`https://gentrydemchak.com/api/v2/test/posts/${selectedBoard}`)
    .then( response => {
      if(response.ok){
        return response.json();
      }
      throw new Error('Network not OK')
  }).then( body => {

    response = body.posts
    // data[i].html = JSON.stringify(body.posts)
    return callback()
  }).catch( error => console.log(error.message) );
}

var updatePost = (post, index) => {
  // console.log(post)
  $('#test').html(`<h3 style="margin:0;color:black;">Post from the <span style="color:#5D92ff">${selectedBoard}</span> board.</h3><div class="post_container"><div class="op_container"><img class="profile" src="assets/raccoon-logo.svg" alt="profile"/><div class="op"><p class="name">Raccoon</p><p class="time">${getTime(post.date)} ago</p></div></div><div class="anonymous_text_container"><p class="anon_text">${post.text}</p></div></div><div id="comments"></div>`)
  if (post.comments.length > 0) {
    //cycle comments
    // console.log(data[index])
    var j = 0;
    commentLoop(j,post)
  } else {
    $('#comments').html('<p>No replies yet...</p>')
  }
}

var commentLoop = (_j, post) => {
  var j = _j
  commentTimeoutId = window.setTimeout( () => {
    if(j < post.comments.length){
      console.log(j)
      $('#comments').html(`<p><span class="name">(${j+1}/${post.comments.length}) raccoon replied </span><span class="time">${getTime(post.comments[j].date)} ago:</span class="anon_text"> ${post.comments[j].text}</p>`)
      j++
      commentLoop(j,post)
    }
  }, 2000)
}


var getTime = (timestamp) => {

  var timestring = ''
  var d = new Date(timestamp)
  var current = new Date()
  var diff = current - d;

  if (diff >= 1000*60*60*24){
    //older than a day?
    var days = Math.floor(diff / (1000*60*60*24))
    timestring = `${days} days`
  } else if (diff < 1000*60*60*24 && diff >= 1000*60*60){
    //older than a few hours, but less than a day?
    var hours = Math.floor(diff / (1000*60*60))
    timestring = `${hours} hours`
  } else if (diff < 1000*60*60){
    //older than a few minutes, but less than an hour?
    var minutes = Math.floor(diff / (1000*60))
    timestring = `${minutes} minutes`
  }

  return timestring
}

var random = (min,max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}
