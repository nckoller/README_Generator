import inquirer from "inquirer";
import fs from "fs";

// const inquirer = new inquirer();

function main() {
  const readMeConfigObj = {};
  getTitle(readMeConfigObj);
}

function getTitle(readMeConfigObj) {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is your project title?",
      },
    ])
    .then((answers) => {
      console.info("Answer:", answers.title);
      readMeConfigObj.title = answers.title;
      getDescription(readMeConfigObj);
    });
}

function getDescription(readMeConfigObj) {
  inquirer
    .prompt([
      {
        name: "description",
        type: "input",
        message: "Describe your project:",
      },
    ])
    .then((answers) => {
      console.info("Answer:", answers.description);
      readMeConfigObj.description = answers.description;
      getInstallInstructions(readMeConfigObj);
    });
}

function getInstallInstructions(readMeConfigObj) {
  inquirer
    .prompt([
      {
        name: "installation",
        type: "input",
        message: "How does the user install the project?",
      },
    ])
    .then((answer) => {
      console.info("Answer:", answer.installation);
      readMeConfigObj.installation = answer.installation;
      getUsageInformation(readMeConfigObj);
    });
}

function getUsageInformation(readMeConfigObj) {
  inquirer
    .prompt([
      {
        name: "usage",
        type: "input",
        message: "Write the Usage Information:",
      },
    ])
    .then((answer) => {
      console.info("Answer:", answer.usage);
      readMeConfigObj.usage = answer.usage;
      getContributionGuidelines(readMeConfigObj);
    });
}

function getContributionGuidelines(readMeConfigObj) {
  inquirer
    .prompt([
      {
        name: "contribution",
        type: "input",
        message: "Write the Contribution Guidelines:",
      },
    ])
    .then((answer) => {
      console.info("Answer:", answer.contribution);
      readMeConfigObj.contribution = answer.contribution;
      getTestInstructions(readMeConfigObj);
    });
}

function getTestInstructions(readMeConfigObj) {
  inquirer
    .prompt([
      {
        name: "testing",
        type: "input",
        message: "Write the testing instructions:",
      },
    ])
    .then((answer) => {
      console.info("Answer:", answer.testing);
      readMeConfigObj.testing = answer.testing;
      getLicense(readMeConfigObj);
    });
}

function getLicense(readMeConfigObj) {
  inquirer
    .prompt([
      {
        name: "license",
        type: "list",
        message: "Choose a license:",
        choices: ["MIT License", "ISC License", "Mozilla Public License 2.0"],
      },
    ])
    .then((answer) => {
      console.info(answer.license);
      readMeConfigObj.license = answer.license;
      getGitHubName(readMeConfigObj);
    });
}

function getGitHubName(readMeConfigObj) {
  inquirer
    .prompt([
      {
        name: "gitHubName",
        type: "input",
        message: "What is your GitHub username?",
      },
    ])
    .then((answer) => {
      console.info("Answer:", answer.gitHubName);
      readMeConfigObj.gitHubName = answer.gitHubName;
      getEmail(readMeConfigObj);
    });
}

function getEmail(readMeConfigObj) {
  inquirer
    .prompt([
      {
        name: "email",
        type: "input",
        message: "What is your email address?",
      },
    ])
    .then((answer) => {
      console.info("Answer:", answer.email);
      readMeConfigObj.email = answer.email;
      //   console.log(readMeConfigObj);
      readMeBuilder(readMeConfigObj);
    });
}

function readMeBuilder(readMeConfigObj) {
  let readMeText = "";
  const tableOfContents =
    "\n ## Table of Contents \n 1. [Installation](#installation) \n 2. [Usage](#usage) \n 3. [License](#license) \n 4. [Contributing](#contributing) \n 5. [Tests](#tests) \n 6. [Questions](#questions) \n \n";
  readMeText += parseTitle(readMeConfigObj.title);
  readMeText += parseDescription(readMeConfigObj.description);
  readMeText += parseBadge(readMeConfigObj.license);
  // add Table of Contents
  readMeText += tableOfContents;
  readMeText += parseInstallation(readMeConfigObj.installation);
  readMeText += parseUsageGuidelies(readMeConfigObj.usage);
  readMeText += parseLicense(readMeConfigObj.license);
  readMeText += parseContributionGuidelines(readMeConfigObj.contribution);
  readMeText += parseTesting(readMeConfigObj.testing);
  readMeText += parseContacts(
    readMeConfigObj.gitHubName,
    readMeConfigObj.email
  );
  console.log(readMeText);
  //create a README.md with readMeText as its content and a timestamp as its name
  const timeStamp = new Date();
  console.log(timeStamp);
  const timeStampString = Math.round(timeStamp.getTime() / 1000);
  const fileName = `${timeStampString}.md`;

  fs.writeFile(fileName, readMeText, function (err) {
    if (err) return console.log(err);
    console.log("Hello World > helloworld.txt");
  });
}

function parseTitle(title) {
  let titleString = "";
  titleString += `# ${title} \n \n`;
  return titleString;
}

function parseDescription(description) {
  let descriptionString = "";
  descriptionString += `## Description \n ${description}  `;
  return descriptionString;
}

function parseBadge(license) {
  let badgeIcon = "";
  if (license === "MIT License") {
    badgeIcon +=
      "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
  } else if (license === "ISC License") {
    badgeIcon +=
      "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)";
  } else if (license === "Mozilla Public License 2.0") {
    badgeIcon +=
      "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
  }
  return badgeIcon;
}

function parseInstallation(installation) {
  let installString = "";
  installString += `## Installation \n ${installation} \n`;
  return installString;
}

function parseUsageGuidelies(usage) {
  let usageString = "";
  usageString += `## Usage \n ${usage} \n`;
  return usageString;
}

function parseLicense(license) {
  let licenseString = "";
  licenseString += `## License \n This application is covered under the ${license}. \n`;
  return licenseString;
}

function parseContributionGuidelines(contribution) {
  let contributionString = "";
  contributionString += `## Contributing \n ${contribution} \n`;
  return contributionString;
}

function parseTesting(testing) {
  let testingString = "";
  testingString += `## Tests \n ${testing} \n`;
  return testingString;
}

function parseContacts(gitHubName, email) {
  let questionString = "";
  questionString += `## Questions \n For more information, please visit my GitHub profile at www.github.com/${gitHubName} or email me at ${email}.`;
  return questionString;
}

main();
// console.log("this ran");

// Figure out how to add License badge near the top of the README

// Table of Contents
