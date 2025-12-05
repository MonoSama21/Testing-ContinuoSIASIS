@test @login-happy-path @DailyTest @HU-1
Feature: Inicio de sesión exitoso en el sistema SIASIS
    Como usuario del sistema SIASIS
    Quiero poder iniciar sesión con diferentes roles
    Para acceder a las funcionalidades correspondientes a mi rol

Background:
    Given estoy en la pagina de login 

@Escenario01
Scenario Outline: ES-001 Validar que se puede realizar un inicio de sesión exitoso con el rol <rol>
    When selecciono el rol "<rol>"
    And ingreso mi nombre de usuario y contraseña validos
    Then accedo al sistema como "<rol>" 

    Examples:
        | rol                     |
        | DIRECTIVO               | 
        | PROFESOR_PRIMARIA       |
        | PROFESOR_SECUNDARIA     |
        | AUXILIAR                |
        | TUTOR                   |
        | OTRO                    |
        | RESPONSABLE             |