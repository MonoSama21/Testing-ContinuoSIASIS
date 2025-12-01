@test @consulta-asistencias-personal @DailyTest
Feature: Consulta de Aasistencias de Personal por el rol DIRECTIVO
    Como usuario con rol de Directivo
    Quiero poder consultar las asistencias de cualquier personal del colegio(Directivo, Profesor de Primaria, Profesor de Secundaria, Auxiliar o Personal Administrativo)
    Para poder evaluar el desempeño del personal del colegio

Background:
    Given estoy en la pagina de login 
    And selecciono el rol "DIRECTIVO"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "DIRECTIVO"

@Escenario05
Scenario Outline: Validar que el rol de DIRECTIVO puede ver los registros de asistencia del personal
    When hago click en el apartado de "Registros de Personal"
    And en el campo tipo de personal selecciono un "<tipo_personal>"
    And selecciono un usuario
    And selecciono un mes superior a Junio
    And doy click en el boton de Buscar
    Then se muestra una tabla con las asistencias del personal seleccionado

    Examples:
      | tipo_personal           |
      | Profesor de Primaria    |
      | Profesor de Secundaria  |
      | Auxiliar                |
      | Personal Administrativo |

