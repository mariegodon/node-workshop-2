module.exports = {
    getFortune: function(){
        var fortunes = [
            "You will have a great day.",
            "Beware.",
            "Don't worry about a thing.",
            "Great fortune will come your way."
            ];
        var randomNumber = Math.floor(Math.random())*fortunes.length;
        return fortunes[randomNumber];
    }
}

