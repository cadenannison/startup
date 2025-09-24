# CS 260 Notes

## Practice Using git and markdown

I just started learning how to use the commands for Git. 
I learned how to use these:
```
git clone
git pull
git commit -am "update notes"
git push
git log
git checkout
```
git commit -am --> a is for add and m is a comment
git diff HEAD HEAD~1  -> difference between commits
I also learned about using the "git status" and "git fetch" commands

Markdown: I learned a few syntax specifications for **using** _markdown_ more <ins>effectively</ins>

Images: I learned that you need to make a relative path i.e. don't put a "/" in front of the path and do it respective to the root of the repository 

`![Design image](images/RiseAndPlay.png)`

## Secure Sign in 
'''
ssh -i [key pair file] ubuntu@[yourdomainnamehere]

ssh -i ~/.ssh/production.pem ubuntu@54.84.3.178
'''

## HTML and CSS


I have learned a ton about HTML and CSS recently. 

<p style="color:">text</p> - this is similar to style except its within the actual line

<head> – Contains metadata and resources
<style> – Contains internal CSS rules. Basically lets you make a function that includes certain rules. 
<meta name="viewport" content="width=device-width, initial-scale=1"> - this fixes mobile device viewing issues.
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"> - importing the CSS from bootstrap so I can use their code / style

<body> - means that it will be displayed
<script src=""></script> - this is bascially a bootstrap pluggin for javascript

This part is fairly difficult:
'''
<div class="user-info" id="user-info">
    Logged in as: <span id="username">Guest</span>
  </div>

  <script>
    const loggedInUser = "Caden"; 
    document.getElementById("username").textContent = loggedInUser;
  </script>
'''
It essentially creates a class that is accesable by javascript so that I can update the username once somebody logs in. 

<h1> - this makes the text bigger or smaller as you increase the number after h

<nav class="navbar navbar-expand-md navbar-dark bg-dark"> – this is bootstrap again and it makes a nav bar dark colored.

<div class="container"> – Bootstrap container. Honestly bootstrap is super helpful

<button class="navbar-toggler" ...> – Bootstrapss hamburger button

<span class="navbar-toggler-icon"></span> – Icon inside the toggle button

<div class="collapse navbar-collapse" id="navbarNav"> – Collapsible container for nav links

<ul class="navbar-nav ms-auto"> – so ul is basically a container for a list

<li class="nav-item"> – this is where the list comes in (ordered) within the ul code

<a class="nav-link"> – Bootstrap-styled link inside nav bar

<hr /> – A horizontal line

<a href="">text</a> - hyperlinks



### Production Environment

**Giving deployFiles.sh permissions:**

chmod +x ./deployFiles.sh

**To deploy to my production environment I had to run:**

./deployFiles.sh -k ~/.ssh/production.pem -h riseandplay.click -s startup

that way I could gain access to my production.pem

'''