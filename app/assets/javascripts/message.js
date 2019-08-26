$(function(){
  function buildHTML(message){

 var tag_image =  message.image ==　null ? '' :  `<img class="lower-message__image" src="${message.image}">`
    var html = `
    <div class='message'>
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
});