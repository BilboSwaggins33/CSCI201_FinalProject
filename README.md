# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.



# Contribution and Installation Steps

## 1. Fork the Repo from GitHub
   - Go to the main project repository on GitHub.
   - Click on the **"Fork"** button (located at the top right of the repository page).
   - This will create a **copy** of the repository under your GitHub account.
   - You can then work on your **fork** without affecting the original codebase.

## 2. Click the "Copy Main Branch" Checkbox (if applicable)
   - After forking the repository, GitHub may ask if you want to **copy the main branch**.
   - Make sure the **main branch** is selected and click the checkbox to ensure you're copying the correct branch from the original repo. This is important if there are multiple branches in the original repo.

## 3. Clone Your Fork to Your Local Machine
   - After forking the repository, you need to clone it to your local machine to start working on the project.
   - Open your terminal and run the following command (replace `yourusername` with your GitHub username):

     ```bash
     git clone https://github.com/yourusername/CSCI201_FinalProject.git
     ```

   - This creates a local copy of your fork on your computer.

## 4. Set Up a Remote for the Original Repo (Upstream)
   - In order to sync your fork with the latest changes from the **original repository**, you need to add a **remote** called `upstream`.
   - To do this, navigate to your local project directory and run the following command:

     ```bash
     git remote add upstream https://github.com/originalusername/CSCI201_FinalProject.git
     ```

   - This command links your local repository to the original **main repository** (also called the **upstream repo**).

## 5. Fetch and Pull the Latest Changes from `upstream/develop`
   - Before starting your work, you should always fetch and merge the latest changes from the **original repo** into your local project to avoid conflicts.
   - Run the following commands:
     
     ```bash
     git fetch upstream              # Fetch the latest changes from the upstream repo
     git checkout develop            # Switch to your local 'develop' branch
     git merge upstream/develop      # Merge the latest changes from upstream/develop into your local develop branch
     ```

   - This ensures that your local `develop` branch is up-to-date with the main repo's `develop` branch.

## 6. Work on a New Feature in a New Branch (Recommended)
   - It's best practice to create a **new branch** for each feature or bug fix to keep your work isolated and organized.
   - To create and switch to a new branch, run:

     ```bash
     git checkout -b your-feature-branch
     ```

   - Replace `your-feature-branch` with a descriptive name for the branch, such as `add-login-page` or `fix-bug-in-header`.

## 7. Make Changes and Commit Locally
   - Make changes to the codebase (add features, fix bugs, etc.).
   - After making changes, **stage** and **commit** them using the following commands:

     ```bash
     git add .                # Stages all changes
     git commit -m "Added new login page"   # Commits the changes with a message
     ```

   - Replace `"Added new login page"` with a brief description of the changes you made.

## 8. Push Changes to Your Fork
   - Once your changes are committed locally, **push** them to your fork on GitHub:

     ```bash
     git push origin your-feature-branch
     ```

   - This pushes your feature branch to your fork on GitHub.

## 9. Create a Pull Request (PR) to Merge Changes into the Main Repo's `develop` Branch
   - After pushing your changes, you can create a **Pull Request (PR)** to merge your changes into the **main repository**.
   - On GitHub, go to your fork, and you should see an option to **"Compare & Pull Request"**.
   - Click on this button and make sure that the **base repository** is the main repo, and the **base branch** is `develop`. The **compare branch** will be your feature branch.
   - Provide a description of your changes and click **Create Pull Request**.

## 10. Review and Merge PRs from Others
   - After your PR is created, it will be reviewed by other team members or the repo admins.
   - If the PR is approved, it will be **merged** into the `develop` branch of the **main repository**.
   - If changes are requested, address the feedback by pushing updates to your feature branch and the PR will automatically update.

## 11. Keep Your Fork in Sync with the Main Repository
   - It’s important to **sync your fork** with the main repository regularly to keep it up-to-date with any changes made by other contributors.
   - To do this, first fetch the latest changes from the main repository:

     ```bash
     git fetch upstream
     ```

   - Then, merge the latest changes into your local `develop` branch:

     ```bash
     git checkout develop
     git merge upstream/develop
     ```

   - If you have any new commits, push them to your fork as well:

     ```bash
     git push origin develop
     ```

---

## General Tips:
- Always **pull the latest changes** from `upstream/develop` before starting to work to avoid conflicts.
- Use **descriptive branch names** for features or bug fixes.
- When making a PR, provide a detailed description of the changes you made.
- **Test** your code locally before pushing to ensure everything works correctly.


