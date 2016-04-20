var synonyms = require('./library/synonyms');
var prompt = require("prompt");
var clc = require("cli-color");

var myApi = new synonyms.SynonymAPI("4303bc85c2a19a9082de81e935f08349");
//console.log(myApi.apiKey);

prompt.get(["Pick a word! Any word!"], function(err, word) {
    var word = word["Pick a word! Any word!"];
    myApi.getSynonyms(word, function(result) {
        //console.log(result);
        var style = clc.xterm(60).bgXterm(189);
        var stylePhrase = clc.xterm(189).bgXterm(60);
        if (result.verb) {
            if (result.verb.syn) {
                console.log(stylePhrase("For the "+clc.bold("verb ") + word + ", the synonyms are:"));
                console.log(style(result.verb.syn.join(", ")));
            }
            if (result.verb.ant) {
                console.log(stylePhrase("And the antonyms are:"));
                console.log(style(result.verb.ant.join(", ")));
            }
        }
        if (result.noun) {
            if (result.noun.syn) {
                console.log(stylePhrase("For the "+ clc.bold("noun ") + word + ", the synonyms are:"));
                console.log(style(result.noun.syn.join(", ")));
            }
            if (result.noun.ant) {
                console.log(stylePhrase("And the antonyms are:"));
                console.log(style(result.noun.ant.join(", ")));
            }
        }
        if (result.adjective) {
            if (result.adjective.syn) {
                console.log(stylePhrase("For the " + clc.bold("adjective ") + word + ", the synonyms are:"));
                console.log(style(result.adjective.syn.join(", ")));
            }
            if (result.adjective.ant) {
                console.log(stylePhrase("And the antonyms are:"));
                console.log(style(result.adjective.syn.join(", ")));
            }
        }

    });
});
