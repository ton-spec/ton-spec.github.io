//speech setup

try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}
 
 
 
 
 //variables and initialisation
 
 var noteTextarea = $('#note-textarea');
var instructions = $('#recording-instructions');
var notesList = $('ul#notes');
var noteContent = '';

// Get all notes from previous sessions and display them.
var notes = getAllNotes();
renderNotes(notes);




//voice recognition

recognition.continuous = true;

recognition.onresult = function(event) {
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
    noteContent += transcript;
    noteTextarea.val(noteContent);
  }
};

recognition.onstart = function() { 
  instructions.text('Voice recognition activated. Try speaking into the microphone.');
};

recognition.onspeechend = function() {
  instructions.text('You were quiet for a while so voice recognition turned itself off.');
};

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('No speech was detected. Try again.');  
  };
};





//app buttons and inputs

$('#start-record-btn').on('click', function(e) {
  if (noteContent.length) {
    noteContent += ' ';
  }
  recognition.start();
});

$('#pause-record-btn').on('click', function(e) {
  recognition.stop();
  instructions.text('Voice recognition paused.');
});

noteTextarea.on('input', function() {
  noteContent = $(this).val();
});

$('#save-note-btn').on('click', function(e) {
  recognition.stop();

  if(!noteContent.length) {
    instructions.text('Could not save empty note. Please add a message to your note.');
  }
  else {
    saveNote(new Date().toLocaleString(), noteContent);

    noteContent = '';
    renderNotes(getAllNotes());
    noteTextarea.val('');
    instructions.text('Note saved successfully.');
  }  
});

notesList.on('click', function(e) {
  e.preventDefault();
  var target = $(e.target);

  if(target.hasClass('listen-note')) {
    var content = target.closest('.note').find('.content').text();
    readOutLoud(content);
  }

  if(target.hasClass('delete-note')) {
    var dateTime = target.siblings('.date').text();  
    deleteNote(dateTime);
    target.closest('.note').remove();
  }
});






//speech synthesis

function readOutLoud(message) {
	var speech = new SpeechSynthesisUtterance();

	speech.text = message;
	speech.volume = 1;
	speech.rate = 1;
	speech.pitch = 1;
  
	window.speechSynthesis.speak(speech);
}





//helper functions

function renderNotes(notes) {
  var html = '';
  if(notes.length) {
    notes.forEach(function(note) {
      html+= `<li class="note">
        <p class="header">
          <span class="date">${note.date}</span>
          <a href="#" class="listen-note" title="Listen to Note">Listen to Note</a>
          <a href="#" class="delete-note" title="Delete">Delete</a>
        </p>
        <p class="content">${note.content}</p>
      </li>`;    
    });
  }
  else {
    html = '<li><p class="content">You don\'t have any notes yet.</p></li>';
  }
  notesList.html(html);
}

function saveNote(dateTime, content) {
  localStorage.setItem('note-' + dateTime, content);
}

function getAllNotes() {
  var notes = [];
  var key;
  for (var i = 0; i < localStorage.length; i++) {
    key = localStorage.key(i);

    if(key.substring(0,5) == 'note-') {
      notes.push({
        date: key.replace('note-',''),
        content: localStorage.getItem(localStorage.key(i))
      });
    } 
  }
  return notes;
}

function deleteNote(dateTime) {
  localStorage.removeItem('note-' + dateTime); 
}




//downloading notes in textformat

// Get the reference to the "Save Note" button
const saveNoteButton = document.getElementById('save-note-btn');

// Add an event listener to the "Save Note" button
saveNoteButton.addEventListener('click', () => {
    const noteContent = document.getElementById('note-textarea').value;
    const noteBlob = new Blob([noteContent], { type: 'text/plain' });

    const downloadLink = document.createElement('a');
    downloadLink.download = 'note.txt';
    downloadLink.href = window.URL.createObjectURL(noteBlob);
    downloadLink.click();
});


// Your existing code...

// Function to handle note download
function downloadNote() {
    const noteContent = noteTextarea.val();
    const noteBlob = new Blob([noteContent], { type: 'text/plain' });

    const downloadLink = document.createElement('a');
    downloadLink.download = 'note.txt';
    downloadLink.href = window.URL.createObjectURL(noteBlob);
    downloadLink.click();
}

// Event listener for saving notes
$('#save-note-btn').on('click', function(e) {
    recognition.stop();

    if(!noteContent.length) {
        instructions.text('Could not save empty note. Please add a message to your note.');
    }
    else {
        saveNote(new Date().toLocaleString(), noteContent);

        noteContent = '';
        renderNotes(getAllNotes());
        noteTextarea.val('');
        instructions.text('Note saved successfully.');
    }
});

// Event listener for downloading notes
$('#download-note-btn').on('click', function(e) {
    downloadNote();
});

// Rest of your existing code...

