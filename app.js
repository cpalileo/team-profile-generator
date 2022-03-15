//----Required Packages----//
const inquirer = require("inquirer");

//----Other Packages Used----//
const fs = require("fs");
const jest = require("jest");

//----Classes----//
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const empArr = [];

//----Questions for the different team member class----//
const promptMgr = [
  {
    type: "input",
    message: "What is the name of the team's manager?",
    name: "name",
  },
  {
    type: "input",
    message: "What is the team manager's employee ID number?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the team manager's email address?",
    name: "email",
  },
  {
    type: "input",
    message: "What is the team manager's office number?",
    name: "officeNumber",
  },
];

const promptEngr = [
  {
    type: "input",
    message: "What is the engineer's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is the engineer's employee ID number?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the engineer's email address?",
    name: "email",
  },
  {
    type: "input",
    message: "What is the engineer's GITHub account?",
    name: "github",
  },
];

const promptInt = [
  {
    type: "input",
    message: "What is the intern's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is the intern's employee ID number?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the intern's email address?",
    name: "email",
  },
  {
    type: "input",
    message: "What school does the intern attend?",
    name: "school",
  },
];

//---------- Function asking for team information and calling the generate HTML ----------//
function init() {
  inquirer.prompt(promptMgr).then((answers) => {
    const dataMgr = new Manager(
      answers.name,
      answers.id,
      answers.email,
      answers.officeNumber
    );
    empArr.push(dataMgr);
    addTeamMember();
  });

  function addTeamMember() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Do you want to add any more members to your team?",
          name: "teamMember",
          choices: ["Add engineer", "Add intern", "Generate Web Page"],
        },
      ])
      .then((answer) => {
        if (answer.teamMember == "Add engineer") {
          addEngineer();
        } else if (answer.teamMember === "Add intern") {
          addIntern();
        } else {
          console.log(
            "Your web page is being generated under file name index.html"
          );
          generateHTML("./src/index.html", html(empArr));
        }
      });
  }

  function addEngineer() {
    inquirer.prompt(promptEngr).then((answers) => {
      const newEngineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      empArr.push(newEngineer);
      addTeamMember();
    });
  }

  function addIntern() {
    inquirer.prompt(promptInt).then((answers) => {
      const newIntern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      empArr.push(newIntern);
      addTeamMember();
    });
  }

  function generateHTML(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
      err ? console.log(err) : console.log("Generated index.html")
    );
  }

  //----Pushes Gathered Data into teamHTML Array----//
  function html(data) {
    const teamHTML = [];
    let managerArr = data.filter(
      (TeamMember) => TeamMember.getRole() === "Manager"
    );

    managerArr.forEach((Manager) => {
      const classData = `
        <div class="col-sm-5">
          <div class="classData">
            <div class="classHeader">
              <img src="../assets/images/golf.png" width="75" height="75">
              <h2>${Manager.name},</h2>
              <h2>Manager</h2>
            </div>
            <div class="classData-body">
              <ul class="card">
                <li class="cardItem id">ID: ${Manager.id}</li>
                <li class="cardItem email">Email: <a href="mailto:${Manager.email}">${Manager.email}</a></li>
                <li class="cardItem info">Office Number: ${Manager.officeNumber}</li>
              </ul>
            </div>    
          </div>
        </div>`;
      teamHTML.push(classData);
    });

    let engineerArr = data.filter(
      (TeamMember) => TeamMember.getRole() === "Engineer"
    );

    engineerArr.forEach((Engineer) => {
      const classData = `
        <div class="col-sm-5">
          <div class="classData">
            <div class="classHeader">
              <img src="../assets/images/engr.png" width="75" height="75">
              <h2>${Engineer.name},</h2>
              <h2>Engineer</h2>
            </div>
            <div class="classData-body">
              <ul class="card">
                <li class="cardItem id">ID: ${Engineer.id}</li>
                <li class="cardItem email">Email: <a href="mailto:${Engineer.email}">${Engineer.email}</a></li>
                <li class="cardItem github">GitHub: <a href="https://github.com/${Engineer.github}"  target="_blank">${Engineer.github}</a></li>
              </ul>
            </div>    
          </div>
        </div>`;
      teamHTML.push(classData);
    });

    let internArr = data.filter(
      (TeamMember) => TeamMember.getRole() === "Intern"
    );

    internArr.forEach((Intern) => {
      const classData = `
        <div class="col-sm-5">
          <div class="classData">
            <div class="classHeader">
                <img src="../assets/images/sleep.png" width="75" height="75">
                    <h2>${Intern.name},</h2>
                    <h2>Intern</h2>
              </div>
              <div class="classData-body">
                <ul class="card">
                  <li class="cardItem id">ID: ${Intern.id}</li>
                  <li class="cardItem email">Email: <a href="mailto:${Intern.email}">${Intern.email}</a></li>
                  <li class="cardItem school">School: ${Intern.school}</li>
                </ul>
              </div>    
            </div>
          </div>`;
      teamHTML.push(classData);
    });

    const allClasses = teamHTML.join("");
    const completeData = generateHtmlFile(allClasses);
    return completeData;
  }

  module.exports = html;
}

//----Generates HTML File Using Card Data----//

function generateHtmlFile(data) {
  const htmlFile = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="../assets/css/style.css">
        <title>My Team</title>
      </head>
      <body>
        <header>
          <h1>My Team</h1>
        </header>
        
        <main>
          <div class="indivClass container">
            <div class="groupClass">
              ${data}
            </div>    
          </div> 
        </main>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>    </body>
    </html>
            `;
  return htmlFile;
}

//----------Initializes App----------//
init();
