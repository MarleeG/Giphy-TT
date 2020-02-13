const log = console.log;

$(() => {
    var API_KEY;

    $.post('/', data => {
        API_KEY = data.API_KEY;
    })
    .done(() => {
        let topic = 'cheese';
        var game = {
            getData: () => {
                $.get(`https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=${API_KEY}&limit=15`, giphs => {
                    log(giphs);
                });
            }
        }

        game.getData();
    })
});