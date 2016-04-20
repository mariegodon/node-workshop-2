var request = require("request");

function SynonymAPI(apiKey) {
    this.apiKey = apiKey;
}


SynonymAPI.prototype.getSynonyms = function(word, callback) {
    request("http://words.bighugelabs.com/api/2/" + this.apiKey + "/" + word + "/json", function(err, result) {
        var resultObj = JSON.parse(result.body);
        if (err) {
            callback(err);
        }
        else {
            callback(resultObj);
        }
    });
}




module.exports = {
    SynonymAPI: SynonymAPI
}
