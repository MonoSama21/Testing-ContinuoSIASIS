@test @DailyTest
Feature: Edicion de Datos Personales por Rol Profesor de Primaria
    Como tutor de secundaria del colegio
    Quiero poder visualizar y editar mis datos personales según sea necesario
    Para mantener mi información actualizada en el sistema y facilitar la comunicación con la comunidad educativa

Background: 
    Given estoy en la pagina de login 
    And selecciono el rol "TUTOR"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "TUTOR"

#AVER
@Escenario133
Scenario: Validar que el rol Tutor de Secundaria puede visualizar los campos en Editar Perfil
    When en la barra de navegacion selecciono el apartado de Editar Perfil
    And doy click en el boton de Editar Datos
    Then se muestra en la pantalla su DNI, Nombres, Apellidos, Género, Foto, Celular, Correo Electrónico
    And también se muestra el nombre de usuario

@Escenario14
Scenario: Validar que el rol Tutor de Secundaria puede editar el campo Celular
    When en la barra de navegacion selecciono el apartado de Editar Perfil
    And doy click en el boton de Editar Datos
    And solo se pueden editar los campos de celular y correo Electrónico
    And edito el campo de celular
    And guardo los cambios realizados
    Then verifico que se han guardado los cambios asi como el mensaje de confirmacion
    #And restauro los datos originales
    #Then verifico que los datos originales son correctos

@Escenario15
Scenario: Validar que el rol Tutor de Secundaria puede editar el campo Correo electrónico
    When en la barra de navegacion selecciono el apartado de Editar Perfil
    And doy click en el boton de Editar Datos
    And solo se pueden editar los campos de celular y correo Electrónico
    And edito el campo de correo Electrónico
    And me pide una verificación adicional
    And guardo los cambios realizados
    Then verifico que se han guardado los cambios asi como el mensaje de confirmacion
    #And restauro los datos originales
    #Then verifico que los datos originales son correctos


Scenario: Validar que el rol Tutor de Secundaria puede editar su foto de perfil con foto de peso admitible 
    When en la barra de navegacion selecciono el apartado de Editar Perfil
    And doy click en el boton de Editar Datos
    And hago click en Cambiar Foto
    And subo una foto de tamaño no mayor a 5MB
    And realizo el cambio de foto
    #ACA HAY BUG PORQUE SOLO ACTUALIZA EN EL MODAL PERO NO EN EL HEADER
    Then se valida el cambio correctamente tanto en el modal como en el header

@Escenario11
Scenario: Validar que el rol Tutor de Secundaria puede editar su foto de perfil con foto de peso no admitible (mayor a 5MB)
    When en la barra de navegacion selecciono el apartado de Editar Perfil
    And doy click en el boton de Editar Datos
    And hago click en Cambiar Foto
    And subo una foto de tamaño mayor a 5MB
    Then aparece un modal indicando que la imagen no debe superar los 5MB
    And el boton del modal para cambiar foto debe permanecer desahabilitado 


#FALTA CREAR LOS ESCENARIOS PARA EL CAMBIO DE CONTRASEÑA 