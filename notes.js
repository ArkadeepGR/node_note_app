const fs=require("fs")
const chalk=require("chalk")

const listNotes=function(){
    notes=loadNotes()
    console.log(chalk.bgWhite.black(" Available notes: "))
    notes.forEach((e)=>{
        console.log(e.title)
    })
}

const readNote=function(Title){
    notes=loadNotes()
    element=notes.find((e)=>e.title==Title)
    if(!element){
        console.log(chalk.white.bgRed(" Not found ! "))
    }
    else{
        console.log(chalk.white.bgGreen(" Content of "+Title+" : "))
        console.log(element.body)
    }
}

const addNote=function (Title,Body){
    notes=loadNotes()
    //duplicateNotes=notes.filter((note)=>note.title==Title)
    duplicateNotes=notes.find((note)=>note.title==Title)
    if(!duplicateNotes)
        {
            notes.push(
            {
                title: Title,
                body: Body
            }
           )
          saveNotes(notes)
          console.log(chalk.white.bgGreen(" Note added. "))
        }
    else{
        console.log(chalk.white.bgRed(" Note with same title already exists, adding failed. "))
    }
}

const removeNote=function(Title){
    notes=loadNotes()
    freshData=notes.filter(function(n){
        return n.title!=Title
    })
    if(freshData.length==notes.length)
        {
            console.log(chalk.white.bgRed("No such note exists."))
        }
    else
    {
        saveNotes(freshData)
        console.log(chalk.white.bgGreen("Note removed successfully."))
    }
}



const loadNotes=function(){
    try{
    dataBuffer=fs.readFileSync('notes.json')
    data=dataBuffer.toString()
    return JSON.parse(data)
    }
    catch(e){
        return []
    }
}

const saveNotes=function(notes){
    JSONnotes=JSON.stringify(notes)
    fs.writeFileSync("notes.json",JSONnotes)
}

module.exports={
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}