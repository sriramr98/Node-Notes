const notes = require('./notes');
const _ = require('lodash');
const yargs = require('yargs');

const titleOptions = {
  describe: 'Title of the note',
  demand: true,
  alias: 't'
};

const contentOptions = {
  describe: 'Body of the note',
  demand:true,
  alias: 'c'
};

let argv = yargs
.command('add', 'Add new note', {
  title : titleOptions,
  content: contentOptions
})
.command('list', 'List all notes')
.command('read', 'Read a given note', {
  title : titleOptions
})
.command('remove', 'Remove a given note', {
  title: titleOptions
})
.help()
.argv;

let command = argv._[0];
 
switch(command) {
  case "add":
    notes.addNote(argv.title, argv.content);
    break;
  case "list":
    notes.getAllNotes();
    break;
  case "read":  
    notes.getNote(argv.title);
    break;
  case "remove":
    notes.removeNote(argv.title);
    break;
  default:
    console.log("Command not recognized");
}