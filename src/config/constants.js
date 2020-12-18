'use strict';
const ENV = process.env;
const AWS = require('aws-sdk');
const S3 = new AWS.S3({
    accessKeyId: ENV.AWS_ACCESS_KEY_ID,
    secretAccessKey: ENV.AWS_ACCESS_KEY_SECRET,
});

const ENTITIES_TYPES={
    REQUEST : 'REQUEST',
    ORDER : 'ORDER',
    CUSTOMER : 'CUSTOMER',
    OWNER : 'OWNER',
    PAYMENT: 'PAYMENT',
    SHIPPING: 'SHIPPING'
}

const PERCENT_RETAINED = 15;
const REQUEST_STATE= {
    NEW: 'NEW',
    PREAUTHORIZED: 'PREAUTHORIZED',
    PREAUTHORIZED_REJECT: 'PREAUTHORIZED_REJECT',
    PROCESSED: 'PROCESSED',
    AUTHORIZED: 'AUTHORIZED',
    AUTHORIZED_REJECT: 'AUTHORIZED_REJECT',
}

const ORDER_STATE= {
    NEW: 'NEW',
    PENDING: 'PENDING',
    WAITING_TICKET: 'WAITING_TICKET',
    PICKUP_READY: 'PICKUP_READY',
    DELIVERED: 'DELIVERED',
    PAYMENT_SAFE : 'PAYMENT_SAFE'
}

const SHIPPING_TYPES = {
    PICKUP: "pickup",
    LOCAL: "local",
    MRW: "mrw"
}

const REDSYS_TRANSACTIONS_TYPES = { 
    PREAUTHORIZATION: '1',
    PREAUTHORIZATION_CONFIRMATION: '2',
}

const redsysResponsesCodes = (code) =>{
    return  code > -1 && code < 100 ? REQUEST_STATE.AUTHORIZED : redsysResponsesErrorCodesList[code];
};

const redsysResponsesErrorCodesList = {
    900 : 'Transacción autorizada para devoluciones y confirmaciones',
    400 : 'Transacción autorizada para anulaciones',
    101 : 'Tarjeta caducada',
    102 : 'Tarjeta en excepción transitoria o bajo sospecha de fraude',
    106 : 'Intentos de PIN excedidos',
    125 : 'Tarjeta no efectiva 129 Código de seguridad (CVV2/CVC2) incorrecto',
    180 : 'Tarjeta ajena al servicio',
    184 : 'Error en la autenticación del titular',
    190 : 'Denegación del emisor sin especificar motivo',
    191 : 'Fecha de caducidad errónea',
    202 : 'Tarjeta en excepción transitoria o bajo sospecha de fraude con retirada de tarjeta',
    904 : 'Comercio no registrado en FUC',
    909 : 'Error de sistema',
    913 : 'Pedido repetido',
    944 : 'Sesión Incorrecta',
    950 : 'Operación de devolución no permitida',
    912 : 'Emisor no disponible',
    9912 : 'Emisor no disponible',
    9064 : 'Número de posiciones de la tarjeta incorrecto',
    9078 : 'Tipo de operación no permitida para esa tarjeta',
    9093 : 'Tarjeta no existente',
    9094 : 'Rechazo servidores internacionales',
    9104 : 'Comercio con “titular seguro” y titular sin clave de compra segura',
    9218 : 'El comercio no permite op. seguras por entrada /operaciones',
    9253 : 'Tarjeta no cumple el check-digit',
    9256 : 'El comercio no puede realizar preautorizaciones',
    9257 : 'Esta tarjeta no permite operativa de preautorizaciones',
    9261 : 'Operación detenida por superar el control de restricciones en la entrada al SIS',
    9915 : 'A petición del usuario se ha cancelado el pago',
    9997 : 'Se está procesando otra transacción en SIS con la misma tarjeta',
    9998 : 'Operación en proceso de solicitud de datos de tarjeta',
    9999 : 'Operación que ha sido redirigida al emisor a autenticar'
}

const PENDING = 'pending';
const PREPARATION_DATE = 'preparationDate';
const ACTIVE = 'active';

//User Roles
const GUEST = 'GUEST';
const ADMIN = 'ADMIN';
const BACKOFFICE = 'BACKOFFICE';
const OWNER = 'OWNER';

const EMAILS = {
    NO_REPLY: 'no-reply@elmercadodelpescado.com',
    HELLO: 'hola@elmercadodelpescado.com',
    CONTACT: 'contacto@elmercadodelpescado.com',
}

module.exports = {
    redsysResponsesCodes,
    REDSYS_TRANSACTIONS_TYPES,
    ENTITIES_TYPES,
    PENDING,
    PREPARATION_DATE,
    S3,
    ACTIVE,
    PERCENT_RETAINED,
    GUEST,
    ADMIN,
    BACKOFFICE,
    OWNER,
    REQUEST_STATE,
    ORDER_STATE,
    SHIPPING_TYPES,
    EMAILS
};
