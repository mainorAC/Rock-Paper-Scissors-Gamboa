angular
    .module('rock-paper-scissor').service("ChampionshipsExamplesServices", function ($window) {

    this.getTwoPlayerChampionship = function () {
        var string="[['Andrey', 'P'],['Sim', 'S']]";
        return writeFile(string);
    }
    this.getFourPlayerChampionship = function () {
        var string="[\n \t[\t [ [\"Andrey\", \"P\"], [\"scoot\", \"P\"] ],\n \t \t [ [\"Richard\", \"R\"], [\"Michael\", \"S\"] ]\n\t], \n \n \t[ \t [ [\"Allen\", \"S\"], [\"Omer\", \"P\"] ], \n \t \t [ [\"John\", \"R\"], [\"Robert\", \"P\"] ]\n\t] \n ]";
        return writeFile(string);
    }
    this.getEigthPlayerChampionship = function () {
        var string="[[\n \t[\t [ [\"Andrey\", \"P\"], [\"scoot\", \"S\"] ],\n \t \t [ [\"Richard\", \"R\"], [\"Michael\", \"S\"] ]\n\t], \n \n \t[ \t [ [\"Allen\", \"S\"], [\"Omer\", \"P\"] ], \n \t \t [ [\"John\", \"R\"], [\"Robert\", \"P\"] ]\n\t] \n ], [\n \t[\t [ [\"Charlie\", \"P\"], [\"Dante\", \"S\"] ],\n \t \t [ [\"Peter\", \"P\"], [\"Manfred\", \"S\"] ]\n\t], \n \n \t[ \t [ [\"Allan\", \"S\"], [\"Homer\", \"P\"] ], \n \t \t [ [\"Johnny\", \"R\"], [\"Ronald\", \"P\"] ]\n\t] \n ]]";
        return writeFile(string);
    }
    this.getAnotherEigthPlayerChampionship = function () {
        var string="[[\n \t[\t [ [\"Andrey\", \"P\"], [\"scoot\", \"S\"] ],\n \t \t [ [\"Richard\", \"R\"], [\"Michael\", \"S\"] ]\n\t], \n \n \t[ \t [ [\"Allen\", \"S\"], [\"Omer\", \"P\"] ], \n \t \t [ [\"John\", \"R\"], [\"Robert\", \"P\"] ]\n\t] \n ], [\n \t[\t [ [\"Charlie\", \"P\"], [\"Dante\", \"R\"] ],\n \t \t [ [\"Peter\", \"S\"], [\"Manfred\", \"S\"] ]\n\t], \n \n \t[ \t [ [\"Allan\", \"S\"], [\"Homer\", \"P\"] ], \n \t \t [ [\"Johnny\", \"R\"], [\"Ronald\", \"P\"] ]\n\t] \n ]]";
        return writeFile(string);
    }
    this.getAnotherFourPlayerChampionship = function () {
        var string="[\n \t[\t [ [\"Andrey\", \"P\"], [\"scoot\", \"R\"] ],\n \t \t [ [\"Richard\", \"S\"], [\"Michael\", \"S\"] ]\n\t], \n \n \t[ \t [ [\"Allen\", \"S\"], [\"Omer\", \"S\"] ], \n \t \t [ [\"John\", \"R\"], [\"Robert\", \"P\"] ]\n\t] \n ]";
        return writeFile(string);
    }

    function writeFile(str)
    {
        blob = new Blob([str], { type: 'text/plain' }),
        url = $window.URL || $window.webkitURL;
        return url.createObjectURL(blob);
    }
});
