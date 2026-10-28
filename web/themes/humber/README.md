# Humber Theme

The Humber theme is a Drupal theme created for Drupal 10 sites. It should be safe to import the theme into any Drupal 10 site which needs to use it.

This README.md contains a brief explanation of how to modify and use this theme: 

- [Usage](#usage): How to import the theme and push/pull changes
- [Modifying the Theme](#modifying-the-theme): How to modify the theme for your own use

## Usage

### Git

Git is used to import the file into a project, and to push and pull changes. 

#### Importing Humber Theme into a Drupal Site

You can add the Humber Theme as a git subtree into your `web/themes` directory using the command: 

```shell
git subtree add --prefix=web/themes/humber --squash https://github.com/Humber-ITS/humber main

# Command Explanation
git subtree add --prefix=new-subtree-directory --squash repository-link branch-name

# new-subtree-directory: The directory where to add the subtree
# squash: Squashes git history into a single commit without retaining repository history
# repository-link: The repository you are trying to add as a subtree
# branch-name: Which branch of the above repository to add
```

#### Pulling Changes

You can pull updates from the sub tree repository using the command: 

```shell
git subtree pull --prefix=web/themes/humber --squash https://github.com/Humber-ITS/humber main
```

#### Pushing Changes

You can also push changes to the subtree repository using the command: 

```shell
git subtree push --prefix=web/themes/humber https://github.com/Humber-ITS/humber main
```

## Modifying the Theme

This theme is built using a combination of JavaScript, SCSS, and Twig templates. In addition, a number of yaml files configure the theme and set which javascript and css files should be used, and which ones extend or overwrite core files. A basic understanding of how themes work is required to modify this theme. 

### Basic Info

#### Breakpoints

This theme uses 6 breakpoints, each containing a X1 multiplier for regular devices, and a X2 multiplier for retina devices. The available sizes are mobile(`xs`, `sm`), small desktop(`md`, `lg`), and large desktop(`xl`, `xxl`). 

The breakpoints are defined in a yaml file as well as `/scss/abstract/_breakpoints.scss` file where it is defined as a mixin. Further information is included in the yaml and scss sections below. 

### Yaml

There are a number of yaml (`.yml`) files in the root of the theme which are mandatory for the theme to be recognized by Drupal and function correctly.  

#### humber.info.yml

This file contains the theme name, version and base theme. It also lists the libraries used in the theme. 

#### humber.libraries.yml

This file defines the libraries used by the theme. It contains the base CSS and JavaScript files the theme should use. It also defines whether core or base theme files should be extended, replaced or ignored. New CSS and JavaScript must be added to this file in order to be recognized and used by the theme.

#### humber.breakpoints.yml

This file lists the breakpoints used by this theme. This file is mainly for modules such as the Responsive Images module and is not used internally within the theme.

### JavaScript

The JavaScript files used by the theme are located in `/js/`. Currently, the JavaScript is not built using any kind of formatting or standard, although this may be updated in the future. 

#### Jquery

Jquery is imported from core and is used often within the JavaScript files. 

### SCSS

The theme styling is made using SASS, specifically using the `.scss` format and styling. 

The SASS files must be compiled into CSS which should mirror the SCSS folders and files. The exception is the `scss/abstracts/` directory which contain mixins and helper files that are imported into other SCSS files, but are not compiled into their own separate files. These CSS files must be added to `humber.libraries.yml` or they will have no effect.

You can compile the SASS files using any tool so long as the compiled CSS files match the folder structure of the SASS. Ideally, you can import the `watch.sh` shell script and set up a rule in `package.json` to run the script using `npm run watch`. This script automatically watches the `/scss/` directory and processes any new and existing files into valid CSS. 

### Twig

Twig templates are used to generate the HTML files for the site and are located in `/templates/`. When Twig debugging is enabled, Drupal outputs comments into the page source which can be used to determine which Twig file was used to generate that section of the site. 

### Starterkit_theme

This theme was generated using Drupal 10 starterkit_theme. The Humber theme is a sub theme of Stable 9.

Additional information on generating themes can be found in the [Starterkit documentation](https://www.drupal.org/docs/core-modules-and-themes/core-themes/starterkit-theme).

### Known Bugs

#### watch.sh multi-instance bug

The `watch.sh` script can sometimes open multiple instances, only one of which can be closed normally. To remedy this, the script was modified to create a `watch.lock` file when it initializes, and delete the file when closed. This only happens when the script is closed using the **Enter** key. If the script is killed with `Ctrl + C` then the lock file is not deleted, and watch cannot be enabled.

If this happens by mistake, the solution is to delete the `watch.lock` file manually and reopen the script. 

In the event that multiple instances still start somehow, you can kill them by running the command `pkill -f "sass --watch"`. This is **recommended** if you accidentally closed the script with `Ctrl + C` as an instance may be running in the background still, although this is unlikely. 

