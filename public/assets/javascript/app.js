'use strict';

const log = console.log;
var topics = ['Shrek', 'Snoopy', 'Rick and Morty', 'Black Panther', 'Gas'];

$(() => {
    var API_KEY;

    $.post('/', data => {
        API_KEY = data.API_KEY;
    })
    .done(() => {
        var game = {
            getData: () => {
                $.get(`https://api.giphy.com/v1/gifs/search?q=${topics[1]}&api_key=${API_KEY}&limit=15`, giphs => {
                    log(giphs);
                });
            },

            // this function will display all topics from the topics variable as buttons 
            displayButtonTopics: () => {
                // <button type="button" class="btn btn-primary">1</button>
                $('#btn_topics').empty();
                topics.forEach(tpc =>{
                    $('#btn_topics').append(`<button type="button" class="btn btn-dark">${tpc}</button>`);
                });
            }
        }

        // displays all topics in topics variable
        game.displayButtonTopics();

        // this gets the data from the api and logs it currently
        game.getData();


    });



});