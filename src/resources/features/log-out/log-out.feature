@test @log-out @DailyTest @HU-1
Feature: Cierre de sesión exitoso en el sistema SIASIS
    Como usuario del sistema SIASIS
    Quiero poder cerrar sesión de manera correcta
    Para validar que un usuario puede salir de su cuenta de forma segura

Background:
    Given estoy en la pagina de login 

@Escenario03
Scenario Outline: ES-003 Validar que se puede realizar un cierre de sesion exitoso con el rol <rol>
    And selecciono el rol "<rol>"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "<rol>"
    When realizo el cierre de sesion
    Then verifico que he salido correctamente al ver la página de login 

    Examples:
        | rol                     |
        | DIRECTIVO               | 
        | PROFESOR_PRIMARIA       |
        | PROFESOR_SECUNDARIA     |
        | AUXILIAR                |
        | TUTOR                   |
        | OTRO                    |