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
            resp = response.accessToken;
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
            resp = response.data;
        },
        error: function() {
            resp = false;
        }
    });
    return resp;
}

export function postXlr8Data(data, token) {
    $.ajax({
        url: urlNoCors +'https://test.xlr8rms.com/get-data?accessToken='+ token,
        async:false,
        type: 'post',
        data: {

        },
    }).done(() => {
        console.log('Succsess');
    })
}

