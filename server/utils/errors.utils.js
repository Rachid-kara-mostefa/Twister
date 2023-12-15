        //fonction qui gere les erreurs lors du sign up / connection
module.exports.signUpErrors = (err) => {
    let errors = {pseudo: '', email: '', password: ''};
    if(err.message.includes('pseudo')){
        errors.pseudo = "pseudo incorrect ou déja pris !";
    }
    if(err.message.includes('email')){
        errors.email = "email incorrect !";
    }
    if(err.message.includes('password')){
        errors.password = "mot de passe trop court !";
    }
    if(err.code == 11000 && Object.keys(err.keyValue)[0].includes('email')){
        errors.email = "email a déja été utilisé  !";
    }
    if(err.code == 11000 && Object.keys(err.keyValue)[0].includes('pseudo')){
        errors.email = "Ce pseudo a déja été utilisé  !";
    }
    return errors;
};

        // fonction qui gere les erreurs lors du sign in / inscription
module.exports.signInErrors = (err) => {
    let errors = {email:'', password: ""};
    if(err.message.includes('email')){
        errors.email = "Email incorrect";
    }
    if(err.message.includes('password')){
        errors.password = "mot de passe incorrect";
    }
    return errors;
}