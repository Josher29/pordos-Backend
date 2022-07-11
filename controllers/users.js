const jwt = require("jsonwebtoken");
const users = require("../Data/Users.json") //Get Users from JSON

exports.loginUser = async (req, res) => {
    // #swagger.tags = ['Users']
    try {
      const userPayload = req.body;
      var user;
      users.map((u) =>{
            if(u.email == userPayload.email){
               user = u;
            }
      });
      if (!user || (user.password != userPayload.password) ){
        res.status(401).send("Invalid credentials");
        return;
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_KEY,
        {
          expiresIn: "5m",
        }
      );
      const result = {
        user,
        token,
      }
      
      res.json(result);
    } catch (error) {
      res.status(500).send("Server error: " + error);
    }
  };

  exports.getUser = async (req,res) => {
    // #swagger.tags = ['Users']
    const userName = req.params.username;
    var user;
    try{
        users.map((u) =>{
            if(u.name === userName){
              user = u;
              res.json(u);
              return;
            }
        });
        if(!user){
            res.status(404).send("No se encontró el usuario");
        }
    }catch(error){
        res.status(500).json({
            message:"Oucrrió un error al recuperar el perfil.",
            error,
        })
    }
  }


  exports.createUser = async (req, res) => {
    // #swagger.tags = ['Users']
    try {
      const userPayload = req.body;
      var err = false;
      const newUser = {
        name:userPayload.name,
        email:userPayload.email,
        password:userPayload.password,
        photo:userPayload.photo
      };

      users.map((u)=>{
        if(u.email == newUser.email){
          res.status(409).send("Ya existe el correo");
          err = true;
          return;
        }
        if(u.name == newUser.name){
          res.status(409).send("Ya existe ese nombre de usuario. Intente con otro");
          err = true;
          return;
        }
      });

      if(err){
        return;
      }

      res.json(newUser); //200


    } catch (error) {
      res.status(500).json({
        message: "Ocurrió un error al insertar el usuario.",
        error,
      });
    }
  };