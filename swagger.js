const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info:{
        title: "PorDos API",
        description: "API para el proyecto del curso CI-0137"
    },
    host: "localhost:7500",
    schemes:["http"]
}   
    const outputFile = "./swagger.json";
    const endpointFiles = ["./server.js"];

    swaggerAutogen(outputFile,endpointFiles,doc).then(() =>{
        require("./server.js")
    });