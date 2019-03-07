<!DOCTYPE html>
<html lang="en" ng-app="fleefood_app">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>FleeFood | Share your Food</title>

    <link rel="stylesheet" href="contents/css/main.css">
    <link rel="stylesheet" href="contents/css/header.style.css">
    <link rel="stylesheet" href="contents/css/landing-page.css">
    <link rel="stylesheet" href="contents/css/profile.style.css">
    <link rel="stylesheet" href="contents/css/footer.style.css">
    <link href="https://fonts.googleapis.com/css?family=Josefin+Sans" rel="stylesheet">
    
    <script src="app/lib/angular.min.js"></script>
    <script src="app/lib/angular-route.min.js"></script>
    <script src="app/app.js"></script>

    <script src="controllers/header-controller.js"></script>
    <script src="controllers/landing-page-controller.js"></script>
    <script src="controllers/login-controller.js"></script>
    <script src="controllers/profile-controller.js"></script>
</head>
<body>
   
    <?php if(!isset($_COOKIE['SNID'])): ?>
        <header ng-include="'contents/includes/header.html'" ng-controller="header-controller"></header>
    <?php endif; ?>

    <main ng-view></main>
    <footer>Copyright © 2019 Flee Food</footer>
</body>
  
</html>