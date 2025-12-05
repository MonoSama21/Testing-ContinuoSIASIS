@test @DailyTest @HU-2
Feature: Edicion de Datos Personales por Rol Auxiliar
    Como Auxiliar del colegio
    Quiero poder visualizar y editar mis datos personales según sea necesario
    Para mantener mi información actualizada en el sistema y facilitar la comunicación con la comunidad educativa

Background: 
    Given estoy en la pagina de login 
    And selecciono el rol "AUXILIAR"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "AUXILIAR"

@Escenario16
Scenario: ES-016 Validar que el rol Auxiliar puede visualizar los campos en Editar Perfil
    When en la barra de navegacion selecciono el apartado de Editar Perfil
    Then se muestra en la pantalla su DNI, Nombres, Apellidos, Género, Foto y Celular
    And se muestra los datos de contacto como celular y correo Electrónico
    And se muestra la informacion de usuario como nombre de usuario

@Escenario17
Scenario: ES-017 Validar que el rol Auxiliar puede editar su informacion personal
    When en la barra de navegacion selecciono el apartado de Editar Perfil
    And doy click en el boton de Editar Datos
    And solo se pueden editar los campos de celular y correo Electrónico
    And edito los campos disponibles
    And guardo los cambios realizados
    Then verifico que se han guardado los cambios asi como el mensaje de confirmacion
    #And restauro los datos originales
    #Then verifico que los datos originales son correctos

@Escenario18
Scenario: ES-018 Validar que el rol Auxiliar puede editar su foto de perfil con foto de peso admitible 
    When en la barra de navegacion selecciono el apartado de Editar Perfil
    And doy click en el boton de Editar Datos
    And hago click en Cambiar Foto
    And subo una foto de tamaño no mayor a 5MB
    And realizo el cambio de foto
    #ACA HAY BUG PORQUE SOLO ACTUALIZA EN EL MODAL PERO NO EN EL HEADER
    Then se valida el cambio correctamente tanto en el modal como en el header

@Escenario19
Scenario: ES-019 Validar que el rol Auxiliar NO puede editar su foto de perfil con foto de peso no admitible (mayor a 5MB)
    When en la barra de navegacion selecciono el apartado de Editar Perfil
    And doy click en el boton de Editar Datos
    And hago click en Cambiar Foto
    And subo una foto de tamaño mayor a 5MB
    Then aparece un modal indicando que la imagen no debe superar los 5MB
    And el boton del modal para cambiar foto debe permanecer desahabilitado 

@contrauxi
Scenario: ES-020 Validar que el rol Auxiliar puede editar su contraseña
    When en la barra de navegacion selecciono el apartado de Editar Perfil
    And doy click en el icono de cambio de contraseña
    And ingreso la contraseña actual del rol "AUXILIAR"
    And ingreso la nueva contraseña
    And doy click en el boton de Cambiar Contraseña
    Then se muestra un mensaje de confirmacion indicando que la contraseña ha sido cambiada exitosamente
    And restauro la contraseña original del rol "AUXILIAR" para futuras pruebas