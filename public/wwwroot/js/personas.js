function limpiarPersonas() {

    $('#personas').html("");

}

function eliminarPersona(id) {

    if(!confirm("¿Deseas eliminar esta persona?")) {
        return;
    }

    $.ajax({

        url: 'http://localhost:3001/personas/' + id,
        type: 'DELETE',

        success: function() {

            getPersonas();

        },

        error: function(error) {

            console.error(error);
            alert('Error al eliminar');

        }

    });

}

function editarPersona(id, nombreActual, edadActual, correoActual) {

    let nombre = prompt(
        "Nombre:",
        nombreActual
    );

    if(nombre === null) return;

    let edad = prompt(
        "Edad:",
        edadActual
    );

    if(edad === null) return;

    let correo = prompt(
        "Correo:",
        correoActual
    );

    if(correo === null) return;

    $.ajax({

        url: 'http://localhost:3001/personas/' + id,
        type: 'PUT',
        contentType: 'application/json',

        data: JSON.stringify({

            nombre: nombre,
            edad: parseInt(edad),
            correo: correo

        }),

        success: function() {

            alert("Persona actualizada");

            getPersonas();

        },

        error: function(error) {

            console.error(error);
            alert('Error al actualizar');

        }

    });

}

function getPersonas() {

    limpiarPersonas();

    $.ajax({

        url: 'http://localhost:3001/personas',
        cache: false,

        success: function(resultado) {

            $.each(resultado, function(index, persona) {

                var itemHtml =

                "<div class='col-12 col-sm-6 col-md-3'>" +

                "<div class='card mb-4 shadow border-success'>" +

                "<div class='card-body'>" +

                "<h4>" +
                persona.nombre +
                "</h4>" +

                "<h5>Edad: " +
                persona.edad +
                "</h5>" +

                "<p>" +
                persona.correo +
                "</p>" +

                "</div>" +

                "<div class='card-footer bg-white d-flex justify-content-between'>" +

                "<button class='btn btn-sm btn-outline-warning' onclick='editarPersona(" +
                persona.id +
                ",\"" +
                persona.nombre +
                "\",\"" +
                persona.edad +
                "\",\"" +
                persona.correo +
                "\")'>Editar</button>" +

                "<button class='btn btn-sm btn-outline-danger' onclick='eliminarPersona(" +
                persona.id +
                ")'>Eliminar</button>" +

                "</div>" +

                "</div>" +

                "</div>";

                $('#personas').append(itemHtml);

            });

        },

        error: function(error) {

            console.error(error);
            alert('Error al obtener personas');

        }

    });

}

function agregarPersona() {

    let nombre = $('#nombrePersona').val();
    let edad = $('#edadPersona').val();
    let correo = $('#correoPersona').val();

    if(!nombre || !edad || !correo) {

        alert('Completa todos los campos');
        return;

    }

    $.ajax({

        url: 'http://localhost:3001/personas',
        type: 'POST',
        contentType: 'application/json',

        data: JSON.stringify({

            nombre: nombre,
            edad: parseInt(edad),
            correo: correo

        }),

        success: function() {

            $('#nombrePersona').val('');
            $('#edadPersona').val('');
            $('#correoPersona').val('');

            getPersonas();

        },

        error: function(error) {

            console.error(error);
            alert('Error al guardar');

        }

    });

}
