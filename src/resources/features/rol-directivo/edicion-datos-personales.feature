@test @DailyTest @HU-2
Feature: Edicion de Datos Personales por Rol Directivo
    Como usuario con rol de Directivo
    Quiero poder editar mis datos personales
    Para mantener mi informacion actualizada

Background: 
    Given estoy en la pagina de login 
    And selecciono el rol "DIRECTIVO"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "DIRECTIVO"

@Escenario04
Scenario: ES-004 Validar que el rol Directivo puede visualizar los campos en Editar Perfil
    When en la barra de navegacion selecciono el apartado de Editar Perfil
    Then se muestra en la pantalla su DNI, Nombres, Apellidos, Género, Foto y Celular
    And se muestra los datos de contacto como celular y correo Electrónico
    And se muestra la informacion de usuario como nombre de usuario

#ACA HAY UN BUG QUE ACTUALIZO PERO EN EL HEADER NO SE ACTUALIZA
@Escenario05  
Scenario: ES-005 Validar que el rol Directivo puede editar su informacion personal
    When en la barra de navegacion selecciono el apartado de Editar Perfil
    And doy click en el boton de Editar Datos
    And edito mi informacion personal
    And guardo los cambios realizados
    Then verifico que se han guardado los cambios
    #And restauro los datos originales
    #Then verifico que los datos originales son correctos

@Escenario07
Scenario: ES-007 Validar que el rol Directivo puede editar su foto de perfil con foto de peso admitible 
    When en la barra de navegacion selecciono el apartado de Editar Perfil
    And doy click en el boton de Editar Datos
    And hago click en Cambiar Foto
    And subo una foto de tamaño no mayor a 5MB
    And realizo el cambio de foto
    #ACA HAY BUG PORQUE SOLO ACTUALIZA EN EL MODAL PERO NO EN EL HEADER, PERO NO HAY MANERA DE AUTOMATIZAR
    Then se valida el cambio correctamente tanto en el modal como en el header

@Escenario08
Scenario: ES-008 Validar que el rol Directivo NO puede editar su foto de perfil con foto de peso no admitible (mayor a 5MB)
    When en la barra de navegacion selecciono el apartado de Editar Perfil
    And doy click en el boton de Editar Datos
    And hago click en Cambiar Foto
    And subo una foto de tamaño mayor a 5MB
    Then aparece un modal indicando que la imagen no debe superar los 5MB
    And el boton del modal para cambiar foto debe permanecer desahabilitado 

@Escenario09
Scenario: ES-009 Validar que el rol Directivo puede editar su contraseña 
    When en la barra de navegacion selecciono el apartado de Editar Perfil
    And doy click en el icono de cambio de contraseña
    And ingreso la contraseña actual del rol "DIRECTIVO"
    And ingreso la nueva contraseña
    And doy click en el boton de Cambiar Contraseña
    Then se muestra un mensaje de confirmacion indicando que la contraseña ha sido cambiada exitosamente
    And restauro la contraseña original del rol "DIRECTIVO" para futuras pruebas

Scenario: ES-010 Validar que el rol Directivo pueda editar su correo