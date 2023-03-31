const quizData = [
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Cascading Style Sheet",
    c: "Jason Object Notation",
    d: "Hypertext Markdown Language ",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
  {
    question: "What does CSS stands for?",
    a: "Hypertext Markup Language",
    b: "Cascading Style Sheet",
    c: "Jason Object Notation",
    d: "Cover Style Sheet",
    correct: "b",
  },
  {
    question: "Which of the following is a client site language?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "Which of the following is not a Programming language",
    a: "Javascrip",
    b: "C#",
    c: "HTML",
    d: "Python",
    correct: "c",
  },
  {
    question: "Which company created Javascript language",
    a: "Oracle",
    b: "Microsoft",
    c: "Netscape",
    d: "Google",
    correct: "c",
  },
  {
    question: "Which of the following is not a Javascript framework",
    a: "Springboot",
    b: "Node.js",
    c: "React",
    d: "Angular",
    correct: "a",
  },
  {
    question: "Which HTML tag is used to break a line",
    a: "<break>",
    b: "<br>",
    c: "<brk>",
    d: "</n>",
    correct: "b",
  },
  {
    question:
      "Which of the following function of Array object removes the last element from an array and returns that element?",
    a: "push()",
    b: "pop()",
    c: "join()",
    d: "remove()",
    correct: "b",
  },
  {
    question: "The '#' symbol specifies that the selector is",
    a: "class",
    b: "tag",
    c: "id",
    d: "universal",
    correct: "c",
  },
];
let index = 0;
let correct = 0,
  incorrect = 0,
  attempted = 0;
total = quizData.length;
document.getElementById("total").innerText = `: ${total}`;

let questionBox = document.getElementById("questionBox");
let questionNum = document.getElementById("question_no");
let allInputs = document.querySelectorAll("input[type='radio']");
let score_count = document.getElementById("score_count");
let correct_count = document.getElementById("correct_answer");
let incorrect_count = document.getElementById("wrong_answer");

score_count_value = 0;

// LOADING QUESTION
const loadQuestion = () => {
  if (total === index) {
    return quizEnd();
  }
  reset();

  const data = quizData[index];
  questionNum.innerText = `Question No. ${index + 1}`;
  questionBox.innerHTML = `${data.question}`;
  allInputs[0].nextElementSibling.innerText = data.a;
  allInputs[1].nextElementSibling.innerText = data.b;
  allInputs[2].nextElementSibling.innerText = data.c;
  allInputs[3].nextElementSibling.innerText = data.d;
};

// Submit click function
document.querySelector("#submit").addEventListener("click", function () {
  const data = quizData[index];
  const ans = getAnswer();
  if (ans == undefined || ans == null) {
    alert("please select one Option");
  } else {
    let options = ["a", "b", "c", "d"];
    ans_no = options.indexOf(ans);
    if (ans === data.correct) {
      allInputs[ans_no].nextElementSibling.classList.add("correct_answer");

      score_count_value++;
      correct++;
    } else {
      allInputs[ans_no].nextElementSibling.classList.add("incorrect_answer");
      allInputs[options.indexOf(data.correct)].nextElementSibling.classList.add(
        "correct_answer"
      );
      incorrect++;
    }

    attempted++;

    score_count.innerText = `${10 * score_count_value}`;
    correct_count.innerText = `: ${correct}`;
    incorrect_count.innerText = `: ${incorrect}`;
    document.getElementById("attempted").innerText = `: ${attempted}`;
    document.getElementById("submit").disabled = true;
    document.getElementById("next").disabled = false;
  }
});

//
document.querySelector("#next").addEventListener("click", function () {
  index++;
  loadQuestion();
});

const getAnswer = () => {
  let ans;
  allInputs.forEach((inputEl) => {
    if (inputEl.checked) {
      ans = inputEl.value;
    }
  });
  return ans;
};

const reset = () => {
  allInputs.forEach((inputEl) => {
    document.getElementById("submit").disabled = false;
    document.getElementById("next").disabled = true;

    inputEl.checked = false;
    inputEl.nextElementSibling.classList.remove("incorrect_answer");
    inputEl.nextElementSibling.classList.remove("correct_answer");
  });
};

const quizEnd = () => {
  document.getElementsByClassName("container")[0].innerHTML = `
        <div class="result_display" >
            <h1 class="w-100"> Your score is ${10 * score_count_value} out of ${
    total * 10
  } </h1>
           
           <div> <h3 class="w-100"><pre>Attempted&nbsp: ${attempted} / ${total}</pre></h3><br>
            <h3 class="w-100"><pre>Correct&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: ${correct} / ${total}</pre></h3><br>
            <h3 class="w-100"><pre>Incorret&nbsp&nbsp&nbsp&nbsp&nbsp: ${incorrect} / ${total}</pre> </h3><br>
            </div>
            <button id="restart" onClick="window.location.reload()">Restart</button>

        </div>
    `;
};

function startQuiz() {
  let welcome = document.getElementById("welcomePage");
  welcome.classList.add("inactive");

  let quizPage = document.getElementById("quiz_page");
  quizPage.classList.remove("inactive");
  loadQuestion(index);
}
