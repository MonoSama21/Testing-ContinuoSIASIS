@test @consulta-auxiliares @WeekendTest
Feature: Consulta de Auxiliares por el rol DIRECTIVO
    Como usuario con rol de Directivo
    Quiero poder consultar todos los axuliares disponibles
    Para poder visualizar sus datos

Background:
    Given estoy en la pagina de login 
    And selecciono el rol "DIRECTIVO"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "DIRECTIVO"

@Escenario03
Scenario: Validar que el rol DIRECTIVO puede consultar los auxiliares
    When hago click en el apartado de "Auxiliares"
    Then se muestra en pantalla la lista de auxiliares disponibles
    And se muestra los nombres y apellidos del auxiliar
    And se muestra el numero de contacto del axuliar
    And se muestra el estado del auxiliar
    And se muestra el correo del auxiliar
    And se muestra la foto de cada auxiliar

