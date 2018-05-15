$(document).ready(function () { // document est l'objet créé par le navigateur
    $('p').css('color', 'red'); //équivalent ici au css -> p {color : red}
    $('.para').on('click', function () {  // créer l'évènement de click au paragraphe p de classe para
        console.log(this); // this === <p class = "para></p>"
        $(this).fadeOut(4000); //faire disparaître paragraphe avec jquery et l'option fadeOut qui prend ici 4s (4000 ms) et toujours 

    });
});
// le $ permet de faire appel à la bibliothèque jquery
// ex: $(sélecteur).css('color','red');
//     $(sélecteur).addClass('box');