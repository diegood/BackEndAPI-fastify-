const soap = require('soap');

function createSoapClient(url) {
    return new Promise((resolve, reject) => {
        soap.createClient(url, (err, client) => {
            if (!err) {
                console.log('The SOAP client was created successfully!');
                return resolve(client);
            } else {
                return reject(new Error('SoapClientCreationError'));
            }
        }); 
    })
};

function sendShipping(data, client) {

    const args = {
        'mrw:request': {
            'mrw:DatosRecogida': {
                'mrw:Direccion': {
                    'mrw:CodigoTipoVia': data.store.address.streetType,
                    'mrw:Via': data.store.address.streetName,
                    'mrw:Numero': data.store.address.streetNumber,
                    'mrw:CodigoPostal': data.store.address.postalCode,
                    'mrw:Resto': data.store.address.extra,
                    'mrw:Poblacion': data.store.address.locality,
                    'mrw:Provincia': data.store.address.province,
                },
                'mrw:Nombre': data.store.name,
                'mrw:Telefono': data.store.phoneNumber,
                'mrw:Horario': {
                    'mrw:Rangos': {
                        'mrw:HorarioRangoRequest': {
                            'mrw:Desde': data.order.timeFrom,
                            'mrw:Hasta': data.order.timeTo,
                        },
                    },
                },
            },
            'mrw:DatosEntrega': {
                'mrw:Direccion': {
                    'mrw:CodigoTipoVia': data.user.address.streetType,
                    'mrw:Via': data.user.address.streetName,
                    'mrw:Numero': data.user.address.streetNumber,
                    'mrw:CodigoPostal': data.user.address.postalCode,
                    'mrw:Resto': data.user.address.extra,
                    'mrw:Poblacion': data.user.address.locality,
                    'mrw:Provincia': data.user.address.province,
                },
                'mrw:Nombre': data.user.name,
                'mrw:Telefono': data.user.phoneNumber,
            },
            'mrw:DatosServicio': {
                'mrw:Fecha': data.order.date,
                'mrw:Referencia': data.order.number,
                'mrw:CodigoServicio': '0800',
                'mrw:NumeroBultos': 1,
                'mrw:Peso': data.order.weight,
            },
        },
    };

    return new Promise((resolve, reject) => {

        client.wsdl.definitions.xmlns.mrw = 'http://www.mrw.es/';
        client.wsdl.xmlnsInEnvelope = client.wsdl._xmlnsMap();
        
        client.addSoapHeader(
        `<mrw:AuthInfo>
            <mrw:CodigoFranquicia>${process.env.MRW_TEST_COD_FRANCHISE}</mrw:CodigoFranquicia>
            <mrw:CodigoAbonado>${process.env.MRW_TEST_COD_SUBSCRIBER}</mrw:CodigoAbonado>
            <mrw:CodigoDepartamento></mrw:CodigoDepartamento>
            <mrw:UserName>${process.env.MRW_TEST_USERNAME}</mrw:UserName>
            <mrw:Password>${process.env.MRW_TEST_PWD}</mrw:Password>
        </mrw:AuthInfo>`);

        client.TransmEnvio(args, (err, result) => {
            if (err) {
                console.error('Error in transmEnvio cause:', err);
                return reject(new Error(err));
            }
            return resolve(result);
        })
    })
}

/**
 * @function createShipping
 * @param {object} userData
 * @return {Promise<*>}
 */
const createShipping = async(user, store, order) => {
    try {
        const shippingUrl = process.env.MRW_TEST_TRASM_SHIP;    
        const shippingData = {user, store, order};

        const soapClient = await createSoapClient(shippingUrl);
        const result = await sendShipping(shippingData, soapClient);
        result.orderId = order.number;
        result.deliveryDate = order.date;
        
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createShipping,
};
