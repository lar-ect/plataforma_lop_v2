$(document).on('click','#login-form-link',function() {
     $("#register-form").hide(); 
     $("#login-form").show();
     $('#register-form-link').removeClass('active');
     $('#login-form-link').addClass('active');
     $('#error-msg').html('');
});

$(document).on('click','#register-form-link',function() {
     $("#login-form").hide(); 
     $("#register-form").show();
     $('#login-form-link').removeClass('active');
     $('#register-form-link').addClass('active');
     $('#error-msg').html('');
});

/*$(document).on('blur',"#register-name, #register-enrollment, #register-email, #register-password, #register-confirm-password",function(e){
    if($(this).val().length === 0){
        console.log('aa')
        $(this).addClass('invalid-input');
        $(this).removeClass('valid-input');
    } else {
        
        if($(this).attr('id') === ('register-email')){
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if(!regex.test($(this).val())) {
                $(this).addClass('invalid-input');
                $(this).removeClass('valid-input');
            } else {
                $(this).addClass('valid-input');
                $(this).removeClass('invalid-input');
            }
        } else if($(this).attr('id') === ('register-password')){
            if($(this).val() === $('#register-confirm-password').val()){
                $(this).addClass('valid-input');
                $(this).removeClass('invalid-input');
                $('#register-confirm-password').addClass('valid-input');
                $('#register-confirm-password').removeClass('invalid-input');
            } else {
                $(this).addClass('invalid-input');
                $(this).removeClass('valid-input');
                $('#register-confirm-password').addClass('invalid-input');
                $('#register-confirm-password').removeClass('valid-input');
            }
        } else if($(this).attr('id') === ('register-confirm-password')){
            if($(this).val() === $('#register-password').val()){
                $(this).addClass('valid-input');
                $(this).removeClass('invalid-input');
                $('#register-password').addClass('valid-input');
                $('#register-password').removeClass('invalid-input');
            } else {
                $(this).addClass('invalid-input');
                $(this).removeClass('valid-input');
                $('#register-password').addClass('invalid-input');
                $('#register-password').removeClass('valid-input');
            }
        } else {
            $(this).addClass('valid-input');
            $(this).removeClass('invalid-input');
        }
        
    }
});*/