function agregarProducto() {

    let nombreInput = $('#nombreProducto').val();
    let precioInput = $('#precioProducto').val();

    if(!nombreInput || !precioInput) {

        alert("Por favor, llena todos los campos.");
        return;

    }

    let nuevoProducto = {
        nombre: nombreInput,
        precio: parseFloat(precioInput)
    };

    $.ajax({

        url: 'http://localhost:3000/productos',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(nuevoProducto),

        success: function(resultado) {

            alert('Producto agregado con éxito');

            $('#nombreProducto').val('');
            $('#precioProducto').val('');

            getProducts();

        },

        error: function() {

            alert('Error al conectar con el servidor.');

        }

    });

}



function limpiar() {

    $('#productos').html("");

}



function eliminarProducto(productId) {

    if(!confirm("¿Deseas eliminar este producto?")) {
        return;
    }

    let url = 'http://localhost:3000/productos/' + productId;

    $.ajax({

        url: url,
        type: 'DELETE',

        success: function(resultado) {

            limpiar();
            getProducts();

        },

        error: function(error) {

            console.error(error);
            alert('No se pudo eliminar el producto.');

        }

    });

}



function editarProducto(id, nombreActual, precioActual) {

    let nuevoNombre = prompt(
        "Nuevo nombre del producto:",
        nombreActual
    );

    if(nuevoNombre === null) {
        return;
    }

    let nuevoPrecio = prompt(
        "Nuevo precio:",
        precioActual
    );

    if(nuevoPrecio === null) {
        return;
    }

    $.ajax({

        url: 'http://localhost:3000/productos/' + id,
        type: 'PUT',
        contentType: 'application/json',

        data: JSON.stringify({

            nombre: nuevoNombre,
            precio: parseFloat(nuevoPrecio)

        }),

        success: function(resultado) {

            alert("Producto actualizado correctamente");

            limpiar();
            getProducts();

        },

        error: function(error) {

            console.error(error);
            alert("Error al actualizar");

        }

    });

}



function getProducts() {

    limpiar();

    $.ajax({

        url: 'http://localhost:3000/productos',
        cache: false,

        success: function(result) {

            $.each(result, function(index, productos) {

                var itemHtml =
                "<div class='col-12 col-sm-6 col-md-3'>" +

                    "<div class='card mb-4 shadow border-primary'>" +

                        "<div class='card-body'>" +

                            "<h4>" +
                            productos.nombre +
                            "</h4>" +

                            "<h5>Precio: $" +
                            productos.precio +
                            "</h5>" +

                        "</div>" +

                        "<div class='card-footer bg-white d-flex justify-content-between'>" +

                            "<button class='btn btn-sm btn-outline-warning' onclick='editarProducto(" +
                            productos.id +
                            ",\"" +
                            productos.nombre +
                            "\",\"" +
                            productos.precio +
                            "\")'>" +
                            "Editar" +
                            "</button>" +

                            "<button class='btn btn-sm btn-outline-danger' onclick='eliminarProducto(" +
                            productos.id +
                            ")'>" +
                            "Eliminar" +
                            "</button>" +

                        "</div>" +

                    "</div>" +

                "</div>";

                $('#productos').append(itemHtml);

            });

        },

        error: function(error) {

            console.error(error);
            alert("Error al obtener productos");

        }

    });

}
