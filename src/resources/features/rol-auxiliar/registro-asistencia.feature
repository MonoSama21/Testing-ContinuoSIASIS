Feature: Registro de asistencia por Rol Auxiliar
    Como Auxiliar del colegio
    Quiero poder registrar mi asistencia diaria al colegio
    Para llevar un control adecuado de mi presencia en el centro educativo

Background:
    Given estoy en la pagina de login 
    And selecciono el rol "AUXILIAR"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "AUXILIAR"

@celular
Scenario: Validar que el rol Auxiliar puede registrar su asistencia en día laborable
    And pongo mi dispositivo como un celular 
    And doy click en el boton de Registrar Asistencia
    #Then se registra correctamente mi asistencia con la hora y fecha actual
    #And aparece un mensaje de confirmacion indicando que la asistencia ha sido registrada exitosamente