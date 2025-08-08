Prueba NODE
Crear un CRUD (API REST) en Node para el registro de usuarios.
Para la creación de la prueba, utilizar un repositorio falso de usuarios (puede ser en memoria).
Reglas
Debe existir un usuario administrador previamente registrado para utilizar la autenticación (no es necesario cifrar la contraseña): { "name": "admin", "email": "admin@spsgroup.com.br", "type": "admin", "password": "1234" }
  Se ha dejado el usuario solicitado

Crear una ruta de autenticación (token Jwt).
  Me disculpo en esta parte ya que me confié en lo que decía en el correo que era una simple API CRUD de usuarios, pero si he usado muchas veces el tema de token, de hecho lo estoy usando en loggueo y la creación de sesión en el front end

Las rutas de la API solo pueden ser ejecutadas si el usuario está autenticado.
  Eso lo controlo en el front end.

Debe ser posible añadir usuarios con los campos: email, nombre, type, password.
  Se creó la API y se tiene la opción agregar usuario en el front end

No debe ser posible registrar un correo electrónico ya existente.
  Se ha creado dos CRUD una usando un archivo json como BD y otra con conexión a un SQL Server, en la de SQL Server es fácil controlar colocando la propiedad unique en la columna correo, pero a nivel json no controlé que busque el correo si ya existe.

Debe ser posible eliminar usuarios.
  Se creó la API y se tiene la opción agregar usuario en el front end
  
Debe ser posible modificar los datos de un usuario.
  Se creó la API y se tiene la opción agregar usuario en el front end
