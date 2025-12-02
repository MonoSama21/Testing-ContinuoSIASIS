@test @DailyTest
Feature: Edicion de Datos Personales por Rol Directivo
    Como usuario con rol de Directivo
    Quiero poder editar mis datos personales
    Para mantener mi informacion actualizada

Background: 
    Given estoy en la pagina de login 
    And selecciono el rol "DIRECTIVO"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "DIRECTIVO"

#ACA HAY UN BUG QUE ACTUALIZO PERO EN EL HEADER NO SE ACTUALIZA, AUTOMATIZAR ESE BUG
@Escenario06  
Scenario: Validar que el rol Directivo puede editar su informacion personal
    When en la barra de navegacion selecciono el apartado de Editar Perfil
    And doy click en el boton de Editar Datos
    And edito mi informacion personal
    And guardo los cambios realizados
    Then verifico que se han guardado los cambios
    #And restauro los datos originales
    #Then verifico que los datos originales son correctos

@Escenario07
Scenario: Validar que el rol Directivo puede editar su informacion personal mas de una vez
    When en la barra de navegacion selecciono el apartado de Editar Perfil
    And doy click en el boton de Editar Datos
    And edito mi informacion personal
    And guardo los cambios realizados
    Then verifico que se han guardado los cambios
    #And restauro los datos originales
    #Then verifico que los datos originales son correctos

Scenario: Validar que el rol Directivo puede editar su informacion del usuario 

Scenario: Validar que el rol Directivo puede editar su foto de perfil con foto de peso admitible 

@Escenario11
Scenario: Validar que el rol Directivo puede editar su foto de perfil con foto de peso no admitible (mayor a 5MB)
    When en la barra de navegacion selecciono el apartado de Editar Perfil
    And doy click en el boton de Editar Datos
    And hago click en Cambiar Foto
    And subo una foto de tamaño mayor a 5MB
    Then aparece un modal indicando que la imagen no debe superar los 5MB
    And el boton del modal para cambiar foto debe permanecer desahabilitado 