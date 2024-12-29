$(document).ready(() => {
    // Función para realizar una solicitud AJAX para obtener los datos de lencería
    const obtenerDatosLenceria = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'lenceria.json', // Suponiendo que tienes un archivo JSON llamado lenceria.json
                dataType: 'json',
                success: (data) => resolve(data),
                error: (error) => reject(error)
            });
        });
    };

    // Función para mostrar los productos en la tabla
    const mostrarProductos = (productos) => {
        const tbody = $('#tablaProductos tbody');
        tbody.empty();
        productos.forEach(producto => {
            const row = `
                <tr>
                    <td>${producto.nombre}</td>
                    <td>$${producto.precio}</td>
                    <td>${producto.categoria}</td>
                    <td>${producto.talla}</td>
                </tr>
            `;
            tbody.append(row);
        });

        // Añadir animación de entrada
        $('#tablaProductos').css('transform', 'scale(1.05)');
        setTimeout(() => {
            $('#tablaProductos').css('transform', 'scale(1)');
        }, 300);
    };

    // Filtrar productos por categoría
    const filtrarPorCategoria = (productos, categoria) => {
        if (!categoria) return productos;
        return productos.filter(producto => producto.categoria === categoria);
    };

    // Calcular precio total por categoría
    const calcularPrecioTotal = (productos, categoria) => {
        const productosFiltrados = filtrarPorCategoria(productos, categoria);
        return productosFiltrados.reduce((total, producto) => total + producto.precio, 0);
    };

    // Obtener nombres de productos por categoría
    const obtenerNombresDeProductos = (productos, categoria) => {
        const productosFiltrados = filtrarPorCategoria(productos, categoria);
        return productosFiltrados.map(producto => producto.nombre);
    };

    // Evento para el cambio de categoría
    $('#categoriaSelect').on('change', async (event) => {
        const categoria = event.target.value;
        const productos = await obtenerDatosLenceria();
        const productosFiltrados = filtrarPorCategoria(productos, categoria);
        mostrarProductos(productosFiltrados);
    });

    // Evento para mostrar todos los productos
    $('#mostrarTodo').on('click', async () => {
        const productos = await obtenerDatosLenceria();
        mostrarProductos(productos);
    });

    // Evento para guardar los productos en JSON
    $('#guardarJson').on('click', async () => {
        const productos = await obtenerDatosLenceria();
        const json = JSON.stringify(productos, null, 2);
        console.log(json);
        alert('Los datos se han guardado en la consola en formato JSON.');
    });

    // Mostrar todos los productos al cargar la página
    (async () => {
        const productos = await obtenerDatosLenceria();
        mostrarProductos(productos);

        // Ejemplo de uso de precio total y nombres de productos en la consola
        const categoria = 'Conjuntos';
        const precioTotalEnCategoria = calcularPrecioTotal(productos, categoria);
        const nombresDeProductosEnCategoria = obtenerNombresDeProductos(productos, categoria);

        console.log(`Precio total en la categoría "${categoria}": $${precioTotalEnCategoria}`);
        console.log(`Nombres de productos en la categoría "${categoria}":`, nombresDeProductosEnCategoria);
    })();
});
