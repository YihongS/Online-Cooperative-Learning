// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '640',
    width: '900',
    videoId: 'iP3fFSoAsj4',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

var videoTime = 0;
var timeUpdater = null;
var showingBoard = false;
var justShowedBoard = false;
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  // event.target.playVideo();不用管
  function updateTime() {
    var oldTime = videoTime;
    if(player && player.getCurrentTime) {
      videoTime = player.getCurrentTime();
    }
    if(videoTime !== oldTime) {
      onProgress(videoTime);
    }
  }
  timeUpdater = setInterval(updateTime, 100);
}

// when the time changes, this will be called.
function onProgress(currentTime) {
  console.log(currentTime);
  // if(currentTime >= 129 && currentTime < 130 && !showingBoard && !justShowedBoard) {
  //   console.log("Trigger");
  //   triggerScenePizza();//这里要有括号
  // }

  // 下面是我复制的
  if(currentTime >= 47 && currentTime < 48 && !showingBoard && !justShowedBoard) {
    console.log("Trigger");
    triggerSceneKc1();//这里要有括号
  }

  if(currentTime >= 72.6 && currentTime < 73.6 && !showingBoard && !justShowedBoard) {
    console.log("Trigger");
    triggerSceneKc2();//这里要有括号
  }

  if(currentTime >= 81.8 && currentTime < 82.8 && !showingBoard && !justShowedBoard) {
    console.log("Trigger");
    triggerSceneKc3();//这里要有括号
  }

  if(currentTime >= 91.5 && currentTime < 92.5 && !showingBoard && !justShowedBoard) {
    console.log("Trigger");
    triggerSceneKc4();//这里要有括号
  }

  if(currentTime >= 101 && currentTime < 102 && !showingBoard && !justShowedBoard) {
    console.log("Trigger");
    triggerSceneKc5();//这里要有括号
  }
  // 把上面的复制一堆
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    // setTimeout(triggerScenePizza, 6000);
    done = true;
  } else if (event.data == YT.PlayerState.ENDED) {
    setTimeout(triggerScenePasta, 0); // 结尾
  }
}
function playVideo() {
  player.playVideo();
}
function pauseVideo() {
  player.pauseVideo();
}

function hideBoard() {
  $('.scene').hide();
  $('#board').hide();
  showingBoard = false;
  setTimeout(function () {
    justShowedBoard = false;
  }, 2000);
}
function showBoard() {
  $('.scene').hide();
  $('#board').show();
  showingBoard = true;
  justShowedBoard = true;
}

function startScene(scene) {
  $(scene).fadeIn(function () {
    pauseVideo(); // For sure
  });
}
function continueScene(el) {
  var next = $(el).data('next');
  console.log(next);
  $(el).parent('.scene').fadeOut(function () {
    $(next).fadeIn(function () {
      if (next.includes('scene-timer')) {//播放声音
        document.getElementById('sound').play();
        // !!!!!!!!!!important!
        setTimeout(continueScene, 4, $(next).find('.btn-continue'));
      } else if (next.includes('scene-end')) {
        document.getElementById('ending').play();
      }
    });
  });
}

function explainpart(el){
  var next = $(el).data('next')
  $(el).parent().parent('.scene').fadeOut(function(){
    $(next).fadeIn(function(){
      if (next.includes('scene-timer')) {//播放声音
        document.getElementById('sound').play();
        setTimeout(continueScene, 4, $(next).find('.btn-continue'));
      } else if (next.includes('scene-end')) {
        document.getElementById('ending').play();
      }
    })
  })
}

function endScene(el) {
  $(el).parent('.scene').fadeOut(function () {
    hideBoard();
    playVideo();
  });
}

// 我加的
function triggerScenePasta() {
  pauseVideo();
  showBoard();
  startScene('#scene-title-pasta');
}
function triggerSceneExplain() {
  // pauseVideo();
  showBoard();
  startScene('#scene-explain');
}
function triggerSceneListen() {
  showBoard();
  startScene('#scene-listen');
}
function triggerSceneVideo1() {
  showBoard();
  startScene('#scene-video1');
}
function triggerSceneVideo2() {
  showBoard();
  startScene('#scene-video2');
}
function triggerSceneVideo3() {
  showBoard();
  startScene('#scene-video3');
}
function triggerSceneVideo4() {
  showBoard();
  startScene('#scene-video4');
}
function triggerSceneVideo5() {
  showBoard();
  startScene('#scene-video5');
}

function triggerScenePractice() {
  showBoard();
  startScene('#scene-title-practice');
}
function triggerSceneEnd() {
  showBoard();
  startScene('#scene-end');
}

// 下面是各种KC的self-explanation环节
function triggerSceneKc1(){
  pauseVideo();
  showBoard();
  startScene('#scene-kc1');
}
function triggerSceneKc2(){
  pauseVideo();
  showBoard();
  startScene('#scene-kc2');
}
function triggerSceneKc3(){
  pauseVideo();
  showBoard();
  startScene('#scene-kc3');
}
function triggerSceneKc4(){
  pauseVideo();
  showBoard();
  startScene('#scene-kc4');
}
function triggerSceneKc5(){
  pauseVideo();
  showBoard();
  startScene('#scene-kc5');
}

// 后面都不用改了
$(document).ready(function () {
  showBoard();
  $('#scene-start').show();
  // hideBoard();

  $('.btn-start').click(function () {
    hideBoard();
    playVideo();
    startScene('#scene-title');
  })

  $(".checkboxkc").change(function(){
    if ($('.checkboxkc:checked').length == $('.checkboxkc').length) {
       $('.btn-listen').removeClass('btn-disabled')
    }
    else{
      $('.btn-listen').addClass('btn-disabled')
    }
  })

  $('.btn-continue').click(function () {
    if (!$(this).hasClass('btn-disabled')) {
      continueScene(this);
    }
  })

  $('.btn-end').click(function () {
    endScene(this);
  })


  $('.icon-close').click(function () {
    continueScene($(this))
  })


  $('.btn-hintvideo').click(function () {
    explainpart($(this))
  })


  $('.btn-share').click(function () {
    var url = "https://vivigong.github.io/tol-microwave/";
    var text = "Do you know how microwave ovens work? Check this out! 😉";
    var twitterWindow = window.open('https://twitter.com/share?url=' + url + '&text=' + text, 'twitter-popup', 'height=350, width=600');
    if (twitterWindow.focus) {
      twitterWindow.focus();
    }
  })
  $('.option').click(function () {
    $(this).parent('.gallery').find('.option').removeClass('option-selected');
    $(this).addClass('option-selected');
  })
  $('.select .option').click(function () {
    var $btn = $(this).parent('.select').parent('.scene').find('.btn-continue');
    $btn.removeClass('btn-disabled');

    var next = $(this).data('next');
    var target = $(this).parent('.select').data('target');
    var $btnTarget = $(target).find('.btn-continue');
    $btnTarget.data('next', next);
  })
  $('.input-answer').on('change keyup paste', function() {
    var $btn = $(this).parents('.scene').find('.btn-continue');
    if ($(this).val().length === 0) {
      $btn.addClass('btn-disabled');
    } else {
      $btn.removeClass('btn-disabled');
    }
  })

  // 下面是对local storage的尝试
  var selfExplanation = '';
  $('#btn-continue-kc1').click(function(){
    selfExplanationKc1 = $('#input-answer-kc1').val();
    localStorage.setItem('selfExplanationKc1',JSON.stringify(selfExplanationKc1));
    var hintKc1 = JSON.parse(localStorage.getItem('selfExplanationKc1'));
    $('#self-explanation-kc1').text(hintKc1);
    $('#video-kc1').text(hintKc1);
  })

  $('#btn-continue-kc2').click(function(){
    selfExplanationKc2 = $('#input-answer-kc2').val();
    localStorage.setItem('selfExplanationKc2',JSON.stringify(selfExplanationKc2));
    var hintKc2 = JSON.parse(localStorage.getItem('selfExplanationKc2'));
    $('#self-explanation-kc2').text(hintKc2);
    $('#video-kc2').text(hintKc2);
  })

  $('#btn-continue-kc3').click(function(){
    selfExplanationKc3 = $('#input-answer-kc3').val();
    localStorage.setItem('selfExplanationKc3',JSON.stringify(selfExplanationKc3));
    var hintKc3 = JSON.parse(localStorage.getItem('selfExplanationKc3'));
    $('#self-explanation-kc3').text(hintKc3);
    $('#video-kc3').text(hintKc3);
  })

  $('#btn-continue-kc4').click(function(){
    selfExplanationKc4 = $('#input-answer-kc4').val();
    localStorage.setItem('selfExplanationKc4',JSON.stringify(selfExplanationKc4));
    var hintKc4 = JSON.parse(localStorage.getItem('selfExplanationKc4'));
    $('#self-explanation-kc4').text(hintKc4);
    $('#video-kc4').text(hintKc4);
  })

  $('#btn-continue-kc5').click(function(){
    selfExplanationKc5 = $('#input-answer-kc5').val();
    localStorage.setItem('selfExplanationKc5',JSON.stringify(selfExplanationKc5));
    var hintKc5 = JSON.parse(localStorage.getItem('selfExplanationKc5'));
    $('#self-explanation-kc5').text(hintKc5);
    $('#video-kc5').text(hintKc5);
  })

  // 下面是对分数计算的尝试

  var currentChoice;
  var optionChose;
  var score = 0;
  var countQ = 0;
  var countF = 0;

  var question1 = {
    problemStatement:'Microwaves are electric waves that could NOT penetrate?',
    optionA:'A. Food',
    optionB:'B. Ceramics',
    optionC:'C. Glass',
    optionD:'D. Metal',
    correctAnswer:'D. Metal'
  }

  var question2 = {
    problemStatement:'How does the microwave heat the food?',
    optionA:'A. Activating the water molecules in the food',
    optionB:'B. Heat the air inside the microwave oven.',
    optionC:'C. Heat the container of the food and then conduct the heat to the food',
    optionD:'D. Activating all the molecules in the food',
    correctAnswer:'A. Activating the water molecules in the food'
  }


  var question3 = {
    problemStatement:'In what order does the microwave heat the food?',
    optionA:'A. Heat the inside first then the outside',
    optionB:'B. Heat the outside first then the inside',
    optionC:'C. Heat all parts at the same time',
    optionD:'D. Heat in a random order',
    correctAnswer:'C. Heat all parts at the same time'
  }

  var question4 = {
    problemStatement:'After heated in the microwave oven, the ceramics container will be',
    optionA:'A. as hot as the food inside it',
    optionB:'B. hotter than the food inside it',
    optionC:'C. not as hot as the food inside it',
    optionD:'D. Uncertain',
    correctAnswer:'C. not as hot as the food inside it'
  }


  var question5 = {
    problemStatement:'Which of the following containers can not be used in a microwave oven?',
    optionA:'A. Plastic container',
    optionB:'B. Metal container',
    optionC:'C. Ceramics container',
    optionD:'D. Glass container',
    correctAnswer:'B. Metal container'
  }

  var question6 = {
    problemStatement:'Which of the following materials will absorb microwaves most easily?',
    optionA:'A. Metal',
    optionB:'B. Water',
    optionC:'C. Plastic',
    optionD:'D. Glass',
    correctAnswer:'B. Water'
  }

    var question7 = {
    problemStatement:'How does the water molecule get heated when exposed to microwave oven?',
    optionA:'A. The water molecule gets twisted back and forth and heated through friction',
    optionB:'B. The container conducts heat to the water molecule',
    optionC:'C. Other content in the food conducts heat to the water molecule',
    optionD:'D. The air in the microwave oven conducts heat to the water molecule',
    correctAnswer:'A. The water molecule gets twisted back and forth and heated through friction'
  }

    var question8 = {
    problemStatement:'The food heated in a microwave oven',
    optionA:'A. will be crispy and brown outside',
    optionB:'B. will be crispy and brown inside',
    optionC:'C. won’t get crispy and brown',
    optionD:'D. will be crispy and brown from inside to outside',
    correctAnswer:'C. won’t get crispy and brown'
  }

  var question9 = {
    problemStatement:'',
    optionA:'',
    optionB:'',
    optionC:'',
    optionD:'',
    correctAnswer:''
  }


  var questions = [question1,question2,question3,question4, question5, question6, question7, question8];
  var questionsCorrect = [];
  var feedbacks = [
  ["Correct. Microwaves are electromagnetic waves that could penetrate food, plastics, ceramics, glass, but will be reflected by metals.",
  "Incorrect. Microwaves are electromagnetic waves that could penetrate food, plastics, ceramics, glass, but will be reflected by metals."],

  ["Correct. Microwaves heat food by activating the polar molecules, majorly water molecules. ",
  "Incorrect. Microwaves heat food by activating the polar molecules, majorly water molecules, but not all the molecules in the food. The food containers are not heated. It is the conventional oven that   heats food by heating the air inside the microwave oven, not the microwave oven."],

  ["Correct. Microwaves heat all the water molecules in the food at the same time. So it heats all parts of the food at the same time.",
  "Incorrect. It is the conventional oven that heats food by heating the air and conduct the heat from the outside of the food to the inside, not the microwave oven. Microwaves heat all the water molecules in the food at the same time. So it heats all parts of the food at the same time."],

  ["Correct. Water-free solids barely absorb microwaves. That's why microwave-safe containers don't get as hot as the food inside them. ",
  "Incorrect. Ceramic is water-free and barely absorbs microwaves, whereas the water molecules in the food will be activated by microwaves and heated. That’s why the ceramic container won’t get as hot as the food inside it."],

  ["Correct. Since metal will reflect microwaves, food in the metal container will not get as hot as in other containers. So you's better not use metal container in a microwave oven.",
  "Incorrect. Since metal will reflect microwaves, it cannot be used in a microwave oven. All the other three containers can be penetrated by microwaves but barely absorb microwaves, which means they are suitable to be used in a microwave oven."],

  ["Correct. Microwaves heat food by activating the water molecules in the food.",
  "Incorrect. Metal will reflect microwaves. Plastic and glass barely absorb microwaves. Water absorbs microwaves most easily and get heated."],

  ["Correct. Because the field reverses 2.5 billion times a second, the water molecules are being twisted back and forth rapidly when exposed to the microwave’s electric field. They rub into each other, which will create friction and produce heat. ",
  "Incorrect. Because the field reverses 2.5 billion times a second, the water molecules are being twisted back and forth rapidly when exposed to the microwave’s electric field. They rub into each other, which will create friction and produce heat. "],

  ["Correct. Microwaves penetrate the food, and excite the water and fat molecules more or less evenly throughout. Since the air inside the microwave oven is room temperature, foods don’t get brown or crispy as they would in a conventional oven. ",
  "Incorrect. Microwaves penetrate the food, and excite the water and fat molecules more or less evenly throughout. Since the air inside the microwave oven is room temperature, foods don’t get brown or crispy as they would in a conventional oven. "],

  ["Correct. In a conventional oven, heats needs to migrate by conduction from the outside of the food toward the middle. Hot, dry air on the outside evaporates moisture, so the outside could be crispy and brown while the inside is still moist. Microwaves penetrate the food, and excite the water and fat molecules more or less evenly throughout. Since the air inside the microwave oven is room temperature, foods don’t get brown or crispy as they would with other forms of cooking.",
  "Incorrect. In a conventional oven, heats needs to migrate by conduction from the outside of the food toward the middle. Hot, dry air on the outside evaporates moisture, so the outside could be crispy and brown while the inside is still moist. Microwaves penetrate the food, and excite the water and fat molecules more or less evenly throughout. Since the air inside the microwave oven is room temperature, foods don’t get brown or crispy as they would with other forms of cooking. "],

  ["Correct. In a conventional oven, heats needs to migrate by conduction from the outside of the food toward the middle. Hot, dry air on the outside evaporates moisture, so the outside could be crispy and brown while the inside is still moist. Microwaves penetrate the food, and excite the water and fat molecules more or less evenly throughout. Since the air inside the microwave oven is room temperature, foods don’t get brown or crispy as they would with other forms of cooking.",
  "Incorrect. In a conventional oven, heats needs to migrate by conduction from the outside of the food toward the middle. Hot, dry air on the outside evaporates moisture, so the outside could be crispy and brown while the inside is still moist. Microwaves penetrate the food, and excite the water and fat molecules more or less evenly throughout. Since the air inside the microwave oven is room temperature, foods don’t get brown or crispy as they would with other forms of cooking. "]

 ]




  // 改了这一行
  var optionsChoseArray = [];



  // 改了这一行
  var optionsChoseArray = [];

  $('.option-q').click(function(){
    currentChoice = $(this).children().text();
    console.log('current'+ currentChoice);
    var $btn = $(this).parent('.select').parent('.scene').find('.btn-continue-q');
    $btn.removeClass('btn-disabled');
  })
  console.log(score);

  $('.btn-continue-q').click(function(){
    // if($('#scene-end')){
    //     $('.feedback-icon').removeClass('displayed-icon').addClass('hidden-icon');
    //     console.log('remove掉啦');
    //   }
    //   else{
    //     $('.feedback-icon').removeClass('hidden-icon').addClass('displayed-icon')
    //     console.log('又出现了！！！');
    //   }

    optionChose = currentChoice;
    // 改了这一行
    optionsChoseArray[countQ] = optionChose;
    console.log('final'+ optionChose);
    console.log('optionChose='+ optionChose);
    console.log('countQ='+countQ);
    if (countQ <= 7 && optionChose == questions[countQ].correctAnswer){
      score = score + 1;
      questionsCorrect[countQ] = true;
      console.log('score='+ score);
    }
    else{
      console.log("!===")
      questionsCorrect[countQ] = false;
    }

    if(countQ <= 7){
      countQ = countQ + 1;
      console.log('countQ='+countQ);
      console.log('score='+ score);

    }

    // End of question and go to feedbacks
    if(countQ == questions.length){
      // var countF = countQ- 7;

      $('.feedback-icon').removeClass('hidden-icon').addClass('displayed-icon');
      console.log('显示出来了')

      console.log('countF='+countF);
      $('#final-score').text(score);

      // Collaboration Feedbacks
      var l1Score = 0;
      if (questionsCorrect[0]) {
        l1Score += 1;
      }
      if (questionsCorrect[3]) {
        l1Score += 1;
      }
      if (questionsCorrect[4]) {
        l1Score += 1;
      }
      if (questionsCorrect[5]) {
        l1Score += 1;
      }

      var l2Score = 0;
      if (questionsCorrect[1]) {
        l2Score += 1;
      }
      if (questionsCorrect[2]) {
        l2Score += 1;
      }
      if (questionsCorrect[6]) {
        l2Score += 1;
      }
      if (questionsCorrect[7]) {
        l2Score += 1;
      }

      if (l1Score+l2Score==score) {
        console.log('Two Scores working great')
      }
      else{
        console.log('Two Scores having trouble')
      }

      $('#l1-score').text(l1Score);
      $('#l2-score').text(l2Score);

      if (l2Score >= 3) {
        $('#col-feedback').text('Great collaboration! Your partner taught you very well! Share this good news with him/her!')
      } 
      else {
        $('#col-feedback').text('Seems like you still have some ambiguity on what your partner taught you.')
      }

      // $('.feedback-icon').removeClass('hidden-icon').addClass('displayed-icon')
        // startScene('#scene-question-1');
      if (countF > 7) {
      console.log('where is countF='+countF)
      startScene('#scene-share');
      $('.feedback-icon').removeClass('displayed-icon').addClass('hidden-icon');
      }

      $('#btn-continue-q').addClass("btn-continue-feedback");
      $('#exam-question').text('Question '+(countF+1)+': Feedback');
      $('#problem-statement').text(questions[countF].problemStatement);
      $('#optionA p').text(questions[countF].optionA);
      $('#optionB p').text(questions[countF].optionB);
      $('#optionC p').text(questions[countF].optionC);
      $('#optionD p').text(questions[countF].optionD);
      $('.option').attr("disabled","true");
      console.log('disabled success')
      if (countF == 0) {
        $('#optionD').parent().append("<p id='feedback-text'>Appended feedback text</p>");
        startScene('#scene-end');
        $('.feedback-icon').removeClass('displayed-icon').addClass('hidden-icon');
      }

      // if($('h2').text()=="Congratulation!!!"){
      //   $('.feedback-icon').removeClass('displayed-icon').addClass('hidden-icon');
      //   console.log('remove掉啦');
      // }
      // else{
      //   console.log('没remove掉！！！');
      // }




      // remove btn-disabled
      $('.btn-continue-q').removeClass('btn-disabled')
      // remove css .option-selected
      $('.option').removeClass('option-selected')
      $('.option').css({"border": "none"});

      // Change the test scene
      $("p:contains("+optionsChoseArray[countF]+")").parent().css({"border": "3px solid #A63E26"});
      // Check which option is the correct option
      Object.keys(questions[countF]).forEach(function(key){
        console.log(key,questions[countF][key]);
        if (questions[countF][key] == questions[countF].correctAnswer) {
          $("#" + key).addClass('option-border-green');
          $("#" + key).css({"border":"3px solid #26A69A"});
          console.log('green border has been added')
          console.log(questions[countF][key]+'is the correct answer')
        }
      });

      // the feedback
      if(questionsCorrect[countF]){
        console.log('where is countF='+countF)
        $('.gallery #feedback-text').text(feedbacks[countF][0]);
        console.log('judge correct'+feedbacks[countF][0]);
        $('.feedback-icon').children('i').removeClass('fa-times-circle').addClass('fa-check-circle');
      }
      else{
        console.log('where is countF='+countF)
        $('.gallery #feedback-text').text(feedbacks[countF][1]);
        console.log('judge incorrect'+feedbacks[countF][1])
        $('.feedback-icon').children('i').removeClass('fa-check-circle').addClass('fa-times-circle');
      }
      // add countF
      countF += 1;
      console.log('countF='+countF);


    }
      else{
        if (!$(this).hasClass('btn-disabled')) {
          $(this).parent('.scene').find('.gallery .option').removeClass('option-selected');
          var $btn = $(this).parent('.scene').find('.btn-continue-q');
          $btn.addClass('btn-disabled');
          $('#exam-question').text('Questions '+(countQ+1));
          $('#problem-statement').text(questions[countQ].problemStatement);
          $('#optionA p').text(questions[countQ].optionA);
          $('#optionB p').text(questions[countQ].optionB);
          $('#optionC p').text(questions[countQ].optionC);
          $('#optionD p').text(questions[countQ].optionD);
        }
      }

  })

  $('#btn-continue-feedback').click(function(){
    // countF += 1;
    console.log('feedbackcount='+ countF);

    if(countF == feedbacks.length){
      startScene('#scene-end');
      console.log('#scene-end');
    }
    else{
      console.log("not end")
      if(questionsCorrect[countF]){
        $('#feedback-text').text(feedbacks[countF][0])
        console.log('judge correct'+feedbacks[countF][0])
      }
      else{
        $('#feedback-text').text(feedbacks[countF][1])
        console.log('judge incorrect'+feedbacks[countF][1])
      }
    }
  })


})

// var hint1 = false;
//   $('#btn-hint1').click(function(){
//     if (!hint1) {
//       // $( "<p class='hint-text'>Microwaves are electromagnetic waves. </p>" ).insertAfter( "#textbox-and-hint-1" );
//       $('#input-answer-kc1').attr("placeholder", "Microwaves are electromagnetic waves.");
//       hint1 = true;
//       $('#btn-hint1').addClass('btn-disabled')

//     };
//   })

  $('#btn-hint1').click(function(){
    $('#input-answer-kc1').val('');
    $('#input-answer-kc1').attr("placeholder", "Hint: Microwaves are electromagnetic waves.");
    var $btn = $(this).parents('.scene').find('.btn-continue');
    if ($(this).val().length === 0) {
      $btn.addClass('btn-disabled');
    } else {
      $btn.removeClass('btn-disabled');
    }
  })

  $('#btn-hint2').click(function(){
    $('#input-answer-kc2').val('');
    $('#input-answer-kc2').attr("placeholder", "Hint: Microwaves are easily absorbed by water, fat, and sugar, but not by most plastics, ceramics, or glasses. These waves are converted into heates when they are absorbed.");
    var $btn = $(this).parents('.scene').find('.btn-continue');
    if ($(this).val().length === 0) {
      $btn.addClass('btn-disabled');
    }
    else {
      $btn.removeClass('btn-disabled');
    }
  })

  $('#btn-hint3').click(function(){
    $('#input-answer-kc3').val('');
    $('#input-answer-kc3').attr("placeholder", "Hint: The microwaves are at the right frequency to penetrate deep into food and they deliver cooking power primarily to the food's water content. ");
    var $btn = $(this).parents('.scene').find('.btn-continue');
    if ($(this).val().length === 0) {
      $btn.addClass('btn-disabled');
    } else {
      $btn.removeClass('btn-disabled');
    }
  })

  $('#btn-hint4').click(function(){
    $('#input-answer-kc4').val('');
    $('#input-answer-kc4').attr("placeholder", "Hint: Water-free solids barely absorb microwaves. That's why microwave-safe containers don't get as hot as the food inside them. ");
    var $btn = $(this).parents('.scene').find('.btn-continue');
    if ($(this).val().length === 0) {
      $btn.addClass('btn-disabled');
    } else {
      $btn.removeClass('btn-disabled');
    }
  })

  $('#btn-hint5').click(function(){
    $('#input-answer-kc5').val('');
    $('#input-answer-kc5').attr("placeholder", "Hint: Metal will reflect microwaves, which is why you shouldn't use metal plates or foil in these devices. ");
    var $btn = $(this).parents('.scene').find('.btn-continue');
    if ($(this).val().length === 0) {
      $btn.addClass('btn-disabled');
    } else {
      $btn.removeClass('btn-disabled');
    }
  })


  

