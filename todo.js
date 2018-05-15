$(document).ready(function () {
    // Nécessaire pour être bien sûr que le DOM est prêt à être manipuler

    // On récupère le champ sous forme d'objet
    var input = $('.todo-input');

    // On récupère la liste ul sous forme d'objet
    var list = $('.todo-list');

    // Tableau de stockage pour les taches
    var tasks = [];

    // On ajoute un écouteur d'évènement "keyup" sur le champ text
    input.on('keyup', function (event) {
        // 'on' est l'équivalent en jquery de addEventListener de JS
        if (event.keyCode === 13) { // Associer l'évènement lors de l'appui sur la touche avec le code 13 à savoir 'Entrée'
            tasks.push(event.target.value);
            console.log(tasks);
            list.append('<li>' + event.target.value + '</li>')   //'append' permet d'injecter directement du contenu à l'intérieur des balises ciblées ici <li> du html

        }
    });

});