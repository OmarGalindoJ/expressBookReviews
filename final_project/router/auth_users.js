const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    let filtered_users = users.filter((user)=> user.username === user);
        if(filtered_users){
    return true;
    }
    return false;
    }

const authenticatedUser = (username,password)=>{ //returns boolean
    if(isValid(username)){
        let filtered_users = users.filter((user)=> (user.username===username)&&(user.password===password));
        if(filtered_users){
            return true;
        }
        return false;
       
    }
    return false;
    
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
    let user = req.body.username;
    let pass = req.body.password;
    if(!authenticatedUser(user,pass)){
        return res.status(403).json({message:"User not authenticated"})
    }

    let accessToken = jwt.sign({
      data: user
    },'access',{expiresIn:60*60})
    req.session.authorization = {
      accessToken
    }
    res.send("User logged in successfully")
});

/* Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;
  const review = req.body.review;

  if (books[isbn]){
      books[isbn].reviews[username] = review;
      res.send(`The review of the book with ISBN ${isbn} from user ${username} has been published.`);
  } else {
      res.send(`No books with ISBN ${isbn} were found in the database.`);
  }
    });

    regd_users.delete("/auth/review/:isbn", (req, res) => {
        const isbn = req.params.isbn;
        const username = req.session.authorization.username;
        
        if (books[isbn].reviews[username]){
            delete books[isbn].reviews[username];
            res.send(`The review of the book with ISBN ${isbn} from user ${username} has been deleted.`);
        } else {
            res.send(`No reviews with ISBN ${isbn} from user ${username} were found in the database.`);
        }
    });*/

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
