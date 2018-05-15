
console.log("Hello");
console.info('Hello');
console.warn('Hello');
console.error('Hello');

// Schéma (classe)

function Counter() { //Ici 'function' permet de définir l'objet
    this.number = 0; // 'this' fait référence à l'instance courante (objet sur lequel on travaille); this est donc une "pseudo-variable", number est ici la propriété

    this.increase = function () { // Ici 'function' est une véritable fonction
        this.number++; // Permet d'incrémenter le nombre
    };

    this.decrease = function () {
        this.number--;  // Permet de décrémenter
    };

}

// Création objet

var c = new Counter();  //   Permet de créer réellement l'objet Counter ayant pour variable c

c.increase(); //Exécute la fonction increase sur l'objet c; le 'this' ici devient donc 'c'
c.increase();
c.increase();
c.increase();
c.decrease();
c.increase();
c.decrease();

console.log(c.number);

var c2 = new Counter();  //   Nouvel objet c2

c2.increase();//  le 'this' ici devient c2
c2.decrease();
c2.increase();


console.log(c2.number);

var counterTitle = new Counter();//  Va permettre de compter le nombre de click sur le titre

var title = document.getElementById('title'); // Permet de récupérer un élément dans l'objet ici le titre (title)

title.addEventListener('mouseover', function () { /* ici function est une fonction Callback, elle fait référence à ce qui se trouve après, 
    *on fait appel à la fonction une fois que l'évènement arrive;'mouseover' pour compter à chaque fois qu'on survole le titre 
    */
    counterTitle.increase(); // définir la fonction directement ici
    console.log(counterTitle.number);
}, false); // Ajoute un écouteur d'évènement, on ajoute une "oreille" qui écoute les clicks et qui incrémente l'objet à chaque survol du titre


/**
 * Afficher un nom de saisie dans un champ text
 */


var inputName = document.getElementById('name');
var displayName = document.querySelector('#displayName'); // dans jQuery le querySelector

inputName.addEventListener('keyup', function (event) { // exècute la fonction quand l'évènement se propage; l'évènement ici n'est pas connu mais on sait qu'il va s'en produire un
    // ici se sera lorsqu'on tape une lettre   
    console.log(event.target.value); // Appelle le champt texte qui a génèré l'évènement ('event' est un objet qui a pour propriété 'target' ayant elle même une propriété 'value')
    displayName.innerHTML = event.target.value;//  Récupère la propriété 'innerHTML' dans displayName (innerHTML récupère la syntaxe HTML)
});

var inputName = document.getElementById('name');
var displayName = document.querySelector('#displayName'); // dans jQuery le querySelector

// Ajoute un nouveau formulaire avec la condition de passer en rouge une fois qu'on dépasse 5 lettres
inputName.addEventListener('keyup', function (event) {
    var value = event.target.value;

    displayName.style.color = '#000';

    if (value.length >= 5) {
        displayName.style.color = 'red'
    }

    displayName.innerHTML = value;
});

// Exercice : faire disparaitre le paragraphe en cliquant sur le titre
function toggleBox(selector) {
    var elements = document.querySelectorAll(selector);//  sélectionner le h1 dans la classe toggleBox; querySelectorAll permet de réutiliser le selector sinon il ne prend que le h1 de la première toggleBox

    elements.forEach(function (element) { // le ForEach est une autre façon de faire une boucle, dans le tableau des 'elements' qui sont toutes les toggleBox h1, 
        // ensuite on applique la fonction 'element'
        element.addEventListener('click', function (event) {
            // nextSibling positionne au frère suivant ici le paragraphe (frère du titre dans le di toggleBox); nextElementSibling permet d'afficher l'élément

             // display = affichage


                // p.style.display = p.style.display !== 'none' ? 'none' : 'block';
                switchDisplay(element.nextElementSibling);
                // p.style.display = Expression (ici le p.style.display !== 'none') ? 'none' : 'block'; Permet de créer la même condition mais sur une seule ligne; le '?' signifie 'alors', le ':' veut dire 'sinon alors'
                // On appelle ça une condition ternaire
         }, false);
        });
    }
// Permet de créer la fonction précédente qui va pouvoir s'appliquer à tous les éléements et pas seulement les 'toggleBox h1'
function switchDisplay(element) {
            element.style.display = element.style.display !== 'none' ? 'none' : 'block';
        }

toggleBox('.toggleBox h1');
toggleBox('.switchBox h2');


