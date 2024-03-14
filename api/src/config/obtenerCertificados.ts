import { readFileSync } from 'fs';

export const obtenerCertificados = async () => {
  const certificados = {
    SSLCertificateFile: '',
    SSLCertificateKeyFile: '',
    SSLCACertificateFile: '',
  };

  let arraySSL = [];

  let archivo: any;

  const ruta = '/etc/apache2/sites-available/allasenlinea.com.conf';

  // let archivo = fs.readFileSync(ruta, 'utf-8');
  try {
    archivo = readFileSync(ruta, 'utf-8');
  } catch (error) {
    console.log(error);
  }

  const arrayTexto = archivo.split('\n');
  console.debug(certificados);

  for (let index = 0; index < arrayTexto.length; index++) {
    if (arrayTexto[index].includes('SSLCertificateFile')) {
      arraySSL = arrayTexto[index].split('SSLCertificateFile');
      certificados.SSLCertificateFile = arraySSL[1].trim();
    }
    if (arrayTexto[index].includes('SSLCertificateKeyFile')) {
      arraySSL = arrayTexto[index].split('SSLCertificateKeyFile');
      certificados.SSLCertificateKeyFile = arraySSL[1].trim();
    }
    if (arrayTexto[index].includes('SSLCACertificateFile')) {
      arraySSL = arrayTexto[index].split('SSLCACertificateFile');
      certificados.SSLCACertificateFile = arraySSL[1].trim();
    }
  }

  return certificados;
};
