@WeekendTest
Feature: Indisponibilidad de registrar asistencia en día no laborable
    Como usuario con rol de Directivo
    Quiero que el rol de Auxiliar no pueda registrar su asistencia un día no laborable
    Para que no exista confusión con registros de asistencia

Background:
    Given estoy en la pagina de login 
    And selecciono el rol "AUXILIAR"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "AUXILIAR"

@Escenario08
Scenario: Validar que no se puede registrar la asistencia del rol Auxiliar un día no laborable
    When estoy en un día no laborable 
    Then aparece un modal indicando que no se puede registrar la asistencia
    And aparece un texto que indica el dia no laboral en el que estamos
