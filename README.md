---

<div align="center">
   <img src="https://i.imgur.com/gVFCPok.png" />
</div>

---

## How to host this bot (or any other bot) for free.
- Go to this link - https://my.optikservers.com/join/HTeOIIt2thUvxg0K
- Sign up to optikservers using the link above using your Discord account.
- Press the 'Create server' button in the top left corner.
- Give the server 80% cpu, 2000MB ram and 2gb disk/storage and mak sure to name it at the top
- Select the (Node.JS) option.
- Wait for the server to install.
- Follow the instructions in the how to use section.

## Notice
- Main branch MAY contain experimental / features that dont work yet! Unless you know 
  what you're doing use the latest release.
- This porject only contains 1 example command.
- We plan to add more commmands in the future.

## Requirements

- [Node.js](https://nodejs.org/en/) v16.11.0 or higher
- [Git](https://git-scm.com/downloads)
- [MongoDB](https://www.mongodb.com/)

## How to use
- Open the terminal and run the following commands

```
git clone https://github.com/qFlox/brightbo.git
npm install
```

### OR

- Download the .zip from the latest [release](https://github.com/qFlox/brightbo/releases) and upload it then run the following command.

```
npm install
```

- Wait for all the dependencies to be installed
- Change the values in config.js to match yours.
- Type `npm run start` in the terminal to start the bot

## Contributions // Pull requests
### To help keep this project alive, try contributing to help improve it.

We will review and help with all reasonable pull requests as long as the guidelines below are met.

- Pull requests containing commands should be placed like this - commands/(your-username-here)
- Pull requests containing commands should NEVER be added to existing command folders.
- Pull requests containing commands that require editing / addition to code outside of the command folder
should be changed normally.
- System-related files should be added to the `.gitignore`, never committed in pull requests.
- In general, check existing code to make sure your code matches relatively close to the code already in the project.
- Favour readability over compactness.

## Licensing
This project is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html). 

If you use **ANY** code from the source:
- You must disclose the source code of your modified work and the source code you took from this project. This means you are not allowed to use code from this project (even partially) in a closed-source and/or obfuscated application.
- You must state clearly and obviously to all end users that you are using code from this project.
- Your application must also be licensed under the same license.
