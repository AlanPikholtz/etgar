
    function googleSignIn(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(result);
        console.log("Successful LogIn");
        writeUserData(user.userId,user.name,user.email,user.imageUrl);
        showAll();
        

        IsCurrentUser();
        // ...
        
        }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(error)
        console.log("Error LogIn")
        // ...
        });
    }

    $(document).ready(function(){
        IsCurrentUser();
    });

    function showRondaDisplay(){
        hideRondaList();
      document.getElementById("rondaDisplay").style.display = "block";
    }

    function hideRondaDisplay(){
      document.getElementById("rondaDisplay").style.display = "none";
    }

    function showRondaList(){
        hideRondaDisplay();
      document.getElementById("rondaList").style.display = "block";
    }

    function hideRondaList(){
      document.getElementById("rondaList").style.display = "none";
    }
    function getCurrentUser(){
      var user = firebase.auth().currentUser;

      if (user) {
        // User is signed in.
        return user;
      } else {
        return undefined;
        // No user is signed in.
      }
    }

    function IsCurrentUser(){
      var user = firebase.auth().currentUser;
debugger;
      if (user) {
        // User is signed in.
        loadCurrentUserData(user);
        document.getElementById("loginButton").style.display = "none";
        showAll()
        return true;
      } else {
        return false;
        // No user is signed in.
      }

    }

    function loadCurrentUserData(user){
      
      document.getElementById("userEmail").innerHTML = user.email;

    }

    function clearCurrentUserData(){
      document.getElementById("userEmail").innerHTML = "";
    }
    

    function loadRondaList(){
        showRondaList();
        var currentUser = getCurrentUser(); 
        document.getElementById('rondaLista').innerHTML = "";
        var rondaref = firebase.database().ref('utilities/ronda/'+currentUser.email.split("@")[0]);
          rondaref.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                updateRondaValues(childData)
            });
        });
    }
    

    function writeUserData(userId, name, email, imageUrl) {
      firebase.database().ref('users/' + email.split("@")[0]).set({
        username: name == undefined ? "" : name,
        email: email,
        profile_picture : imageUrl == undefined ? "" : imageUrl
      });
    }

    function addNameRondaList(){
        var ulElem = document.getElementById('rondaLista').getElementsByTagName("li");
        
        var arrayRonda = [];
        
        debugger;
        for (let i = 0; ulElem[i]; i++) {
            arrayRonda.push(ulElem[i].textContent.split(' ')[0])
        }
        arrayRonda.push(document.getElementById("addRondaInput").value);
        document.getElementById("addRondaInput").value = "";
        var currentUser = getCurrentUser();
        var ref = firebase.database().ref('utilities/ronda/'+currentUser.email.split("@")[0]);
        ref.set(arrayRonda);
    }

    function updateRondaValues(child){

      
      var ulElem = document.getElementById('rondaLista').getElementsByTagName("li");
      
      debugger;
      
      
      for (let i = 0; ulElem[i]; i++) {
          var element = ulElem[i];
          if(element.textContent.split(' ')[0] == child){
            ulElem[i].remove();
          }
      }
        var object = child.toString();
        var prepend = '<span class="label label-default" style="position:absolute;top:30%;">'+child+'</span><span class="pull-right button-group"><button type="button" class="btn btn-danger" onclick="removeLista(\''+object+'\')" style="float:right;"><span class="glyphicon glyphicon-remove"></span> Borrar</button></span>';
        $('#rondaLista').prepend('<li class="list-group-item clearfix">'+prepend+'</li>');
      
    }

    function removeLista(child){
        debugger;
        var ulElem = document.getElementById('rondaLista').getElementsByTagName("li");
        
        var arrayRonda = [];
        for (let i = 0; ulElem[i]; i++) {
            // node is your element!
            var element = ulElem[i];
            if(element.textContent.split(' ')[0] !== child){
              arrayRonda.push(element.textContent.split(' ')[0]);
            }
        }
        var currentUser = getCurrentUser();
        var ref = firebase.database().ref('utilities/ronda/'+currentUser.email.split("@")[0]);
        ref.set(arrayRonda);
        loadRondaList();
    }
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }
    
    function loadRondaDisplay(){
        showRondaDisplay();
        hideRondaList();
        var arrayDisplay = [];
        var currentUser = getCurrentUser();
        var rondaref = firebase.database().ref('utilities/ronda/'+currentUser.email.split("@")[0]);
          rondaref.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                arrayDisplay.push(childData);
                shuffle(arrayDisplay);
                makeRonda(arrayDisplay);
              });
            });
            
            
        debugger;
        //makeRonda(arrayDisplay);
        
    }
    function makeRonda(array) {
      var cant = array.length;

      if(cant == 2){
        cleanRondaDisplay();
        document.getElementById("name-12").innerHTML = array[0];
        document.getElementById("name-6").innerHTML = array[1];
      }
      else if(cant == 3){
        cleanRondaDisplay();

        document.getElementById("name-10").innerHTML = array[0];
        document.getElementById("name-2").innerHTML = array[1];
        document.getElementById("name-6").innerHTML = array[2];
      }
      else if(cant == 4){
        cleanRondaDisplay();

        document.getElementById("name-2").innerHTML = array[0];
        document.getElementById("name-4").innerHTML = array[1];
        document.getElementById("name-8").innerHTML = array[2];
        document.getElementById("name-10").innerHTML = array[3];
      }
      else if(cant == 5){
        cleanRondaDisplay();

        document.getElementById("name-12").innerHTML = array[0];
        document.getElementById("name-2").innerHTML = array[1];
        document.getElementById("name-5").innerHTML = array[2];
        document.getElementById("name-7").innerHTML = array[3];
        document.getElementById("name-10").innerHTML = array[4];
      }
      else if(cant == 6){
        cleanRondaDisplay();

        document.getElementById("name-12").innerHTML = array[0];
        document.getElementById("name-2").innerHTML = array[1];
        document.getElementById("name-4").innerHTML = array[2];
        document.getElementById("name-6").innerHTML = array[3];
        document.getElementById("name-8").innerHTML = array[4];
        document.getElementById("name-10").innerHTML = array[5];
      }
      else if(cant == 7){
        cleanRondaDisplay();

        document.getElementById("name-12").innerHTML = array[0];
        document.getElementById("name-2").innerHTML = array[1];
        document.getElementById("name-4").innerHTML = array[2];
        document.getElementById("name-6").innerHTML = array[3];
        document.getElementById("name-8").innerHTML = array[4];
        document.getElementById("name-10").innerHTML = array[5];
        document.getElementById("name-11").innerHTML = array[6];
      }
      else if(cant == 8){
        cleanRondaDisplay();

        document.getElementById("name-12").innerHTML = array[0];
        document.getElementById("name-2").innerHTML = array[1];
        document.getElementById("name-4").innerHTML = array[2];
        document.getElementById("name-6").innerHTML = array[3];
        document.getElementById("name-8").innerHTML = array[4];
        document.getElementById("name-10").innerHTML = array[5];
        document.getElementById("name-11").innerHTML = array[6];
        document.getElementById("name-1").innerHTML = array[7];
      }
      else{

        cleanRondaDisplay();

      for(var i = 0; i<cant;i++){
        switch(i){
          case 0:
            document.getElementById("name-1").innerHTML = array[i];
            break;
          case 1:
            document.getElementById("name-2").innerHTML = array[i];
            break; 
          case 2:
            document.getElementById("name-3").innerHTML = array[i];
            break; 
          case 3:
            document.getElementById("name-4").innerHTML = array[i];
            break; 
          case 4:
            document.getElementById("name-5").innerHTML = array[i];
            break; 
          case 5:
            document.getElementById("name-6").innerHTML = array[i];
            break;
          case 6:
            document.getElementById("name-7").innerHTML = array[i];
            break; 
          case 7:
            document.getElementById("name-8").innerHTML = array[i];
            break; 
          case 8:
            document.getElementById("name-9").innerHTML = array[i];
            break; 
          case 9:
            document.getElementById("name-10").innerHTML = array[i];
            break;
          case 10:
            document.getElementById("name-11").innerHTML = array[i];
            break;
          case 11:
            document.getElementById("name-12").innerHTML = array[i];
            break; 
          case 12:
            debugger;
            document.getElementById("name-1b").innerHTML =  array[i];
            break;
          case 13:
            document.getElementById("name-2").innerHTML = document.getElementById("name-2").innerHTML + "  \n\n " + array[i];
            break; 
          case 14:
            document.getElementById("name-3").innerHTML = document.getElementById("name-3").innerHTML + "  \n\n " + array[i];
            break;
          case 15:
            document.getElementById("name-4").innerHTML = document.getElementById("name-4").innerHTML + "  \n\n " + array[i];
            break; 
          case 16:
            document.getElementById("name-5b").innerHTML =  array[i];
            break;
          case 17:
            document.getElementById("name-6").innerHTML = document.getElementById("name-6").innerHTML + "     -      " + array[i];
            break; 
          case 18:
            document.getElementById("name-7b").innerHTML = array[i];
            break;
          case 19:
            document.getElementById("name-8b").innerHTML =  array[i];
            break;
          case 20:
            document.getElementById("name-9").innerHTML = document.getElementById("name-9").innerHTML + "  \n\n " + array[i];
            break;       
          case 21:
            document.getElementById("name-10").innerHTML = document.getElementById("name-10").innerHTML + "  \n\n " + array[i];
            break;    
          case 22:
            document.getElementById("name-11").innerHTML = document.getElementById("name-11").innerHTML + "  \n\n " + array[i];
            break;    
          case 23:
            document.getElementById("name-12").innerHTML = document.getElementById("name-12").innerHTML + "      -     " + array[i];
            break;    
        }
      } 
    }
   }

   function cleanRondaDisplay(){
    document.getElementById("name-1").innerHTML = "";
    document.getElementById("name-2").innerHTML = "";
    document.getElementById("name-3").innerHTML = "";
    document.getElementById("name-4").innerHTML = "";
    document.getElementById("name-5").innerHTML = "";
    document.getElementById("name-6").innerHTML = "";
    document.getElementById("name-7").innerHTML = "";
    document.getElementById("name-8").innerHTML = "";
    document.getElementById("name-9").innerHTML = "";
    document.getElementById("name-10").innerHTML = "";
    document.getElementById("name-11").innerHTML = "";
    document.getElementById("name-12").innerHTML = "";

  }
    function hideAll(){
        document.getElementById("userInfo").style.display = "none";

        document.getElementById("rondaButtonFather").style.display = "none";
    }

    function showAll(){
      document.getElementById("userInfo").style.display = "block";

    document.getElementById("rondaButtonFather").style.display = "block";
    }
    function logOut(){
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("Logged Out");
        clearCurrentUserData();

        hideAll();
        document.getElementById("loginButton").style.display = "block";


      }).catch(function(error) {
        console.log("Error Loggin Out")
        // An error happened.
      });
    }

    
    
