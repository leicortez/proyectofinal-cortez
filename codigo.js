$(document).ready(() => {
   
    const obtenerDatosLenceria = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'lenceria.json',
                dataType: 'json',
                success: (data) => resolve(data),
                error: (error) => reject(error)
            });
        });
    };

  
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

       
        $('#tablaProductos').css('transform', 'scale(1.05)');
        setTimeout(() => {
            $('#tablaProductos').css('transform', 'scale(1)');
        }, 300);
    };

    const filtrarPorCategoria = (productos, categoria) => {
        if (!categoria) return productos;
        return productos.filter(producto => producto.categoria === categoria);
    };

   
    const calcularPrecioTotal = (productos, categoria) => {
        const productosFiltrados = filtrarPorCategoria(productos, categoria);
        return productosFiltrados.reduce((total, producto) => total + producto.precio, 0);
    };

 
    const obtenerNombresDeProductos = (productos, categoria) => {
        const productosFiltrados = filtrarPorCategoria(productos, categoria);
        return productosFiltrados.map(producto => producto.nombre);
    };

    
    $('#categoriaSelect').on('change', async (event) => {
        const categoria = event.target.value;
        const productos = await obtenerDatosLenceria();
        const productosFiltrados = filtrarPorCategoria(productos, categoria);
        mostrarProductos(productosFiltrados);
    });

   
    $('#mostrarTodo').on('click', async () => {
        const productos = await obtenerDatosLenceria();
        mostrarProductos(productos);
    });

  
    $('#guardarJson').on('click', async () => {
        const productos = await obtenerDatosLenceria();
        const json = JSON.stringify(productos, null, 2);
        console.log(json);
        alert('Los datos se han guardado en la consola en formato JSON.');
    });

   
    (async () => {
        const productos = await obtenerDatosLenceria();
        mostrarProductos(productos);

   
        const categoria = 'Conjuntos';
        const precioTotalEnCategoria = calcularPrecioTotal(productos, categoria);
        const nombresDeProductosEnCategoria = obtenerNombresDeProductos(productos, categoria);

        console.log(`Precio total en la categoría "${categoria}": $${precioTotalEnCategoria}`);
        console.log(`Nombres de productos en la categoría "${categoria}":`, nombresDeProductosEnCategoria);
    })();
});
