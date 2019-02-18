$(function () {

    chrome.storage.sync.get("keyword",function(object) {
        if(object.keyword) {
            searchNote(object.keyword);
            $('#keyword').val(object.keyword);
            chrome.storage.sync.set({"keyword":""}, function() {
            });
        }
    });    

    var config = {
        apiKey: "AIzaSyB0tlBP5N67J1PeN50xz3AifNhnyRsIYZY",
        authDomain: "keeper-2923e.firebaseapp.com",
        databaseURL: "https://keeper-2923e.firebaseio.com",
        projectId: "keeper-2923e",
        storageBucket: "",
        messagingSenderId: "1094226696666"
    };
    const app = firebase.initializeApp(config);
    var noteRef = app.database().ref('notes');

    $( "#keyword" ).keyup(function(event) {
        if(event.keyCode === 13) {
            event.preventDefault();
            $('#search').click();
        }
    });
    
    var noteData = [];

    // Fetch data from firebase
    $('#search').click(function () {
        searchNote($('#keyword').val());
    });

    function searchNote(search) {
        noteData = [];
        noteRef.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                noteData.push(childData);
                // alert("updated array size : "+noteData.length);
                // alert(childData.name);
                // console.log("childKey : ", childKey);
                // console.log("child Data : ", childData);
            });
            var notes = [];
            for (i = 0; i < noteData.length; i++) {
                if (noteData[i].name.toUpperCase() === search.toUpperCase()) {
                    notes.push(noteData[i]);
                    noteData = jQuery.grep(noteData, function(value) {
                        return value != noteData[i];
                    });
                } else if (noteData[i].name.toUpperCase().includes(search.toUpperCase())) {
                    notes.push(noteData[i]);
                    noteData = jQuery.grep(noteData, function(value) {
                        return value != noteData[i];
                    });
                } 
            }
            for (i = 0; i < noteData.length; i++) {
                if (noteData[i].category.toUpperCase() === search.toUpperCase()) {
                    notes.push(noteData[i]);
                    noteData = jQuery.grep(noteData, function(value) {
                        return value != noteData[i];
                    });
                } else if (noteData[i].category.toUpperCase().includes(search.toUpperCase())) {
                    notes.push(noteData[i]);
                    noteData = jQuery.grep(noteData, function(value) {
                        return value != noteData[i];
                    });
                } 
            }
            for (i = 0; i < noteData.length; i++) {
                if (noteData[i].tag.toUpperCase() === search.toUpperCase()) {
                    notes.push(noteData[i]);
                    noteData = jQuery.grep(noteData, function(value) {
                        return value != noteData[i];
                    });
                } else if (noteData[i].tag.toUpperCase().includes(search.toUpperCase())) {
                    notes.push(noteData[i]);
                    noteData = jQuery.grep(noteData, function(value) {
                        return value != noteData[i];
                    });
                }
            }
            for (i = 0; i < noteData.length; i++) {
                if (noteData[i].note.toUpperCase().includes(search.toUpperCase())) {
                    notes.push(noteData[i]);
                    noteData = jQuery.grep(noteData, function(value) {
                        return value != noteData[i];
                    });
                } else if (noteData[i].note.toUpperCase().includes(search.toUpperCase())) {
                    notes.push(noteData[i]);
                    noteData = jQuery.grep(noteData, function(value) {
                        return value != noteData[i];
                    });
                }
            }
            var container = $('#notes_display');
            container.empty();
            for (i = 0; i < notes.length; i++) {
                var card = $("<div></div>");
                card.attr("class", "card")
                container.append(card);

                //Add head
                var innerDiv = $("<div></div>");
                innerDiv.attr("class", "card-header");
                innerDiv.attr("id", "heading" + i);
                innerDiv.attr("data-toggle", "collapse");
                innerDiv.attr("data-target", "#collapse" + i);
                innerDiv.attr("aria-expanded", "true");
                innerDiv.attr("aria-controls", "collapse" + i);
                card.append(innerDiv);

                var h2Ele = $("<h2></h2>");
                h2Ele.attr("class", "mb-0 panel-title");
                // innerDiv.append(h2Ele)

                var ul = $("<ul></ul>");
                innerDiv.append(h2Ele);
                var li = $("<li></li>");
                ul.append(li);

                var button = $("<p></p>");
                button.attr("class", "text-primary");
                // button.attr("type", "button");
                button.html('<h3>' + notes[i].name + '</h3>');
                h2Ele.append(button);

                //Add body
                innerDiv = $("<div></div>");
                innerDiv.attr("id", "collapse" + i);
                if (i === 0)
                    innerDiv.attr("class", "collapse show");
                else
                    innerDiv.attr("class", "collapse");
                innerDiv.attr("aria-labelledby", "heading" + i);
                innerDiv.attr("data-parent", "#notes_display");
                card.append(innerDiv);

                var innerDiv2 = $("<div></div>");
                innerDiv2.attr("class", "card-body");

                // note.note = note.note.split("\t").join("&nbsp;&nbsp;&nbsp;&nbsp;");
                // note.note = note.note.split(" ").join("&nbsp;");
                // note.note = note.note.split("\n").join("<br />");
                notes[i].note = notes[i].note.split("\t").join("&nbsp;&nbsp;&nbsp;&nbsp;");
                notes[i].note = notes[i].note.split(" ").join("&nbsp;");
                notes[i].note = notes[i].note.split("\n").join("<br />");


                innerDiv2.html("<h6>Name : " + notes[i].name + "</h6>" + "<br />category : " + notes[i].category + "<br />Date :" + notes[i].date + "<br />Note : " + notes[i].note);
                innerDiv.append(innerDiv2);
            }
        });

    }

});