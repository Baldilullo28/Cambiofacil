const API_KEY = "OJrn857ufXX8mmrDEzUrUMjtReD8mf8I";

const historialDeCambios = [];

async function convertir() {
    const monedaOrigen = document.getElementById("moneda-origen").value;
    const monedaDestino = document.getElementById("moneda-destino").value;
    const cantidad = parseFloat(document.getElementById("cantidad").value);

    const response = await fetch(`http://data.fixer.io/api/latest?access_key=${API_KEY}&base=${monedaOrigen}&symbols=${monedaDestino}`);
    const data = await response.json();

    if (!data.success) {
        Swal.fire({
            icon: 'error',
            title: 'Error al obtener los datos de conversión',
            text: data.error.type
        });
        return;
    }

    const tasaDeCambioDestino = data.rates[monedaDestino];
    const cantidadEnDolares = cantidad / data.rates[monedaOrigen];
    const resultado = cantidadEnDolares * tasaDeCambioDestino;

    historialDeCambios.push({ monedaOrigen, monedaDestino, cantidad, resultado });

    Swal.fire({
        icon: 'success',
        title: `La conversión de ${cantidad} ${monedaOrigen} a ${monedaDestino} fue exitosa.`,
        showConfirmButton: false,
        timer: 1500
    });

    document.getElementById("resultado").innerHTML = `El resultado de la conversión es: ${resultado.toFixed(2)} ${monedaDestino}`;
}
