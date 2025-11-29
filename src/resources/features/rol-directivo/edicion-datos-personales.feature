Feature: Edicion de Datos Personales por Rol Directivo
    Como usuario con rol de Directivo
    Quiero poder editar mis datos personales
    Para mantener mi informacion actualizada

Background: 
    Given estoy en la pagina de login 
    And selecciono el rol "DIRECTIVO"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "DIRECTIVO"

Scenario: Editar perfil con el rol Directivo
    #When Estoy en la página de edición de perfil
    #And Edito mis datos personales con los valores aleatorios
    #Then Verifico que se han guardado los cambios
    #And Restauro los datos originales
    #Then verifico que los datos originales son correctos