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

## CSS


## HTML

I have learned a ton about HTML recently. 
<head> – Contains metadata and resources
<style> – Contains internal CSS rules. Basically lets you make a function that includes certain rules. 
<meta name="viewport" content="width=device-width, initial-scale=1"> - this fixes mobile device viewing issues.



### Production Environment

**Giving deployFiles.sh permissions:**

chmod +x ./deployFiles.sh

**To deploy to my production environment I had to run:**

./deployFiles.sh -k ~/.ssh/production.pem -h riseandplay.click -s startup

that way I could gain access to my production.pem

'''