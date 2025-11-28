@login-unhappy-path
Feature: Inicio de sesión exitoso en el sistema SIASIS
    Como usuario del sistema SIASIS
    Quiero poder validar que no se puede iniciar sesión con diferentes roles y credenciales inválidas
    Para no poder acceder a las funcionalidades correspondientes al rol

Background:
    Given estoy en la pagina de login 

@Escenario02
Scenario Outline: Validar que no se puede realizar un inicio de sesion exitoso con credenciales invalidas y <rol>
    When selecciono el rol "<rol>"
    And ingreso mi nombre de usuario y contraseña invalidos
    Then aparece un modal indicando que las credenciales son incorrectas

    Examples:
        | rol                     |
        | DIRECTIVO               | 
        | PROFESOR_PRIMARIA       |
        | PROFESOR_SECUNDARIA     |
        | AUXILIAR                |
        | TUTOR                   |
        | OTRO                    |