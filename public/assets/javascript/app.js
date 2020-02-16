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
                $('#btn_topics').append(`<button type="button" class="btn btn-dark topic_btn">${tpc}</button>`);
            });
        },

        InitialGiphs: (giphs) => {
            log('function: ', giphs.data)

            giphs.data.forEach((item, idx) => {
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
        // this function will determine if the value in the input will be added to the UI or not
        getInputVal: () => {
            let searching = $('#input_search').val().trim();
            if (searching.length > 0) {
                // pushes latest topic added to topics array
                topics.push(searching);

                // displays new set of topics
                display.ButtonTopics();

                // this clears input out after the new search topic has been appended to the ui and topics array
                $('#input_search').val('');

                // EXTRA: ADD SUCCESS ALERT ONCE TOPIC HAS BEEN ADDED TO THE UI 
            } else {
                // value is empty and advise user to input text
                // EXTRA: ADD ERROR ALERT IF TOPIC DOES NOT MATCH REQUIREMENTS NEEDED TO BE ADDED TO TOPICS 

            }
        },
        getSelectedValue: (e) => {
            log('Selected topic: ', e);
        }
    }


    // On 'click' of the Search Button the inner function will be executed
    $('#search_btn').click(() => {
        gameFunctions.getInputVal();
    });

    // $('.topic_btn').click(e => {
    // });

    $(document).on('click', '.topic_btn', e => {
        let {innerText} = e.target;
        gameFunctions.getSelectedValue(innerText);

    });




    // displays all topics in topics variable
    display.ButtonTopics();
});