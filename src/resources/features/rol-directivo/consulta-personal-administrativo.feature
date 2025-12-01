@test @consulta-personal-administrativo @DailyTest
Feature: Consulta de Personal administrativo
    Como usuario con el rol de Directivo
    Quiero poder consultar todos los personales administrativos disponibles
    Para poder visualizar sus datos

Background:
    Given estoy en la pagina de login 
    And selecciono el rol "DIRECTIVO"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "DIRECTIVO"

@Escenario04
Scenario: Validar que el rol DIRECTIVO puede consultar el personal administrativo
    When hago click en el apartado de "Personal Administrativo"
    Then se muestra en pantalla la lista de personal administrativo disponibles
    And se muestra los nombres y apellidos del personal administrativo
    And se muestra el numero de contacto del personal administrativo
    And se muestra el estado del personal administrativo
    And se muestra la foto de cada personal administrativo