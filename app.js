// const addfun=require("./utils.js")
// console.log(addfun(2,3))
const yargs=require("yargs")
const validator=require("validator")
const chalk=require("chalk")
const notes=require("./notes.js")



/*
command=console.log(yargs.argv["_"][0])
titel=console.log(yargs.argv["title"])
*/
yargs.command({
    command:"add",
    describe:"Command for adding a new file.",
    builder:{
        title:{
            describe:"Title of the new file",          //Note: It is not necessery to define a argumnet in builder, 
            demandOption:true,                         //we can access it in function even without defining it in builder.     
            type:'string'
        },
        body:{
            describe:"The content of the file",
            demandOption:true,
            type:"string"
        }
    },
    handler:(argv)=>{
        notes.addNote(argv.title,argv.body)
    }
})
yargs.command({
    command:"remove",
    describe:"Command for removing an existing file.",
    builder:{
        title:{
            describe:"Title of node to be removed.",
            demandOption:true,
            type:"string"
        }
    },    
    handler:function(argv){
        notes.removeNote(argv.title)
    }
})
yargs.command({
    command:"list",
    describe:"Command for listinging all files.",
    handler:()=>{
       notes.listNotes()
    }
})

yargs.command({
    command:"read",
    describe:"Command for reading an existing file.",
    builder:{
        title:{
            describe:"Title of th note to be read.",
            demandOption:true,
            type:"string"
        }
    },
    handler:function(argv){
        notes.readNote(argv.title)
    }
})
//yargs.argv or yargs.parse()
yargs.parse()
/*
if(command=="add")
{ 
    console.log(chalk.green("add"))
}
else if (command=="remove")
{
    console.log(chalk.red("remove"))
}
*/