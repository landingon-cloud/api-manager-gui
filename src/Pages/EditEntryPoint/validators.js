
const mkErrorObject = (err) => {
    let position = parseInt(err.toString().replace(/[^0-9]/g,''));
    return {valid: false, error: 'please, provide a valid JSON', errorDetail: err.toString(), position};
}

export const validateJson = (text) => {
    try {
        JSON.parse(text)
        return {valid:true};
    } catch(err) {
        mkErrorObject(err);
    }
}

export const validateJsonReplacement = (text) => {
    try {
        JSON.parse(text.replace(/\${_swallow.+\.dqJoin\(.\)}/g, '"placeho"'))
        return {valid:true};
    } catch(err) {
        return mkErrorObject(err);
    }
}
