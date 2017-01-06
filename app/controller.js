/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 * 
 */
;(function() {

  angular
    .module('boilerplate')
    .controller('MainController', MainController);

  MainController.$inject = ['LocalStorage', 'QueryService', '$routeParams', '$scope','$sce','$window'];


  function MainController(LocalStorage, QueryService, $routeParams, $scope, $sce, $window) {

    // 'controller as' syntax
    var self = this;

    // Genesis 1 Verses
    var bibleVerses = [
      {"book": "Genesis", "chapter":"1", "verse":"1", "text":"In the beginning God created the heavens and the earth."},
      {"book": "Genesis", "chapter":"1", "verse":"2", "text":"Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters."}
    ];

    $scope.categoryName = $routeParams.categoryName;

    $scope.categoryNumber = $routeParams.categoryNumber;

    $scope.categoryId = $routeParams.categoryId;

    var blanks = 2;

    $scope.unanswered = blanks;
    $scope.correct = 0;
    $scope.incorrect = 0;

    console.log(bibleVerses);

    verse = "";

    if($scope.categoryId!=null){

    }
    $.each(bibleVerses, function(i, v){
      if(v.book == $scope.categoryName && v.chapter == $scope.categoryNumber && v.verse == $scope.categoryId){
        verse = v.text;
      }
    })

    // Remove punctuation.

    var verse = verse.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

    var verseArray = verse.split(" ");
    console.log(verseArray);
    var verseLength = verseArray.length;

    var verseRandom = [];

    for(var i = 0; i < blanks; i++){
      verseRandom.push(Math.floor((Math.random() * verseLength) + 1) - 1);
    }

    console.log(verseRandom);

    $scope.verse = "";

    for(var i = 0; i < verseLength; i++){
      if(verseRandom.includes(i)){
        $scope.verse += "<input class='verse' data-attr='" + verseArray[i] + "' style='display:inline;border-bottom:blue 3px solid;width:250px' type='text'/>";
      }
      else{
        console.log("Trying to add " + verseArray[i] + " for item " + i + " in array.");
        $scope.verse += verseArray[i] + " ";
      }
    }

    $scope.practiceHeader = "";
    $scope.practiceVerse = "";

    $scope.maxCount = 10;

    if(localStorage.getItem($scope.categoryName + $scope.categoryNumber + ":" + $scope.categoryId) === null){
      $scope.count = 1;
      $scope.practiceHeader = "First, practice a few times with the whole verse available.";
      $scope.practiceVerse = verse;
    }
    else{
      $scope.count = localStorage.getItem($scope.categoryName + $scope.categoryNumber + ":" + $scope.categoryId);
      if($scope.count<4){
        $scope.practiceHeader = "First, practice a few times with the whole verse available.";
        $scope.practiceVerse = verse;
      }
    }

    $(document).on("keyup",'.verse', function(){
      // get text value
      var value = $(this).val();
      
      // get data-attr
      var answer = $(this).data("attr");

      // compare text to data-attr beginning
      var correct = answer.startsWith(value);

      if(!correct){
        $(this).val(answer);
        $(this).css({"border-color" : "red"});
        this.disabled = true;
        var length = $(this).next('.verse').length;
        if(length>0){
          //$(this).next('.verse').focus();
        }
        else{
          $window.location.reload();
        }

      }

      if(value == answer){
        $(this).css({"border-color" : "green"});
        this.disabled = true;
        var length = $(this).next('.verse').length;
        if(length>0){
          //$(this).next('.verse').focus();
        }
        else{
          console.log("Complete");
          if(localStorage.getItem($scope.categoryName + $scope.categoryNumber + ":" + $scope.categoryId) === null){
            localStorage.setItem($scope.categoryName + $scope.categoryNumber + ":" + $scope.categoryId,1);
            $window.location.reload();
          }
          else{
            var count = parseInt(localStorage.getItem($scope.categoryName + $scope.categoryNumber + ":" + $scope.categoryId)) + 1;
            localStorage.setItem($scope.categoryName + $scope.categoryNumber + ":" + $scope.categoryId,count);

            // if count > maxCount move on
            if(count>$scope.maxCount){
              $window.location.href = "#/memorize/Genesis/1";
            }
            else{
              $window.location.reload();
            }
          }
          
        }
        
      }

      // after right/wrong, color text green or red and move to next input
      console.log(value + " vs " + correct);
    });
    

    $scope.verse = $sce.trustAsHtml($scope.verse);




    ////////////  function definitions


    /**
     * Load some data
     * @return {Object} Returned object
     */
    // QueryService.query('GET', 'posts', {}, {})
    //   .then(function(ovocie) {
    //     self.ovocie = ovocie.data;
    //   });
  }


})();