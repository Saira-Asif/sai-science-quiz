#!  /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let apiLink: string =
  "https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple";

let fetchData = async (data: string) => {
  let fetchQuiz: any = await fetch(data);
  let res = await fetchQuiz.json();
  return res.results;
};

let Data = await fetchData(apiLink); //?The api will return information in the form og arrays of objects.

let startQuiz = async () => {
  let score: number = 0;

  //?For user name:
  let name = await inquirer.prompt({
    type: "input",
    name: "Fname",
    message: "What is your name?" as any,
  });

  console.log(chalk.cyanBright(`Welcome to the quiz ${name.Fname}!`));

  for (let i = 0; i < 10; i++) {
    let answers = [...Data[i].incorrect_answers, Data[i].correct_answer];
    let shuffledAnswers = answers.sort(() => Math.random() - 0.5);
    let ans = await inquirer.prompt({
      name: "quiz",
      type: "list",
      message: Data[i].question,
      choices: shuffledAnswers.map((val: any) => val),
    });
    if (ans.quiz == Data[i].correct_answer) {
      score++;
      console.log(chalk.bold.italic.green("Correct!"))
    } else {
        console.log(chalk.bold.italic.red("Incorrect!"));
        console.log(chalk.bold.cyan(`Correct Answer: ${Data[i].correct_answer}`))
    }
  };
  console.log(
    `Dear ${chalk.blue.bold(name.Fname)}, You score is ${chalk.green.bold(
      score
    )} out of ${chalk.red.bold(10)}.`
  );
};

startQuiz();
