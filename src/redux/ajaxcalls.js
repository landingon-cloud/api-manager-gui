import { ajax } from 'rxjs/ajax'

export const retrieveViaAjax = (token, url) => {
    console.log(url)
    return (
        ajax({
            url: url,
            crossDomain: true,
            method: 'GET',
            withCredentials: false,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            responseType: 'json'

        })
    )
};

export const updateViaAjax = (token, url, data) => {
    console.log(url)
    console.log(data)
    return (
        ajax({
            url: url,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },

            body: data
        })
    )
}

export const deleteViaAjax = (token, url) => {
    console.log(url)
    return (
        ajax({
            url: url,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    )
}

export const getViaAjax = (token, url) => {
    console.log(url)
    return (
        ajax({
            url: url,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
    )
}
