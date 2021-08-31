# QuestLab
<p>
    <img src="https://user-images.githubusercontent.com/73246484/131479445-8d8b214c-74dd-4364-9163-74aea1098f8e.png" alt="RBE logo" target="_blank" width="325" height="100">
  </a>
</p>

## Table of contents
- [About](#about)
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation guide](#installation-guide)


## About
Questlab is a website that allows the user to visualize his task or goals in a more convenient way. The user can log into his account where they can access or create labs (lab is refering to the task). A lab contains the description of the task, the plan that the user has created to achieve this task and also the resources that can make the task easier 

### Build with:
**Backend:** Django

**Frontend:** ReactJS

## Features
- Account for the user
- View task
- Create labs
- Add and view resources
- Add and view milestones

## Screenshots
- Login page
<img src="https://user-images.githubusercontent.com/73246484/131481796-06185428-6f15-449d-918d-7061ff38b1eb.png" width="800" />

- Homepage
<img src="https://user-images.githubusercontent.com/73246484/131481957-bcd57394-f941-4179-8aa4-7d0728c0c9a5.png" width="800" />

- View labs
<img src="https://user-images.githubusercontent.com/73246484/131482083-eadbb780-b536-4f49-82fd-5461555fa64d.png" width="800"/>

- Lab details
<img src="https://user-images.githubusercontent.com/73246484/131482177-359d219f-8fba-4b64-8b42-1dad860bee40.png" width="800"/>

- Create labs
<img src="https://user-images.githubusercontent.com/73246484/131482262-53dc1375-b03c-4db7-8ae7-335021a74532.png" width="800"/>

- Register user
<img src="https://user-images.githubusercontent.com/73246484/131482371-8beb6103-4509-44b5-abd3-88b04f93daa1.png" width="800"/>

## Installation guide

- Clone the repo `https://github.com/SilentCruzer/QuestLab.git`

#### For Frontend:

- go to the front-end directory `cd questlab-web`
- Install with npm `npm install`
- Runs the app in the development mode `npm start`
- Builds the app for production to the `build` folder `npm run build`

#### For Backend:

go to the back-end directory `cd Back-end`

Activate the virtualenv for your project.

Install project dependencies:

    $ pip install -r requirements/local.txt

Then simply apply the migrations:

    $ python manage.py migrate

You can now run the development server:

    $ python manage.py runserver
    
