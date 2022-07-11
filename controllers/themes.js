const themes = require("../Data/Themes.json") //Get Themes from JSON


exports.getAllThemes = async (req, res) => {
    // #swagger.tags = ['Themes']
    try{
        res.json(themes) //200
    }catch(error){
        res.status(500).json({
            message: "Ocurrió un error",
            error,
          });
    }
}


exports.getThemeByName = async (req,res) =>{
    // #swagger.tags = ['Themes']
    const themeName = req.params.themeName;
    var theme;
    try{
        themes.map((t) =>{
            if(t.name === themeName){
               theme = t;
               res.json(theme);
               return;
            }
        });
        if(!theme){
            res.status(404).send("No se encontró el tema");
        }
        

    }catch(error){
        res.status(500).json({
            message:"Oucrrió un error al recuperar el tema.",
            error,
        })
    }
}


exports.createTheme = async (req,res) => {
    // #swagger.tags = ['Themes']
    try{
        const userPayload = req.body;
        var error = false;
        const newTheme = {
            name:userPayload.name,
            description:userPayload.description,
            photo:userPayload.photo
        }

        themes.map((t)=>{
            if(t.name == newTheme.name){
                error = true;
                res.status(409).send("Este tema ya existe, intenta opinando en él");
                return;
            }
        })
        if(error){
            return;
        }
       
        res.json(newTheme)
    }catch(error){
        res.status(500).json({
            message: "Ocurrió un error",
            error,
        });
    }
    
}