$(function(){
  function buildHTML(message){
    if(message.content!=null  && message.image==null){

    
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
    </div>`
    return html;
    }else if(message.content == null  && message.image != null){
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
     <img class="lower-message__image" src="${message.image}">
    </div>`
    return html;
    }else{
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
     <img class="lower-message__image" src="${message.image}">
    </div>`
    return html;
    }
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href;
    console.log(this)
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
      $('.input-box__text').val('');
      $('.input-box__image__file').val('');  
      $('.messages').animate({scrollTop:$(".messages")[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
    return false;
  })
});