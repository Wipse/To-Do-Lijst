document.addEventListener("DOMContentLoaded", function() {
    const list = document.querySelectorAll("li");
    list.forEach(function(item) {
        item.addEventListener("click", function() {
            this.classList.toggle("checked");
        });
    });
})


function deleteTask(id) {
    if (confirm("Weet je zeker dat je deze task wilt verwijderen?")) { 
        // Optioneel: bevestigingsvenster toevoegen
      fetch('/todo_list/' + id, {
        method: 'DELETE'
      }).then(response => {
        if (response.ok) {
          // Optioneel: vernieuw de pagina of update de takenlijst
          window.location.reload(); // Vernieuw de pagina
        } else {
          console.error('Error deleting task');
        }
      }).catch(error => {
        console.error('Error:', error);
      });
    }
  }


const addNoteForm = document.getElementById('addNoteForm');

addNoteForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Voorkom dat het formulier standaardgedrag uitvoert

  const formData = new FormData(addNoteForm);
  const title = formData.get('title');
  const todo = formData.get('todo');
  const shouldhappen = formData.get('shouldhappen');

  try {
    const response = await fetch('/todo_list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, todo, shouldhappen })
    });
    
    if (response.ok) {
      window.location.reload(); 
    } else {
      console.error('Error bij het toevoegen van een task');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});