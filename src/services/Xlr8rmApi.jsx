import $ from 'jquery';

// const urlNoCors = 'https://cors-anywhere.herokuapp.com/';


export function getXlr8Token() {
    let resp = '';
    $.ajax({
        url: 'https://test.xlr8rms.com/access-token',
        async: false,
        dataType: 'json',
        success:function(response){
            // console.log('response: ');
            // console.log(response);
            // console.log('finish_response');
            resp = response;
        },
        error: function(error) {
            resp = error;
        }
    });
    return resp;
}

export function getXlr8Data(token) {
    let resp = '';
    $.ajax({
        url: 'https://test.xlr8rms.com/get-data?accessToken='+ token,
        async: false,
        dataType: 'json',
        success:function(response){
            resp = response;
            // console.log(resp);
        },
        error: function() {
            resp = false;
        }
    });
    return resp;
}

export function postXlr8Data(requestData, token) {
    let resp = '';
    $.ajax({
        type: 'POST',
        beforeSend: function(request) {
            request.setRequestHeader("AccessToken", token);
        },
        url: 'https://test.xlr8rms.com/save-data',
        async: false,
        data: requestData,
        success:function(response, textStatus, xhr){
            resp = response;
            console.log(resp);
            console.log(textStatus);
            resp = xhr.status
        },
        error: function(err) {
            resp = err;
            console.log(err.status+" - "+err.statusText);
        }
    });
    return resp;
}

