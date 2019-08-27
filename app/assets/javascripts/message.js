$(function(){
  function buildHTML(message){

 var tag_image =  message.image ==　null ? '' :  `<img class="lower-message__image" src="${message.image}">`
    var html = `
    <div class='message'data-message-id="${message.id}">
     <div class='message__upper-info'>
      <div class='message__upper-info__talker'>
        ${message.user_name}
      </div>
      <div class='message__upper-info__date'>
        ${message.time}
      </div>
     </div>
     <p class="lower-message__content">
        ${message.content}
     </p>
        ${tag_image}
    </div>`
    return html;
    
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href;
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);  
      $('.input-box')[0].reset();
      $('.messages').animate({scrollTop:$(".messages")[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
    return false;
  })

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id"); 

      $.ajax({ 
        url: "api/messages", 
        type: 'get', 
        dataType: 'json', 
        data: {last_id: last_message_id}
      })
      .done(function (messages) { 
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message); 
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
        
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
      return false;
    }
  };
  setInterval(reloadMessages, 5000);
  });
