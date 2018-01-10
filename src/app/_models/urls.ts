let server = 'http://app.mjn.cat/'; //prod
//let server = 'http://mjn.ntskoala.com/';//DESARROLLO
let base = server + 'api/';

export const URLS = {
  LOGIN: base + 'login.php',
  STD_ITEM: base + 'std_item.php',
  STD_SUBITEM: base + 'std_subitem.php',
  NOTIFICACION: base + 'send_message.php',
  SEGURIDAD: 'http://mjn.ntskoala.com/api/seguridad.php'
}
