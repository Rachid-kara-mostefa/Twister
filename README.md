# Twister
application web de type Twitter (X), en JavaScript (React,NodeJS) et CSS.

Notre dossier contient la partie serveur et client presque terminées. Il manque les fonctionnalités qui concernent les commentaires des posts et quelques détails pour l'affichage.


***** Le coté serveur contient  *****

- Dossier config :
  
  		  - un fichier ".env" qui est l'environnement ou sont stocké les constantes.
    		- un fichier "db.js" qui relie la DataBase au code du coté serveur.
        		Une base de données créée avec MongoDB.

- Dossier controllers :
  
        - un fichier "auth.controller.js" pour gèrer l'authentification des users,  contient les fonctions signUp, logout, signIn qui appelle 'login' pour verifier
          l'email et le password ensuite crée un token pour le user qui veut se connecter et lui renvoie un cookie avec une durée de vie de 3 jours.

		    - un fichier "post.controller.js" contient les fonctions readPost qui affiche les posts, createPost, updatePost, deletePost et pour likePost et unlikePost
        ( on check l'id 	du user ensuite on l'ajoute a la liste des likers et la liste des like ou on 	l'enleve pour unlikePost)

		    - un fichier "user.controller.js" contient les fonctions getAllUsers, userInfo, updateUser, deleteUser, follow et unfollow ( on check l'id du user connecté
          ensuite on 	l'ajoute a la liste des abonnés et on ajoute l'id du user auquel il s'est abonné à 	sa liste d'abonnements et  la meme operation sauf qu'on
          supprime l'id au lieu 	de l'ajouter aux listes pour unfollow)

- Dossier middleware:
  
		    - un fichier "auth.middleware.js" contient la fonction 'checkUser' pour voir si l'user est connecté, on utilise 'verify' de la bibliotheque 'jwt'.et contient
         la fonction 	'requireAuth' qui vérifie que le token est bien créé pour le user.

- Dossier utils:
  
	    	contient "errors.utils" fichier qui a deux fonctions pour gèrer les erreurs lors de la connexion et de  création d'un compte.
		    pour cela on crée des String vides pour chaque composant pouvant causer u probléme et si il y a un probléme le String vide contiendra l'erreur 

- Packages json 

- Un fichier "server.js" contient des imports, des routes et une fonction listen.

- Un fichier ".gitignore" pour qu'il ne prenne pas en compte le node_module et le .env

- Dossier models :
  	Il contient les models d'un post avec leur variables et propriétés.
	  Il contient les models d'un user avec leur variables et propriétés. En plus de la fonction 'pre' qui chiffre le mot de passe avant de le stocker dans
    la BDD et la fonction 'login' appelée par 'signIn' qui compare l'email et le password pour la connexion.

- Dossier routes :	Il contient les routes essentielles pour les fonctions d'un post et d'un user.

***** Le côté client *****

	- Une Page de connexion
 
![login](https://github.com/Rachid-kara-mostefa/Twister/assets/153507294/c10fb9e7-072d-474c-9778-22e3e73f4a47)

 	- Une page d'inscription
  
![signUp](https://github.com/Rachid-kara-mostefa/Twister/assets/153507294/ee41ba43-c0d4-4fa1-9aa5-e0a664497321)

	- Une page d'accueil

 ![accueil](https://github.com/Rachid-kara-mostefa/Twister/assets/153507294/f389263d-34a2-4415-a011-a02e77d1be15)

 	Qui contient des posts, qu'on peut liker, commenter ou partager.
 ![acc post](https://github.com/Rachid-kara-mostefa/Twister/assets/153507294/a7d27c4a-983d-4474-a251-d636f5a04214)

	- Notre profil, qu'on peut modifier

 ![profil](https://github.com/Rachid-kara-mostefa/Twister/assets/153507294/0bd423ab-b6c0-481a-8cad-171a101dcc77)

 	- Profil d'un user, qui contient ses posts et qu'on peut follow ou unfollow

  ![profil aans](https://github.com/Rachid-kara-mostefa/Twister/assets/153507294/0319976d-9499-43d3-911f-f11e87e65d47)

  	-Quelques tests avec postman pour vérifier la bonne liaison avec la base de données coté serveur.
   
![test postman 2](https://github.com/Rachid-kara-mostefa/Twister/assets/153507294/0640dd6f-e37b-47c2-8cca-95d1b67d0919)
![test postman 1](https://github.com/Rachid-kara-mostefa/Twister/assets/153507294/0c930bc0-560d-43a8-804e-313cd0b4a9ca)

