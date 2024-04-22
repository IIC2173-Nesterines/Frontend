import axios from 'axios';

// convert date format to YY MM DD HH:SS
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

export default formatDate;

interface LocationInfo {
  city: string;
  region: string;
  country: string;
  loc: string;
  postal: string;
}

async function getLocation(ipAddress: string | any): Promise<LocationInfo | string> {
  const accessToken = '20e93d1df354b0'; // Reemplaza 'tu_clave_api' con tu clave de API real
  const url = `https://ipinfo.io/${ipAddress}/json?token=${accessToken}`;
  console.log('URL:', url);

  try {
    const response = await axios.get(url);
    const { data } = response;
    return {
      city: data.city || 'No disponible',
      region: data.region || 'No disponible',
      country: data.country || 'No disponible',
      loc: data.loc || 'No disponible',
      postal: data.postal || 'No disponible',
    };
  } catch (error) {
    return `Error al obtener la ubicación: ${error}`;
  }
}

export async function getMyIP(): Promise<LocationInfo | string> {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    console.log('Tu IP es:', response.data.ip);
    const data = getLocation(response.data.ip);
    return data;
  } catch (error) {
    console.error('Error obteniendo la IP:', error);
    return 'No se pudo obtener la IP';
  }
}
