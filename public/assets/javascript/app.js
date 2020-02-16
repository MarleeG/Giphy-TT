'use strict';

const log = console.log;
var topics = ['Shrek', 'Snoopy', 'Rick and Morty', 'Black Panther', 'Gas'];

$(() => {
    var API_KEY;

    $.post('/', data => {
        API_KEY = data.API_KEY;
    })
        .done(() => {
            var getGiphs = {
                getData: (currentTopic) => {
                    log('topic: ', currentTopic);

                    $.get(`https://api.giphy.com/v1/gifs/search?q=${currentTopic}&api_key=${API_KEY}&limit=16`)
                        .done(myGiphs => {
                            // log(myGiphs);

                            display.InitialGiphs(myGiphs);
                        });
                },
            };



            // Gets the default Giphs
            getGiphs.getData(topics[1]);
        });


    var display = {
        // this function will display all topics from the topics variable as buttons 
        ButtonTopics: () => {
            // <button type="button" class="btn btn-primary">1</button>
            $('#btn_topics').empty();
            topics.forEach(tpc => {
                $('#btn_topics').append(`<button type="button" class="btn btn-dark">${tpc}</button>`);
            });
        },

        InitialGiphs: (giphs) => {

            log('function: ', giphs.data)

            giphs.data.forEach((item, idx) => {
                // <img src="..." alt='...' class='giph col-lg-3 col-md-4 col-sm-5' status='still'/>
                let src_still = item.images.original_still.url;
                let alt = item.title;
                let id = item.id;

                // log(`idx: ${idx}`);
                // log(`src: ${src_still}`);
                // log(`alt: ${alt}`);
                // log('----------------------------------------------------------------------');

                $('.giphs').append(`<img src="${src_still}" alt='${alt}' class='giph col-lg-3 col-md-4 col-sm-5 my-1 mx-1' status='still' id='${id}'/>`);
            });


        }
    };

    var gameFunctions = {
        getInputVal: () => {
            let searching = $('#input_search').val().trim();

            if (searching.length > 0) {
                // pushes latest topic added to topics array
                topics.push(searching);

                // displays new set of topics
                display.ButtonTopics();

                // this clears input out after the new search topic has been appended to the ui and topics array
                $('#input_search').val('');
                

            }else{
                // value is empty and advise user to input text
            }
        }
    }


    $('#search_btn').click(() => {
        gameFunctions.getInputVal();
    });


    // displays all topics in topics variable
    display.ButtonTopics();



});