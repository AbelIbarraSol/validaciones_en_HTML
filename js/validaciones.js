export function valida(input) {
	//ESTA FUNCION SE LLAMA CADA QUE EL USUARIO SALE DEL INPUT
	const tipoDeInput = input.dataset.tipo;
	if (validadores[tipoDeInput]) {
		validadores[tipoDeInput](input); //ARRAY + PARAMETRO
	}

	if (input.validity.valid) {
		input.parentElement.classList.remove('input-container--invalid');
		input.parentElement.querySelector('.input-message-error').innerHTML = '';
	} else {
		input.parentElement.classList.add('input-container--invalid');
		input.parentElement.querySelector('.input-message-error').innerHTML =
			mostrarMensajeDeError(tipoDeInput, input);
	}
}

const tipoDeErrores = [
	'valueMissing',
	'typeMismatch',
	'patternMismatch',
	'customError',
];

const mensajesDeError = {
	nombre: {
		valueMissing: 'El campo nombre, no puede estar vacío.',
	},
	email: {
		valueMissing: 'El campo contraseña, no puede estar vacío.',
		typeMismatch: 'El correo no es válido.',
	},
	password: {
		valueMissing: 'El campo contraseña, no puede estar vacío.',
		patternMismatch:
			'Almenos 6 caracteres, maximo 12, debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales.',
	},
	nacimiento: {
		valueMissing: 'El campo direccion, no puede estar vacío.',
		customError: 'Debes tener al menos 18 años de edad.',
	},
	numero: {
		valueMissing: 'El campo número, no puede estar vacío.',
		patternMismatch: 'El formato requerido es de 10 números.',
	},
	direccion: {
		valueMissing: 'El campo dirección, no puede estar vacío.',
		patternMismatch: 'La dirección debe de tener entre 10 a 40 caracteres.',
	},
	ciudad: {
		valueMissing: 'El campo ciudad, no puede estar vacío.',
		patternMismatch: 'La ciudad debe de tener entre 4 a 40 caracteres.',
	},
	estado: {
		valueMissing: 'El campo estado, no puede estar vacío.',
		patternMismatch: 'La estado debe de tener entre 4 a 40 caracteres.',
	},
};

const validadores = {
	nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
	let mensaje = '';

	tipoDeErrores.forEach((error) => {
		if (input.validity[error]) {
			console.log(tipoDeInput, error);
			console.log(input.validity[error]);
			console.log(mensajesDeError[tipoDeInput][error]);
			mensaje = mensajesDeError[tipoDeInput][error];
		}
	});
	return mensaje;
}

function validarNacimiento(input) {
	const fechaCliente = new Date(input.value);
	let mensaje = '';
	if (!mayorDeEdad(fechaCliente)) {
		console.log(mayorDeEdad(fechaCliente));
		mensaje = 'Debes tener al menos 18 años de edad';
	}
	input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
	const fechaActual = new Date();
	const diferenciaFechas = new Date(
		fecha.getUTCFullYear() + 18,
		fecha.getUTCMonth(),
		fecha.getUTCDate()
	);

	console.log(diferenciaFechas);
	return diferenciaFechas <= fechaActual;
}
