Feature: Gestión de comunicados por parte de Directivos
    Como directivo del colegio (Directora/Subdirectora)
    Quiero poder registrar, buscar, modificar y eliminar comunicados institucionales
    Para mantener informada a la comunidad educativa sobre eventos, actividades y decisiones importantes

Background:
    Given estoy en la pagina de login 
    And selecciono el rol "DIRECTIVO"
    And ingreso mi nombre de usuario y contraseña validos
    And accedo al sistema como "DIRECTIVO"
    And hago click en el apartado de "Comunicados"

@test @comunicados @registro
Scenario: Registrar un comunicado exitosamente con todos los campos completos
    When hago click en el boton "Registrar Comunicado"
    And completo los campos de fecha de inicio y fecha de conclusión con una fecha mayor a la actual
    And completo los campos de titulo y Contenido                            
    And adjunto una imagen al comunicado
    Then la vista previa muestra correctamente el titulo, contenido y fecha
    When confirmo el registro del comunicado
    And hago click en el apartado de "Comunicados"
    Then el sistema muestra un mensaje de exito "¡Comunicado Registrado!"
    And el comunicado aparece en la lista con estado "Pendiente"

# @test @comunicados @registro
# Scenario: Registrar un comunicado sin imagen adjunta
#     When hago click en el boton "Registrar Comunicado"
#     And completo el formulario de comunicado con los siguientes datos:
#         | Campo              | Valor                                           |
#         | Titulo             | Comunicado importante sin imagen                |
#         | Contenido          | Este comunicado no requiere imagen adjunta      |
#         | Fecha Inicio       | fecha_futura:3                                  |
#         | Fecha Conclusion   | fecha_futura:10                                 |
#     And visualizo la vista previa del comunicado
#     When confirmo el registro del comunicado
#     Then el sistema muestra un mensaje de exito "Comunicado registrado correctamente"
#     And el comunicado aparece en la lista sin imagen

# @test @comunicados @validacion
# Scenario: Intentar registrar un comunicado con fecha de inicio pasada
#     When hago click en el boton "Registrar Comunicado"
#     And completo el formulario de comunicado con los siguientes datos:
#         | Campo              | Valor                                           |
#         | Titulo             | Comunicado con fecha inválida                   |
#         | Contenido          | Este comunicado tiene fecha pasada              |
#         | Fecha Inicio       | fecha_pasada:5                                  |
#         | Fecha Conclusion   | fecha_futura:10                                 |
#     And intento confirmar el registro del comunicado
#     Then el sistema muestra un mensaje de error "La fecha de inicio debe ser mayor a la fecha actual"
#     And el comunicado no se registra en el sistema

# @test @comunicados @validacion
# Scenario: Intentar registrar un comunicado fuera del año académico
#     When hago click en el boton "Registrar Comunicado"
#     And completo el formulario de comunicado con los siguientes datos:
#         | Campo              | Valor                                           |
#         | Titulo             | Comunicado fuera de año académico               |
#         | Contenido          | Este comunicado excede el año académico         |
#         | Fecha Inicio       | fecha_fuera_año_academico:inicio                |
#         | Fecha Conclusion   | fecha_fuera_año_academico:fin                   |
#     And intento confirmar el registro del comunicado
#     Then el sistema muestra un mensaje de error "Las fechas deben estar dentro del año académico vigente"
#     And el comunicado no se registra en el sistema

# @test @comunicados @validacion
# Scenario: Intentar registrar un comunicado con fecha de conclusión anterior a la fecha de inicio
#     When hago click en el boton "Registrar Comunicado"
#     And completo el formulario de comunicado con los siguientes datos:
#         | Campo              | Valor                                           |
#         | Titulo             | Comunicado con fechas inválidas                 |
#         | Contenido          | Fechas en orden incorrecto                      |
#         | Fecha Inicio       | fecha_futura:10                                 |
#         | Fecha Conclusion   | fecha_futura:5                                  |
#     And intento confirmar el registro del comunicado
#     Then el sistema muestra un mensaje de error "La fecha de conclusión debe ser posterior a la fecha de inicio"
#     And el comunicado no se registra en el sistema

# @test @comunicados @busqueda
# Scenario: Buscar comunicados por rango de fechas
#     Given existen comunicados registrados en el sistema
#     When ingreso en el filtro "Fecha Desde" el valor "fecha_futura:1"
#     And ingreso en el filtro "Fecha Hasta" el valor "fecha_futura:30"
#     And hago click en el boton "Buscar"
#     Then el sistema muestra solo los comunicados dentro del rango de fechas especificado
#     And los resultados estan ordenados desde la fecha mas reciente a la mas antigua

# @test @comunicados @busqueda
# Scenario: Buscar comunicados por estado "Pendiente"
#     Given existen comunicados registrados en el sistema
#     When selecciono el filtro "Estado" con el valor "Pendiente"
#     And hago click en el boton "Buscar"
#     Then el sistema muestra solo los comunicados en estado "Pendiente"
#     And todos los comunicados mostrados tienen fecha de inicio futura

# @test @comunicados @busqueda
# Scenario: Buscar comunicados por estado "Activo"
#     Given existen comunicados registrados en el sistema
#     When selecciono el filtro "Estado" con el valor "Activo"
#     And hago click en el boton "Buscar"
#     Then el sistema muestra solo los comunicados en estado "Activo"
#     And todos los comunicados mostrados tienen fecha actual dentro del rango de vigencia

# @test @comunicados @busqueda
# Scenario: Buscar comunicados por título
#     Given existen comunicados registrados en el sistema
#     When ingreso en el filtro "Título" el valor "vacacional"
#     And hago click en el boton "Buscar"
#     Then el sistema muestra solo los comunicados que contienen "vacacional" en el título

# @test @comunicados @busqueda
# Scenario: Buscar comunicados combinando múltiples filtros
#     Given existen comunicados registrados en el sistema
#     When selecciono el filtro "Estado" con el valor "Pendiente"
#     And ingreso en el filtro "Título" el valor "importante"
#     And ingreso en el filtro "Fecha Desde" el valor "fecha_futura:1"
#     And hago click en el boton "Buscar"
#     Then el sistema muestra solo los comunicados que cumplen todos los criterios

# @test @comunicados @visualizacion
# Scenario: Visualizar detalle completo de un comunicado
#     Given existen comunicados registrados en el sistema
#     When hago click en el boton "Ver Detalle" de un comunicado
#     Then el sistema muestra un modal con los detalles del comunicado
#     And se visualiza el título del comunicado
#     And se visualiza el contenido completo
#     And se visualizan las fechas de inicio y conclusión
#     And se visualiza la imagen adjunta si existe
#     And se visualiza el estado actual del comunicado

# @test @comunicados @modificacion
# Scenario: Modificar un comunicado en estado "Pendiente" exitosamente
#     Given existe un comunicado en estado "Pendiente"
#     When hago click en el boton "Editar" del comunicado
#     And modifico los siguientes campos:
#         | Campo              | Nuevo Valor                                     |
#         | Titulo             | Comunicado vacacional ACTUALIZADO               |
#         | Contenido          | Contenido modificado del comunicado             |
#         | Fecha Inicio       | fecha_futura:7                                  |
#         | Fecha Conclusion   | fecha_futura:20                                 |
#     And guardo los cambios del comunicado
#     Then el sistema muestra un mensaje de exito "Comunicado modificado correctamente"
#     And el comunicado muestra la información actualizada

# @test @comunicados @modificacion
# Scenario: Modificar solo campos permitidos en un comunicado "Activo"
#     Given existe un comunicado en estado "Activo"
#     When hago click en el boton "Editar" del comunicado
#     Then el campo "Titulo" esta deshabilitado para edición
#     And el campo "Fecha Inicio" esta deshabilitado para edición
#     And el campo "Contenido" esta habilitado para edición
#     And el campo "Fecha Conclusion" esta habilitado para edición
#     When modifico el campo "Contenido" con nuevo valor
#     And guardo los cambios del comunicado
#     Then el sistema muestra un mensaje de exito "Comunicado modificado correctamente"

# @test @comunicados @modificacion
# Scenario: Intentar modificar un comunicado en estado "Pasado"
#     Given existe un comunicado en estado "Pasado"
#     When intento hacer click en el boton "Editar" del comunicado
#     Then el boton "Editar" no esta disponible o esta deshabilitado
#     And no es posible modificar ningún campo del comunicado

# @test @comunicados @modificacion
# Scenario: Modificar la imagen de un comunicado en estado "Pendiente"
#     Given existe un comunicado en estado "Pendiente" con imagen
#     When hago click en el boton "Editar" del comunicado
#     And elimino la imagen actual
#     And adjunto una nueva imagen
#     And guardo los cambios del comunicado
#     Then el sistema muestra un mensaje de exito "Comunicado modificado correctamente"
#     And el comunicado muestra la nueva imagen

# @test @comunicados @eliminacion
# Scenario: Eliminar un comunicado en estado "Pendiente"
#     Given existe un comunicado en estado "Pendiente"
#     When hago click en el boton "Eliminar" del comunicado
#     Then el sistema muestra un modal de confirmación "¿Está seguro de eliminar este comunicado?"
#     When confirmo la eliminación
#     Then el sistema muestra un mensaje de exito "Comunicado eliminado correctamente"
#     And el comunicado ya no aparece en la lista

# @test @comunicados @eliminacion
# Scenario: Cancelar la eliminación de un comunicado
#     Given existe un comunicado en estado "Pendiente"
#     When hago click en el boton "Eliminar" del comunicado
#     And el sistema muestra un modal de confirmación
#     When cancelo la eliminación
#     Then el modal se cierra
#     And el comunicado permanece en la lista sin cambios

# @test @comunicados @eliminacion
# Scenario: Eliminar un comunicado en estado "Activo"
#     Given existe un comunicado en estado "Activo"
#     When hago click en el boton "Eliminar" del comunicado
#     Then el sistema muestra un modal de confirmación
#     When confirmo la eliminación
#     Then el sistema muestra un mensaje de exito "Comunicado eliminado correctamente"
#     And el comunicado ya no aparece en la lista

# @test @comunicados @eliminacion
# Scenario: Intentar eliminar un comunicado en estado "Pasado"
#     Given existe un comunicado en estado "Pasado"
#     When intento hacer click en el boton "Eliminar" del comunicado
#     Then el boton "Eliminar" no esta disponible o esta deshabilitado
#     And el comunicado permanece en el sistema como registro histórico

# @test @comunicados @estados
# Scenario: Verificar asignación automática de estado "Pendiente"
#     When registro un comunicado con fecha de inicio futura
#     Then el sistema asigna automáticamente el estado "Pendiente"
#     And el comunicado aparece en la lista de comunicados pendientes

# @test @comunicados @estados
# Scenario: Verificar cambio automático de estado de "Pendiente" a "Activo"
#     Given existe un comunicado con estado "Pendiente" cuya fecha de inicio es hoy
#     When actualizo la vista de comunicados
#     Then el sistema cambia automáticamente el estado a "Activo"

# @test @comunicados @estados
# Scenario: Verificar cambio automático de estado de "Activo" a "Pasado"
#     Given existe un comunicado con estado "Activo" cuya fecha de conclusión ya pasó
#     When actualizo la vista de comunicados
#     Then el sistema cambia automáticamente el estado a "Pasado"

# @test @comunicados @vistaprevia
# Scenario: Vista previa refleja correctamente el formato del comunicado
#     When hago click en el boton "Registrar Comunicado"
#     And completo el formulario con datos de prueba
#     And visualizo la vista previa del comunicado
#     Then la vista previa muestra el mismo formato que verán los usuarios finales
#     And el título se muestra con el estilo correcto
#     And el contenido mantiene los saltos de línea y formato
#     And la imagen se visualiza en el tamaño adecuado

# @test @comunicados @ordenamiento
# Scenario: Verificar ordenamiento cronológico de comunicados
#     Given existen múltiples comunicados con diferentes fechas de inicio
#     When visualizo la lista de comunicados
#     Then los comunicados están ordenados desde la fecha más reciente a la más antigua
#     And el primer comunicado tiene la fecha de inicio más próxima

# @test @comunicados @camposrequeridos
# Scenario: Validar campos obligatorios en el formulario de registro
#     When hago click en el boton "Registrar Comunicado"
#     And dejo el campo "Título" vacío
#     And dejo el campo "Contenido" vacío
#     And intento confirmar el registro del comunicado
#     Then el sistema muestra mensajes de error para los campos obligatorios
#     And el campo "Título" muestra el mensaje "Este campo es obligatorio"
#     And el campo "Contenido" muestra el mensaje "Este campo es obligatorio"
#     And el comunicado no se registra

# @test @comunicados @imagenes
# Scenario: Validar tamaño y formato de imagen adjunta
#     When hago click en el boton "Registrar Comunicado"
#     And intento adjuntar una imagen con formato no válido
#     Then el sistema muestra un mensaje de error "Formato de imagen no permitido"
#     And la imagen no se adjunta al comunicado
