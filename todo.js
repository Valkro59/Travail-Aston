$(document).ready(function () {
    // Nécessaire pour être bien sûr que le DOM est prêt à être manipuler
   
    var tasks = [];
    
    // On récupère le champ sous forme d'objet
    var input = $('.todo-input');

    // On récupère la liste ul sous forme d'objet
    var list = $('.todo-list');

    // Tableau de stockage pour les taches
    var tasks = [];

    // Méthode 'stringify' pour enregistrer les données dans le navigateur 
    // Méthode 'parse' pour les récupèrer
    var data = localStorage.getItem('todo'); // localStorage permet de stocker les valeurs de 'todo' (l'ensemble des taches ici) dans le navigateur,
    
    if(data) {
        tasks = JSON.parse(data);
    }
    // On parcours le tableau des taches et on les ajoute dans le tableau tasks
    tasks.forEach(function (task){
        list.append(taskToHTML(task));
    });


    // On ajoute un écouteur d'évènement "keyup" sur le champ text
    input.on('keyup', function (event) {
        // 'on' est l'équivalent en jquery de addEventListener de JS
        if (event.keyCode === 13) { // Associer l'évènement lors de l'appui sur la touche avec le code 13 à savoir 'Entrée'
            var text = event.target.value;

            if (text.trim()) { // 'trim' pour supprimer les blancs (espace,tab,...)
                var task = { //On créé un objet task, Ouverture objet avec {}, méthode ci-aprés est le JSON avec 'key' = 'value'
                    id: 'task-' + (tasks.length + 1), // Faire attention à l'addition et la concaténation
                    text: text,
                    date: Date.now(), // Pour le timestamp en seconde, plus utile pour le calcul
                    done: false
                };// Création objet 'task'

                tasks.push(task);//  on ajoute dans la liste le texte écrit dans le formulaire
                localStorage.setItem('todo', JSON.stringify(tasks));
                
                 var li = taskToHTML (task);// voir fonction en bas
                list.append(li);   //'append' permet d'injecter directement du contenu à l'intérieur des balises ciblées ici <li> du html (d'aprés la la variable li créée avant)
                input.val(''); //Pour vider le champ aprés 'entrée'
            }
        }
    });
    list.on('click', 'li', function (event) { // rajouter le li ici permet de surveiller l'ensemble des évènements li dans la liste, on va surveiller les 'enfants' li, .todo-list avait déjà été définie en variable
        var element = $(event.target); // on greffe les méthodes jquery à cet élément avec $()

        // Pour supprimer la tache en cliquant sur la poubelle

        if (element.hasClass('todo-delete')) {
            ;//  filtrer les classes edit, delete et check avec .hasClass, annonce true si on click sur la poubelle sinon false
            var id = element.parent().attr('id');//  Récupère le parent dans le DOM avec jquery, 'attr' pour attribut permet de récupèrer la valeur de l'élément
            var index = tasks.findIndex(function (task) {//  Méthode Js attaché à un tableau permettant d'établir un critère de recherche, ondéfint également la varaible index
                return task.id === id;// trouver l'index du tableau
            });
            // Pour supprimer l'élément avec fadeOut et remove
            tasks.splice(index, 1) //   Pour repositionner l'élement dans le tableau avec splite (on supprime ici de 1)
            localStorage.setItem('todo', JSON.stringify(tasks)); // Permet de supprimer la tache dans le storage
            element.parent().fadeOut(1000, function () {//  parent pour supprimer le li (le parent) et pas seulement la poubelle, fadeOut disparaître en douceur avec jquery, et function agit en callback

                $(this).remove();// le this fait référence ici au li le remove agit donc aprés le fadeOut 

            });
        }

         if (element.hasClass('todo-list-text')) {// Ici c'est pour réecrire le texte du li
            element.on('keyup', function (e) {
                if(e.keyCode === 13){ // (entrée à pour code 13)
                    e.preventDefault();
                    var id = element.parent().attr('id');//  récupérer l'id du parent qui est le li (car ici on était dans le span du texte, voir HTML)
                    var index = tasks.findIndex(function (task) { // idem qu'au delete
                    return task.id === id;
                    });

                    var task = tasks[index];
                    task.text = e.target.innerText; // on récupère la valeur du nouveau texte qui a été saisie dans le champ
                    localStorage.setItem('todo', JSON.stringify(tasks));
                    
                } 
            });
        }
    
    });
});

function taskToHTML (task) { // fonction qui va permettre de transfèrer les taches dans le HTML
    var li = '<li id="' + task.id + '"class="list-group-item">';// On ajoute des élémentes à côté des li , le + permet de concaténer, on va concanténer ensuite avec le texte et les icones issues de fontawesome (poubelle, validation, ...)
                li += '<div class="todo-list-text single-line" contenteditable="true">' + task.text + '</div>'; // le span permet de cibler le bon texte dans le li, contenteditable permet de modifier le champ texte du li aprés entrée
                li += '<i class="fa fa-trash-alt todo-delete"></i>';//  on ajoute ici l'icone poubelle à côté du texte du li, le todo-delete permet de cibler la classe pour une utilisation aprés (ici on supprimera en cliquant sur la poubelle)
                li += '<i class="fas fa-pencil-alt todo-edit"></i>'; // ici l'icone tache avec crayon, idem avec l'edit
                li += '<i class="fas fa-check"></i>'; // ici l'icone tache validée 
                li += '</li>'; //on concatène la fermeture de la balise
                return li;
}


