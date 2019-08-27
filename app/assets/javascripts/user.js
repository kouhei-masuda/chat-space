$(function() {

  function addUsers(user) {
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user.name }</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name=${ user.name }>追加</a>
              </div>`

    $("#user-search-result").append(html);
    return html;
   }

  function addMembers(name, user_id) {
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user'>
                <input name='group[user_ids][]' type='hidden' value=${ user_id }>
                <p class='chat-group-user__name'>${ name }</p>
                <p class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</p>
                </div>`

    $("#chat-group-users").append(html);
  }

  function no_users(info) {
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ info }</p>
              </div>`
    $("#user-search-result").append(html);
  }

  $(function(){
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();
          if (users.length !== 0) {
            users.forEach(function(user){
            addUsers(user);
            });
          }
          else {
            no_users("一致するユーザーが見つかりません");
          }
        })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    });

    $(function(){
      $(document).on('click', '.user-search-add', function() {
        console.log('aa');
        var name = $(this).data("user-name");
        var user_id = $(this).data("user-id");
        $(this).parent().remove();
        addMembers(name, user_id);
      });

　    $(document).on("click", '.user-search-remove', function() {
        $(this).parent().remove();
      });
    });
  });
});