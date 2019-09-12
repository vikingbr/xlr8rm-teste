import $ from 'jquery';

const urlNoCors = 'https://cors-anywhere.herokuapp.com/';


export function getXlr8Token() {
    let resp = '';
    $.ajax({
        url: urlNoCors +'https://test.xlr8rms.com/access-token',
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
        url: urlNoCors +'https://test.xlr8rms.com/get-data?accessToken='+ token,
        async: false,
        dataType: 'json',
        success:function(response){
            resp = response;
        },
        error: function() {
            resp = false;
        }
    });
    return resp;
}

export function postXlr8Data(requestData, token) {
    console.log('data');
    console.log(requestData);
    console.log('token');
    console.log(token);
    let resp = '';
    $.ajax({
        type: 'PUT',
        beforeSend: function(request) {
            request.setRequestHeader("AccessToken", token);
        },
        url: 'https://test.xlr8rms.com/save-data',
        async:true,
        dataType: 'json',
        data: requestData,
        success:function(response){
            resp = response.data;
            console.log('heere');
            console.log(resp);
        },
        error: function(err) {
            resp = err;
            console.log('heere 2');
            console.log(err.status+" - "+err.statusText);
        }
    });
    return resp;
}

