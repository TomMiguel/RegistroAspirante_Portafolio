Imports System.Web.Script.Serialization
Imports System.IO

Public Class AjaxAspiranteNuevo
    Inherits System.Web.UI.Page
    Dim serializer As JavaScriptSerializer
    Dim UsuarioCreaModifica As String = ConfigurationManager.AppSettings.Get("Usuario")
    Dim liz As New InterfaseZN
    Dim liTC As New liInterfaseTC
    Dim objAspirante As New Aspirante
    Dim validaAspiranteRepetido As Boolean = False
    'testing

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        serializer = New JavaScriptSerializer()
        Response.Cache.SetCacheability(HttpCacheability.NoCache)
        Response.Cache.SetNoStore()
        Dim query As String = Request.QueryString("Query")
        Dim id_SolicitudAspirante As String = Request.QueryString("IdAspirantre")
        Dim data As New ResultadosAjax
        data.Resultado = "ok"
        Dim provinciaCedula, tomoCedula, asientoCedula, primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno, apellidoCasada, seguroSocial, sexo, estadoCivil,
            tipoSangre, licencia, tipoLicencia, fechaExpiracion, aniosExperiencia, observacion, diaNacimiento, mesNacimiento, anioNacimiento, paisNacimiento,
            provinciaNacimiento, distritoNacimiento, nacionalidad, telefonoResidencia, telefonoOficina, telefonoCelular, telefonoOtros, provinciaDireccion, distritoDireccion,
            corregimientoDireccion, barrioDireccion, casaDireccion, avenidaDireccion, edificioDireccion, calleDireccion, apartamento,
            idUSUARIO, correoPersonal, correoOtro, pasaporte, rrhh, provinciaDestino1, provinciaDestino2, provinciaDestino3, encuestas, referido, regional, solicitudEmpleo As String

        Dim fecha_referencia, detalle_referido, RH_referenciadate, RH_entradas, fecha_entradaDept, archivadoen, fecha_encuesta, AspiranteActivo As String


        Dim validaDoble As String = ""

        Dim AspiracionSalarial, NegociableHasta As String

        ' se conulta el parámetro query del ajax y dependiendo de su valor se ejecutan los diferentes métodos

        If query = "Save" Then
            Dim accion As String = Request.QueryString("Accion")
            provinciaCedula = Request.QueryString("ProvinciaCedula")
            tomoCedula = Request.QueryString("TomoCedula")
            asientoCedula = Request.QueryString("AsientoCedula")
            primerNombre = Uri.UnescapeDataString(Request.QueryString("PrimerNombre"))
            segundoNombre = Uri.UnescapeDataString(Request.QueryString("SegundoNombre"))
            apellidoPaterno = Uri.UnescapeDataString(Request.QueryString("ApellidoPaterno"))
            apellidoMaterno = Uri.UnescapeDataString(Request.QueryString("ApellidoMaterno"))
            apellidoCasada = Uri.UnescapeDataString(Request.QueryString("ApellidoCasada"))
            seguroSocial = Uri.UnescapeDataString(Request.QueryString("SeguroSocial"))
            sexo = Request.QueryString("Sexo")
            estadoCivil = Request.QueryString("EstadoCivil")
            tipoSangre = Request.QueryString("TipoSangre")
            licencia = Request.QueryString("Licencia")
            tipoLicencia = Request.QueryString("TipoLicencia")
            fechaExpiracion = Request.QueryString("FechaExpiracion")
            aniosExperiencia = Request.QueryString("AniosExperiencia")
            observacion = Request.QueryString("Observacion")
            diaNacimiento = Request.QueryString("DiaNacimiento")
            mesNacimiento = Request.QueryString("MesNacimiento")
            anioNacimiento = Request.QueryString("AnioNacimiento")
            paisNacimiento = Request.QueryString("PaisNacimiento")
            provinciaNacimiento = Request.QueryString("ProvinciaNacimiento")
            distritoNacimiento = Request.QueryString("DistritoNacimiento")
            nacionalidad = Uri.UnescapeDataString(Request.QueryString("Nacionalidad"))
            telefonoResidencia = Request.QueryString("TelefonoResidencia")
            telefonoOficina = Request.QueryString("TelefonoOficina")
            telefonoCelular = Request.QueryString("TelefonoCelular")
            telefonoOtros = Request.QueryString("TelefonoOtros")
            provinciaDireccion = Request.QueryString("ProvinciaDireccion")
            distritoDireccion = Request.QueryString("DistritoDireccion")
            corregimientoDireccion = Request.QueryString("CorregimientoDireccion")
            barrioDireccion = Uri.UnescapeDataString(Request.QueryString("BarrioDireccion"))
            casaDireccion = Uri.UnescapeDataString(Request.QueryString("CasaDireccion"))
            avenidaDireccion = Uri.UnescapeDataString(Request.QueryString("AvenidaDireccion"))
            edificioDireccion = Uri.UnescapeDataString(Request.QueryString("EdificioDireccion"))
            calleDireccion = Uri.UnescapeDataString(Request.QueryString("CalleDireccion"))
            apartamento = Uri.UnescapeDataString(Request.QueryString("Apartamento"))
            correoPersonal = Uri.UnescapeDataString(Request.QueryString("CorreoPersonal"))
            correoOtro = Uri.UnescapeDataString(Request.QueryString("CorreoOtro"))
            pasaporte = Uri.UnescapeDataString(Request.QueryString("Pasaporte"))
            provinciaDestino1 = Request.QueryString("ProvinciaDestino1")
            provinciaDestino2 = Request.QueryString("ProvinciaDestino2")
            provinciaDestino3 = Request.QueryString("ProvinciaDestino3")
            encuestas = Request.QueryString("Encuesta")
            idUSUARIO = Request.QueryString("idusuario")
            rrhh = Request.QueryString("RRHH")
            referido = Request.QueryString("Referido")
            regional = Request.QueryString("Regional")
            fecha_referencia = Request.QueryString("fecha_referencia")
            detalle_referido = Request.QueryString("detalle_referido")
            RH_referenciadate = Request.QueryString("RH_referenciadate")
            RH_entradas = Request.QueryString("RH_entradas")
            fecha_entradaDept = Request.QueryString("fecha_entradaDept")
            archivadoen = Request.QueryString("archivadoen")
            fecha_encuesta = Request.QueryString("fecha_encuesta")
            AspiranteActivo = Request.QueryString("AspiranteActivo")
            AspiracionSalarial = Replace(Request.QueryString("AspiracionSalarial"), ",", "")
            NegociableHasta = Replace(Request.QueryString("NegociableHasta"), ",", "")
            solicitudEmpleo = Request.QueryString("SolicitudEmpleo")

            Response.Write(GrabarDatos(provinciaCedula, tomoCedula, asientoCedula, primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno, apellidoCasada, seguroSocial, sexo, estadoCivil, tipoSangre,
                                       licencia, tipoLicencia, fechaExpiracion, aniosExperiencia, observacion, diaNacimiento, mesNacimiento, anioNacimiento, paisNacimiento, provinciaNacimiento, distritoNacimiento,
                                       nacionalidad, telefonoResidencia, telefonoOficina, telefonoCelular, telefonoOtros, provinciaDireccion, distritoDireccion, corregimientoDireccion, barrioDireccion,
                                       casaDireccion, avenidaDireccion, edificioDireccion, calleDireccion, apartamento, correoPersonal, correoOtro, pasaporte, provinciaDestino1, provinciaDestino2, provinciaDestino3, encuestas,
                                       referido, regional, id_SolicitudAspirante, idUSUARIO, rrhh,
                                       fecha_referencia, detalle_referido, RH_referenciadate,
                                       RH_entradas, fecha_entradaDept, archivadoen, fecha_encuesta, AspiranteActivo, AspiracionSalarial, NegociableHasta, solicitudEmpleo))
        ElseIf query = "consultaAspirante" Then
            Response.Write(ConsultarDatosAspirante(id_SolicitudAspirante))
        ElseIf query = "AspiranteDoble" Then
            provinciaCedula = Request.QueryString("ProvinciaCedula")
            tomoCedula = Request.QueryString("TomoCedula")
            asientoCedula = Request.QueryString("AsientoCedula")

            ' si la cédula está toda en blanco le mando como si el registro no está repetido
            If (provinciaCedula = "" Or provinciaCedula = "0" Or provinciaCedula = Nothing) And
                (tomoCedula = "" Or tomoCedula = "0" Or tomoCedula = Nothing) And
                (asientoCedula = "" Or asientoCedula = "0" Or asientoCedula = Nothing) Then
                data.RegistroRepetido = False
                Response.Write(serializer.Serialize(data))
            Else
                Response.Write(ConsultaSolicituAspirante_Repetido(provinciaCedula, tomoCedula, asientoCedula, id_SolicitudAspirante))
            End If

        ElseIf query = "Cargar" Then
            Dim idrrhhuser As Integer = Request.QueryString("IdRRHH")
            Response.Write(CargarSolicitudAspirante(id_SolicitudAspirante, idrrhhuser))
        End If

    End Sub

    ' Método para salvar datos ya sea crear o editar 
    Private Function GrabarDatos(ByVal cedulaProvincia As String, ByVal cedulaTomo As String, ByVal cedulaAsiento As String, ByVal primerNombre As String, segundoNombre As String, ByVal apellidoPaterno As String,
                             ByVal segundoApellido As String, ByVal apellidoCasada As String, ByVal seguroSocial As String, ByVal idGenero As String, ByVal estadoCivil As String, ByVal tipoSangre As String,
                             ByVal licencia As String, ByVal tipoLicencia As String, ByVal fechaExpira As String, ByVal aniosConducir As String, ByVal observacion As String, ByVal diaNacimiento As String, ByVal mesNacimiento As String,
                             ByVal anioNacimiento As String, paisNacimiento As String, ByVal provinciaNacimiento As String, ByVal distritoNacimiento As String, ByVal nacionalidad As String,
                             ByVal telefonoResidencial As String, ByVal telefonoOficina As String, ByVal celular As String, ByVal TelefonoOtro As String, ByVal provincia As String, ByVal distrito As String,
                             ByVal corregimiento As String, ByVal direccionResidencial As String, ByVal casaDireccion As String, ByVal avenida As String, ByVal edificio As String, ByVal calle As String,
                             ByVal apartamento As String, ByVal correoPersonal As String, ByVal correoOtro As String, ByVal pasaporte As String, ByVal provinciaDestino1 As String, ByVal provinciaDestino2 As String, ByVal provinciaDestino3 As String,
                             ByVal encuesta As String, ByVal referido As String, ByVal regional As String, ByVal id_aspirante As String, ByVal idUSUARIO As String, ByVal rrhh As String,
                             ByVal fecha_referencia As String, ByVal detalle_referido As String,
                             ByVal RH_referenciadate As String, ByVal RH_entradas As String,
                             ByVal fecha_entradaDept As String, ByVal archivadoen As String,
                             ByVal fecha_encuesta As String, ByVal AspiranteActivo As String, ByVal AspiracionSalarial As String, ByVal NegociableHasta As String, ByVal solicitudEmpleo As String) As String

        Dim verEnResporte As String = "1"
        Dim CadenaXML As New CGR.SASExterno35.CadenaXML
        Dim dtAspirante As New DataTable
        Dim data As New ResultadosAjax
        Dim stateArray As New ArrayList
        Dim usuarioRRHH As String = ""
        Dim registradoEn As String = ""

        'verificar valores que provienen de ddl, para que al no ser seleccionados mandar null
        If licencia = "true" Then
            licencia = "1"
        Else
            licencia = "0"
        End If
        If encuesta = "true" Then
            encuesta = "1"
        Else
            encuesta = "0"
        End If

        If tipoSangre = "" Or tipoSangre = "-1" Or tipoSangre = "0" Then
            tipoSangre = Nothing
        End If

        If idGenero = "" Or idGenero = "-1" Or tipoSangre = "0" Then
            idGenero = Nothing
        End If

        If estadoCivil = "" Or estadoCivil = "-1" Or estadoCivil = "0" Then
            estadoCivil = Nothing
        End If

        If tipoLicencia = "" Or tipoLicencia = "-1" Or tipoLicencia = "0" Then
            tipoLicencia = Nothing
        End If
        If provinciaDestino1 = "" Or provinciaDestino1 = "-1" Or provinciaDestino1 = "0" Then
            provinciaDestino1 = Nothing
        End If
        If provinciaDestino2 = "" Or provinciaDestino2 = "-1" Or provinciaDestino2 = "0" Then
            provinciaDestino2 = Nothing
        End If
        If provinciaDestino3 = "" Or provinciaDestino3 = "-1" Or provinciaDestino3 = "0" Then
            provinciaDestino3 = Nothing
        End If
        If distritoNacimiento = "" Or distritoNacimiento = "-1" Or distritoNacimiento = "0" Then
            distritoNacimiento = Nothing
        End If
        '---------------------------validación de campos requeridos y demás :: segunda capa de seguridad de campos 

        If rrhh = "rrhh" Then  ' si el usuario es de rrhh
            usuarioRRHH = Session("usuarioRRHH")
            If (primerNombre <> "" And primerNombre <> Nothing) Then

                If cedulaProvincia = "" Or cedulaProvincia = Nothing Then
                    cedulaProvincia = "0"
                End If

                If cedulaTomo = "" Or cedulaTomo = Nothing Then
                    cedulaTomo = "0"
                End If

                If cedulaAsiento = "" Or cedulaAsiento = Nothing Then
                    cedulaAsiento = "0"
                End If

                If paisNacimiento = "" Or paisNacimiento = "-1" Or paisNacimiento = "0" Then
                    paisNacimiento = Nothing
                End If

                If provinciaNacimiento = "" Or provinciaNacimiento = "-1" Or provinciaNacimiento = "0" Then
                    provinciaNacimiento = Nothing
                End If

                If provincia = "" Or provincia = "-1" Or provincia = "0" Then
                    provincia = Nothing
                End If

                If distrito = "" Or distrito = "-1" Or distrito = "0" Then
                    distrito = Nothing
                End If
                If corregimiento = "" Or corregimiento = "-1" Or corregimiento = "0" Then
                    corregimiento = Nothing
                End If
                registradoEn = Session("registradoEn")

                'armar cadena xml Solicitud Aspirante
                CadenaXML.CargarDatosAspirante(cedulaProvincia, cedulaTomo, cedulaAsiento, primerNombre, segundoNombre, apellidoPaterno, segundoApellido, apellidoCasada, seguroSocial, idGenero, estadoCivil, tipoSangre,
                                               licencia, tipoLicencia, fechaExpira, aniosConducir, observacion, diaNacimiento, mesNacimiento, anioNacimiento, paisNacimiento, provinciaNacimiento, distritoNacimiento, nacionalidad,
                                               telefonoResidencial, telefonoOficina, celular, TelefonoOtro, provincia, distrito, corregimiento, direccionResidencial, casaDireccion, avenida, edificio, calle, apartamento, correoPersonal,
                                               correoOtro, pasaporte, id_aspirante, usuarioRRHH, provinciaDestino1, provinciaDestino2, provinciaDestino3, encuesta, referido, regional, registradoEn,
                                               fecha_referencia, detalle_referido, RH_referenciadate, RH_entradas, fecha_entradaDept, archivadoen, fecha_encuesta, AspiranteActivo, AspiracionSalarial, NegociableHasta, solicitudEmpleo)

                'creación del nodo
                Dim cadenaParametros As String = CadenaXML.CreaXmlAspirante

                If id_aspirante = "" Or id_aspirante = Nothing Then 'insert           
                    dtAspirante = objAspirante.RegistrarNuevoAspirante(cadenaParametros)
                Else 'update
                    dtAspirante = objAspirante.ActualizarAspirante(cadenaParametros)
                End If



                If dtAspirante(0)(0) > 0 Then
                    If id_aspirante = "" Or id_aspirante = Nothing Then 'insert
                        id_aspirante = dtAspirante(0)(0)

                    End If

                    If Not (idUSUARIO = "" Or idUSUARIO = Nothing) Then
                        ActualizaTC_Login(idUSUARIO, id_aspirante, correoPersonal)

                    End If

                    data.Resultado = id_aspirante
                    data.Datos = ConsultaSolicitudAspirante(id_aspirante, "", 0, 0)
                    If rrhh = "rrhh" Then ' si el usuario es de recurso humano
                        Session("idSolicitud") = id_aspirante
                    End If
                Else
                    data.Resultado = "error salvando los datos"
                End If

            Else
                data.Resultado = "Primer nombre requerido"
            End If

        Else ' si el usuario es normal 
            If (cedulaProvincia <> "" And cedulaProvincia <> Nothing) And (cedulaAsiento <> "" And cedulaAsiento <> Nothing) And (cedulaTomo <> "" And cedulaTomo <> Nothing) Then

                If (primerNombre <> "" And primerNombre <> Nothing) Then

                    If (apellidoPaterno = Nothing Or apellidoPaterno = "") And (segundoApellido = Nothing Or segundoApellido = "") And (apellidoCasada = Nothing Or apellidoCasada = "") Then

                        data.Resultado = "Un apellido es requerido"

                    ElseIf correoPersonal = Nothing Or correoPersonal = "" Then

                        data.Resultado = "Correo principal es requerido"

                    ElseIf (diaNacimiento = Nothing Or diaNacimiento = "") Or (mesNacimiento = Nothing Or mesNacimiento = "") Or (anioNacimiento = Nothing Or anioNacimiento = "") Then

                        data.Resultado = "Fecha de nacimiento requerido"

                    ElseIf paisNacimiento = 2 And ((provinciaNacimiento = Nothing Or provinciaNacimiento = "") Or (distritoNacimiento = Nothing Or distritoNacimiento = "")) Then

                        data.Resultado = "Provincia y Distrito de nacimiento requeridos"
                    ElseIf paisNacimiento <> 2 And (nacionalidad = Nothing Or nacionalidad = "") Then

                        data.Resultado = "Al no nacer en Panamá, por favor llene el campo de nacionalidad"
                    ElseIf (telefonoResidencial = Nothing Or telefonoResidencial = "") And (telefonoOficina = Nothing Or telefonoOficina = "") And (celular = Nothing Or celular = "") And (TelefonoOtro = Nothing Or TelefonoOtro = "") Then

                        data.Resultado = "Necesita llenar al menos 2 números de teléfonos."
                    ElseIf (telefonoResidencial <> Nothing Or telefonoResidencial <> "") And ((telefonoOficina = Nothing Or telefonoOficina = "") And (celular = Nothing Or celular = "") And (TelefonoOtro = Nothing Or TelefonoOtro = "")) Or
                        ((telefonoOficina <> Nothing Or telefonoOficina <> "") And ((telefonoResidencial = Nothing Or telefonoResidencial = "") And (celular = Nothing Or celular = "") And (TelefonoOtro = Nothing And TelefonoOtro = ""))) Or
                        ((celular <> Nothing Or celular <> "") And ((telefonoResidencial = Nothing Or telefonoResidencial = "") And (telefonoOficina = Nothing Or telefonoOficina = "") And (TelefonoOtro = Nothing Or TelefonoOtro = ""))) Or
                         ((TelefonoOtro <> Nothing Or TelefonoOtro <> "") And ((telefonoResidencial = Nothing Or telefonoResidencial = "") And (telefonoOficina = Nothing Or telefonoOficina = "") And (celular = Nothing Or celular = ""))) Then
                        data.Resultado = "Necesita llenar al menos 2 números de teléfonos."

                    Else

                        If CBool(licencia) Then 'seccion de licencia

                            If tipoLicencia = Nothing Or tipoLicencia = "" Then

                                data.Resultado = "Por favor seleccione el tipo el licencia que usted tiene."
                            ElseIf fechaExpira = Nothing Or fechaExpira = "" Then

                                data.Resultado = "Por favor indique la fecha de expiración de su licencia."
                            End If


                            If (Not IsNumeric(aniosConducir)) Or aniosConducir.Length > 2 And (aniosConducir <> Nothing And aniosConducir <> "") Then

                                data.Resultado = "el campo de años de experiencia solo acepta números de 2 dígitos"
                            End If


                        End If

                        ' validacion campos numericos

                        If IsNumeric(cedulaTomo) And IsNumeric(cedulaAsiento) And IsNumeric(diaNacimiento) And IsNumeric(anioNacimiento) Then

                            registradoEn = Nothing

                            'armar cadena xml Solicitud Aspirante
                            CadenaXML.CargarDatosAspirante(cedulaProvincia, cedulaTomo, cedulaAsiento, primerNombre, segundoNombre, apellidoPaterno, segundoApellido, apellidoCasada, seguroSocial, idGenero, estadoCivil, tipoSangre,
                                                           licencia, tipoLicencia, fechaExpira, aniosConducir, observacion, diaNacimiento, mesNacimiento, anioNacimiento, paisNacimiento, provinciaNacimiento, distritoNacimiento, nacionalidad,
                                                           telefonoResidencial, telefonoOficina, celular, TelefonoOtro, provincia, distrito, corregimiento, direccionResidencial, casaDireccion, avenida, edificio, calle, apartamento, correoPersonal,
                                                           correoOtro, pasaporte, id_aspirante, usuarioRRHH, provinciaDestino1, provinciaDestino2, provinciaDestino3, encuesta, referido, regional, registradoEn,
                                                           fecha_referencia, detalle_referido, RH_referenciadate, RH_entradas, fecha_entradaDept, archivadoen, fecha_encuesta, AspiranteActivo, AspiracionSalarial, NegociableHasta, solicitudEmpleo)

                            'creación del nodo
                            Dim cadenaParametros As String = CadenaXML.CreaXmlAspirante

                            If id_aspirante = "" Or id_aspirante = Nothing Then 'insert           
                                dtAspirante = objAspirante.RegistrarNuevoAspirante(cadenaParametros)
                            Else 'update
                                dtAspirante = objAspirante.ActualizarAspirante(cadenaParametros)
                            End If

                            If rrhh = "rrhh" Then ' si el usuario es de recurso humano
                                Session("idSolicitud") = id_aspirante
                            End If

                            If dtAspirante(0)(0) > 0 Then
                                If id_aspirante = "" Or id_aspirante = Nothing Then 'insert
                                    id_aspirante = dtAspirante(0)(0)

                                End If

                                If Not (idUSUARIO = "" Or idUSUARIO = Nothing) Then
                                    ActualizaTC_Login(idUSUARIO, id_aspirante, correoPersonal)

                                End If

                                data.Resultado = id_aspirante
                                data.Datos = ConsultaSolicitudAspirante(id_aspirante, "", 0, 0)

                            Else
                                data.Resultado = "error salvando los datos"
                            End If

                        Else

                            data.Resultado = "Campos con datos no válidos"
                        End If


                    End If

                Else
                    data.Resultado = "Primer nombre requerido"
                End If

            Else
                data.Resultado = "Cédula requerida"

            End If
        End If




        Return serializer.Serialize(data)
    End Function

    ' Método para consultar datos de TC_solicitudAspirante 
    Private Function ConsultaSolicitudAspirante(ByVal idSolicitudAspirante As Integer, ByVal cedulaProvincia As String, ByVal cedulaTomo As Integer, ByVal cedulaAsiento As Integer) As ArrayList
        Dim data As New ResultadosAjax
        Dim stateArray As New ArrayList
        Dim dtSolicitudAspirante As DataTable

        'Dim licencia As String
        dtSolicitudAspirante = objAspirante.ConsultarSolicitudAspirante(idSolicitudAspirante, cedulaProvincia, cedulaTomo, cedulaAsiento)



        If dtSolicitudAspirante.Rows.Count > 0 Then

            For Each ds As DataRow In dtSolicitudAspirante.Rows

                Dim da As New DatosAspirante
                da.id_aspirante = ds("Id_SolicitudAspirante")
                da.cedulaProvincia = ds("Ced_Provincia")
                da.cedulaTomo = ds("Ced_Tomo")
                da.cedulaAsiento = ds("Ced_Asiento")
                da.primerNombre = ds("PrimerNombre")
                da.segundoNombre = ds("SegundoNombre")
                da.apellidoPaterno = ds("PrimerApellido")
                da.segundoApellido = ds("SegundoApellido")
                da.apellidoCasada = ds("ApellidoCasada")
                da.seguroSocial = ds("SeguroSocial")
                da.idGenero = ds("Id_Genero")
                da.estadoCivil = ds("Id_EstadoCivil")
                da.tipoSangre = ds("Id_TipoSangre")

                da.licencia = ds("LicenciaConducir")
                da.tipoLicencia = ds("Id_TipoLicencia")
                da.fechaExpira = ds("FechaExpiraLicencia")
                da.aniosConducir = ds("AñosConducir")
                da.observacion = ds("ObservacionLicencia")

                da.diaNacimiento = ds("DiaNac")
                da.mesNacimiento = ds("MesNac")
                da.anioNacimiento = ds("AñoNac")
                da.paisNacimiento = ds("Id_PaisNac")
                da.provinciaNacimiento = ds("Id_ProvinciaNac")
                da.distritoNacimiento = ds("Id_DistritoNac")
                da.nacionalidad = ds("Nacionalidad")
                da.telefonoResidencial = ds("TelefonoResidencial")
                da.telefonoOficina = ds("TelefonoOficina")
                da.celular = ds("Celular1")
                da.TelefonoOtro = ds("OtroTelefono")
                da.provincia = ds("Id_Provincia")
                da.distrito = ds("Id_Distrito")
                da.corregimiento = ds("Id_Corregimiento")
                da.direccionResidencial = ds("DireccionResidencial")
                da.casaDireccion = ds("Casa")
                da.avenida = ds("Avenida")
                da.edificio = ds("Edificio")
                da.calle = ds("Calle")
                da.apartamento = ds("Apartamento")
                da.cedula = ds("Cedula")
                da.Usuariocrea = ds("UsuarioCrea")
                da.FechaCrea = ds("FechaCrea")
                da.UsuarioModifica = ds("UsuarioModifica")
                da.FechaModifica = ds("FechaModifica")
                If ds("FechaNacimiento").ToString <> "//" Then
                    da.fechaNacimiento = ds("FechaNacimiento")
                Else
                    da.fechaNacimiento = ""
                End If
                da.provinciaDisponible1 = ds("Id_ProvinciaDestino1")
                da.provinciaDisponible2 = ds("Id_ProvinciaDestino2")
                da.provinciaDisponible3 = ds("Id_ProvinciaDestino3")
                da.encuesta = ds("Encuesta")
                da.referido = ds("Referido")
                da.regional = ds("Regional")
                da.id_TcAspirante = ds("Id_Aspirante")

                'reclutamiento
                da.detalle_referido = ds("DetalleReferido")
                da.RH_referenciadate = ds("FechaReferidotexto")
                da.RH_entradas = ds("FechaEntradaTexto")
                da.archivadoen = ds("ArchivadoEn")
                da.AspiranteActivo = ds("Activo")

                Dim valdate As String = ds("FechaEntrada") & ""
                If valdate = "" Then
                    da.fecha_entradaDept = ""
                Else
                    da.fecha_entradaDept = ds("FechaEntrada")
                End If

                valdate = ds("FechaEncuesta").ToString() & ""
                If valdate = "" Then
                    da.fecha_encuesta = ""
                Else
                    da.fecha_encuesta = ds("FechaEncuesta")
                End If

                valdate = ds("FechaReferido").ToString() & ""
                If valdate = "" Then
                    da.fecha_referencia = ""
                Else
                    da.fecha_referencia = ds("FechaReferido")
                End If

                da.SolicitudEmpleo = ds("SolicitudEmpleo")

                stateArray.Add(da)

            Next
        End If

        Return stateArray
    End Function

    ' Método para consultar aspirante x id
    Private Function ConsultarDatosAspirante(ByVal idSolicitudAspirante As Integer) As String
        Dim data As New ResultadosAjax

        data.Datos = ConsultaSolicitudAspirante(idSolicitudAspirante, "", 0, 0)

        If data.Datos.Count > 0 Then
            data.Resultado = "ok"
        Else
            data.Resultado = "Error consultando la base de datos"
        End If
        Return serializer.Serialize(data)

    End Function

    ' Método para consultar si el aspirante ya existe
    Public Function ConsultaSolicituAspirante_Repetido(ByVal provincia As String, ByVal tomo As String, ByVal asiento As String, ByVal id_SolicitudAspirante As String) As String
        Dim data As New ResultadosAjax
        Dim datosObj As New DatosAspirante
        Dim dt As New DataTable
        data.Resultado = "ok"
        If id_SolicitudAspirante = "" Or id_SolicitudAspirante = Nothing Then
            id_SolicitudAspirante = "0"
        End If
        data.Datos = VerificarAspiranteRepetido(id_SolicitudAspirante, provincia, tomo, asiento)
        If data.Datos.Count > 0 Then
            If Session("CedulaCero") = Nothing Then
                If validaAspiranteRepetido Then
                    data.RegistroRepetido = True
                End If
            ElseIf Not Session("QueryCedulaCero") = Nothing Then
                If validaAspiranteRepetido Then
                    data.RegistroRepetido = True
                End If
            Else
                data.RegistroRepetido = False
            End If
        End If

        Return serializer.Serialize(data)
    End Function


    ' método para validar si el aspirante ya ha sido registrado
    Private Function VerificarAspiranteRepetido(ByVal idSolicitudAspirante As Integer, ByVal cedulaProvincia As String, ByVal cedulaTomo As Integer, ByVal cedulaAsiento As Integer) As ArrayList
        Dim data As New ResultadosAjax
        Dim stateArray As New ArrayList
        Dim dtSolicitudAspirante As DataTable



        dtSolicitudAspirante = objAspirante.ConsultarSolicitudAspirante(0, cedulaProvincia, cedulaTomo, cedulaAsiento)


        If dtSolicitudAspirante.Rows.Count > 0 Then

            If idSolicitudAspirante = 0 Then
                If cedulaProvincia = dtSolicitudAspirante(0)("Ced_Provincia") And cedulaTomo = dtSolicitudAspirante(0)("Ced_Tomo") And cedulaAsiento = dtSolicitudAspirante(0)("Ced_Asiento") Then
                    validaAspiranteRepetido = True
                End If
            Else
                If (cedulaProvincia = dtSolicitudAspirante(0)("Ced_Provincia") And cedulaTomo = dtSolicitudAspirante(0)("Ced_Tomo") And cedulaAsiento = dtSolicitudAspirante(0)("Ced_Asiento")) And
                    idSolicitudAspirante <> dtSolicitudAspirante(0)(0) Then
                    validaAspiranteRepetido = True
                End If
            End If

            For Each ds As DataRow In dtSolicitudAspirante.Rows

                Dim da As New DatosAspirante
                da.id_aspirante = ds("Id_SolicitudAspirante")
                da.cedulaProvincia = ds("Ced_Provincia")
                da.cedulaTomo = ds("Ced_Tomo")
                da.cedulaAsiento = ds("Ced_Asiento")
                da.primerNombre = ds("PrimerNombre")
                da.segundoNombre = ds("SegundoNombre")
                da.apellidoPaterno = ds("PrimerApellido")
                da.segundoApellido = ds("SegundoApellido")
                da.apellidoCasada = ds("ApellidoCasada")
                da.seguroSocial = ds("SeguroSocial")
                da.idGenero = ds("Id_Genero")
                da.estadoCivil = ds("Id_EstadoCivil")
                da.tipoSangre = ds("Id_TipoSangre")

                da.licencia = ds("LicenciaConducir")
                da.tipoLicencia = ds("Id_TipoLicencia")
                da.fechaExpira = ds("FechaExpiraLicencia")
                da.aniosConducir = ds("AñosConducir")
                da.observacion = ds("ObservacionLicencia")

                da.diaNacimiento = ds("DiaNac")
                da.mesNacimiento = ds("MesNac")
                da.anioNacimiento = ds("AñoNac")
                da.paisNacimiento = ds("Id_PaisNac")
                da.provinciaNacimiento = ds("Id_ProvinciaNac")
                da.distritoNacimiento = ds("Id_DistritoNac")
                da.nacionalidad = ds("Nacionalidad")
                da.telefonoResidencial = ds("TelefonoResidencial")
                da.telefonoOficina = ds("TelefonoOficina")
                da.celular = ds("Celular1")
                da.TelefonoOtro = ds("OtroTelefono")
                da.provincia = ds("Id_Provincia")
                da.distrito = ds("Id_Distrito")
                da.corregimiento = ds("Id_Corregimiento")
                da.direccionResidencial = ds("DireccionResidencial")
                da.casaDireccion = ds("Casa")
                da.avenida = ds("Avenida")
                da.edificio = ds("Edificio")
                da.calle = ds("Calle")
                da.apartamento = ds("Apartamento")
                da.cedula = ds("Cedula")
                da.Usuariocrea = ds("UsuarioCrea")
                da.FechaCrea = ds("FechaCrea")
                da.UsuarioModifica = ds("UsuarioModifica")
                da.FechaModifica = ds("FechaModifica")
                If ds("FechaNacimiento").ToString <> "//" Then
                    da.fechaNacimiento = ds("FechaNacimiento")
                Else
                    da.fechaNacimiento = ""
                End If
                da.provinciaDisponible1 = ds("Id_ProvinciaDestino1")
                da.provinciaDisponible2 = ds("Id_ProvinciaDestino2")
                da.provinciaDisponible3 = ds("Id_ProvinciaDestino3")
                da.encuesta = ds("Encuesta")
                da.referido = ds("Referido")
                da.regional = ds("Regional")
                da.id_TcAspirante = ds("Id_Aspirante")

                'reclutamiento
                da.detalle_referido = ds("DetalleReferido")
                da.RH_referenciadate = ds("FechaReferidotexto")
                da.RH_entradas = ds("FechaEntradaTexto")
                da.archivadoen = ds("ArchivadoEn")
                da.AspiranteActivo = ds("Activo")

                Dim valdate As String = ds("FechaEntrada") & ""
                If valdate = "" Then
                    da.fecha_entradaDept = ""
                Else
                    da.fecha_entradaDept = ds("FechaEntrada")
                End If

                valdate = ds("FechaEncuesta").ToString() & ""
                If valdate = "" Then
                    da.fecha_encuesta = ""
                Else
                    da.fecha_encuesta = ds("FechaEncuesta")
                End If

                valdate = ds("FechaReferido").ToString() & ""
                If valdate = "" Then
                    da.fecha_referencia = ""
                Else
                    da.fecha_referencia = ds("FechaReferido")
                End If

                stateArray.Add(da)

            Next
        End If

        Return stateArray
    End Function



    Public Function CargarSolicitudAspirante(ByVal idSolicitudAspirante As Integer, ByVal idRRHH As Integer) As String
        Dim data As New ResultadosAjax
        Dim dtAspirante As DataTable
        Dim usuarioRRHH As Integer
        Dim contadorFilas As Integer = 0

        If IsNumeric(idRRHH) Then
            usuarioRRHH = idRRHH
            dtAspirante = objAspirante.CargarAspirante(idSolicitudAspirante, usuarioRRHH)


            If dtAspirante.Rows.Count > 0 Then
                If IsNumeric(dtAspirante(0)(0)) Then
                    If dtAspirante(0)(0) > 0 Then
                        data.Resultado = "ok"
                    Else
                        data.Resultado = "Error"
                    End If
                Else
                    data.Resultado = "Error"
                End If

            Else
                data.Resultado = "Error"
            End If

        Else
            data.Resultado = "Error"
        End If

        Return serializer.Serialize(data)
    End Function

    ' Método para actualizar la tabla del login
    Private Function ActualizaTC_Login(ByVal idUSUARIO As Integer, ByVal idAspirante As Integer, ByVal correo As String) As Boolean
        Dim resultado As Boolean = False
        Dim dtLogin As New DataTable

        'dtLogin = liTC.Actualiza_TC_Login(idUSUARIO, idAspirante, correo, UsuarioCreaModifica) ----------------------- CODIGO ORIGINAL 
        dtLogin = objAspirante.Actualiza_TC_Login(idUSUARIO, idAspirante, correo, UsuarioCreaModifica) '---------------PRUEBA

        If dtLogin(0)(0) > 0 Then

            resultado = True

        End If

        Return resultado
    End Function

End Class

Public Class DatosAspirante

    Public cedulaProvincia As String
    Public cedulaTomo As String
    Public cedulaAsiento As String
    Public primerNombre As String
    Public segundoNombre As String
    Public apellidoPaterno As String
    Public segundoApellido As String
    Public apellidoCasada As String
    Public seguroSocial As String
    Public idGenero As String
    Public estadoCivil As String
    Public tipoSangre As String
    Public licencia As Boolean
    Public tipoLicencia As String
    Public fechaExpira As String
    Public aniosConducir As String
    Public observacion As String
    Public diaNacimiento As String
    Public mesNacimiento As String
    Public anioNacimiento As String
    Public paisNacimiento As String
    Public provinciaNacimiento As String
    Public distritoNacimiento As String
    Public nacionalidad As String
    Public telefonoResidencial As String
    Public telefonoOficina As String
    Public celular As String
    Public TelefonoOtro As String
    Public provincia As String
    Public distrito As String
    Public corregimiento As String
    Public direccionResidencial As String
    Public casaDireccion As String
    Public avenida As String
    Public edificio As String
    Public calle As String
    Public apartamento As String
    Public id_aspirante As String
    Public cedula As String
    Public cargaTC_Aspirante As String
    Public correoPersonal As String
    Public correoOtro As String
    Public pasaporte As String
    Public Usuariocrea As String
    Public FechaCrea As String
    Public UsuarioModifica As String
    Public FechaModifica As String
    Public fechaNacimiento As String
    Public provinciaDisponible1 As String
    Public provinciaDisponible2 As String
    Public provinciaDisponible3 As String
    Public encuesta As Boolean
    Public referido As String
    Public regional As String
    Public id_TcAspirante As String
    Public fecha_referencia As String ' reclutamiento
    Public detalle_referido As String
    Public RH_referenciadate As String
    Public RH_entradas As String
    Public fecha_entradaDept As String
    Public archivadoen As String
    Public fecha_encuesta As String
    Public AspiranteActivo As String
    Public SolicitudEmpleo As String

End Class


Public Class DatosDocumentoDocuware
    Public Link As String
    Public NombreCompleto As String
    Public Cedula As String
End Class