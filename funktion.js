function showMeineBeiträge(){
    document.getElementById('meineLetztenBeiträge').style.display=  "block";
    document.getElementById('meineForenPosts').style.display= "none";
}	

function showMeineForenPosts(){
    document.getElementById('meineForenPosts').style.display=  "block";
    document.getElementById('meineLetztenBeiträge').style.display= "none";
}

function showOhneAntworten(){
    document.getElementById('ohneant').style.display=  "block";
    document.getElementById('beliebt').style.display= "none";
    document.getElementById('letzteBeiträge').style.display= "none";
}

function showbeliebteBeiträge(){
    document.getElementById('beliebt').style.display=  "block";
    document.getElementById('ohneant').style.display= "none";
    document.getElementById('letzteBeiträge').style.display= "none";
}
    
function showlastbeiträge(){
    document.getElementById('letzteBeiträge').style.display= "";
    document.getElementById('ohneant').style.display=  "none";
    document.getElementById('beliebt').style.display=  "none";
}
    
function showLoginForm(){
    document.getElementById('loginDiv').style.display= "block";
}

function closeLoginForm(){
    document.getElementById('loginDiv').style.display= "none";
}

function showUserDetails(){
    document.getElementById("uldropdown").style.display="block";
}
/* $('nav ul li.btn span').click(function(){
    $('nav ul div.items').toggleClass=("show");
   $('nav ul li.btn span.show').toggleClass=("show");
});
$('userpanela').click(function(){
    $('uldropdown').toggleClass=("show");
 
}); */
/* 	window.onklick = function(event){
    if(!event.target.matches('.uldropdown')) {
        var dropdowns= document.getElementsByClassName("accountdropdown");
        var i;
        for(i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
              }
        }
    }
} */

