
$(document).ready(function () {

    $.ajaxSetup({ cache: false });

    // Agrega funcionalidad de contador de caracteres a los campos que lo necesitan
    Funciones.AgregaContadorCaracter("txtobservacion", 250);
    Funciones.AgregaContadorCaracter("txtTitulo", 100);
    Funciones.AgregaContadorCaracter("txtEspecialidad", 100);
    Funciones.AgregaContadorCaracter("CentroEducativoTxt", 100);
    Funciones.AgregaContadorCaracter("TituloTxtEdit", 100);
    Funciones.AgregaContadorCaracter("EspecialidadTxtEdit", 100);
    Funciones.AgregaContadorCaracter("CentroEducativoEdit", 100);
    Funciones.AgregaContadorCaracter("TxtDireccionUrgencia", 100);
    Funciones.AgregaContadorCaracter("TxtOtrasHerramientas", 150);
    Funciones.AgregaContadorCaracter("txtotrahabilidad", 140);
    Funciones.AgregaContadorCaracter("txtGrupo", 50);
    Funciones.AgregaContadorCaracter("txbDetalleReferido", 250);
    Funciones.AgregaContadorCaracter("txbRHFReferencia", 250);
    Funciones.AgregaContadorCaracter("txbRHEntrada", 250);
    Funciones.AgregaContadorCaracter("TB_Contrato", 150);
    Funciones.AgregaContadorCaracter("TB__Fuera_Horario", 150);
    Funciones.AgregaContadorCaracter("TB_Cualquier_Lugar", 150);
    Funciones.AgregaContadorCaracter("TB_Encuestas", 150);
    Funciones.AgregaContadorCaracter("TB_Observacion", 150);
    Funciones.AgregaContadorCaracter("TB_Fines", 150);
    Funciones.AgregaContadorCaracter("TB_TareasImportantes", 140);
    Funciones.AgregaContadorCaracter("DondeEcuestoCenso", 100);

    Funciones.CreaCampoMoney("AspiracionSalarial", false);
    Funciones.CreaCampoMoney("NegociableHasta", false);
    Funciones.AgregaContadorCaracter("ModalImportante", 140);

    //Segmento para asignar enlace con Encuestas de la INEC
    var ced1 = Funciones.ObtenerValor("txtCedProvincia");

    if (ced1 != '0') {
        var ced2 = Funciones.ObtenerValor("txtCedTomo");
        var ced3 = Funciones.ObtenerValor("txtCedAsiento");
        var identificador = Funciones.ObtenerValor("usuarioRRHH");
        $("#enlace_encINEC").attr("href", "http://172.16.9.122/CGR.EncuestasINEC/IndexSAS?Identificador=" + identificador + "&CedProvincia=" + ced1 + "&CedTomo=" + ced2 + "&CedAsiento=" + ced3);
    }
    else {
        Funciones.ObtenerObjeto("enlace_encINEC").removeAttr('href');
    }

    var clickinec = Funciones.ObtenerObjeto("enlace_encINEC")
    clickinec.click(function () {
        if (ced1 == '0') {
            alertify.error("Si el Aspirante no tiene cédula registrada, no se puede hacer enlace con ENCUESTAS - INEC");
        }
    });


    // Ocultar Tab Encuestas de la INEC
    var rrhh = Funciones.ObtenerValor("hdRRHH");
    var val_carga_asp = Funciones.ObtenerValor("val_aspcargado");
    var userINEC = Funciones.ObtenerValor("val_userINEC");

    if (rrhh != 'rrhh' || val_carga_asp == 0 || userINEC == "disabled") {
        //$('[href="#SubTab_EncuestaINEC"]').closest('li').hide();
        $('#liEncuestaINEC').hide();
    }


    // inhabilitar seccion fuentes de reclutamiento para rol: Regional

    if ($("#tag_span_rolRRHH").text() == 'Rol: Regional') {
        $('.campo_sede').each(function () {
            $(this).addClass("Oculto");
        });

        $('.campo_regional').each(function () {
            $(this).removeClass("Oculto");
        });
    }

    //da formato de dinero
    Funciones.CreaCampoMoney("salarioTxt", false);
    Funciones.CreaCampoMoney("salarioTxt_Ver", false);

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    //-------- cantidad de filas de la tabla de estudios
    var nFilas = $("#tblEstudios tr").length;
    Funciones.ObtenerObjeto("CantidadEstudios").val(nFilas);

    // set manual
    if ($("#tag_span_rolRRHH").text() == 'Rol: Regional') {
        $("#tag_a_manualRRHH").attr('href', '../Manual/MANUAL SAS REGIONAL.pdf');
    }
    else if ($("#tag_span_rolRRHH").text() == 'Rol: Registro') {
        $("#tag_a_manualRRHH").attr('href', '../Manual/MANUAL_SAS_REGISTRO.pdf');
    }
    else {
        $("#tag_a_manualRRHH").attr('href', '../Manual/MANUAL_SAS_USUARIOEXTERNO.pdf');
        $("#tag_span_rolRRHH").text('Rol: Usuario Externo');
        $("#tag_span_UsuarioRRHH").text('Usuario Externo');
    }


    //////////////////////////////////Si nació en Panamá o no ////////////////////////////////////////////////////
    var paisNacimiento = Funciones.ObtenerObjeto("ddlAspirantePaisNac");
    var ProvinciaNacimiento = Funciones.ObtenerObjeto("ddlAspiranteProvinciaNac").attr('readonly', 'readonly');
    var distritonacimiento = Funciones.ObtenerObjeto("ddlAspiranteDistritoNac").attr('readonly', 'readonly');
    var lblTipoLicencia = Funciones.ObtenerObjeto("lblTipoLicencia");


    if (paisNacimiento.val() == 2) {
        Funciones.ObtenerObjeto("ddlAspiranteProvinciaNac").removeAttr('readonly');
        Funciones.ObtenerObjeto("ddlAspiranteDistritoNac").removeAttr('readonly');
        Funciones.ObtenerObjeto("ddlAspiranteProvinciaNac").removeClass('Oculto');
        Funciones.ObtenerObjeto("ddlAspiranteDistritoNac").removeClass('Oculto');
        Funciones.ObtenerObjeto("lblProvinciaNac").addClass("required");
        Funciones.ObtenerObjeto("lblDistritoNac").addClass("required");
        Funciones.ObtenerObjeto("lblProvinciaNac").removeClass('Oculto');
        Funciones.ObtenerObjeto("lblDistritoNac").removeClass('Oculto');
    }
    else {
        Funciones.ObtenerObjeto("ddlAspiranteProvinciaNac").attr('readonly', 'readonly');
        Funciones.ObtenerObjeto("ddlAspiranteDistritoNac").attr('readonly', 'readonly');
        Funciones.ObtenerObjeto("ddlAspiranteProvinciaNac").addClass('Oculto');
        Funciones.ObtenerObjeto("ddlAspiranteDistritoNac").addClass('Oculto');
        Funciones.ObtenerObjeto("lblProvinciaNac").addClass('Oculto');
        Funciones.ObtenerObjeto("lblDistritoNac").addClass('Oculto');
        Funciones.ObtenerObjeto("lblProvinciaNac").removeClass("required");
        Funciones.ObtenerObjeto("lblDistritoNac").removeClass("required");
    }

    paisNacimiento.change(function () {
        var seleccion = $(this).val();

        if (seleccion == "2") {
            var ProvinciaNacimiento = Funciones.ObtenerObjeto("ddlAspiranteProvinciaNac").removeAttr('readonly');
            var distritonacimiento = Funciones.ObtenerObjeto("ddlAspiranteDistritoNac").removeAttr('readonly');
            ProvinciaNacimiento.removeClass('Oculto');
            distritonacimiento.removeClass('Oculto');
            Funciones.ObtenerObjeto("lblProvinciaNac").addClass("required");
            Funciones.ObtenerObjeto("lblDistritoNac").addClass("required");
            Funciones.ObtenerObjeto("lblProvinciaNac").removeClass('Oculto');
            Funciones.ObtenerObjeto("lblDistritoNac").removeClass('Oculto');
        }
        else {
            var ProvinciaNacimiento = Funciones.ObtenerObjeto("ddlAspiranteProvinciaNac").attr('readonly', 'readonly');
            var distritonacimiento = Funciones.ObtenerObjeto("ddlAspiranteDistritoNac").attr('readonly', 'readonly');
            Funciones.ObtenerObjeto("lblProvinciaNac").removeClass("required");
            Funciones.ObtenerObjeto("lblDistritoNac").removeClass("required");
            Funciones.ObtenerObjeto("lblProvinciaNac").addClass('Oculto');
            Funciones.ObtenerObjeto("lblDistritoNac").addClass('Oculto');
            ProvinciaNacimiento.addClass('Oculto');
            distritonacimiento.addClass('Oculto');
            ProvinciaNacimiento.val("");
            distritonacimiento.val("");


        }
    });

    var provinciaNac = Funciones.ObtenerObjeto("ddlAspiranteProvinciaNac");
    provinciaNac.change(function () {
        Funciones.ObtenerObjeto("lblProvinciaNac").addClass("required");
        Funciones.ObtenerObjeto("lblDistritoNac").addClass("required");

    });

    var distritoNac = Funciones.ObtenerObjeto("ddlAspiranteDistritoNac");
    distritoNac.change(function () {
        Funciones.ObtenerObjeto("lblProvinciaNac").addClass("required");
        Funciones.ObtenerObjeto("lblDistritoNac").addClass("required");
    });

    //////////////////////////////////si tiene licencia activar y desactivar campos////////////////////////////////////////////////////

    var radioSI = Funciones.ObtenerObjeto("viableSI");
    var radioNO = Funciones.ObtenerObjeto("viableNO");
    var radioProvinciaDisponibleSI = Funciones.ObtenerObjeto("ProvinciaDisponibleSI");
    var radioProvinciaDisponibleNO = Funciones.ObtenerObjeto("ProvinciaDisponibleNO");
    var ddlDispProvincia1 = Funciones.ObtenerObjeto("ddlProvinciaDisponible1");
    var ddlDispProvincia2 = Funciones.ObtenerObjeto("ddlProvinciaDisponible2");
    var ddlDispProvincia3 = Funciones.ObtenerObjeto("ddlProvinciaDisponible3");
    var ddlLicencia = Funciones.ObtenerObjeto("ddlLicencia").attr('readonly', 'readonly');
    var valorFecha = Funciones.ObtenerObjeto("txtValorFecha").attr('readonly', 'readonly');
    var experiencia = Funciones.ObtenerObjeto("txtAñoExperiencia").attr('readonly', 'readonly');
    var observacion = Funciones.ObtenerObjeto("txtobservacion").attr('readonly', 'readonly');
    var checkeado = document.getElementById('viableSI').checked;
    var disponibleProvincia = document.getElementById('ProvinciaDisponibleSI').checked;

    if (disponibleProvincia) {
        Funciones.ObtenerObjeto("dvprovinciasDisponibilidad").removeClass('Oculto');
    }
    else {
        Funciones.ObtenerObjeto("dvprovinciasDisponibilidad").addClass('Oculto');
    }

    if (checkeado) {
        Funciones.ObtenerObjeto("lblTipoLicencia").removeClass('Oculto');
        Funciones.ObtenerObjeto("ddlLicencia").removeClass('Oculto');
        Funciones.ObtenerObjeto("lblFechaExpiracion").removeClass('Oculto');
        Funciones.ObtenerObjeto("txtValorFecha").removeClass("Oculto");
        Funciones.ObtenerObjeto("SeccionanioExperiencia").removeClass("Oculto");

        ddlLicencia.removeAttr('readonly');
        valorFecha.removeAttr('readonly');
        experiencia.removeAttr('readonly');
        observacion.removeAttr('readonly');
        if (rrhh != 'rrhh')
        {
            Funciones.ObtenerObjeto("lblTipoLicencia").addClass("required");
            Funciones.ObtenerObjeto("lblFechaExpiracion").addClass('required');

        }
        else
        {
            Funciones.ObtenerObjeto("lblTipoLicencia").removeClass("required");
            Funciones.ObtenerObjeto("lblFechaExpiracion").removeClass('required');
        }
       
        Funciones.ObtenerObjeto("lblFechaExpiracion").addClass("required");
        Funciones.ObtenerObjeto("lblTipoLicencia").removeClass('Oculto');
        ddlLicencia.removeClass('Oculto');
        Funciones.ObtenerObjeto("dvFechaExpira").removeClass('Oculto');

    }
    else {
        Funciones.ObtenerObjeto("lblTipoLicencia").addClass('Oculto');
        Funciones.ObtenerObjeto("ddlLicencia").addClass('Oculto');
        Funciones.ObtenerObjeto("lblFechaExpiracion").show();
        Funciones.ObtenerObjeto("txtValorFecha").show();
        Funciones.ObtenerObjeto("SeccionanioExperiencia").addClass("Oculto");

        ddlLicencia.attr('readonly', 'readonly');
        valorFecha.attr('readonly', 'readonly');
        experiencia.attr('readonly', 'readonly');
        observacion.attr('readonly', 'readonly');

        ddlLicencia.val(null);
        valorFecha.val(null);
        experiencia.val(null);
        observacion.val(null);

        Funciones.ObtenerObjeto("lblTipoLicencia").removeClass("required");
        Funciones.ObtenerObjeto("lblFechaExpiracion").removeClass("required");
        Funciones.ObtenerObjeto("lblTipoLicencia").addClass('Oculto');
        ddlLicencia.addClass('Oculto');
        
    }

    radioSI.click(function () {
        var ddlLicencia = Funciones.ObtenerObjeto("ddlLicencia");
        var valorFecha = Funciones.ObtenerObjeto("txtValorFecha");
        var experiencia = Funciones.ObtenerObjeto("txtAñoExperiencia");
        var observacion = Funciones.ObtenerObjeto("txtobservacion");

        ddlLicencia.removeAttr('readonly');
        valorFecha.removeAttr('readonly');
        experiencia.removeAttr('readonly');
        observacion.removeAttr('readonly');

        if (rrhh != 'rrhh') {
            Funciones.ObtenerObjeto("lblTipoLicencia").addClass("required");
            Funciones.ObtenerObjeto("lblFechaExpiracion").addClass('required');

        }
        else {
            Funciones.ObtenerObjeto("lblTipoLicencia").removeClass("required");
            Funciones.ObtenerObjeto("lblFechaExpiracion").removeClass('required');
        }
        Funciones.ObtenerObjeto("lblTipoLicencia").removeClass('Oculto');
        ddlLicencia.removeClass('Oculto');
        Funciones.ObtenerObjeto("dvFechaExpira").removeClass('Oculto');
        Funciones.ObtenerObjeto("SeccionanioExperiencia").removeClass("Oculto");
        //Funciones.ObtenerObjeto("lblFechaExpiracion").removeClass('Oculto');
        //Funciones.ObtenerObjeto("txtValorFecha").removeClass('Oculto');
    });
    radioNO.click(function () {
        var ddlLicencia = Funciones.ObtenerObjeto("ddlLicencia");
        var valorFecha = Funciones.ObtenerObjeto("txtValorFecha");
        var experiencia = Funciones.ObtenerObjeto("txtAñoExperiencia");
        var observacion = Funciones.ObtenerObjeto("txtobservacion");


        ddlLicencia.attr('readonly', 'readonly');
        valorFecha.attr('readonly', 'readonly');
        experiencia.attr('readonly', 'readonly');
        observacion.attr('readonly', 'readonly');

        ddlLicencia.val(null);
        valorFecha.val(null);
        experiencia.val(null);
        observacion.val(null);

        Funciones.ObtenerObjeto("lblTipoLicencia").removeClass("required");
        Funciones.ObtenerObjeto("lblFechaExpiracion").removeClass("required");
        Funciones.ObtenerObjeto("lblTipoLicencia").addClass('Oculto');
        ddlLicencia.addClass('Oculto');
        Funciones.ObtenerObjeto("dvFechaExpira").addClass('Oculto');
        Funciones.ObtenerObjeto("SeccionanioExperiencia").addClass("Oculto");
        //Funciones.ObtenerObjeto("lblFechaExpiracion").addClass('Oculto');
        //Funciones.ObtenerObjeto("txtValorFecha").addClass('Oculto');
        Funciones.ObtenerObjeto("dvNumIdoneidad").addClass("Oculto");
    });
    radioProvinciaDisponibleSI.click(function () {
        Funciones.ObtenerObjeto("dvprovinciasDisponibilidad").removeClass('Oculto');
    });
    radioProvinciaDisponibleNO.click(function () {
        Funciones.ObtenerObjeto("dvprovinciasDisponibilidad").addClass('Oculto');
        ddlDispProvincia1.val(null);
        ddlDispProvincia2.val(null);
        ddlDispProvincia3.val(null);
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////////////////////////////////////////// VALIDACION DE SOLO NUMEROS EN TEXTBOX 

    var cedTomo = Funciones.ObtenerObjeto("txtCedTomo");
    var cedAsiento = Funciones.ObtenerObjeto("txtCedAsiento");
    var telefonoResidencial = Funciones.ObtenerObjeto("txtAspiranteTelefonoRes");
    var telefonoOficina = Funciones.ObtenerObjeto("txtAspiranteTelefonoOficina");
    var celular = Funciones.ObtenerObjeto("txtAspiranteTelefonoCelular");
    var telefonoOtros = Funciones.ObtenerObjeto("txtAspiranteTelefonoOtros");
    var aniosExperiencia = Funciones.ObtenerObjeto("txtAñoExperiencia");
    var diaNacimiento = Funciones.ObtenerObjeto("TxtAspiranteDiaNacimiento");
    var AnioNacimiento = Funciones.ObtenerObjeto("TxtCAspiranteAnoNacimiento");
    var TelefonoUrgencia = Funciones.ObtenerObjeto("TxtTelefonoUrgencia");
    //tomo de la cedula
    cedTomo.keypress(function (e) {
        var key = e.keyCode;

        if ((e.keyCode > 31 && e.keyCode < 48) || (e.keyCode > 57)) {
            alertify.error("Este campo solo permite números!")
            return false;

        }
    })
    //asiento de la cedula
    cedAsiento.keypress(function (e) {
        var key = e.keyCode;

        if ((e.keyCode > 31 && e.keyCode < 48) || (e.keyCode > 57)) {
            alertify.error("Este campo solo permite números!")
            return false;

        }
    })
    //teléfonos
    TelefonoUrgencia.keypress(function (e) {
        var key = e.keyCode;

        if ((e.keyCode > 31 && e.keyCode < 48) || (e.keyCode > 57)) {
            if (e.keyCode != 45) {
                alertify.error("Este campo solo permite números y el guión!")
                return false;
            }

        }
    })
    telefonoResidencial.keypress(function (e) {
        var key = e.keyCode;

        if ((e.keyCode > 31 && e.keyCode < 48) || (e.keyCode > 57)) {
            if (e.keyCode != 45) {
                alertify.error("Este campo solo permite números y el guión!")
                return false;
            }

        }
    })

    telefonoOficina.keypress(function (e) {
        var key = e.keyCode;

        if ((e.keyCode > 31 && e.keyCode < 48) || (e.keyCode > 57)) {
            if (e.keyCode != 45) {
                alertify.error("Este campo solo permite números y el guión!")
                return false;
            }

        }
    })
    celular.keypress(function (e) {
        var key = e.keyCode;

        if ((e.keyCode > 31 && e.keyCode < 48) || (e.keyCode > 57)) {
            if (e.keyCode != 45) {
                alertify.error("Este campo solo permite números y el guión!")
                return false;
            }

        }
    })
    telefonoOtros.keypress(function (e) {
        var key = e.keyCode;

        if ((e.keyCode > 31 && e.keyCode < 48) || (e.keyCode > 57)) {
            if (e.keyCode != 45) {
                alertify.error("Este campo solo permite números y el guión!")
                return false;
            }

        }
    })
    //años experiencia 
    aniosExperiencia.keypress(function (e) {
        var key = e.keyCode;

        if ((e.keyCode > 31 && e.keyCode < 48) || (e.keyCode > 57)) {
            alertify.error("Este campo solo permite números!")
            return false;

        }
    })
    //dia de nacimiento 
    diaNacimiento.keypress(function (e) {
        var key = e.keyCode;

        if ((e.keyCode > 31 && e.keyCode < 48) || (e.keyCode > 57)) {
            alertify.error("Este campo solo permite números")
            return false;

        }
    })
    //año de nacimiento 
    AnioNacimiento.keypress(function (e) {
        var key = e.keyCode;

        if ((e.keyCode > 31 && e.keyCode < 48) || (e.keyCode > 57)) {
            alertify.error("Este campo solo permite números")
            return false;

        }
    })




    //-----------------------> habilitar tabs
    var idAspirantre = Funciones.ObtenerValor("hdCodigo");
    var tabs = Funciones.ObtenerObjeto("ulTabs");
    var newtabs = "";
    if (idAspirantre == "" || idAspirantre == null || idAspirantre == 0) {

        var tabAdjuntos = "<li id='liAdjuntosTab'><a data-toggle='tab' href='#Adjuntos' id='Adjuntos'>Adjuntos</a></li>";   
        var tabAspirante = "<li class='active' id='liAspiranteTab'><a data-toggle='tab' href='#Colaborador'> <i  class='fa fa-pencil'></i> Información del Aspirante</a></li>";
        var tabCargos = "<li id='liCargosTab'   > <a data-toggle='tab' href='#ConsultaCargos' id='ConsultaCargosTab'> &nbsp <i  class='fa fa-skyatlas'></i> Cargos de Contraloría</a></li>";
        var tabEstudios = "<li id='liEstudiosTab'><a data-toggle='tab' href='#ConsultaEstudio' id='ConsultaEstudioTab'> &nbsp <i class='fa fa-book'></i> Registro de Estudios</a></li>";
        var tabDatosFamiliares = "<li id='liConsultaDatosFamiliaresTab'><a data-toggle='tab' href='#ConsultaDatosFamiliares' id='ConsultaDatosFamiliaresTab'> &nbsp <i class='fa fa-group'></i> Datos Familiares</a></li>";
        var tabhabilidadesDestrezas = "<li id='liConsultaHabilidadesDestrezasTab'><a data-toggle='tab' href='#ConsultaHabilidadesDestrezas' id='ConsultaHabilidadesDestrezasTab'> &nbsp <i class='fa fa-asl-interpreting'></i> Habilidades y Destrezas</a></li>";

        var tabOtros = "<li id='liOtrosTab'><a data-toggle='tab' href='#ConsultaOtros' id='OtrosTab'> &nbsp <i class='fa fa-bullseye'></i> Otros Datos</a></li>";
        var tabExperiencia = "<li id='liConsultaExperienciaTab'><a data-toggle='tab' href='#ConsultaExperiencia' id='ExperienciaLaboralTab'> &nbsp <i  class='fa fa-chart-line'></i> Experiencia Laboral</a></li>";


        newtabs = tabAspirante + tabCargos + tabEstudios + tabAdjuntos + tabDatosFamiliares + tabhabilidadesDestrezas + tabExperiencia + tabOtros;

        Funciones.ObtenerObjeto("liAspiranteTab").addClass("active");
        Funciones.ObtenerObjeto("liEstudiosTab").removeClass('active');
        Funciones.ObtenerObjeto("liCargosTab").removeClass('active');
        Funciones.ObtenerObjeto("liConsultaDatosFamiliaresTab").removeClass('active');
        Funciones.ObtenerObjeto("liConsultaHabilidadesDestrezasTab").removeClass('active');
        Funciones.ObtenerObjeto("liconsultaOtrosTab").removeClass('active');
        Funciones.ObtenerObjeto("liConsultaExperienciaTab").removeClass('active');
        Funciones.ObtenerObjeto("liAdjuntosTab").removeClass('active');

        Funciones.ObtenerObjeto("Colaborador").addClass("in");
        Funciones.ObtenerObjeto("ConsultaCargos").removeClass('in');
        Funciones.ObtenerObjeto("ConsultaEstudio").removeClass('in');
        Funciones.ObtenerObjeto("ConsultaDatosFamiliares").removeClass('in');
        Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").removeClass('in');
        Funciones.ObtenerObjeto("ConsultaOtros").removeClass('in');
        Funciones.ObtenerObjeto("ConsultaExperiencia").removeClass('in');
        Funciones.ObtenerObjeto("Adjuntos").removeClass('in');

        Funciones.ObtenerObjeto("Colaborador").addClass("active");
        Funciones.ObtenerObjeto("ConsultaCargos").removeClass('active');
        Funciones.ObtenerObjeto("ConsultaEstudio").removeClass('active');
        Funciones.ObtenerObjeto("ConsultaDatosFamiliares").removeClass('active');
        Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").removeClass('active');
        Funciones.ObtenerObjeto("ConsultaOtros").removeClass('active');
        Funciones.ObtenerObjeto("ConsultaExperiencia").removeClass('active');
        Funciones.ObtenerObjeto("Adjuntos").removeClass('active');


        Funciones.ObtenerObjeto("dvSolicitudEmpleo").addClass("Oculto");
    }
    else {
        ContarDataAjax();
        Funciones.ObtenerObjeto("ConsultaCargos").addClass("active");
        Funciones.ObtenerObjeto("ConsultaCargos").addClass("active");
        var tabAspirante = "<li  id='liAspiranteTab'><a data-toggle='tab' href='#Colaborador'> <i  class='fa fa-pencil'></i> Información del Aspirante</a></li>";
        var tabCargos = "<li class='active' id='liCargosTab'   > <a data-toggle='tab' href='#ConsultaCargos' id='ConsultaCargosTab'> &nbsp <i  class='fa fa-skyatlas'></i> Cargos de Contraloría</a></li>";
        var tabEstudios = "<li id='liEstudiosTab'><a data-toggle='tab' href='#ConsultaEstudio' id='ConsultaEstudioTab'> &nbsp <i class='fa fa-book'></i> Registro de Estudios</a></li>";
        var tabAdjuntos = "<li id='liAdjuntosTab'><a data-toggle='tab' href='#TabAdjuntos' id='Adjuntos'>&nbsp <i  class='fa fa-file-pdf-o'></i>Adjuntos</a></li>";
        var tabDatosFamiliares = "<li id='liConsultaDatosFamiliaresTab'><a data-toggle='tab' href='#ConsultaDatosFamiliares' id='ConsultaDatosFamiliaresTab'> &nbsp <i class='fa fa-group'></i> Datos Familiares</a></li>";
        var tabhabilidadesDestrezas = "<li id='liConsultaHabilidadesDestrezasTab'><a data-toggle='tab' href='#ConsultaHabilidadesDestrezas' id='ConsultaHabilidadesDestrezasTab'> &nbsp <i class='fa fa-asl-interpreting'></i> Habilidades y Destrezas</a></li>";

        var tabOtros = "<li id='liOtrosTab'><a data-toggle='tab' href='#ConsultaOtros' id='OtrosTab'> &nbsp <i class='fa fa-bullseye'></i> Otros Datos</a></li>";
        var tabExperiencia = "<li id='liConsultaExperienciaTab'><a data-toggle='tab' href='#ConsultaExperiencia' id='ExperienciaLaboralTab'> &nbsp <i  class='fa fa-chart-line'></i> Experiencia Laboral</a></li>";


        newtabs = tabCargos + tabAspirante + tabEstudios + tabAdjuntos + tabDatosFamiliares + tabhabilidadesDestrezas + tabExperiencia + tabOtros;

        Funciones.ObtenerObjeto("dvSolicitudEmpleo").removeClass("Oculto");
    }


    if (idAspirantre == "" || idAspirantre == null || idAspirantre == 0) {
        idAspirantre = localStorage.getItem('aspiranteNuevo');

        $('#dv_Activo_rrhh').addClass('Oculto'); //ocultar campo activo

        if (idAspirantre != "" && idAspirantre != null && idAspirantre != 0) {

            // si se refresca el página luego de haber llenado los campos y haber salvado, vuelve a llenar los campos, si no salva se blanquearan los campos


            var url = host + "/Formas/Ajax/AjaxAspiranteNuevo.aspx";


            // Usa ajax para buscar datos del registro

            $.ajax({
                url: url,
                cache: false,
                data: { Query: "consultaAspirante", IdAspirantre: idAspirantre },
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success:
                    function (data) {

                        if (data != null && data != undefined) {
                            if (data.Resultado == "ok") {
                                var datos = data.Datos[0];

                                Funciones.ObtenerObjeto("txtCedProvincia").val(datos.cedulaProvincia)
                                Funciones.ObtenerObjeto("txtCedTomo").val(datos.cedulaTomo)
                                Funciones.ObtenerObjeto("txtCedAsiento").val(datos.cedulaAsiento)
                                Funciones.ObtenerObjeto("txtAspirantePrimerNombre").val(datos.primerNombre)
                                Funciones.ObtenerObjeto("txtAspiranteSegundoNombre").val(datos.segundoNombre)
                                Funciones.ObtenerObjeto("txtAspiranteApellidoPaterno").val(datos.apellidoPaterno)
                                Funciones.ObtenerObjeto("txtAspiranteApellidoMaterno").val(datos.segundoApellido)
                                Funciones.ObtenerObjeto("txtAspiranteApellidoCasada").val(datos.apellidoCasada)
                                Funciones.ObtenerObjeto("txtAspiranteSeguroSocial").val(datos.seguroSocial)

                                Funciones.ObtenerObjeto("ddlAspiranteSexo").val(datos.idGenero)

                                Funciones.ObtenerObjeto("ddAspiranteEstadoCivil").val(datos.estadoCivil)
                                Funciones.ObtenerObjeto("ddlAspiranteTipoSangre").val(datos.tipoSangre)

                                Funciones.ObtenerObjeto("TxtAspiranteDiaNacimiento").val(datos.diaNacimiento)
                                Funciones.ObtenerObjeto("ddlAspiranteMesNacimiento").val(datos.mesNacimiento)
                                Funciones.ObtenerObjeto("TxtCAspiranteAnoNacimiento").val(datos.anioNacimiento)
                                Funciones.ObtenerObjeto("ddlAspirantePaisNac").val(datos.paisNacimiento)
                                Funciones.ObtenerObjeto("ddlAspiranteProvinciaNac").val(datos.provinciaNacimiento)
                                Funciones.ObtenerObjeto("ddlAspiranteDistritoNac").val(datos.distritoNacimiento)
                                Funciones.ObtenerObjeto("TxtNacionalidad").val(datos.nacionalidad)
                                Funciones.ObtenerObjeto("txtAspiranteTelefonoRes").val(datos.telefonoResidencial)
                                Funciones.ObtenerObjeto("txtAspiranteTelefonoOficina").val(datos.telefonoOficina)
                                Funciones.ObtenerObjeto("txtAspiranteTelefonoCelular").val(datos.celular)
                                Funciones.ObtenerObjeto("txtAspiranteTelefonoOtros").val(datos.TelefonoOtro)
                                Funciones.ObtenerObjeto("ddlAspiranteProvincia").val(datos.provincia)
                                Funciones.ObtenerObjeto("ddlAspiranteDistrito").val(datos.distrito)
                                Funciones.ObtenerObjeto("ddlAspiranteCorregimiento").val(datos.corregimiento)
                                Funciones.ObtenerObjeto("txtAspiranteBarrio").val(datos.direccionResidencial)
                                Funciones.ObtenerObjeto("txtAspiranteCasa").val(datos.casaDireccion)
                                Funciones.ObtenerObjeto("txtAspiranteAvenida").val(datos.avenida)
                                Funciones.ObtenerObjeto("txtAspiranteEdificio").val(datos.edificio)
                                Funciones.ObtenerObjeto("txtAspiranteCalle").val(datos.calle)
                                Funciones.ObtenerObjeto("txtAspiranteApartamento").val(datos.apartamento)
                                Funciones.ObtenerObjeto("FechaNacimiento").val(datos.fechaNacimiento)

                                var licencia = datos.licencia;

                                if (licencia) {
                                    $('#viableSI').prop('checked', true);
                                }
                                else {
                                    $('#viableNO').prop('checked', true);
                                }

                                Funciones.ObtenerObjeto("ddlLicencia").val(datos.tipoLicencia)
                                Funciones.ObtenerObjeto("txtValorFecha").val(datos.fechaExpira)
                                Funciones.ObtenerObjeto("txtAñoExperiencia").val(datos.aniosConducir)
                                Funciones.ObtenerObjeto("txtobservacion").val(datos.observacion)

                                if ((datos.provinciaDisponible1 == "" || datos.provinciaDisponible1 == null || datos.provinciaDisponible1 == 0) &&
                                    (datos.provinciaDisponible2 == "" || datos.provinciaDisponible2 == null || datos.provinciaDisponible2 == 0) &&
                                    (datos.provinciaDisponible3 == "" || datos.provinciaDisponible3 == null || datos.provinciaDisponible3 == 0)) {
                                    $('#ProvinciaDisponibleNO').prop('checked', true);
                                }
                                else {
                                    $('#ProvinciaDisponibleSI').prop('checked', true);
                                    Funciones.ObtenerObjeto("ddlProvinciaDisponible1").val(datos.provinciaDisponible1)
                                    Funciones.ObtenerObjeto("ddlProvinciaDisponible2").val(datos.provinciaDisponible2)
                                    Funciones.ObtenerObjeto("ddlProvinciaDisponible3").val(datos.provinciaDisponible3)
                                }


                                var encuesta = datos.encuesta
                                if (encuesta) {
                                    $('#EncuestasDisponibleSI').prop('checked', true);
                                    $('#EncuestasDisponibleSI_rrhh').prop('checked', true);
                                }
                                else {
                                    $('#EncuestasDisponibleNO').prop('checked', true);
                                    $('#EncuestasDisponibleNO_rrhh').prop('checked', true);
                                }

                                Funciones.ObtenerObjeto("ddlReferido").val(datos.referido)
                                Funciones.ObtenerObjeto("ddlRegional").val(datos.regional)

                                Funciones.ObtenerObjeto("id_tcAspirante").val(datos.id_TcAspirante)

                                Funciones.ObtenerObjeto("fecha_referencia").val(datos.fecha_referencia)
                                Funciones.ObtenerObjeto("detalle_referido").val(datos.detalle_referido)
                                Funciones.ObtenerObjeto("RH_referenciadate").val(datos.RH_referenciadate)
                                Funciones.ObtenerObjeto("RH_entradas").val(datos.RH_entradas)
                                Funciones.ObtenerObjeto("fecha_entradaDept").val(datos.fecha_entradaDept)
                                Funciones.ObtenerObjeto("archivadoen").val(datos.archivadoen)
                                Funciones.ObtenerObjeto("fecha_encuesta").val(datos.fecha_encuesta)

                                var activo = datos.AspiranteActivo
                                if (activo) {
                                    $('#AspiranteActivoSI_rrhh').prop('checked', true);
                                }
                                else {
                                    $('#AspiranteActivoNO_rrhh').prop('checked', true);
                                }

                                var checkSolicitudEmpleo = datos.SolicitudEmpleo;
                                if (checkSolicitudEmpleo) {
                                    $('#checkSolEmpleo').prop('checked', true);
                                }
                                else {
                                    $('#checkSolEmpleo').prop('checked', false);
                                }


                                localStorage.removeItem('usuarioNuevo');

                            }
                            else {
                                alertify.error("data.Resultado = No ok")
                            }

                        }
                    },
                error: function ajaxError(data, status, err) {
                    alertify.error(Mensajes.ErrorGetData());
                }

            });
        }

    }
    if (localStorage.getItem('aspiranteNuevo') != null) {
        localStorage.removeItem('aspiranteNuevo');
    }


    /*--------------requeridos y mensajes para RRHH------------*/
    if (rrhh == "rrhh") {
        Funciones.ObtenerObjeto("lblCedulaProvincia").removeClass("required");
        Funciones.ObtenerObjeto("lblCedulaTomo").removeClass("required");
        Funciones.ObtenerObjeto("lblCedulaAsiento").removeClass("required");
        Funciones.ObtenerObjeto("lblPaisNac").removeClass("required");
        Funciones.ObtenerObjeto("lblProvinciaNac").removeClass("required");
        Funciones.ObtenerObjeto("lblDistritoNac").removeClass("required");
        Funciones.ObtenerObjeto("lblFechaNacimiento").removeClass("required");
        Funciones.ObtenerObjeto("h4Telefono").removeClass("required");
        Funciones.ObtenerObjeto("lblProvinciaVive").removeClass("required");
        Funciones.ObtenerObjeto("lblDistritoVive").removeClass("required");
        Funciones.ObtenerObjeto("lblCorregimientoVive").removeClass("required");
        Funciones.ObtenerObjeto("lblgenero").removeClass("required");
        Funciones.ObtenerObjeto("lblestadoCivil").removeClass("required");
        Funciones.ObtenerObjeto("Regional_prov").removeClass("Oculto");
        Funciones.ObtenerObjeto("dv_disponibleEncuesta").addClass("Oculto");
        Funciones.ObtenerObjeto("dv_headerDatosPersonalesRRHH").removeClass("Oculto");
        Funciones.ObtenerObjeto("dv_headerDatosPersonales").addClass("Oculto");
        Funciones.ObtenerObjeto("dv_HeaderTelefonoRRHH").removeClass("Oculto");
        Funciones.ObtenerObjeto("dv_HeaderTelefono").addClass("Oculto");
        Funciones.ObtenerObjeto("lblCorreo").removeClass("required");
    }

    if (idAspirantre != "" && idAspirantre != null && idAspirantre != 0) {

        $(newtabs).appendTo(tabs);

        //-------------------------------------------------------------- controlar los tabs hijos para que no interfieran en la interacción de unos con otros
        var TabFamiliares = Funciones.ObtenerObjeto("liConsultaDatosFamiliaresTab");
        var Tabhabilidades = Funciones.ObtenerObjeto("liConsultaHabilidadesDestrezasTab");
        var TabExperiencia = Funciones.ObtenerObjeto("liConsultaExperienciaTab");
        var TabOtros = Funciones.ObtenerObjeto("liOtrosTab");
        var TabAdjuntos = Funciones.ObtenerObjeto("liAdjuntosTab");

        TabOtros.click(function () {
            Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").addClass("Oculto");
            Funciones.ObtenerObjeto("ConsultaExperiencia").addClass("Oculto");
            Funciones.ObtenerObjeto("ConsultaDatosFamiliares").addClass("Oculto");

            Funciones.ObtenerObjeto("liPadresConyuge").removeClass("active");
            Funciones.ObtenerObjeto("liHermanos").removeClass('active');
            Funciones.ObtenerObjeto("liUrgencia").removeClass('active');
            Funciones.ObtenerObjeto("liFamiliaresInstitucion").removeClass('active');

            Funciones.ObtenerObjeto("SubTab_PadreConyuge").removeClass("in");
            Funciones.ObtenerObjeto("SubTab_Hermanos").removeClass('in');
            Funciones.ObtenerObjeto("SubTab_Urgencia").removeClass('in');
            Funciones.ObtenerObjeto("SubTab_FamiliaresInstitucion").removeClass('active');

            Funciones.ObtenerObjeto("SubTab_PadreConyuge").removeClass("active");
            Funciones.ObtenerObjeto("SubTab_Hermanos").removeClass('active');
            Funciones.ObtenerObjeto("SubTab_Urgencia").removeClass('active');
            Funciones.ObtenerObjeto("SubTab_FamiliaresInstitucion").removeClass('active');
        });

        TabFamiliares.click(function () {
            Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").addClass("Oculto");
            Funciones.ObtenerObjeto("ConsultaExperiencia").addClass("Oculto");

            Funciones.ObtenerObjeto("liPadresConyuge").addClass("active");
            Funciones.ObtenerObjeto("liHermanos").removeClass('active');
            Funciones.ObtenerObjeto("liUrgencia").removeClass('active');
            Funciones.ObtenerObjeto("liFamiliaresInstitucion").removeClass('active');

            Funciones.ObtenerObjeto("SubTab_PadreConyuge").addClass("in");
            Funciones.ObtenerObjeto("SubTab_Hermanos").removeClass('in');
            Funciones.ObtenerObjeto("SubTab_Urgencia").removeClass('in');
            Funciones.ObtenerObjeto("SubTab_FamiliaresInstitucion").removeClass('active');

            Funciones.ObtenerObjeto("SubTab_PadreConyuge").addClass("active");
            Funciones.ObtenerObjeto("SubTab_Hermanos").removeClass('active');
            Funciones.ObtenerObjeto("SubTab_Urgencia").removeClass('active');
            Funciones.ObtenerObjeto("SubTab_FamiliaresInstitucion").removeClass('active');
        });

        Tabhabilidades.click(function () {
            Funciones.ObtenerObjeto("ConsultaDatosFamiliares").addClass("Oculto");
            Funciones.ObtenerObjeto("ConsultaExperiencia").addClass("Oculto");

            Funciones.ObtenerObjeto("liIdioma").addClass("active");
            Funciones.ObtenerObjeto("liManejoHerraInformatica").removeClass('active');
            Funciones.ObtenerObjeto("liOtraHabilidad").removeClass('active');

            Funciones.ObtenerObjeto("SubTab_Idioma").addClass("in");
            Funciones.ObtenerObjeto("SubTab_ManejoHerraInformatica").removeClass('in');
            Funciones.ObtenerObjeto("SubTab_OtraHabilidad").removeClass('in');

            Funciones.ObtenerObjeto("SubTab_Idioma").addClass("active");
            Funciones.ObtenerObjeto("SubTab_ManejoHerraInformatica").removeClass('active');
            Funciones.ObtenerObjeto("SubTab_OtraHabilidad").removeClass('active');

        });

        TabExperiencia.click(function () {
            Funciones.ObtenerObjeto("ConsultaDatosFamiliares").addClass("Oculto");
            Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").addClass("Oculto");

            Funciones.ObtenerObjeto("liExperienciaLaboral").addClass("active");
            Funciones.ObtenerObjeto("liExperienciaEncuesta").removeClass('active');
            Funciones.ObtenerObjeto("liEncuestaINEC").removeClass('active');

            Funciones.ObtenerObjeto("SubTab_ExperienciaLaboral").addClass("in");
            Funciones.ObtenerObjeto("SubTab_ExperienciaEncuesta").removeClass('in');
            Funciones.ObtenerObjeto("SubTab_EncuestaINEC").removeClass('in');

            Funciones.ObtenerObjeto("SubTab_ExperienciaLaboral").addClass("active");
            Funciones.ObtenerObjeto("SubTab_ExperienciaEncuesta").removeClass('active');
            Funciones.ObtenerObjeto("SubTab_EncuestaINEC").removeClass('active');
        });

        //----------------------------------------------------- Activar y desactivar tabs al refrescar la página
        var tabActive = localStorage.getItem('tabActive');
        var hdnTabAdj = Funciones.ObtenerObjeto("hdnTabAdj");

        if (tabActive == "estudios") //activar tab estudios
        {
            Funciones.ObtenerObjeto("liEstudiosTab").addClass("active");
            Funciones.ObtenerObjeto("liCargosTab").removeClass('active');
            Funciones.ObtenerObjeto("liAspiranteTab").removeClass('active');
            Funciones.ObtenerObjeto("liConsultaDatosFamiliaresTab").removeClass('active');
            Funciones.ObtenerObjeto("liConsultaHabilidadesDestrezasTab").removeClass('active');
            Funciones.ObtenerObjeto("liconsultaOtrosTab").removeClass('active');
            Funciones.ObtenerObjeto("liConsultaExperienciaTab").removeClass('active');
            Funciones.ObtenerObjeto("liAdjuntosTab").removeClass('active');

            Funciones.ObtenerObjeto("ConsultaEstudio").addClass("in");
            Funciones.ObtenerObjeto("Colaborador").removeClass('in');
            Funciones.ObtenerObjeto("ConsultaCargos").removeClass('in');
            Funciones.ObtenerObjeto("ConsultaDatosFamiliares").removeClass('in');
            Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").removeClass('in');
            Funciones.ObtenerObjeto("ConsultaOtros").removeClass('in');
            Funciones.ObtenerObjeto("ConsultaExperiencia").removeClass('in');
            Funciones.ObtenerObjeto("TabAdjuntos").removeClass('in');

            Funciones.ObtenerObjeto("ConsultaEstudio").addClass("active");
            Funciones.ObtenerObjeto("Colaborador").removeClass('active');
            Funciones.ObtenerObjeto("ConsultaCargos").removeClass('active');
            Funciones.ObtenerObjeto("ConsultaDatosFamiliares").removeClass('active');
            Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").removeClass('active');
            Funciones.ObtenerObjeto("ConsultaOtros").removeClass('active');
            Funciones.ObtenerObjeto("ConsultaExperiencia").removeClass('active');
            Funciones.ObtenerObjeto("TabAdjuntos").removeClass('active');

            hdnTabAdj.val("");
            localStorage.removeItem('tabActive');

        }
        else {
            if (tabActive == "cargos") //activar tab vacantes
            {
                Funciones.ObtenerObjeto("liCargosTab").addClass("active");
                Funciones.ObtenerObjeto("liEstudiosTab").removeClass('active');
                Funciones.ObtenerObjeto("liAspiranteTab").removeClass('active');
                Funciones.ObtenerObjeto("liConsultaDatosFamiliaresTab").removeClass('active');
                Funciones.ObtenerObjeto("liConsultaHabilidadesDestrezasTab").removeClass('active');
                Funciones.ObtenerObjeto("liconsultaOtrosTab").removeClass('active');
                Funciones.ObtenerObjeto("liConsultaExperienciaTab").removeClass('active');
                Funciones.ObtenerObjeto("liAdjuntosTab").removeClass('active');

                Funciones.ObtenerObjeto("ConsultaCargos").addClass("in");
                Funciones.ObtenerObjeto("Colaborador").removeClass('in');
                Funciones.ObtenerObjeto("ConsultaEstudio").removeClass('in');
                Funciones.ObtenerObjeto("ConsultaDatosFamiliares").removeClass('in');
                Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").removeClass('in');
                Funciones.ObtenerObjeto("ConsultaOtros").removeClass('in');
                Funciones.ObtenerObjeto("ConsultaExperiencia").removeClass('in');
                Funciones.ObtenerObjeto("TabAdjuntos").removeClass('in');

                Funciones.ObtenerObjeto("ConsultaCargos").addClass("active");
                Funciones.ObtenerObjeto("Colaborador").removeClass('active');
                Funciones.ObtenerObjeto("ConsultaEstudio").removeClass('active');
                Funciones.ObtenerObjeto("ConsultaDatosFamiliares").removeClass('active');
                Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").removeClass('active');
                Funciones.ObtenerObjeto("ConsultaOtros").removeClass('active');
                Funciones.ObtenerObjeto("ConsultaExperiencia").removeClass('active');
                Funciones.ObtenerObjeto("TabAdjuntos").removeClass('active');

                hdnTabAdj.val("");
                localStorage.removeItem('tabActive');

            }
            else {
                if (tabActive == "aspirante") //activar tab aspirante
                {

                    Funciones.ObtenerObjeto("liAspiranteTab").addClass("active");
                    Funciones.ObtenerObjeto("liEstudiosTab").removeClass('active');
                    Funciones.ObtenerObjeto("liCargosTab").removeClass('active');
                    Funciones.ObtenerObjeto("liConsultaDatosFamiliaresTab").removeClass('active');
                    Funciones.ObtenerObjeto("liConsultaHabilidadesDestrezasTab").removeClass('active');
                    Funciones.ObtenerObjeto("liconsultaOtrosTab").removeClass('active');
                    Funciones.ObtenerObjeto("liConsultaExperienciaTab").removeClass('active');
                    Funciones.ObtenerObjeto("liAdjuntosTab").removeClass('active');

                    Funciones.ObtenerObjeto("Colaborador").addClass("in");
                    Funciones.ObtenerObjeto("ConsultaCargos").removeClass('in');
                    Funciones.ObtenerObjeto("ConsultaEstudio").removeClass('in');
                    Funciones.ObtenerObjeto("ConsultaDatosFamiliares").removeClass('in');
                    Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").removeClass('in');
                    Funciones.ObtenerObjeto("ConsultaOtros").removeClass('in');
                    Funciones.ObtenerObjeto("ConsultaExperiencia").removeClass('in');
                    Funciones.ObtenerObjeto("TabAdjuntos").removeClass('in');

                    Funciones.ObtenerObjeto("Colaborador").addClass("active");
                    Funciones.ObtenerObjeto("ConsultaCargos").removeClass('active');
                    Funciones.ObtenerObjeto("ConsultaEstudio").removeClass('active');
                    Funciones.ObtenerObjeto("ConsultaDatosFamiliares").removeClass('active');
                    Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").removeClass('active');
                    Funciones.ObtenerObjeto("ConsultaOtros").removeClass('active');
                    Funciones.ObtenerObjeto("ConsultaExperiencia").removeClass('active');
                    Funciones.ObtenerObjeto("TabAdjuntos").removeClass('active');

                    hdnTabAdj.val("");
                    localStorage.removeItem('tabActive');


                }
                else {
                    if (tabActive == "Familiares") //activar tab datos familiares
                    {
                        var tabActive_Hijo = localStorage.getItem('tabActive_Hijo');
                        Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").addClass("Oculto");
                        Funciones.ObtenerObjeto("ConsultaExperiencia").addClass("Oculto");

                        Funciones.ObtenerObjeto("liConsultaDatosFamiliaresTab").addClass("active");
                        Funciones.ObtenerObjeto("liAspiranteTab").removeClass('active');
                        Funciones.ObtenerObjeto("liEstudiosTab").removeClass('active');
                        Funciones.ObtenerObjeto("liCargosTab").removeClass('active');
                        Funciones.ObtenerObjeto("liConsultaHabilidadesDestrezasTab").removeClass('active');
                        Funciones.ObtenerObjeto("liconsultaOtrosTab").removeClass('active');
                        Funciones.ObtenerObjeto("liConsultaExperienciaTab").removeClass('active');
                        Funciones.ObtenerObjeto("liAdjuntosTab").removeClass('active');

                        Funciones.ObtenerObjeto("ConsultaDatosFamiliares").addClass("in");
                        Funciones.ObtenerObjeto("Colaborador").removeClass('in');
                        Funciones.ObtenerObjeto("ConsultaCargos").removeClass('in');
                        Funciones.ObtenerObjeto("ConsultaEstudio").removeClass('active');
                        Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").removeClass('in');
                        Funciones.ObtenerObjeto("ConsultaOtros").removeClass('in');
                        Funciones.ObtenerObjeto("ConsultaExperiencia").removeClass('in');
                        Funciones.ObtenerObjeto("TabAdjuntos").removeClass('in');

                        Funciones.ObtenerObjeto("ConsultaDatosFamiliares").addClass("active");
                        Funciones.ObtenerObjeto("Colaborador").removeClass('active');
                        Funciones.ObtenerObjeto("ConsultaCargos").removeClass('active');
                        Funciones.ObtenerObjeto("ConsultaEstudio").removeClass('active');
                        Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").removeClass('active');
                        Funciones.ObtenerObjeto("ConsultaOtros").removeClass('active');
                        Funciones.ObtenerObjeto("ConsultaExperiencia").removeClass('active');
                        Funciones.ObtenerObjeto("TabAdjuntos").removeClass('active');

                        if (tabActive_Hijo == "PadresConyuge") //activar tab padres y conyuge
                        {
                            Funciones.ObtenerObjeto("liPadresConyuge").addClass("active");
                            Funciones.ObtenerObjeto("liHermanos").removeClass('active');
                            Funciones.ObtenerObjeto("liUrgencia").removeClass('active');
                            Funciones.ObtenerObjeto("liFamiliaresInstitucion").removeClass('active');

                            Funciones.ObtenerObjeto("SubTab_PadreConyuge").addClass("in");
                            Funciones.ObtenerObjeto("SubTab_Hermanos").removeClass('in');
                            Funciones.ObtenerObjeto("SubTab_Urgencia").removeClass('in');
                            Funciones.ObtenerObjeto("SubTab_FamiliaresInstitucion").removeClass('active');

                            Funciones.ObtenerObjeto("SubTab_PadreConyuge").addClass("active");
                            Funciones.ObtenerObjeto("SubTab_Hermanos").removeClass('active');
                            Funciones.ObtenerObjeto("SubTab_Urgencia").removeClass('active');
                            Funciones.ObtenerObjeto("SubTab_FamiliaresInstitucion").removeClass('active');
                        }
                        else {
                            if (tabActive_Hijo == "Hermanos") //activar tab hermanos
                            {
                                Funciones.ObtenerObjeto("liHermanos").addClass("active");
                                Funciones.ObtenerObjeto("liPadresConyuge").removeClass('active');
                                Funciones.ObtenerObjeto("liUrgencia").removeClass('active');
                                Funciones.ObtenerObjeto("liFamiliaresInstitucion").removeClass('active');

                                Funciones.ObtenerObjeto("SubTab_Hermanos").addClass("in");
                                Funciones.ObtenerObjeto("SubTab_PadreConyuge").removeClass('in');
                                Funciones.ObtenerObjeto("SubTab_Urgencia").removeClass('in');
                                Funciones.ObtenerObjeto("SubTab_FamiliaresInstitucion").removeClass('active');

                                Funciones.ObtenerObjeto("SubTab_Hermanos").addClass("active");
                                Funciones.ObtenerObjeto("SubTab_PadreConyuge").removeClass('active');
                                Funciones.ObtenerObjeto("SubTab_Urgencia").removeClass('active');
                                Funciones.ObtenerObjeto("SubTab_FamiliaresInstitucion").removeClass('active');
                            }
                            else {
                                if (tabActive_Hijo == "Urgencias") //activar tab urgencias
                                {
                                    Funciones.ObtenerObjeto("liUrgencia").addClass("active");
                                    Funciones.ObtenerObjeto("liPadresConyuge").removeClass('active');
                                    Funciones.ObtenerObjeto("liHermanos").removeClass('active');
                                    Funciones.ObtenerObjeto("liFamiliaresInstitucion").removeClass('active');

                                    Funciones.ObtenerObjeto("SubTab_Urgencia").addClass("in");
                                    Funciones.ObtenerObjeto("SubTab_PadreConyuge").removeClass('in');
                                    Funciones.ObtenerObjeto("SubTab_Hermanos").removeClass('in');
                                    Funciones.ObtenerObjeto("SubTab_FamiliaresInstitucion").removeClass('active');

                                    Funciones.ObtenerObjeto("SubTab_Urgencia").addClass("active");
                                    Funciones.ObtenerObjeto("SubTab_PadreConyuge").removeClass('active');
                                    Funciones.ObtenerObjeto("SubTab_Hermanos").removeClass('active');
                                    Funciones.ObtenerObjeto("SubTab_FamiliaresInstitucion").removeClass('active');
                                }
                                else {
                                    if (tabActive_Hijo == "FamiliarInstitucion") //activar tab familiares en la institución
                                    {
                                        Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").addClass("Oculto");

                                        Funciones.ObtenerObjeto("liFamiliaresInstitucion").addClass("active");
                                        Funciones.ObtenerObjeto("liPadresConyuge").removeClass('active');
                                        Funciones.ObtenerObjeto("liHermanos").removeClass('active');
                                        Funciones.ObtenerObjeto("liUrgencia").removeClass('active');

                                        Funciones.ObtenerObjeto("SubTab_FamiliaresInstitucion").addClass("in");
                                        Funciones.ObtenerObjeto("SubTab_PadreConyuge").removeClass('in');
                                        Funciones.ObtenerObjeto("SubTab_Hermanos").removeClass('in');
                                        Funciones.ObtenerObjeto("SubTab_Urgencia").removeClass('active');

                                        Funciones.ObtenerObjeto("SubTab_FamiliaresInstitucion").addClass("active");
                                        Funciones.ObtenerObjeto("SubTab_PadreConyuge").removeClass('active');
                                        Funciones.ObtenerObjeto("SubTab_Hermanos").removeClass('active');
                                        Funciones.ObtenerObjeto("SubTab_Urgencia").removeClass('active');
                                    }
                                }

                            }
                        }

                        hdnTabAdj.val("");
                        localStorage.removeItem('tabActive');
                        localStorage.removeItem('tabActive_Hijo');

                    }
                    else {
                        if (tabActive == "Habilidades") //activar tab habilidades y destrezas
                        {
                            var tabActive_Hijo = localStorage.getItem('tabActive_Hijo');
                            Funciones.ObtenerObjeto("ConsultaDatosFamiliares").addClass("Oculto");
                            Funciones.ObtenerObjeto("ConsultaExperiencia").addClass("Oculto");

                            Funciones.ObtenerObjeto("liConsultaHabilidadesDestrezasTab").addClass("active");
                            Funciones.ObtenerObjeto("liAspiranteTab").removeClass('active');
                            Funciones.ObtenerObjeto("liEstudiosTab").removeClass('active');
                            Funciones.ObtenerObjeto("liCargosTab").removeClass('active');
                            Funciones.ObtenerObjeto("liConsultaDatosFamiliaresTab").removeClass('active');
                            Funciones.ObtenerObjeto("liconsultaOtrosTab").removeClass('active');
                            Funciones.ObtenerObjeto("liConsultaExperienciaTab").removeClass('active');
                            Funciones.ObtenerObjeto("liAdjuntosTab").removeClass('active');

                            Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").addClass("in");
                            Funciones.ObtenerObjeto("Colaborador").removeClass('in');
                            Funciones.ObtenerObjeto("ConsultaCargos").removeClass('in');
                            Funciones.ObtenerObjeto("ConsultaEstudio").removeClass('active');
                            Funciones.ObtenerObjeto("ConsultaDatosFamiliares").removeClass('in');
                            Funciones.ObtenerObjeto("ConsultaOtros").removeClass('in');
                            Funciones.ObtenerObjeto("ConsultaExperiencia").removeClass('in');
                            Funciones.ObtenerObjeto("TabAdjuntos").removeClass('in');

                            Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").addClass("active");
                            Funciones.ObtenerObjeto("Colaborador").removeClass('active');
                            Funciones.ObtenerObjeto("ConsultaCargos").removeClass('active');
                            Funciones.ObtenerObjeto("ConsultaEstudio").removeClass('active');
                            Funciones.ObtenerObjeto("ConsultaDatosFamiliares").removeClass('active');
                            Funciones.ObtenerObjeto("ConsultaOtros").removeClass('active');
                            Funciones.ObtenerObjeto("ConsultaExperiencia").removeClass('active');
                            Funciones.ObtenerObjeto("TabAdjuntos").removeClass('active');

                            if (tabActive_Hijo == "Idioma") //activar tab Idioma
                            {
                                Funciones.ObtenerObjeto("liIdioma").addClass("active");
                                Funciones.ObtenerObjeto("liManejoHerraInformatica").removeClass('active');
                                Funciones.ObtenerObjeto("liOtraHabilidad").removeClass('active');


                                Funciones.ObtenerObjeto("SubTab_Idioma").addClass("in");
                                Funciones.ObtenerObjeto("SubTab_ManejoHerraInformatica").removeClass('in');
                                Funciones.ObtenerObjeto("SubTab_OtraHabilidad").removeClass('in');


                                Funciones.ObtenerObjeto("SubTab_Idioma").addClass("active");
                                Funciones.ObtenerObjeto("SubTab_ManejoHerraInformatica").removeClass('active');
                                Funciones.ObtenerObjeto("SubTab_OtraHabilidad").removeClass('active');

                            }
                            else {
                                if (tabActive_Hijo == "HerraInfo") //activar tab manejo de herramientas informáticas
                                {
                                    Funciones.ObtenerObjeto("liManejoHerraInformatica").addClass("active");
                                    Funciones.ObtenerObjeto("liIdioma").removeClass('active');
                                    Funciones.ObtenerObjeto("liOtraHabilidad").removeClass('active');


                                    Funciones.ObtenerObjeto("SubTab_ManejoHerraInformatica").addClass("in");
                                    Funciones.ObtenerObjeto("SubTab_Idioma").removeClass('in');
                                    Funciones.ObtenerObjeto("SubTab_OtraHabilidad").removeClass('in');


                                    Funciones.ObtenerObjeto("SubTab_ManejoHerraInformatica").addClass("active");
                                    Funciones.ObtenerObjeto("SubTab_Idioma").removeClass('active');
                                    Funciones.ObtenerObjeto("SubTab_OtraHabilidad").removeClass('active');
                                }
                                else {
                                    if (tabActive_Hijo == "OtrasHabilidades") //activar tab hermanos
                                    {
                                        Funciones.ObtenerObjeto("liIdioma").removeClass("active");
                                        Funciones.ObtenerObjeto("liManejoHerraInformatica").removeClass('active');
                                        Funciones.ObtenerObjeto("liOtraHabilidad").addClass('active');

                                        Funciones.ObtenerObjeto("SubTab_Idioma").removeClass("in");
                                        Funciones.ObtenerObjeto("SubTab_ManejoHerraInformatica").removeClass('in');
                                        Funciones.ObtenerObjeto("SubTab_OtraHabilidad").addClass('in');

                                        Funciones.ObtenerObjeto("SubTab_Idioma").removeClass("active");
                                        Funciones.ObtenerObjeto("SubTab_ManejoHerraInformatica").removeClass('active');
                                        Funciones.ObtenerObjeto("SubTab_OtraHabilidad").addClass('active');
                                    }
                                }
                            }

                            hdnTabAdj.val("");
                            localStorage.removeItem('tabActive');
                            localStorage.removeItem('tabActive_Hijo');
                        }
                        else {
                            if (tabActive == "Otros") //activar tab Otros
                            {

                                Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").addClass("Oculto");
                                Funciones.ObtenerObjeto("ConsultaExperiencia").addClass("Oculto");
                                Funciones.ObtenerObjeto("ConsultaDatosFamiliares").addClass("Oculto");

                                Funciones.ObtenerObjeto("liOtrosTab").addClass("active");
                                Funciones.ObtenerObjeto("liEstudiosTab").removeClass('active');
                                Funciones.ObtenerObjeto("liCargosTab").removeClass('active');
                                Funciones.ObtenerObjeto("liAspiranteTab").removeClass('active');
                                Funciones.ObtenerObjeto("liConsultaDatosFamiliaresTab").removeClass('active');
                                Funciones.ObtenerObjeto("liConsultaHabilidadesDestrezasTab").removeClass('active');
                                Funciones.ObtenerObjeto("liConsultaExperienciaTab").removeClass('active');
                                Funciones.ObtenerObjeto("liAdjuntosTab").removeClass('active');

                                Funciones.ObtenerObjeto("ConsultaOtros").addClass("in");
                                Funciones.ObtenerObjeto("ConsultaEstudio").removeClass('in');
                                Funciones.ObtenerObjeto("Colaborador").removeClass('in');
                                Funciones.ObtenerObjeto("ConsultaCargos").removeClass('in');
                                Funciones.ObtenerObjeto("ConsultaDatosFamiliares").removeClass('in');
                                Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").removeClass('in');
                                Funciones.ObtenerObjeto("ConsultaExperiencia").removeClass('in');
                                Funciones.ObtenerObjeto("TabAdjuntos").removeClass('in');

                                Funciones.ObtenerObjeto("ConsultaOtros").addClass("active");
                                Funciones.ObtenerObjeto("ConsultaEstudio").removeClass('active');
                                Funciones.ObtenerObjeto("Colaborador").removeClass('active');
                                Funciones.ObtenerObjeto("ConsultaCargos").removeClass('active');
                                Funciones.ObtenerObjeto("ConsultaDatosFamiliares").removeClass('active');
                                Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").removeClass('active');
                                Funciones.ObtenerObjeto("ConsultaExperiencia").removeClass('active');
                                Funciones.ObtenerObjeto("TabAdjuntos").removeClass('active');

                                hdnTabAdj.val("");
                                localStorage.removeItem('tabActive');
                            }
                            else {

                                if (tabActive == "Experiencia") //activar tab Experiencia
                                {
                                    Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").addClass("Oculto");
                                    Funciones.ObtenerObjeto("ConsultaDatosFamiliares").addClass("Oculto");

                                    Funciones.ObtenerObjeto("liConsultaExperienciaTab").addClass("active");
                                    Funciones.ObtenerObjeto("liAspiranteTab").removeClass('active');
                                    Funciones.ObtenerObjeto("liEstudiosTab").removeClass('active');
                                    Funciones.ObtenerObjeto("liCargosTab").removeClass('active');
                                    Funciones.ObtenerObjeto("liConsultaDatosFamiliaresTab").removeClass('active');
                                    Funciones.ObtenerObjeto("liconsultaOtrosTab").removeClass('active');
                                    Funciones.ObtenerObjeto("liConsultaHabilidadesDestrezasTab").removeClass('active');
                                    Funciones.ObtenerObjeto("liAdjuntosTab").removeClass('active');

                                    Funciones.ObtenerObjeto("ConsultaExperiencia").addClass("in");
                                    Funciones.ObtenerObjeto("Colaborador").removeClass('in');
                                    Funciones.ObtenerObjeto("ConsultaCargos").removeClass('in');
                                    Funciones.ObtenerObjeto("ConsultaEstudio").removeClass('active');
                                    Funciones.ObtenerObjeto("ConsultaDatosFamiliares").removeClass('in');
                                    Funciones.ObtenerObjeto("ConsultaOtros").removeClass('in');
                                    Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").removeClass('in');
                                    Funciones.ObtenerObjeto("TabAdjuntos").removeClass('in');

                                    Funciones.ObtenerObjeto("ConsultaExperiencia").addClass("active");
                                    Funciones.ObtenerObjeto("Colaborador").removeClass('active');
                                    Funciones.ObtenerObjeto("ConsultaCargos").removeClass('active');
                                    Funciones.ObtenerObjeto("ConsultaEstudio").removeClass('active');
                                    Funciones.ObtenerObjeto("ConsultaDatosFamiliares").removeClass('active');
                                    Funciones.ObtenerObjeto("ConsultaOtros").removeClass('active');
                                    Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").removeClass('active');
                                    Funciones.ObtenerObjeto("TabAdjuntos").removeClass('active');

                                    var tabActive_Hijo = localStorage.getItem('tabActive_Hijo');

                                    if (tabActive_Hijo == "Laboral") //activar tab Experiencia Laboral
                                    {
                                        Funciones.ObtenerObjeto("liExperienciaLaboral").addClass("active");
                                        Funciones.ObtenerObjeto("liExperienciaEncuesta").removeClass('active');
                                        Funciones.ObtenerObjeto("liEncuestaINEC").removeClass('active');

                                        Funciones.ObtenerObjeto("SubTab_ExperienciaLaboral").addClass("in");
                                        Funciones.ObtenerObjeto("SubTab_ExperienciaEncuesta").removeClass('in');
                                        Funciones.ObtenerObjeto("SubTab_EncuestaINEC").removeClass('in');

                                        Funciones.ObtenerObjeto("SubTab_ExperienciaLaboral").addClass("active");
                                        Funciones.ObtenerObjeto("SubTab_ExperienciaEncuesta").removeClass('active');
                                        Funciones.ObtenerObjeto("SubTab_EncuestaINEC").removeClass('active');
                                    }
                                    else {
                                        if (tabActive_Hijo == "Encuesta") //activar tab Experiencia encuesta
                                        {
                                            Funciones.ObtenerObjeto("liExperienciaEncuesta").addClass("active");
                                            Funciones.ObtenerObjeto("liExperienciaLaboral").removeClass('active');
                                            Funciones.ObtenerObjeto("liEncuestaINEC").removeClass('active');

                                            Funciones.ObtenerObjeto("SubTab_ExperienciaEncuesta").addClass("in");
                                            Funciones.ObtenerObjeto("SubTab_ExperienciaLaboral").removeClass('in');
                                            Funciones.ObtenerObjeto("SubTab_EncuestaINEC").removeClass('in');

                                            Funciones.ObtenerObjeto("SubTab_ExperienciaEncuesta").addClass("active");
                                            Funciones.ObtenerObjeto("SubTab_ExperienciaLaboral").removeClass('active');
                                            Funciones.ObtenerObjeto("SubTab_EncuestaINEC").removeClass('active');
                                        }
                                        else {
                                            if (tabActive_Hijo == "EncuestaINEC") //activar tab encuesta INEC
                                            {
                                                Funciones.ObtenerObjeto("liEncuestaINEC").addClass("active");
                                                Funciones.ObtenerObjeto("liExperienciaLaboral").removeClass('active');
                                                Funciones.ObtenerObjeto("liExperienciaEncuesta").removeClass('active');

                                                Funciones.ObtenerObjeto("SubTab_EncuestaINEC").addClass("in");
                                                Funciones.ObtenerObjeto("SubTab_ExperienciaLaboral").removeClass('in');
                                                Funciones.ObtenerObjeto("SubTab_ExperienciaEncuesta").removeClass('in');

                                                Funciones.ObtenerObjeto("SubTab_EncuestaINEC").addClass("active");
                                                Funciones.ObtenerObjeto("SubTab_ExperienciaLaboral").removeClass('active');
                                                Funciones.ObtenerObjeto("SubTab_ExperienciaEncuesta").removeClass('active');
                                            }
                                        }
                                    }

                                    hdnTabAdj.val("");
                                    localStorage.removeItem('tabActive');
                                    localStorage.removeItem('tabActive_Hijo');
                                }
                                else {
                                    if(hdnTabAdj.val()=="1")
                                    {
                                        Funciones.ObtenerObjeto("liAspiranteTab").removeClass("active");
                                        Funciones.ObtenerObjeto("liEstudiosTab").removeClass('active');
                                        Funciones.ObtenerObjeto("liCargosTab").removeClass('active');
                                        Funciones.ObtenerObjeto("liConsultaDatosFamiliaresTab").removeClass('active');
                                        Funciones.ObtenerObjeto("liConsultaHabilidadesDestrezasTab").removeClass('active');
                                        Funciones.ObtenerObjeto("liconsultaOtrosTab").removeClass('active');
                                        Funciones.ObtenerObjeto("liConsultaExperienciaTab").removeClass('active');
                                        Funciones.ObtenerObjeto("liAdjuntosTab").addClass('active');

                                        Funciones.ObtenerObjeto("Colaborador").removeClass("in");
                                        Funciones.ObtenerObjeto("ConsultaCargos").removeClass('in');
                                        Funciones.ObtenerObjeto("ConsultaEstudio").removeClass('in');
                                        Funciones.ObtenerObjeto("ConsultaDatosFamiliares").removeClass('in');
                                        Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").removeClass('in');
                                        Funciones.ObtenerObjeto("ConsultaOtros").removeClass('in');
                                        Funciones.ObtenerObjeto("ConsultaExperiencia").removeClass('in');
                                        Funciones.ObtenerObjeto("TabAdjuntos").addClass('in');

                                        Funciones.ObtenerObjeto("Colaborador").removeClass("active");
                                        Funciones.ObtenerObjeto("ConsultaCargos").removeClass('active');
                                        Funciones.ObtenerObjeto("ConsultaEstudio").removeClass('active');
                                        Funciones.ObtenerObjeto("ConsultaDatosFamiliares").removeClass('active');
                                        Funciones.ObtenerObjeto("ConsultaHabilidadesDestrezas").removeClass('active');
                                        Funciones.ObtenerObjeto("ConsultaOtros").removeClass('active');
                                        Funciones.ObtenerObjeto("ConsultaExperiencia").removeClass('active');
                                        Funciones.ObtenerObjeto("TabAdjuntos").addClass('active');
                                        hdnTabAdj.val("");
                                        localStorage.removeItem('tabActive');
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }


        // Corrige tamaño de columnas de DataTable dentro de Tabs
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $($.fn.dataTable.tables(true)).css('width', '100%');
            $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
        });


        // Corrige tamaño de columnas de DataTable dentro de modales
        $('#dvModalFormCargos').on('shown.bs.modal', function (e) {
            $($.fn.dataTable.tables(true)).css('width', '100%');
            $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
        });

        $.fn.dataTable.ext.errMode = 'none';
        //------------------------------------------------------------------TABLA DE ESTUDIOS ------------------------------------------------------------
        // Le da formato a la tabla de resultados de la consulta"  AjaxEstudios  AjaxAspiranteNuevo
        var columnas = ["Titulo", "DescripcionGrado", "DescripcionEstatus", "Especialidad", "Centro_Educativo", "DescripcionIdoneidad"];
        AgregarFormatoTablaEstudios("tblEstudios", "/Formas/Ajax/AjaxEstudios.aspx?Query=ListDataEstudios&IdAspirantre=" + idAspirantre + '&RRHH=' + rrhh, columnas, "Editar Estudio", "dvModalFormEstudios", idAspirantre);

        //------------------------------------------------------------------TABLA DE CARGOS ---------------------------------------------------------------

        //AjaxCargos AjaxAspiranteNuevo
        var columnaCargo = ["Cargo", "DescripcionDisponible"];
        AgregarFormatoTablaCargos("tblCargos", "/Formas/Ajax/AjaxCargos.aspx?Query=ListDataCargos&IdAspirantre=" + idAspirantre + '&RRHH=' + rrhh, columnaCargo, idAspirantre)


    }
    var disponibles = 0;
    var noDisponibles = 0;
    var cantidadVacantes = 0;
    var countEstudios = 0;
    var control = false;
    function AgregarFormatoTablaEstudios(idTabla, ajaxData, columns, tituloModal, idModal, aspirante) {
        var asp_val = Funciones.ObtenerValor("val_aspirante");
        var registradoEn = Funciones.ObtenerValor("hdRegistradoEn");
        var EntraRegional = Funciones.ObtenerValor("hdRegionalUsuario");
        var rrhh = Funciones.ObtenerValor("hdRRHH");
        // Crea el array de columnas
        var colData = [];
        fLen = columns.length;

        // Carga las columnas que selecciono el usuario
        for (i = 0; i < fLen; i++) {
            colData.push({ "data": columns[i] });
        }
        // Agrega la columna de boton de Eliminar
        colData.push({
            "render": function (data, type, row) {

                countEstudios = countEstudios + 1;
                $("#CantidadEstudios").val(countEstudios);

                if (asp_val != "AspiranteExterno") {
                    if ((asp_val == "rrhh") &&
                        (registradoEn == "" || registradoEn == null || registradoEn == " ") &&
                        (!(EntraRegional != "8" && EntraRegional != null && EntraRegional != "" && EntraRegional != " "))) // si se va actualizar y el aspirante se registró en la web y el que entra es de la sede
                    {
                        return "<span aria-hidden='true' title='Eliminar'><a id='btnDel' disabled='true' class='btn btn-danger btnDelete'>Eliminar</a></span> ";

                    }
                    else {
                        if ((asp_val == "rrhh") &&
                            (EntraRegional != "8" && EntraRegional != null && EntraRegional != "" && EntraRegional != " ") &&
                            (registradoEn == "" || registradoEn == null || registradoEn == " ")) // si el que entra es de una regional y es de la web el que se va a actualizar
                        {
                            return "<span aria-hidden='true' title='Eliminar'><a id='btnDel' disabled='true' class='btn btn-danger btnDelete'>Eliminar</a></span> ";
                        }
                        else {
                            return "<span aria-hidden='true' title='Eliminar'><a id='btnDel' href='#' class='btn btn-danger btnDelete' onclick='EliminarEstudios(" + row.Id_Estudios + "," + aspirante + ");'>Eliminar</a></span> ";
                        }
                    }

                }
                else {
                    return "<span aria-hidden='true' title='Eliminar'><a id='btnDel' disabled='true' class='btn btn-danger btnDelete'>Eliminar</a></span> ";
                }
            }
        });

        // Agrega la columna de boton de Editar 

        colData.push({
            "render": function (data, type, row) {

                var asp_val = Funciones.ObtenerValor("val_aspirante");
                if (asp_val != "AspiranteExterno") {
                    if ((asp_val == "rrhh") &&
                        (registradoEn == "" || registradoEn == null || registradoEn == " ") &&
                        (!(EntraRegional != "8" && EntraRegional != null && EntraRegional != "" && EntraRegional != " "))) // si se va actualizar y el aspirante se registró en la web y el que entra es de la sede
                    {
                        return "<span aria-hidden='true' title='Editar'><a id='btnEditar' disabled='true' class='btn btn-primary btnEdit' >Editar</a></span> ";
                    }
                    else {
                        if ((asp_val == "rrhh") &&
                           (EntraRegional != "8" && EntraRegional != null && EntraRegional != "" && EntraRegional != " ") &&
                           (registradoEn == "" || registradoEn == null || registradoEn == " ")) // si el que entra es de una regional y es de la web el que se va a actualizar
                        {
                            return "<span aria-hidden='true' title='Editar'><a id='btnEditar' disabled='true' class='btn btn-primary btnEdit' >Editar</a></span> ";
                        }
                        else {
                            return "<span aria-hidden='true' title='Editar'><a id='btnEditar' href='#' class='btn btn-primary btnEdit' onclick='ShowModalEdit(&quot;Editar&quot;, &quot;" + tituloModal + "&quot;, &quot;" + idModal + "&quot;, " + row.Id_Estudios + "," + aspirante + ");'>Editar</a></span> ";
                        }
                    }

                }
                else {
                    return "<span aria-hidden='true' title='Editar'><a id='btnEditar' disabled='true' class='btn btn-primary btnEdit' >Editar</a></span> ";
                }

            }
        });


        // Inicia DataTable
        var table = $('#' + idTabla).DataTable({
            //"order": [[0, "desc"]],
            "lengthMenu": [10, 20, 50, 100],
            "dom": 'lfrt<"row"<"col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xs-offset-12 col-sm-offset-4 col-md-offset-4 col-lg-offset-4 paginacion text-center"p><"col-xs-12 col-sm-4 col-md-4 col-lg-4 text-left"i>>',
            "processing": true,
            "ajax": {
                "url": host + ajaxData,
                "type": "POST"
            },
            "columns": colData,
            "deferRender": true,
            "sDom": "r",
            "serverSide": true,
            "ordering": true,
            "columnDefs": [
                   {

                       className: "col-lg-1", "targets": [0, 1, 2, 3, 4, 5, 6, 7],
                       className: "col-md-1", "targets": [0, 1, 2, 3, 4, 5, 6, 7],
                       className: "col-sm-1", "targets": [0, 1, 2, 3, 4, 5, 6, 7],
                       className: "col-xs-1", "targets": [0, 1, 2, 3, 4, 5, 6, 7],
                       //className: "col-lg-1", "targets": [2, 4, 6,7],
                       //className: "col-md-1", "targets": [2, 4, 6, 7],
                       //className: "col-sm-1", "targets": [2, 4, 6, 7],
                       //className: "col-xs-1", "targets": [2, 4, 6, 7],
                       //render: function (data, type, full, meta) {
                       //    return "<div class='text-wrap width-100'>" + data + "</div>";
                       //},
                       targets: [0, 1, 2, 3, 4, 5, 6, 7],
                       orderData: [0, 1, 2, 3, 4, 5, 6, 7]


                   }
            ],
            "cache": false,
            "language": {
                "processing": "Cargando...",
                "lengthMenu": "Registros por p\xE1ginas _MENU_",
                "zeroRecords": "Usted no tiene registros de estudios.",
                "search": "_INPUT_",
                "info": "Mostrando P\xE1ginas _PAGE_ de _PAGES_",
                "infoEmpty": "",
                "infoFiltered": "(Filtrado de _MAX_ Total de Registros)",
                "paginate": {
                    "first": "Primero",
                    "last": "Último",
                    "next": "Siguiente",
                    "previous": "Anterior"

                },
            },
            initComplete: function (settings, json) {
                ContarTablasCargadas();
            }
        });
    }

    function AgregarFormatoTablaCargos(idTabla, ajaxData, columns, aspirante) {
        var asp_val = Funciones.ObtenerValor("val_aspirante");
        var registradoEn = Funciones.ObtenerValor("hdRegistradoEn");
        var EntraRegional = Funciones.ObtenerValor("hdRegionalUsuario");
        var rrhh = Funciones.ObtenerValor("hdRRHH");
        // Crea el array de columnas
        var colData = [];
        fLen = columns.length;

        // Carga las columnas que selecciono el usuario
        for (i = 0; i < fLen; i++) {
            colData.push({ "data": columns[i] });
        }
        // Agrega la columna de boton de Eliminar

        colData.push({
            "render": function (data, type, row) {
                if (!control) {
                    if (row.Disponible == 1) {
                        disponibles = disponibles + 1;
                        Funciones.ObtenerObjeto("CantidadDisponible").val(disponibles)
                    }
                    else {
                        noDisponibles = noDisponibles + 1;
                        Funciones.ObtenerObjeto("Cantidad_NoDisponible").val(noDisponibles)
                    }
                }
                return "<span class='Oculto'>" + row.Disponible + " </span>"
            }
        });

        colData.push({
            "render": function (data, type, row) {
                control = true;


                if (asp_val != "AspiranteExterno") {
                    if ((asp_val == "rrhh") &&
                        (registradoEn == "" || registradoEn == null || registradoEn == " ") &&
                        (!(EntraRegional != "8" && EntraRegional != null && EntraRegional != "" && EntraRegional != " "))) // si se va actualizar y el aspirante se registró en la web y el que entra es de la sede
                    {
                        return "<span aria-hidden='true' title='Eliminar'><a id='btnDel' disabled='true' class='btn btn-danger btnDelete'>Eliminar</a></span> ";
                    }
                    else {
                        if ((asp_val == "rrhh") &&
                            (EntraRegional != "8" && EntraRegional != null && EntraRegional != "" && EntraRegional != " ") &&
                            (registradoEn == "" || registradoEn == null || registradoEn == " ")) // si el que entra es de una regional y es de la web el que se va a actualizar
                        {
                            return "<span aria-hidden='true' title='Eliminar'><a id='btnDel' disabled='true' class='btn btn-danger btnDelete'>Eliminar</a></span> ";
                        }
                        else {
                            return "<span aria-hidden='true' title='Eliminar'><a id='btnDel' href='#' class='btn btn-danger btnDelete' onclick='EliminarCargos(" + row.Id_CargoClasifica + "," + aspirante + ");'>Eliminar</a></span> ";
                        }
                    }

                }
                else {
                    return "<span aria-hidden='true' title='Eliminar'><a id='btnDel' disabled='true' class='btn btn-danger btnDelete'>Eliminar</a></span> ";
                }
            }
        });

        colData.push({

            "render": function (data, type, row) {

                cantidadVacantes = cantidadVacantes + 1;
                $("#CantidadCargos").val(cantidadVacantes);

                return "<span aria-hidden='true' title='Ver'><a id='btnVer' href='#' class='btn btn-primary btnVer' onclick='ShowModalCargo(&quot;Descripción de la Vacante&quot;" + ",&quot;"
                    + "dvModalFormCargos" + "&quot;,&quot;" + row.Id_TipoCargo + "&quot;,&quot;" + row.Cargo.replace(/\r?\n|\r/g, "") + "&quot;);'>Ver</a></span> ";
            }
        });



        // Inicia DataTable
        var table = $('#' + idTabla).DataTable({
            "order": [],
            "lengthMenu": [10, 20, 50, 100],
            "dom": 'lfrt<"row"<"col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xs-offset-12 col-sm-offset-4 col-md-offset-4 col-lg-offset-4 paginacion text-center"p><"col-xs-12 col-sm-4 col-md-4 col-lg-4 text-left"i>>',
            "ajax": host + ajaxData,
            "columns": colData,
            "processing": true,
            "deferRender": true,
            "sDom": "r",
            "serverSide": true,
            "ordering": true,
            "columnDefs": [
                  {

                      className: "col-lg-6", "targets": [0],
                      className: "col-md-6", "targets": [0],
                      className: "col-sm-6", "targets": [0],
                      className: "col-xs-6", "targets": [0],

                      className: "col-lg-4", "targets": [1],
                      className: "col-md-4", "targets": [1],
                      className: "col-sm-4", "targets": [1],
                      className: "col-xs-4", "targets": [1],
                      //targets: [0,1],
                      //orderData: [0, 1]
                      //render: function (data, type, full, meta) {
                      //    return "<div class='text-wrap width-100'>" + data + "</div>";
                      //},
                      targets: [0, 1]

                  }
            ],
            "cache": false,
            "language": {
                "processing": "Cargando...",
                "lengthMenu": "Registros por p\xE1ginas _MENU_",
                "zeroRecords": "Usted no tiene registros de cargos a las que aspira.",
                "search": "Buscar",
                "info": "Mostrando P\xE1ginas _PAGE_ de _PAGES_",
                "infoEmpty": "",
                "infoFiltered": "(Filtrado de _MAX_ Total de Registros)",
                "paginate": {
                    "first": "Primero",
                    "last": "Último",
                    "next": "Siguiente",
                    "previous": "Anterior"
                },
            },
            initComplete: function (settings, json) {
                ContarTablasCargadas();
            }
        });

        $('#tblCargos').find('.btnDelete').each(function () {
            //$(this).attr("onclick", "new_function_name()");
            console.log(this)
        });


    }



    /////////////////////////////////////////////////////////////////////////////////////////////////// GUARDAR TAB DE ASPIRANTE


    var botonGuardar = Funciones.ObtenerObjeto("btnAspiranteGuardar");

    botonGuardar.click(function () {

        // Datos del primer tab 
        var accion = Funciones.ObtenerValor("hdAccion");
        var codigoFila = Funciones.ObtenerValor("hdCodigoFila");

        //Agregar camos de seccion Fuentes de Reclutamiento
        var fecha_referencia = Funciones.ObtenerValor("FechaReferencia");
        var detalle_referido = Funciones.ObtenerValor("txbDetalleReferido");
        var RH_referenciadate = Funciones.ObtenerValor("txbRHFReferencia");
        var RH_entradas = Funciones.ObtenerValor("txbRHEntrada");
        var fecha_entradaDept = Funciones.ObtenerValor("fechaentradadept");
        var archivadoen = Funciones.ObtenerValor("archivadoEn");
        var fecha_encuesta = Funciones.ObtenerValor("FechaEncuesta");

        var Aspactivo
        var chekiadoActivo = document.getElementById('AspiranteActivoSI_rrhh').checked;
        if (chekiadoActivo) {
            Aspactivo = Funciones.ObtenerValor("AspiranteActivoSI_rrhh");
        }
        else {
            Aspactivo = Funciones.ObtenerValor("AspiranteActivoNO_rrhh");
        }

        //datos personales
        var provinciaCedula = Funciones.ObtenerValor("txtCedProvincia");
        var tomoCedula = Funciones.ObtenerValor("txtCedTomo");
        var asientoCedula = Funciones.ObtenerValor("txtCedAsiento");
        var primerNombre = Funciones.ObtenerValor("txtAspirantePrimerNombre");
        var segundoNombre = Funciones.ObtenerValor("txtAspiranteSegundoNombre");
        var apellidoPaterno = Funciones.ObtenerValor("txtAspiranteApellidoPaterno");
        var apellidoMaterno = Funciones.ObtenerValor("txtAspiranteApellidoMaterno");
        var apellidoCasada = Funciones.ObtenerValor("txtAspiranteApellidoCasada");
        var seguroSocial = Funciones.ObtenerValor("txtAspiranteSeguroSocial");
        var sexo = Funciones.ObtenerValor("ddlAspiranteSexo");
        var estadoCivil = Funciones.ObtenerValor("ddAspiranteEstadoCivil");
        var tipoSangre = Funciones.ObtenerValor("ddlAspiranteTipoSangre");

        var checkeado = document.getElementById('viableSI').checked;
        if (checkeado) {
            var licencia = true
        }
        else {
            var licencia = false
        }
        var tipoLicencia = Funciones.ObtenerValor("ddlLicencia");
        var fechaExpiracion = Funciones.ObtenerValor("txtValorFecha");
        var aniosExperiencia = Funciones.ObtenerValor("txtAñoExperiencia");
        var observacion = Funciones.ObtenerValor("txtobservacion");
        var paisNacimiento = Funciones.ObtenerValor("ddlAspirantePaisNac");
        var provinciaNacimiento = Funciones.ObtenerValor("ddlAspiranteProvinciaNac");
        var distritoNacimiento = Funciones.ObtenerValor("ddlAspiranteDistritoNac");
        var nacionalidad = Funciones.ObtenerValor("TxtNacionalidad");
        var telefonoResidencia = Funciones.ObtenerValor("txtAspiranteTelefonoRes");
        var telefonoOficina = Funciones.ObtenerValor("txtAspiranteTelefonoOficina");
        var telefonoCelular = Funciones.ObtenerValor("txtAspiranteTelefonoCelular");
        var telefonoOtros = Funciones.ObtenerValor("txtAspiranteTelefonoOtros");
        var provinciaDireccion = Funciones.ObtenerValor("ddlAspiranteProvincia");
        var distritoDireccion = Funciones.ObtenerValor("ddlAspiranteDistrito");
        var corregimientoDireccion = Funciones.ObtenerValor("ddlAspiranteCorregimiento");
        var barrioDireccion = Funciones.ObtenerValor("txtAspiranteBarrio");
        var casaDireccion = Funciones.ObtenerValor("txtAspiranteCasa");
        var avenidaDireccion = Funciones.ObtenerValor("txtAspiranteAvenida");
        var edificioDireccion = Funciones.ObtenerValor("txtAspiranteEdificio");
        var calleDireccion = Funciones.ObtenerValor("txtAspiranteCalle");
        var apartamento = Funciones.ObtenerValor("txtAspiranteApartamento");
        var ID_USUARIO = Funciones.ObtenerValor("ID_USUARIO");
        var correoPersonal = Funciones.ObtenerValor("TxtCorreoPersonal");
        var correoOtro = Funciones.ObtenerValor("TxtOtroCorreo");
        var pasaporte = Funciones.ObtenerValor("TxtPasaporte");
        var rrhh = Funciones.ObtenerValor("hdRRHH");
        var fechaNacimiento = Funciones.ObtenerValor("FechaNacimiento");
        var diaNacimiento = "";
        var mesNacimiento = "";
        var anioNacimiento = "";
        var arr_dateText = fechaNacimiento.split("/");
        diaNacimiento = arr_dateText[0]; //dia
        mesNacimiento = arr_dateText[1];  //mes
        anioNacimiento = arr_dateText[2];  //año
        var DisponibilidadProvincia = document.getElementById('ProvinciaDisponibleSI').checked;
        var ProvinciaDisponible1 = Funciones.ObtenerValor("ddlProvinciaDisponible1");
        var ProvinciaDisponible2 = Funciones.ObtenerValor("ddlProvinciaDisponible2");
        var ProvinciaDisponible3 = Funciones.ObtenerValor("ddlProvinciaDisponible3");

        //Saldo que aspira
        var AspiracionSalarial = Funciones.ObtenerValor("AspiracionSalarial");
        var NegociableHasta = Funciones.ObtenerValor("NegociableHasta");

        //var checkSolEmpleo = document.getElementById('checkSolEmpleo').checked;
        // Funciones.ObtenerObjeto("CantidadDisponible")
        var checkSolEmpleo = Funciones.ObtenerObjeto("checkSolEmpleo").is(':checked');

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// valida si es un usuario normal o es de rrhh
        if (rrhh != "rrhh") {
            //validar los campos requeridos
            var chekiadoEncuesta = document.getElementById('EncuestasDisponibleSI').checked;
            if (chekiadoEncuesta) {
                var encuesta = true
            }
            else {
                var encuesta = false
            }

            if (provinciaCedula != null && provinciaCedula != "" && provinciaCedula.length > 0) {
                if (primerNombre != null && primerNombre != "" && primerNombre.length > 0) {

                    if ((apellidoPaterno == null || apellidoPaterno == "" || apellidoPaterno.length == 0) &&
                        (apellidoMaterno == null || apellidoMaterno == "" || apellidoMaterno.length == 0) && (apellidoCasada == null || apellidoCasada == "" || apellidoCasada.length == 0)) {
                        alertify.error("Un apellido es requerido");
                        return false;
                    }
                    else {

                        if (correoPersonal == null || correoPersonal == "") {
                            alertify.error("Correo principal es requerido");
                            return false;
                        }
                        else {
                            if (Validaciones.formatoCorreo(correoPersonal) || Validaciones.formatoCorreo(correoOtro)) {
                                alertify.error("formato de correo no válido");
                                return false;
                            }

                        }


                        if ((diaNacimiento == null || diaNacimiento == "" || diaNacimiento.length == 0 || diaNacimiento <= 0) ||
                            (mesNacimiento == null || mesNacimiento == "" || mesNacimiento.length == 0 || mesNacimiento <= 0) ||
                            (anioNacimiento == null || anioNacimiento == "" || anioNacimiento <= 0 || anioNacimiento.length == 0)) {
                            alertify.error("Fecha de nacimiento requerido");
                            return false;
                        }
                        else {

                            if (isNaN(diaNacimiento) || diaNacimiento.length > 2) {
                                alertify.error("Fecha de nacimiento no válida");
                                return false;
                            }
                            else {
                                //validar dias validos del més
                                if ((mesNacimiento == "2") && (diaNacimiento > 29 || diaNacimiento <= 0)) {
                                    alertify.error("Fecha de nacimiento no válida");
                                    return false;
                                }
                                else {
                                    if ((mesNacimiento == "4" || mesNacimiento == "6" || mesNacimiento == "9" || mesNacimiento == "11") && (diaNacimiento > 30 || diaNacimiento <= 0)) {
                                        alertify.error("Fecha de nacimiento no válida");
                                        return false;
                                    }
                                    else {
                                        if (diaNacimiento > 31 || diaNacimiento <= 0) {
                                            alertify.error("Fecha de nacimiento no válida");
                                            return false;
                                        }
                                    }
                                }
                            }

                            //validar año de nacimiento
                            var today = new Date();
                            var dd = today.getDate();
                            var mm = today.getMonth() + 1;
                            var yyyy = today.getFullYear();


                            if (isNaN(anioNacimiento) || anioNacimiento.length != 4) {

                                alertify.error("Año de nacimiento no válido");
                                return false;
                            }
                            else {
                                var edadUsuario = yyyy - anioNacimiento;

                                if (edadUsuario >= 18) {
                                    if (edadUsuario == 18) {
                                        if (mm < mesNacimiento) {
                                            alertify.error("Usted es menor de edad");
                                            return false;
                                        }

                                    }
                                }
                                else {
                                    alertify.error("Usted es menor de edad");
                                    return false;
                                }
                            }

                            if (paisNacimiento == null || paisNacimiento == "" || paisNacimiento.length == 0) {
                                alertify.error("País de nacimiento requerido");
                                return false;
                            }


                            if ((paisNacimiento == 2) && ((provinciaNacimiento == null || provinciaNacimiento == "" || provinciaNacimiento <= 0) ||
                                (distritoNacimiento == null || distritoNacimiento == "" || distritoNacimiento <= 0))) {
                                alertify.error("Provincia y Distrito de nacimiento requeridos");
                                return false;
                            }
                            else {
                                if ((nacionalidad == "" || nacionalidad == null) && (paisNacimiento != 2)) {
                                    alertify.error("Al no nacer en Panamá, por favor llene el campo de nacionalidad");
                                    return false;
                                }


                                if ((telefonoResidencia == null || telefonoResidencia == "" || telefonoResidencia.length < 7 || telefonoResidencia == 0) &&
                                    (telefonoOficina == null || telefonoOficina == "" || telefonoOficina.length < 7 || telefonoOficina == 0) &&
                                    (telefonoCelular == null || telefonoCelular == "" || telefonoCelular.length < 8 || telefonoCelular == 0) &&
                                    (telefonoOtros == null || telefonoOtros == "" || telefonoOtros.length < 7 || telefonoOtros == 0)) {
                                    if ((telefonoResidencia.length < 7 && telefonoResidencia.length > 0) || (telefonoOficina.length < 7 && telefonoOficina.length > 0) || (telefonoCelular.length < 8 && telefonoCelular.length > 0) ||
                                        (telefonoOtros.length < 7 && telefonoOtros.length > 0)) {
                                        alertify.error("Número de teléfono no válido");
                                        return false;
                                    }
                                    else {
                                        alertify.error("Necesita llenar al menos 2 números de teléfonos.");
                                        return false;
                                    }


                                }
                                else {

                                    if ((telefonoResidencia != null || telefonoResidencia != "") && ((telefonoOficina == null || telefonoOficina == "") && (telefonoCelular == null || telefonoCelular == "") && (telefonoOtros == null || telefonoOtros == ""))
                                        || (telefonoOficina != null || telefonoOficina != "") && ((telefonoResidencia == null || telefonoResidencia == "") && (telefonoCelular == null || telefonoCelular == "") && (telefonoOtros == null || telefonoOtros == ""))
                                        || (telefonoCelular != null || telefonoCelular != "") && ((telefonoResidencia == null || telefonoResidencia == "") && (telefonoOficina == null || telefonoOficina == "") && (telefonoOtros == null || telefonoOtros == ""))
                                        || (telefonoOtros != null || telefonoOtros != "") && ((telefonoResidencia == null || telefonoResidencia == "") && (telefonoOficina == null || telefonoOficina == "") && (telefonoCelular == null || telefonoCelular == ""))) {
                                        alertify.error("Necesita llenar al menos 2 números de teléfonos.");
                                        return false;
                                    }



                                    if (Validaciones.verificaTelefono(telefonoResidencia) || Validaciones.verificaTelefono(telefonoOficina) || Validaciones.verificaTelefono(telefonoCelular)
                                        || Validaciones.verificaTelefono(telefonoOtros)) {
                                        alertify.error("Número de teléfono no válido")
                                        return false;
                                    }

                                    if ((provinciaDireccion == null || provinciaDireccion == "" || provinciaDireccion <= 0) || (distritoDireccion == null || distritoDireccion == "" || distritoDireccion <= 0) ||
                                        (corregimientoDireccion == null || corregimientoDireccion == "" || corregimientoDireccion <= 0)) {
                                        alertify.error("Provincia, Distrito y Corregimiento de Residencia son requeridos");
                                        return false;
                                    }
                                    else {


                                        if (licencia) {
                                            if (tipoLicencia == null || tipoLicencia == "") {
                                                alertify.error("Por favor seleccione el tipo el licencia que usted tiene");
                                                return false;
                                            }
                                            else {
                                                if (fechaExpiracion == null || fechaExpiracion == "") {
                                                    alertify.error("Por favor indique la fecha de expiración de su licencia");
                                                    return false;
                                                }
                                            }

                                            if (aniosExperiencia.length > 2 || isNaN(aniosExperiencia) && (aniosExperiencia != "" && aniosExperiencia != null)) {
                                                alertify.error("el campo de años de experiencia solo acepta números de 2 dígitos");
                                                return false;
                                            }

                                        }


                                        if (DisponibilidadProvincia) {
                                            if ((ProvinciaDisponible1 == null || ProvinciaDisponible1 == "" || ProvinciaDisponible1.length == 0) &&
                                                (ProvinciaDisponible2 == null || ProvinciaDisponible2 == "" || ProvinciaDisponible2.length == 0) &&
                                                (ProvinciaDisponible3 == null || ProvinciaDisponible3 == "" || ProvinciaDisponible3.length == 0)) {
                                                alertify.error("Indique al menos una provincia en la que podría laborar");
                                                return false;
                                            }
                                            else {
                                                if ((ProvinciaDisponible1 == ProvinciaDisponible2 && ((ProvinciaDisponible1 != "" && ProvinciaDisponible1 != null) && (ProvinciaDisponible2 != "" && ProvinciaDisponible2 != null))) ||
                                                    (ProvinciaDisponible1 == ProvinciaDisponible3 && ((ProvinciaDisponible1 != "" && ProvinciaDisponible1 != null) && (ProvinciaDisponible3 != "" && ProvinciaDisponible3 != null))) ||
                                                    (ProvinciaDisponible2 == ProvinciaDisponible3 && ((ProvinciaDisponible2 != "" && ProvinciaDisponible2 != null) && (ProvinciaDisponible3 != "" && ProvinciaDisponible3 != null)))) {
                                                    alertify.error("Seleccione una provincia distinta en la que podría laborar");
                                                    return false;
                                                }
                                            }
                                        }

                                        if ((sexo == null || sexo == "" || sexo == 0) || (estadoCivil == null || estadoCivil == "" || estadoCivil == 0)) {
                                            alertify.error("Género y estado civil obligatorios ");
                                            return false;
                                        }

                                        //TODO LOS CAMPOS REQUERIDOS VALIDADOS 
                                        var model = {

                                            Query: "Save",
                                            Accion: accion,
                                            IdAspirantre: idAspirantre,
                                            CodigoFila: codigoFila,
                                            ProvinciaCedula: provinciaCedula,
                                            TomoCedula: tomoCedula,
                                            AsientoCedula: asientoCedula,
                                            PrimerNombre: encodeURIComponent(primerNombre),
                                            SegundoNombre: encodeURIComponent(segundoNombre),
                                            ApellidoPaterno: encodeURIComponent(apellidoPaterno),
                                            ApellidoMaterno: encodeURIComponent(apellidoMaterno),
                                            ApellidoCasada: encodeURIComponent(apellidoCasada),
                                            SeguroSocial: encodeURIComponent(seguroSocial),
                                            Sexo: sexo,
                                            EstadoCivil: estadoCivil,
                                            TipoSangre: tipoSangre,
                                            Licencia: licencia,
                                            TipoLicencia: tipoLicencia,
                                            FechaExpiracion: fechaExpiracion,
                                            AniosExperiencia: aniosExperiencia,
                                            Observacion: encodeURIComponent(observacion),
                                            DiaNacimiento: diaNacimiento,
                                            MesNacimiento: mesNacimiento,
                                            AnioNacimiento: anioNacimiento,
                                            PaisNacimiento: paisNacimiento,
                                            ProvinciaNacimiento: provinciaNacimiento,
                                            DistritoNacimiento: distritoNacimiento,
                                            Nacionalidad: encodeURIComponent(nacionalidad),
                                            TelefonoResidencia: telefonoResidencia,
                                            TelefonoOficina: telefonoOficina,
                                            TelefonoCelular: telefonoCelular,
                                            TelefonoOtros: telefonoOtros,
                                            ProvinciaDireccion: provinciaDireccion,
                                            DistritoDireccion: distritoDireccion,
                                            CorregimientoDireccion: corregimientoDireccion,
                                            BarrioDireccion: encodeURIComponent(barrioDireccion),
                                            CasaDireccion: encodeURIComponent(casaDireccion),
                                            AvenidaDireccion: encodeURIComponent(avenidaDireccion),
                                            EdificioDireccion: encodeURIComponent(edificioDireccion),
                                            CalleDireccion: encodeURIComponent(calleDireccion),
                                            Apartamento: encodeURIComponent(apartamento),
                                            CorreoPersonal: encodeURIComponent(correoPersonal),
                                            CorreoOtro: encodeURIComponent(correoOtro),
                                            Pasaporte: encodeURIComponent(pasaporte),
                                            ProvinciaDestino1: ProvinciaDisponible1,
                                            ProvinciaDestino2: ProvinciaDisponible2,
                                            ProvinciaDestino3: ProvinciaDisponible3,
                                            Encuesta: encuesta,
                                            idusuario: ID_USUARIO,
                                            RRHH: rrhh,
                                            AspiranteActivo: Aspactivo,
                                            AspiracionSalarial: AspiracionSalarial,
                                            NegociableHasta: NegociableHasta,
                                            SolicitudEmpleo: checkSolEmpleo
                                        };


                                        // Convierte clase a QueryString
                                        var parametros = $.param(model);
                                        var url = host + "/Formas/Ajax/AjaxAspiranteNuevo.aspx";

                                        $.ajax({

                                            data: parametros,
                                            url: url,
                                            cache: false,
                                            dataType: "json",
                                            success: function (data) {
                                                var resultado = data.Resultado;

                                                if (resultado != "" && resultado != null && resultado != undefined) {
                                                    // Si se ejecuto la insercion o actualizacion muestra mensaje y refresca la pagina

                                                    Funciones.ObtenerObjeto("hdCodigo").val(data.Resultado)
                                                    var siEsNuevoONo = Funciones.ObtenerValor("UsuarioNuevo");
                                                    if (siEsNuevoONo == "" || siEsNuevoONo == null) {
                                                        localStorage.setItem('usuarioNuevo', 'si');
                                                    }

                                                    alertify.alert("Datos salvados correctamente!", function () {

                                                        if (idAspirantre == 0 || idAspirantre == "" || idAspirantre == null) {
                                                            localStorage.setItem('tabActive', 'aspirante');
                                                            localStorage.setItem('aspiranteNuevo', data.Resultado);
                                                            Funciones.ObtenerObjeto('flUpldAdjuntoCedula').val('');
                                                            Funciones.ObtenerObjeto('flUpldAdjuntoLicencia').val('');
                                                            Funciones.ObtenerObjeto('flUpldAdjuntoEducFormal').val('');
                                                            Funciones.ObtenerObjeto('flUpldAdjuntoCursos').val('');
                                                            Funciones.ObtenerObjeto('flUpldAdjuntoIdoneidad').val('');
                                                            location.reload();
                                                        }
                                                        else {
                                                            localStorage.setItem('tabActive', 'aspirante');
                                                            localStorage.setItem('aspiranteNuevo', data.Resultado);
                                                            Funciones.ObtenerObjeto('flUpldAdjuntoCedula').val('');
                                                            Funciones.ObtenerObjeto('flUpldAdjuntoLicencia').val('');
                                                            Funciones.ObtenerObjeto('flUpldAdjuntoEducFormal').val('');
                                                            Funciones.ObtenerObjeto('flUpldAdjuntoCursos').val('');
                                                            Funciones.ObtenerObjeto('flUpldAdjuntoIdoneidad').val('');
                                                            location.reload();

                                                        }


                                                    });
                                                }
                                                else {
                                                    // Si hubo error al guardar o actualizar manda mensaje
                                                    alertify.error(resultado);
                                                }
                                            },
                                            error: function ajaxError(data, status, err) {
                                                alertify.error(Mensajes.ErrorGetData());
                                            }

                                        });
                                    }

                                }

                            }
                        }

                    }
                }
                else {
                    alertify.error("Primer nombre requerido");
                    return false;
                }

            }
            else {
                Funciones.MensajeError("Cédula requerida");
                return false;
            }
        }
        else  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// validaciones para los de rrhh
        {

            var referido = Funciones.ObtenerValor("ddlReferido");
            var regional = Funciones.ObtenerValor("ddlRegional");

            if (referido == null || referido == "" || referido.length == 0) {
                alertify.error("Referido requerido");
                return false;
            }

            if (regional == null || regional == "" || regional.length == 0) {
                alertify.error("Provincia Regional Requerida");
                return false;
            }

            var chekiadoEncuesta = document.getElementById('EncuestasDisponibleSI_rrhh').checked;
            if (chekiadoEncuesta) {
                var encuesta = true
            }
            else {
                var encuesta = false
            }

            //validaciones para que la cédula sea llenada completa o se deja completamente en blanco

            if ((provinciaCedula != null && provinciaCedula != "" && provinciaCedula != 0) &&
                (tomoCedula == null || tomoCedula == "" || tomoCedula == 0) &&
                (asientoCedula == null || asientoCedula == "" || asientoCedula == 0)) {
                alertify.error("La cédula debe ser en blanco o toda completa");
                return false;
            }

            if ((provinciaCedula != null && provinciaCedula != "" && provinciaCedula != 0) &&
                (tomoCedula != null && tomoCedula != "" && tomoCedula != 0) &&
                (asientoCedula == null || asientoCedula == "" || asientoCedula == 0)) {
                alertify.error("La cédula debe ser en blanco o toda completa es válida");
                return false;
            }

            if ((provinciaCedula == null || provinciaCedula == "" || provinciaCedula == 0) &&
               (tomoCedula != null && tomoCedula != "" && tomoCedula != 0) &&
               (asientoCedula == null || asientoCedula == "" || asientoCedula == 0)) {
                alertify.error("La cédula debe ser en blanco o toda completa");
                return false;
            }

            if ((provinciaCedula == null || provinciaCedula == "" || provinciaCedula == 0) &&
               (tomoCedula != null && tomoCedula != "" && tomoCedula != 0) &&
               (asientoCedula != null && asientoCedula != "" && asientoCedula != 0)) {
                alertify.error("La cédula debe ser en blanco o toda completa");
                return false;
            }

            if ((provinciaCedula == null || provinciaCedula == "" || provinciaCedula == 0) &&
             (tomoCedula == null || tomoCedula == "" || tomoCedula == 0) &&
             (asientoCedula != null && asientoCedula != "" && asientoCedula != 0)) {
                alertify.error("La cédula debe ser en blanco o toda completa");
                return false;
            }

            if ((provinciaCedula != null && provinciaCedula != "" && provinciaCedula != 0) &&
           (tomoCedula == null || tomoCedula == "" || tomoCedula == 0) &&
           (asientoCedula != null && asientoCedula != "" && asientoCedula != 0)) {
                alertify.error("La cédula debe ser en blanco o toda completa");
                return false;
            }


            if (primerNombre != null && primerNombre != "" && primerNombre.length > 0) {

                if (Validaciones.formatoCorreo(correoPersonal) || Validaciones.formatoCorreo(correoOtro)) {
                    alertify.error("formato de correo no válido");
                    return false;
                }

                if (!((diaNacimiento == null || diaNacimiento == "" || diaNacimiento.length == 0 || diaNacimiento <= 0) ||
                            (mesNacimiento == null || mesNacimiento == "" || mesNacimiento.length == 0 || mesNacimiento <= 0) ||
                            (anioNacimiento == null || anioNacimiento == "" || anioNacimiento <= 0 || anioNacimiento.length == 0))) {

                    if (isNaN(diaNacimiento) || diaNacimiento.length > 2) {
                        alertify.error("Fecha de nacimiento no válida");
                        return false;
                    }
                    else {
                        //validar dias validos del més
                        if ((mesNacimiento == "2") && (diaNacimiento > 29 || diaNacimiento <= 0)) {
                            alertify.error("Fecha de nacimiento no válida");
                            return false;
                        }
                        else {
                            if ((mesNacimiento == "4" || mesNacimiento == "6" || mesNacimiento == "9" || mesNacimiento == "11") && (diaNacimiento > 30 || diaNacimiento <= 0)) {
                                alertify.error("Fecha de nacimiento no válida");
                                return false;
                            }
                            else {
                                if (diaNacimiento > 31 || diaNacimiento <= 0) {
                                    alertify.error("Fecha de nacimiento no válida");
                                    return false;
                                }
                            }
                        }
                    }

                    //validar año de nacimiento
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth() + 1;
                    var yyyy = today.getFullYear();


                    if (isNaN(anioNacimiento) || anioNacimiento.length != 4) {

                        alertify.error("Año de nacimiento no válido");
                        return false;
                    }
                    else {
                        var edadUsuario = yyyy - anioNacimiento;

                        if (edadUsuario >= 18) {
                            if (edadUsuario == 18) {
                                if (mm < mesNacimiento) {
                                    alertify.error("Está registrando un menor de edad");
                                    return false;
                                }

                            }
                        }
                        else {
                            alertify.error("Está registrando un menor de edad");
                            return false;
                        }
                    }

                }

                if ((telefonoResidencia.length < 7 && telefonoResidencia.length > 0) || (telefonoOficina.length < 7 && telefonoOficina.length > 0) || (telefonoCelular.length < 8 && telefonoCelular.length > 0) ||
                                       (telefonoOtros.length < 7 && telefonoOtros.length > 0)) {
                    alertify.error("Número de teléfono no válido");
                    return false;
                }


                if (Validaciones.verificaTelefono(telefonoResidencia) || Validaciones.verificaTelefono(telefonoOficina) || Validaciones.verificaTelefono(telefonoCelular)
                    || Validaciones.verificaTelefono(telefonoOtros)) {
                    alertify.error("Número de teléfono no válido")
                    return false;
                }

                if (licencia) {
                    if (tipoLicencia == null || tipoLicencia == "") {
                        //alertify.error("Por favor seleccione el tipo el licencia que usted tiene");
                        //return false;
                    }
                    else {
                        //if (fechaExpiracion == null || fechaExpiracion == "") {
                        //    alertify.error("Por favor indique la fecha de expiración de su licencia");
                        //    return false;
                        //}
                    }

                    if (aniosExperiencia.length > 2 || isNaN(aniosExperiencia) && (aniosExperiencia != "" && aniosExperiencia != null)) {
                        alertify.error("el campo de años de experiencia solo acepta números de 2 dígitos");
                        return false;
                    }

                }

                var modelValida = {
                    Query: "AspiranteDoble",
                    IdAspirantre: idAspirantre,
                    ProvinciaCedula: provinciaCedula,
                    TomoCedula: tomoCedula,
                    AsientoCedula: asientoCedula
                }

                var valida = false;
                /*
                valida primero si el aspirante ya existe antes de grabar
                Por alguna razón el JS ejecutaba las sentencias que iban debajo del ajax que validaba el registro repetido y luego ejecutaba la validación(si fue raro)
                Bueno lo solucioné con el if loco este de aqui abajo  :D 
                */
                if (((provinciaCedula != null && provinciaCedula != "" && provinciaCedula != 0) &&
                    (tomoCedula != null && tomoCedula != "" && tomoCedula != 0) &&
                    (asientoCedula != null && asientoCedula != "" && asientoCedula != 0)) ||
                    ((idAspirantre == null || idAspirantre == "" || idAspirantre == 0) ||
                    (idAspirantre != null && idAspirantre != "" && idAspirantre != 0))) {
                    // Convierte clase a QueryString
                    var parametrosValida = $.param(modelValida);
                    var url = host + "/Formas/Ajax/AjaxAspiranteNuevo.aspx";

                    $.ajax({

                        data: parametrosValida,
                        url: url,
                        cache: false,
                        dataType: "json",
                        success: function (data) {
                            var resultado = data.RegistroRepetido;
                            valida = resultado;
                            if (valida) {
                                alertify.error("Ya existe un aspirante con esta cédula en la base de datos");
                                return false;
                            }
                            else {
                                //TODO LOS CAMPOS REQUERIDOS VALIDADOS 
                                var model = {

                                    Query: "Save",
                                    Accion: accion,
                                    IdAspirantre: idAspirantre,
                                    CodigoFila: codigoFila,
                                    ProvinciaCedula: provinciaCedula,
                                    TomoCedula: tomoCedula,
                                    AsientoCedula: asientoCedula,
                                    PrimerNombre: encodeURIComponent(primerNombre),
                                    SegundoNombre: encodeURIComponent(segundoNombre),
                                    ApellidoPaterno: encodeURIComponent(apellidoPaterno),
                                    ApellidoMaterno: encodeURIComponent(apellidoMaterno),
                                    ApellidoCasada: encodeURIComponent(apellidoCasada),
                                    SeguroSocial: encodeURIComponent(seguroSocial),
                                    Sexo: sexo,
                                    EstadoCivil: estadoCivil,
                                    TipoSangre: tipoSangre,
                                    Licencia: licencia,
                                    TipoLicencia: tipoLicencia,
                                    FechaExpiracion: fechaExpiracion,
                                    AniosExperiencia: aniosExperiencia,
                                    Observacion: encodeURIComponent(observacion),
                                    DiaNacimiento: diaNacimiento,
                                    MesNacimiento: mesNacimiento,
                                    AnioNacimiento: anioNacimiento,
                                    PaisNacimiento: paisNacimiento,
                                    ProvinciaNacimiento: provinciaNacimiento,
                                    DistritoNacimiento: distritoNacimiento,
                                    Nacionalidad: encodeURIComponent(nacionalidad),
                                    TelefonoResidencia: telefonoResidencia,
                                    TelefonoOficina: telefonoOficina,
                                    TelefonoCelular: telefonoCelular,
                                    TelefonoOtros: telefonoOtros,
                                    ProvinciaDireccion: provinciaDireccion,
                                    DistritoDireccion: distritoDireccion,
                                    CorregimientoDireccion: corregimientoDireccion,
                                    BarrioDireccion: encodeURIComponent(barrioDireccion),
                                    CasaDireccion: encodeURIComponent(casaDireccion),
                                    AvenidaDireccion: encodeURIComponent(avenidaDireccion),
                                    EdificioDireccion: encodeURIComponent(edificioDireccion),
                                    CalleDireccion: encodeURIComponent(calleDireccion),
                                    Apartamento: encodeURIComponent(apartamento),
                                    CorreoPersonal: encodeURIComponent(correoPersonal),
                                    CorreoOtro: encodeURIComponent(correoOtro),
                                    Pasaporte: encodeURIComponent(pasaporte),
                                    ProvinciaDestino1: ProvinciaDisponible1,
                                    ProvinciaDestino2: ProvinciaDisponible2,
                                    ProvinciaDestino3: ProvinciaDisponible3,
                                    Encuesta: encuesta,
                                    Referido: referido,
                                    Regional: regional,
                                    idusuario: ID_USUARIO,
                                    RRHH: rrhh,
                                    fecha_referencia: fecha_referencia,
                                    detalle_referido: detalle_referido,
                                    RH_referenciadate: RH_referenciadate,
                                    RH_entradas: RH_entradas,
                                    fecha_entradaDept: fecha_entradaDept,
                                    archivadoen: archivadoen,
                                    fecha_encuesta: fecha_encuesta,
                                    AspiranteActivo: Aspactivo,
                                    AspiracionSalarial: AspiracionSalarial,
                                    NegociableHasta: NegociableHasta,
                                    SolicitudEmpleo: checkSolEmpleo
                                };

                                // Convierte clase a QueryString
                                var parametros = $.param(model);
                                var url = host + "/Formas/Ajax/AjaxAspiranteNuevo.aspx";

                                $.ajax({

                                    data: parametros,
                                    url: url,
                                    cache: false,
                                    dataType: "json",
                                    success: function (data) {
                                        var resultado = data.Resultado;

                                        if (resultado != "" && resultado != null && resultado != undefined) {
                                            // Si se ejecuto la insercion o actualizacion muestra mensaje y refresca la pagina

                                            Funciones.ObtenerObjeto("hdCodigo").val(data.Resultado)
                                            var siEsNuevoONo = Funciones.ObtenerValor("UsuarioNuevo");
                                            if (siEsNuevoONo == "" || siEsNuevoONo == null) {
                                                localStorage.setItem('usuarioNuevo', 'si');
                                            }

                                            alertify.alert("Datos salvados correctamente!", function () {

                                                if (idAspirantre == 0 || idAspirantre == "" || idAspirantre == null) {
                                                    localStorage.setItem('tabActive', 'aspirante');
                                                    localStorage.setItem('aspiranteNuevo', data.Resultado);
                                                    //alertify.success("Puede proceder a registrar las vacantes de Contraloría a las que usted aspira y demás información")
                                                    location.reload();
                                                }
                                                else {
                                                    localStorage.setItem('tabActive', 'aspirante');
                                                    localStorage.setItem('aspiranteNuevo', data.Resultado);
                                                    //alertify.success("Puede proceder a registrar las vacantes de Contraloría a las que usted aspira y demás información")
                                                    location.reload();
                                                }


                                            });
                                        }
                                        else {
                                            // Si hubo error al guardar o actualizar manda mensaje
                                            alertify.error(resultado);
                                        }
                                    },
                                    error: function ajaxError(data, status, err) {
                                        alertify.error(Mensajes.ErrorGetData());
                                    }

                                });
                            }
                        },
                        error: function ajaxError(data, status, err) {
                            alertify.error(Mensajes.ErrorGetData());
                        }

                    });
                }





            }
            else {
                alertify.error("Primer nombre requerido");
                return false;
            }
        }




    });


    //////////////////////////////////////////////////////////////////////////////////////////////////// BOTÓN CARGAR ASPIRANTE
    var botonCargar = Funciones.ObtenerObjeto("btnAspiranteCargar");

    // oCULTAR BOTON DE CARGAR USUARIO
    botonCargar.addClass('Oculto');

    botonCargar.click(function () {
        var provinciaCedula = Funciones.ObtenerValor("txtCedProvincia");
        var tomoCedula = Funciones.ObtenerValor("txtCedTomo");
        var asientoCedula = Funciones.ObtenerValor("txtCedAsiento");
        var referido = Funciones.ObtenerValor("ddlReferido");
        var regional = Funciones.ObtenerValor("ddlRegional");

        if (referido == null || referido == "" || referido.length == 0) {
            alertify.error("Referido requerido, HAGA EL CAMBIO Y GUARDE, ANTES DE UTILIZAR EL BOTÓN CARGAR");
            return false;
        }

        if (regional == null || regional == "" || regional.length == 0) {
            alertify.error("Provincia Regional requerida, HAGA EL CAMBIO Y GUARDE, ANTES DE UTILIZAR EL BOTÓN CARGAR");
            return false;
        }

        //validaciones para que la cédula sea llenada completa o se deja completamente en blanco

        if ((provinciaCedula != null && provinciaCedula != "" && provinciaCedula != 0) &&
            (tomoCedula == null || tomoCedula == "" || tomoCedula == 0) &&
            (asientoCedula == null || asientoCedula == "" || asientoCedula == 0)) {
            alertify.error("La cédula debe ser en blanco o toda completa, HAGA EL CAMBIO Y GUARDE, ANTES DE UTILIZAR EL BOTÓN CARGAR");
            return false;
        }

        if ((provinciaCedula != null && provinciaCedula != "" && provinciaCedula != 0) &&
            (tomoCedula != null && tomoCedula != "" && tomoCedula != 0) &&
            (asientoCedula == null || asientoCedula == "" || asientoCedula == 0)) {
            alertify.error("La cédula debe ser en blanco o toda completa es válida, HAGA EL CAMBIO Y GUARDE, ANTES DE UTILIZAR EL BOTÓN CARGAR");
            return false;
        }

        if ((provinciaCedula == null || provinciaCedula == "" || provinciaCedula == 0) &&
           (tomoCedula != null && tomoCedula != "" && tomoCedula != 0) &&
           (asientoCedula == null || asientoCedula == "" || asientoCedula == 0)) {
            alertify.error("La cédula debe ser en blanco o toda completa, HAGA EL CAMBIO Y GUARDE, ANTES DE UTILIZAR EL BOTÓN CARGAR");
            return false;
        }

        if ((provinciaCedula == null || provinciaCedula == "" || provinciaCedula == 0) &&
           (tomoCedula != null && tomoCedula != "" && tomoCedula != 0) &&
           (asientoCedula != null && asientoCedula != "" && asientoCedula != 0)) {
            alertify.error("La cédula debe ser en blanco o toda completa, HAGA EL CAMBIO Y GUARDE, ANTES DE UTILIZAR EL BOTÓN CARGAR");
            return false;
        }

        if ((provinciaCedula == null || provinciaCedula == "" || provinciaCedula == 0) &&
         (tomoCedula == null || tomoCedula == "" || tomoCedula == 0) &&
         (asientoCedula != null && asientoCedula != "" && asientoCedula != 0)) {
            alertify.error("La cédula debe ser en blanco o toda completa, HAGA EL CAMBIO Y GUARDE, ANTES DE UTILIZAR EL BOTÓN CARGAR");
            return false;
        }

        if ((provinciaCedula != null && provinciaCedula != "" && provinciaCedula != 0) &&
       (tomoCedula == null || tomoCedula == "" || tomoCedula == 0) &&
       (asientoCedula != null && asientoCedula != "" && asientoCedula != 0)) {
            alertify.error("La cédula debe ser en blanco o toda completa, HAGA EL CAMBIO Y GUARDE, ANTES DE UTILIZAR EL BOTÓN CARGAR");
            return false;
        }

        var model = {
            Query: "Cargar",
            IdAspirantre: idAspirantre,
        }
        // Convierte clase a QueryString
        var parametros = $.param(model);
        var url = host + "/Formas/Ajax/AjaxAspiranteNuevo.aspx";

        $.ajax({
            data: parametros,
            url: url,
            cache: false,
            dataType: "json",
            success: function (data) {
                if (data.Resultado = "ok") {
                    alertify.alert("Datos cargados correctamente!", function () {
                        localStorage.setItem('tabActive', 'aspirante');
                        location.reload();

                    });
                }
                else {
                    alertify.error("Error cargando los datos del aspirante");

                }

            },
            error: function ajaxError(data, status, err) {
                alertify.error(Mensajes.ErrorGetData());
            }
        });


    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////////// TAB DE ESTUDIOS

    var IdoneoSI = Funciones.ObtenerObjeto("IdoneoSI");
    var IdoneoNO = Funciones.ObtenerObjeto("IdoneoNO");
    var IdoneoSIEdit = Funciones.ObtenerObjeto("IdoneoSIEdit");
    var IdoneoNOEdit = Funciones.ObtenerObjeto("IdoneoNOEdit");


    IdoneoSI.click(function () {
        Funciones.ObtenerObjeto("dvNumIdoneidad").removeClass("Oculto");
    });

    IdoneoNO.click(function () {
        Funciones.ObtenerObjeto("dvNumIdoneidad").addClass("Oculto");
        Funciones.ObtenerObjeto("numeroIdoneidadTxt").val("");
    });

    IdoneoSIEdit.click(function () {
        Funciones.ObtenerObjeto("dvNumIdoneidad_edit").removeClass("Oculto");
    });

    IdoneoNOEdit.click(function () {
        Funciones.ObtenerObjeto("dvNumIdoneidad_edit").addClass("Oculto");
        Funciones.ObtenerObjeto("txtNumeroIdoneidad_edit").val("");
    });


    var numeroIdoneidadTxt = Funciones.ObtenerObjeto("numeroIdoneidadTxt");
    var txtNumeroIdoneidad_edit = Funciones.ObtenerObjeto("txtNumeroIdoneidad_edit");

    numeroIdoneidadTxt.keyup(function () {
        //-----    /^[a-zA-Z0-9]*$/ para quitar el guión
        var regex = /^[a-zA-Z0-9-]*$/;
        var input = $(this).val();

        if (!regex.test(input)) {
            // Si se ingresó un carácter no válido, se elimina del campo
            //-----  /[^a-zA-Z0-9]/g, para quitar el guión
            $(this).val(input.replace(/[^a-zA-Z0-9-]/g, ''));
        }
    });


    txtNumeroIdoneidad_edit.keyup(function () {
        //-----    /^[a-zA-Z0-9]*$/ para quitar el guión
        var regex = /^[a-zA-Z0-9-]*$/;
        var input = $(this).val();

        if (!regex.test(input)) {
            // Si se ingresó un carácter no válido, se elimina del campo
            //-----  /[^a-zA-Z0-9]/g, para quitar el guión
            $(this).val(input.replace(/[^a-zA-Z0-9-]/g, ''));
        }
    });


    //-------------------------------------------------------------------------------- NUEVO REGISTRO DE ESTUDIO
    var botonAgregarEstudios = Funciones.ObtenerObjeto("BtnIngresarEstudio");

    botonAgregarEstudios.click(function () {
        var TablaEstudios = Funciones.ObtenerObjeto("tblEstudios");

        var Titulotxt = Funciones.ObtenerObjeto("txtTitulo").val();
        var Nivelddl = $("[id*='ddlNivel'] :selected").text();
        var idNivel = Funciones.ObtenerObjeto("ddlNivel").val(); //obtener el id de la opción seleccionada

        var especialidadTxt = Funciones.ObtenerObjeto("txtEspecialidad").val();
        var ddlStatus = $("[id*='ddlStatus'] :selected").text();
        var idStatus = Funciones.ObtenerObjeto("ddlStatus").val(); //obtener el id de la opción seleccionada
        var CentroEducativo = Funciones.ObtenerObjeto("CentroEducativoTxt").val();
        var id_TcAspirante = Funciones.ObtenerValor("id_tcAspirante");
        var rrhh = Funciones.ObtenerValor("hdRRHH");
        var numeroIdoneidad = Funciones.ObtenerValor("numeroIdoneidadTxt");

        if (idNivel == "") {
            Nivelddl = "";
        }
        if (idStatus == "") {
            ddlStatus = "";
        }
        if (document.getElementById('IdoneoSI').checked) {
            var checkIdoneoSI = "Posee Idoneidad";
            var checkado = Funciones.ObtenerObjeto("IdoneoSI").val();

        }
        else {
            var checkIdoneoSI = "No Posee Idoneidad";
            var checkado = Funciones.ObtenerObjeto("IdoneoNO").val();
        }


        var nFilas = $("#tblEstudios tr").length;
        var fila = "<tr><td>"

        if ((Titulotxt == "" || Titulotxt == null) || (idStatus == "" || idStatus == null)) {
            alertify.error("EL título y el estatus son requeridos.");
        }
        else {

            if (checkado && numeroIdoneidad.length <= 0)
            {
                alertify.error("Especifique el número de idoneidad");
            }
            else
            {
                //var idAspirantre = Funciones.ObtenerValor("hdCodigo");
                var model = {
                    Titulo: encodeURIComponent(Titulotxt),
                    Nivel: idNivel,
                    Especialidad: encodeURIComponent(especialidadTxt),
                    Status: idStatus,
                    Idoneo: checkado,
                    CentroEducativo: encodeURIComponent(CentroEducativo),
                    Query: "Estudios",
                    AccionEstudio: "Insert",
                    IdAspirantre: idAspirantre,
                    IdEstudio: "0",
                    RRHH: rrhh,
                    ID_TcAspirante: id_TcAspirante,
                    NumIdoneidad: numeroIdoneidad
                }
                localStorage.setItem('aspiranteNuevo', idAspirantre);
                // Convierte clase a QueryString  AjaxEstudios  AjaxAspiranteNuevo
                var parametros = $.param(model);
                var url = host + "/Formas/Ajax/AjaxEstudios.aspx";

                $.ajax({

                    data: parametros,
                    url: url,
                    cache: false,
                    dataType: "json",
                    success: function (data) {
                        var resultado = data.Resultado;

                        if (resultado != "" && resultado != null && resultado != undefined) {
                            // Si se ejecuto la insercion o actualizacion muestra mensaje 
                            var datos = data.Datos[0];
                            var idFilaEstudio = datos.Id_Estudios;
                            var aspirante = datos.Id_SolicitudAspirante
                            // Calcula cantidad de filas
                            var cantidad = parseInt($("#CantidadEstudios").val());
                            cantidad = cantidad + 1;
                            $("#CantidadEstudios").val(cantidad);

                            var tituloModal = "Editar Estudio";
                            var idModal = "dvModalFormEstudios";

                            var siEsNuevoONo = Funciones.ObtenerValor("UsuarioNuevo");
                            if (siEsNuevoONo == "" || siEsNuevoONo == null) {
                                localStorage.setItem('usuarioNuevo', 'si');
                            }
                            // Limpia los campos
                            Funciones.ObtenerObjeto("txtTitulo").val("");
                            Funciones.ObtenerObjeto("ddlNivel").val("");
                            Funciones.ObtenerObjeto("txtEspecialidad").val("");
                            Funciones.ObtenerObjeto("ddlStatus").val("");
                            document.getElementById('IdoneoSI').checked = false
                            document.getElementById('IdoneoNO').checked = false

                            Funciones.ObtenerObjeto("CentroEducativoTxt").val("");
                            //Los datos fueron guardados con éxito
                            alertify.alert("Estudio añadido correctamente!", function () {
                                localStorage.setItem('aspiranteNuevo', idAspirantre);
                                localStorage.setItem('tabActive', 'estudios');
                                location.reload();
                            });

                        }
                        else {
                            // Si hubo error al guardar o actualizar manda mensaje
                            alertify.error(Mensajes.ErrorSaveData("error salvando los datos"));
                        }
                    },
                    error: function ajaxError(data, status, err) {
                        alertify.error(Mensajes.ErrorGetData());
                    }


                });
            }

           

        }


    });



    //---------------------------------------------------------------------------------al abrir el modal de edición estudios---------------------------------------------



    $('#dvModalFormEstudios').on('show.bs.modal', function (e) {
        //AjaxEstudios AjaxAspiranteNuevo
        var url = host + "/Formas/Ajax/AjaxEstudios.aspx";

        // Usa ajax para buscar datos del registro

        $.ajax({
            url: url,
            cache: false,
            data: { Query: "consultaEstudio", Codigo: Funciones.ObtenerValor("hdCodigoFila") },
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success:
                function (data) {

                    if (data != null && data != undefined) {
                        if (data.Resultado == "ok") {
                            var datos = data.Datos[0];
                            Funciones.ObtenerObjeto("TituloTxtEdit").val(datos.Titulo);
                            Funciones.ObtenerObjeto("NivelDDLEdit").val(datos.Id_GradoEstudio);
                            Funciones.ObtenerObjeto("EspecialidadTxtEdit").val(datos.Especialidad);
                            Funciones.ObtenerObjeto("ddlStatusEdit").val(datos.Id_EstatusEstudio);

                            if (datos.Idoneidad) {
                                $('#IdoneoSIEdit').prop('checked', true);
                                Funciones.ObtenerObjeto("txtNumeroIdoneidad_edit").val(datos.NumeroIdoneidad);
                                Funciones.ObtenerObjeto("dvNumIdoneidad_edit").removeClass("Oculto");
                            }
                            else {
                                $('#IdoneoNOEdit').prop('checked', true);
                                Funciones.ObtenerObjeto("txtNumeroIdoneidad_edit").val("");
                                Funciones.ObtenerObjeto("dvNumIdoneidad_edit").addClass("Oculto");
                            }

                            Funciones.ObtenerObjeto("CentroEducativoEdit").val(datos.Centro_Educativo);

                            var TituloTxtEdit = Funciones.ObtenerObjeto("TituloTxtEdit");
                            var EspecialidadTxtEdit = Funciones.ObtenerObjeto("EspecialidadTxtEdit");
                            var CentroEducativoEdit = Funciones.ObtenerObjeto("CentroEducativoEdit");

                            TituloTxtEdit.change();
                            EspecialidadTxtEdit.change();
                            CentroEducativoEdit.change();

                        }
                        else {
                            alertify.error("data.Resultado = No ok")
                        }

                    }
                },
            error: function ajaxError(data, status, err) {
                alertify.error(Mensajes.ErrorGetData());
            }

        });


    });

    $('#dvModalFormCargos').on('show.bs.modal', function (e) {

        var table = $('#tblObjetivos_Ver').DataTable();
        $('#modal-content').css('display', 'block');
        table.columns.adjust().draw();

        var tablRequisitos = $('#tblRequisitos_Ver').DataTable();
        $('#modal-content').css('display', 'block');
        tablRequisitos.columns.adjust().draw();
    })



    /////////////////////////////////////////////////////////////////////////////////////////////////// EDITAR UN REGISTRO DE ESTUDIOS

    var botonGuardarEditEstudios = Funciones.ObtenerObjeto("btnGuardarEditEstudios");

    botonGuardarEditEstudios.click(function () {

        var TablaEstudios = Funciones.ObtenerObjeto("tblEstudios");

        var Titulotxt = Funciones.ObtenerObjeto("TituloTxtEdit").val();
        var Nivelddl = $("[id*='NivelDDLEdit'] :selected").text();
        var idNivel = Funciones.ObtenerObjeto("NivelDDLEdit").val(); //obtener el id de la opción seleccionada

        var especialidadTxt = Funciones.ObtenerObjeto("EspecialidadTxtEdit").val();
        var ddlStatus = $("[id*='ddlStatusEdit'] :selected").text();
        var idStatus = Funciones.ObtenerObjeto("ddlStatusEdit").val(); //obtener el id de la opción seleccionada
        var CentroEducativo = Funciones.ObtenerObjeto("CentroEducativoEdit").val();
        var rrhh = Funciones.ObtenerValor("hdRRHH");
        var id_TcAspirante = Funciones.ObtenerValor("id_tcAspirante");
        var numeroIdoneidad = Funciones.ObtenerValor("txtNumeroIdoneidad_edit");

        if (idNivel == "") {
            Nivelddl = "";
        }
        if (idStatus == "") {
            ddlStatus = "";
        }
        if (document.getElementById('IdoneoSIEdit').checked) {
            var checkIdoneoSI = "Posee Idoneidad";
            var checkado = Funciones.ObtenerObjeto("IdoneoSIEdit").val();

        }
        else {
            var checkIdoneoSI = "No Posee Idoneidad";
            var checkado = Funciones.ObtenerObjeto("IdoneoNOEdit").val();
        }

        if ((Titulotxt == "" || Titulotxt == null) || (idStatus == "" || idStatus == null)) {
            alertify.error("EL título y el estatus son requeridos.");
        }
        else {

            if (checkado && numeroIdoneidad.length <= 0) {
                alertify.error("Especifique el número de idoneidad");
            }
            else
            {
                var idEstudio = Funciones.ObtenerValor("hdCodigoFila");
                var model = {

                    Titulo: Titulotxt,
                    Nivel: idNivel,
                    Especialidad: especialidadTxt,
                    Status: idStatus,
                    Idoneo: checkado,
                    CentroEducativo: encodeURIComponent(CentroEducativo),
                    Query: "Estudios",
                    AccionEstudio: "update",
                    IdAspirantre: idAspirantre,
                    IdEstudio: idEstudio,
                    RRHH: rrhh,
                    ID_TcAspirante: id_TcAspirante,
                    NumIdoneidad: numeroIdoneidad
                }

                // Convierte clase a QueryString
                var parametros = $.param(model);
                //AjaxEstudios AjaxAspiranteNuevo
                var url = host + "/Formas/Ajax/AjaxEstudios.aspx";

                $.ajax({

                    data: parametros,
                    url: url,
                    cache: false,
                    dataType: "json",
                    success: function (data) {
                        var resultado = data.Resultado;

                        if (resultado != "" && resultado != null && resultado != undefined) {

                            alertify.alert("Datos salvados correctamente!", function () {
                                localStorage.setItem('aspiranteNuevo', idAspirantre);
                                localStorage.setItem('tabActive', 'estudios');
                                location.reload();
                            });

                        }
                        else {
                            // Si hubo error al guardar o actualizar manda mensaje
                            alertify.error(Mensajes.ErrorSaveData("error actualizando"));
                        }
                    },
                    error: function ajaxError(data, status, err) {
                        alertify.error(Mensajes.ErrorGetData());
                    }


                });
            }

            
        }

    });

    //------------------------------------------------------------------------------------------------------------------------------------- Tab de cargos


    //------------------------------------------------------------------TABLA DE REQUISITOS ---------------------------------------------------------------

    function AgregarFormatoTablaRequisitos(idTabla, ajaxData, columns) {
        // Crea el array de columnas
        var colData = [];
        fLen = columns.length;

        // Carga las columnas que selecciono el usuario
        for (i = 0; i < fLen; i++) {
            colData.push({ "data": columns[i] });
        }


        // Inicia DataTable
        var table = $('#' + idTabla).DataTable({
            "processing": true,
            "ajax": host + ajaxData,
            "columns": colData,
            "ordering": false,
            "deferRender": true,
            "searching": false,
            "paging": false,
            "info": false,
            "scroller": true,
            "scrollY": "300px",
            "scrollX": true,
            "scrollCollapse": true,
            "columnDefs": [
                  {

                      className: "col-lg-10", "targets": [0],
                      className: "col-md-10", "targets": [0],
                      className: "col-sm-10", "targets": [0],
                      className: "col-xs-10", "targets": [0]
                      ,
                      //render: function (data, type, full, meta) {
                      //    return "<div class='text-wrap width-100'>" + data + "</div>";
                      //},

                      targets: [0]


                  },
                  { "orderable": false, "targets": 0 }

            ],
            "bDestroy": true,
            "cache": false,
            "language": {
                "processing": "Cargando...",
                "zeroRecords": " ",
                "infoEmpty": " ",
            }
        });
    }


    //Al hacer selección de un cargo disponible cargar objetivos y los cargos del mismo
    var cargoDisponible = Funciones.ObtenerObjeto("ddlCargoDisponible");
    //AjaxCargos AjaxAspiranteNuevo
    var url = host + "/Formas/Ajax/AjaxCargos.aspx";
    cargoDisponible.change(function () {
        var seleccion = $(this).val();

        Funciones.ObtenerObjeto("ddlCargoCGR").val("")
        Funciones.ObtenerObjeto("salarioTxt").val("")
        if (seleccion != "") {

            // Usa ajax para buscar Objetivo
            var columnaObjetivo = ["ObjetivoCargo"];
            AgregarFormatoTablaRequisitos("tblObjetivos", "/Formas/Ajax/AjaxCargos.aspx?Query=consultaObjetivoCargo&idCargo=" + seleccion, columnaObjetivo)

            // Usa ajax para buscar Requisitos
            var columnaRequisito = ["Requisito"];
            AgregarFormatoTablaRequisitos("tblRequisitos", "/Formas/Ajax/AjaxCargos.aspx?Query=consultaRequisitoCargo&idCargo=" + seleccion, columnaRequisito)


            // para mostrar el salario
            $.ajax({
                url: url,
                cache: false,
                data: { Query: "consultaSalario", idCargo: seleccion },
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success:
                    function (data) {
                        var datos = data.Datos[0];

                        //complementa el formato de dinero
                        var salario = parseFloat(datos.salario).toFixed(2);
                        var campoSalarioVacante = Funciones.ObtenerObjeto("salarioTxt")
                        campoSalarioVacante.autoNumeric('set', salario);

                    },
                error: function ajaxError(data, status, err) {
                    alertify.error(Mensajes.ErrorGetData());
                }

            });

        }
        else {

            var table = $('#tblObjetivos').DataTable();

            table
                .clear()
                .draw();

            var tableR = $('#tblRequisitos').DataTable();

            tableR
                .clear()
                .draw();
            Funciones.ObtenerObjeto("ddlCargoCGR").val("")
        }
    });



    //Al hacer selección de un cargo CGR cargar objetivos y los requisitos del mismo
    var cargoCGR = Funciones.ObtenerObjeto("ddlCargoCGR");
    //AjaxCargos AjaxAspiranteNuevo
    var url = host + "/Formas/Ajax/AjaxCargos.aspx";
    cargoCGR.change(function () {
        var seleccion = $(this).val();
        Funciones.ObtenerObjeto("ddlCargoDisponible").val("")
        Funciones.ObtenerObjeto("salarioTxt").val("")
        if (seleccion != "") {


            // Usa ajax para buscar Objetivo
            var columnaObjetivo = ["ObjetivoCargo"];
            AgregarFormatoTablaRequisitos("tblObjetivos", "/Formas/Ajax/AjaxCargos.aspx?Query=consultaObjetivoCargo&idCargo=" + seleccion, columnaObjetivo)


            // Usa ajax para buscar Requisitos
            var columnaRequisito = ["Requisito"];
            AgregarFormatoTablaRequisitos("tblRequisitos", "/Formas/Ajax/AjaxCargos.aspx?Query=consultaRequisitoCargo&idCargo=" + seleccion, columnaRequisito)

            // para mostrar el salario
            $.ajax({
                url: url,
                cache: false,
                data: { Query: "consultaSalario", idCargo: seleccion },
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success:
                    function (data) {
                        var datos = data.Datos[0];
                        //complementa el formato de dinero
                        var salario = parseFloat(datos.salario).toFixed(2);
                        var campoSalarioVacante = Funciones.ObtenerObjeto("salarioTxt")
                        campoSalarioVacante.autoNumeric('set', salario);

                    },
                error: function ajaxError(data, status, err) {
                    alertify.error(Mensajes.ErrorGetData());
                }

            });

        }
        else {

            var table = $('#tblObjetivos').DataTable();

            table
                .clear()
                .draw();

            var tableR = $('#tblRequisitos').DataTable();

            tableR
                .clear()
                .draw();
            Funciones.ObtenerObjeto("ddlCargoDisponible").val("")
        }
    });


    //--------------------------------------------------------------------------------------------------------------------------------------INSERTAR CARGO

    var botonSeleccionarCargo = Funciones.ObtenerObjeto("BtnCargo");

    botonSeleccionarCargo.click(function () {
        //AjaxCargos AjaxAspiranteNuevo
        var url = host + "/Formas/Ajax/AjaxCargos.aspx";
        var CargoDisponible = Funciones.ObtenerValor("ddlCargoDisponible");
        var CargoCGR = Funciones.ObtenerValor("ddlCargoCGR");
        var controlDisponibleSelect = 0;
        var rrhh = Funciones.ObtenerValor("hdRRHH");
        var id_TcAspirante = Funciones.ObtenerValor("id_tcAspirante");

        if (CargoDisponible != null && CargoDisponible != "" || CargoCGR != null && CargoCGR != "") {
            if (CargoDisponible != null && CargoDisponible != "") {
                var CargoAspira = CargoDisponible;
                controlDisponibleSelect = 1;

            }
            else {
                var CargoAspira = CargoCGR;
                controlDisponibleSelect = 2;
            }


            //var rows = document.getElementById("tblCargos").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;


            /////// Segmento para sumar la cantidad de vacantes solicitadas por el aspirante
            disponibles = 0;
            noDisponibles = 0;

            var table = $('#tblCargos').DataTable();
            var data = table.rows().data();

            data.each(function (value, index) {
                //console.log('Data in index: ' + index + ' is: ' + value.Disponible);
                if (value.Disponible == 1) {
                    disponibles = disponibles + 1;
                }
                else {
                    noDisponibles = noDisponibles + 1;
                }
            });

            Funciones.ObtenerObjeto("CantidadDisponible").val(disponibles)
            Funciones.ObtenerObjeto("Cantidad_NoDisponible").val(noDisponibles)

            var cantidadDisponibles = Funciones.ObtenerValor("CantidadDisponible");
            var cantidadNOdisponibles = Funciones.ObtenerValor("Cantidad_NoDisponible");

            if ((cantidadDisponibles < 3 && controlDisponibleSelect == 1) || (cantidadNOdisponibles < 3 && controlDisponibleSelect == 2)) {
                // Usa ajax para buscar datos del registro

                var model = {
                    Query: "insertCargo",
                    IdAspirantre: idAspirantre,
                    IdCargo: CargoAspira,
                    RRHH: rrhh,
                    ID_TcAspirante: id_TcAspirante
                }

                $.ajax({
                    url: url,
                    cache: false,
                    data: model,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success:
                        function (data) {

                            if (data != null && data != undefined) {
                                if (data.Resultado == "ok") {
                                    alertify.alert("Cargo añadido correctamente!", function () {
                                        localStorage.setItem('aspiranteNuevo', idAspirantre);
                                        localStorage.setItem('tabActive', 'cargos');
                                        location.reload();
                                    });
                                }
                                else {
                                    if (data.Resultado == "doble") {
                                        alertify.error("Ya se resgitró este cargo")
                                    }
                                    else {
                                        alertify.error(data.Resultado)
                                    }

                                }

                            }
                        },
                    error: function ajaxError(data, status, err) {
                        alertify.error(Mensajes.ErrorGetData());
                    }

                });
            }
            else {
                if (controlDisponibleSelect == 1) {
                    alertify.error("Usted puede aspirar hasta 3 cargos disponibles");
                }
                else {
                    alertify.error("Usted puede aspirar hasta 3 cargos no disponibles");
                }

            }



        }
        else {
            alertify.error("Seleccione un cargo a la que aspire");
        }

    });


    //---------------------------------------------------------------------------------------------------------------------------------------- Ver información General

    var botonInformacion = Funciones.ObtenerObjeto("btnInfoGeneral");
    botonInformacion.click(function () {
        ShowModalInfoGeneral("Instrucciones Generales", "dvModalInfoGeneral")
    });

    var paramCedula = Funciones.ObtenerValor("txtParamCedula");
    var paramPrimerNom = Funciones.ObtenerValor("txtParamPrimerNombre");
    var query = "/Formas/Ajax/AjaxAspiranteNuevo.aspx?Query=VerHojaVida&Cedula=" + paramCedula + "&PrimerNom=" + paramPrimerNom;

    //AgregarFormatoTablaHojaVida("HojaVidaTable", query, ["NombreCompleto"]); 

    //$('#tblCargos').each(function () {
    //    $(this).prop("disabled", true);
    //    console.log($(this));
    //});


    // el circulo de cargar
    var myVar;

    function myFunction() {
        myVar = setTimeout(showPage, 3000);
        var table = $('#tblCargos').DataTable();
        $('#modal-content').css('display', 'block');
        table.columns.adjust().draw();
    }

    myFunction();


    //---------------------------------------------------------------------------------  tab de adjuntar 

    //var hdnAbreAdj = Funciones.ObtenerObjeto('hdnAbreAdj');
    //var hdnValidJSAbreAdj = Funciones.ObtenerObjeto('hdnValidJSAbreAdj');
    //var hdnEliminaAdj = Funciones.ObtenerObjeto('hdnEliminaAdj');
    //var hdnValidJSElimAdj = Funciones.ObtenerObjeto('hdnValidJSElimAdj');
    //var hdnguardaAdj = Funciones.ObtenerObjeto('hdnguardaAdj');
    //var hdnValidJSguardaAdj = Funciones.ObtenerObjeto('hdnValidJSguardaAdj');

    
    //if (hdnAbreAdj.val() != "")
    //{
    //    window.open(hdnAbreAdj.val(), '_blank');
    //    hdnAbreAdj.val("");
    //    hdnValidJSAbreAdj.val("1");
    //}


    
    //if (hdnEliminaAdj.val() != "")
    //{
    //    hdnEliminaAdj.val("");
    //    hdnValidJSElimAdj.val("1");
    //}

    
    //if (hdnguardaAdj.val() != "")
    //{

    //    hdnguardaAdj.val("");
    //    hdnValidJSguardaAdj.val("1");
    //}

    var btnGuardarAdjJS = Funciones.ObtenerObjeto('btnGuardarAdjJS');
    btnGuardarAdjJS.click(function () {
        var flUpldAdjuntoCedula = Funciones.ObtenerObjeto('flUpldAdjuntoCedula').val();
        var flUpldAdjuntoLicencia = Funciones.ObtenerObjeto('flUpldAdjuntoLicencia').val();
        var flUpldAdjuntoEducFormal = Funciones.ObtenerObjeto('flUpldAdjuntoEducFormal').val();
        var flUpldAdjuntoCursos = Funciones.ObtenerObjeto('flUpldAdjuntoCursos').val();
        var flUpldAdjuntoIdoneidad = Funciones.ObtenerObjeto('flUpldAdjuntoIdoneidad').val();

        if (flUpldAdjuntoCedula == '' && flUpldAdjuntoLicencia == '' && flUpldAdjuntoEducFormal == '' && flUpldAdjuntoCursos == '' && flUpldAdjuntoIdoneidad  == '') {
            alertify.error("Debe seleccionar un archivo para adjuntar.");
        }
        else
        {
           var btnGuardarAdjuntos = Funciones.ObtenerObjeto('btnGuardarAdjuntos');
           btnGuardarAdjJS.prop("disabled", true);
           btnGuardarAdjuntos.click();
        }

        
    });


    var ddlTipoAdj = Funciones.ObtenerObjeto('ddlTipoAdj');
    ddlTipoAdj.change(function () {
        var seleccion = $(this).val();
        if (seleccion == "CED")
        {
            Funciones.ObtenerObjeto("dvAdjCedula").removeClass("Oculto");
            Funciones.ObtenerObjeto("dvAdjLicencia").addClass("Oculto");
            Funciones.ObtenerObjeto("dvAdjEducFormal").addClass("Oculto");
            Funciones.ObtenerObjeto("dvAdjCursos").addClass("Oculto");
            Funciones.ObtenerObjeto("dvAdjIdoneidad").addClass("Oculto");
        }
        else
        {
            if (seleccion == "LIC") {
                Funciones.ObtenerObjeto("dvAdjCedula").addClass("Oculto");
                Funciones.ObtenerObjeto("dvAdjLicencia").removeClass("Oculto");
                Funciones.ObtenerObjeto("dvAdjEducFormal").addClass("Oculto");
                Funciones.ObtenerObjeto("dvAdjCursos").addClass("Oculto");
                Funciones.ObtenerObjeto("dvAdjIdoneidad").addClass("Oculto");
            }
            else
            {
                if (seleccion == "EDU") {
                    Funciones.ObtenerObjeto("dvAdjCedula").addClass("Oculto");
                    Funciones.ObtenerObjeto("dvAdjLicencia").addClass("Oculto");
                    Funciones.ObtenerObjeto("dvAdjEducFormal").removeClass("Oculto");
                    Funciones.ObtenerObjeto("dvAdjCursos").addClass("Oculto");
                    Funciones.ObtenerObjeto("dvAdjIdoneidad").addClass("Oculto");
                }
                else
                {
                    if (seleccion == "EDU") {
                        Funciones.ObtenerObjeto("dvAdjCedula").addClass("Oculto");
                        Funciones.ObtenerObjeto("dvAdjLicencia").addClass("Oculto");
                        Funciones.ObtenerObjeto("dvAdjEducFormal").removeClass("Oculto");
                        Funciones.ObtenerObjeto("dvAdjCursos").addClass("Oculto");
                        Funciones.ObtenerObjeto("dvAdjIdoneidad").addClass("Oculto");
                    }
                    else {
                        if (seleccion == "CUR") {
                            Funciones.ObtenerObjeto("dvAdjCedula").addClass("Oculto");
                            Funciones.ObtenerObjeto("dvAdjLicencia").addClass("Oculto");
                            Funciones.ObtenerObjeto("dvAdjEducFormal").addClass("Oculto");
                            Funciones.ObtenerObjeto("dvAdjCursos").removeClass("Oculto");
                            Funciones.ObtenerObjeto("dvAdjIdoneidad").addClass("Oculto");
                        }
                        else {
                            if (seleccion == "IDO") {
                                Funciones.ObtenerObjeto("dvAdjCedula").addClass("Oculto");
                                Funciones.ObtenerObjeto("dvAdjLicencia").addClass("Oculto");
                                Funciones.ObtenerObjeto("dvAdjEducFormal").addClass("Oculto");
                                Funciones.ObtenerObjeto("dvAdjCursos").addClass("Oculto");
                                Funciones.ObtenerObjeto("dvAdjIdoneidad").removeClass("Oculto");
                            }
                        }
                    }
                }
            }
        }

    });


    var flUpldAdjuntoCedula = Funciones.ObtenerObjeto('flUpldAdjuntoCedula');
    flUpldAdjuntoCedula.bind('propertychange change keyup paste input', function () {

        var Input = Funciones.ObtenerObjeto('flUpldAdjuntoCedula').val();
        var limitePesoArchivo = Funciones.ObtenerObjeto('txtLimitePesoAdjunto').val();
        var extensionArchivo = Funciones.ObtenerObjeto('txtExtensionAdjunto').val();

        if (Input != '') {
            var fileName = this.files[0].name;
            var fileSize = this.files[0].size;

            if (fileSize > limitePesoArchivo) {
                alertify.error("El archivo " + fileName + " es muy pesado");
                this.value = '';
            }
            else {

                var ext = fileName.split('.').pop();
                if (extensionArchivo.search(ext) == -1) {
                    alertify.error("Debe adjuntar archivos con extensión: " + extensionArchivo);
                    this.value = '';
                }
            }
        }
        

    });

    var flUpldAdjuntoLicencia = Funciones.ObtenerObjeto('flUpldAdjuntoLicencia');
    flUpldAdjuntoLicencia.bind('propertychange change keyup paste input', function () {

        var Input = Funciones.ObtenerObjeto('flUpldAdjuntoLicencia').val();
        var limitePesoArchivo = Funciones.ObtenerObjeto('txtLimitePesoAdjunto').val();
        var extensionArchivo = Funciones.ObtenerObjeto('txtExtensionAdjunto').val();

        if (Input != '') {
            var fileName = this.files[0].name;
            var fileSize = this.files[0].size;

            if (fileSize > limitePesoArchivo) {
                alertify.error("El archivo " + fileName + " es muy pesado");
                this.value = '';
            }
            else {

                var ext = fileName.split('.').pop();
                if (extensionArchivo.search(ext) == -1) {
                    alertify.error("Debe adjuntar archivos con extensión: " + extensionArchivo);
                    this.value = '';
                }
            }
        }


    });

    var flUpldAdjuntoEducFormal = Funciones.ObtenerObjeto('flUpldAdjuntoEducFormal');
    flUpldAdjuntoEducFormal.bind('propertychange change keyup paste input', function () {

        var Input = Funciones.ObtenerObjeto('flUpldAdjuntoEducFormal').val();
        var limitePesoArchivo = Funciones.ObtenerObjeto('txtLimitePesoAdjunto').val();
        var extensionArchivo = Funciones.ObtenerObjeto('txtExtensionAdjunto').val();

        if (Input != '') {
            var fileName = this.files[0].name;
            var fileSize = this.files[0].size;

            if (fileSize > limitePesoArchivo) {
                alertify.error("El archivo " + fileName + " es muy pesado");
                this.value = '';
            }
            else {

                var ext = fileName.split('.').pop();
                if (extensionArchivo.search(ext) == -1) {
                    alertify.error("Debe adjuntar archivos con extensión: " + extensionArchivo);
                    this.value = '';
                }
            }
        }


    });


    var flUpldAdjuntoCursos = Funciones.ObtenerObjeto('flUpldAdjuntoCursos');
    flUpldAdjuntoCursos.bind('propertychange change keyup paste input', function () {

        var Input = Funciones.ObtenerObjeto('flUpldAdjuntoCursos').val();
        var limitePesoArchivo = Funciones.ObtenerObjeto('txtLimitePesoAdjunto').val();
        var extensionArchivo = Funciones.ObtenerObjeto('txtExtensionAdjunto').val();

        if (Input != '') {
            var fileName = this.files[0].name;
            var fileSize = this.files[0].size;

            if (fileSize > limitePesoArchivo) {
                alertify.error("El archivo " + fileName + " es muy pesado");
                this.value = '';
            }
            else {

                var ext = fileName.split('.').pop();
                if (extensionArchivo.search(ext) == -1) {
                    alertify.error("Debe adjuntar archivos con extensión: " + extensionArchivo);
                    this.value = '';
                }
            }
        }


    });

    var flUpldAdjuntoIdoneidad = Funciones.ObtenerObjeto('flUpldAdjuntoIdoneidad');
    flUpldAdjuntoIdoneidad.bind('propertychange change keyup paste input', function () {

        var Input = Funciones.ObtenerObjeto('flUpldAdjuntoIdoneidad').val();
        var limitePesoArchivo = Funciones.ObtenerObjeto('txtLimitePesoAdjunto').val();
        var extensionArchivo = Funciones.ObtenerObjeto('txtExtensionAdjunto').val();

        if (Input != '') {
            var fileName = this.files[0].name;
            var fileSize = this.files[0].size;

            if (fileSize > limitePesoArchivo) {
                alertify.error("El archivo " + fileName + " es muy pesado");
                this.value = '';
            }
            else {

                var ext = fileName.split('.').pop();
                if (extensionArchivo.search(ext) == -1) {
                    alertify.error("Debe adjuntar archivos con extensión: " + extensionArchivo);
                    this.value = '';
                }
            }
        }


    });

    Funciones.ObtenerObjeto('flUpldAdjuntoCedula').val('');
    Funciones.ObtenerObjeto('flUpldAdjuntoLicencia').val('');
    Funciones.ObtenerObjeto('flUpldAdjuntoEducFormal').val('');
    Funciones.ObtenerObjeto('flUpldAdjuntoCursos').val('');
    Funciones.ObtenerObjeto('flUpldAdjuntoIdoneidad').val('');

    Funciones.ObtenerObjeto("grvAdjuntos").GridviewFix().DataTable({
        "language": {
            "processing": "Procesando",
            "lengthMenu": "Mostrar _MENU_  Registros por p\xE1ginas",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Sin registros que mostrar",
            "search": "Buscar",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    });

});

function limpiarCadenaTilde (cadena) {
    // Definimos los caracteres que queremos eliminar
    //var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";

    // Los eliminamos todos
    //for (var i = 0; i < specialChars.length; i++) {
    //    cadena = cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
    //}

    // Lo queremos devolver limpio en minusculas
    //cadena = cadena.toLowerCase();

    // Quitamos espacios y los sustituimos por _ porque nos gusta mas asi
    //cadena = cadena.replace(/ /g, "_");

    // Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
    cadena = cadena.replace(/á/gi, "a");
    cadena = cadena.replace(/é/gi, "e");
    cadena = cadena.replace(/í/gi, "i");
    cadena = cadena.replace(/ó/gi, "o");
    cadena = cadena.replace(/ú/gi, "u");
    cadena = cadena.replace(/ñ/gi, "n");
    return cadena;
}


///////////////////////////////////////////////////////////////////////////////////////////////////// ELIMINAR REGISTRO DE ESTUDIOS

function EliminarEstudios(idEstudios, idAspirantre) {

    //AjaxEstudios AjaxAspiranteNuevo
    var url = host + "/Formas/Ajax/AjaxEstudios.aspx";
    var rrhh = Funciones.ObtenerValor("hdRRHH");

    var model = {
        Query: "Estudios",
        AccionEstudio: "delete",
        IdEstudio: idEstudios,
        IdAspirantre: idAspirantre,
        RRHH: rrhh
    }

    $.ajax({
        url: url,
        cache: false,
        data: model,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success:
            function (data) {

                if (data != null && data != undefined) {
                    if (data.Resultado == "ok") {

                        var siEsNuevoONo = Funciones.ObtenerValor("UsuarioNuevo");
                        if (siEsNuevoONo == "" || siEsNuevoONo == null) {
                            localStorage.setItem('usuarioNuevo', 'si');
                        }
                        alertify.alert("Datos eliminados correctamente!", function () {
                            localStorage.setItem('tabActive', 'estudios');
                            localStorage.setItem('aspiranteNuevo', idAspirantre);
                            location.reload();
                        });

                    }
                    else {
                        alertify.error("data.Resultado = No ok")
                    }

                }
            },
        error: function ajaxError(data, status, err) {
            alertify.error(Mensajes.ErrorGetData());
        }

    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////// ELIMINAR REGISTRO DE CARGOS 


function EliminarCargos(idCargo, idAspirantre) {
    //AjaxCargos AjaxAspiranteNuevo
    var url = host + "/Formas/Ajax/AjaxCargos.aspx";
    var rrhh = Funciones.ObtenerValor("hdRRHH");

    var model = {
        Query: "EliminarCargo",
        IdAspirantre: idAspirantre,
        idCargo: idCargo,
        RRHH: rrhh
    }

    $.ajax({
        url: url,
        cache: false,
        data: model,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success:
            function (data) {

                if (data != null && data != undefined) {
                    if (data.Resultado == "ok") {

                        var siEsNuevoONo = Funciones.ObtenerValor("UsuarioNuevo");
                        if (siEsNuevoONo == "" || siEsNuevoONo == null) {
                            localStorage.setItem('usuarioNuevo', 'si');
                        }
                        alertify.alert("Datos eliminados correctamente!", function () {
                            localStorage.setItem('tabActive', 'cargos');
                            localStorage.setItem('aspiranteNuevo', idAspirantre);
                            location.reload();
                        });

                    }
                    else {
                        alertify.error("data.Resultado = No ok")
                    }

                }
            },
        error: function ajaxError(data, status, err) {
            alertify.error(Mensajes.ErrorGetData());
        }

    });
}



/*
Abre un modal de bootstrap.

@param  {String}   accion:        Tipo de accion que realizara el modal (New o Edit)
@param  {String}   tituloModal:        Titulo del modal
@param  {String}   idModal:        Id del modal
@param  {Number}   DatoSecuencial:       Dato Secuencial (Codigo)
*/
var ShowModalEdit = function (accion, tituloModal, idModal, DatoSecuencial, idAspirantre) {

    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var rrhh = Funciones.ObtenerValor("hdRRHH");
    var id_TcAspirante = Funciones.ObtenerValor("id_tcAspirante");
    if (w >= 1200) //verifica el tamaño de la pantalla 
    {
        Funciones.ObtenerObjeto("hdCodigoFila").val(DatoSecuencial);
        var titulo = Funciones.ObtenerObjeto("lblTitulo");
        titulo.text(tituloModal);

        $("#" + idModal).modal('show');
    }
    else // si la pantalla es pequeña
    {
        localStorage.setItem('tabActive', 'estudios');
        window.open('EditEstudio_DispMovil.aspx?codigoFila=' + DatoSecuencial + '&IdAspirantre=' + idAspirantre + '&rrhh=' + rrhh + '&tcid=' + id_TcAspirante);
    }


}

var ShowModalCargo = function (tituloModal, idModal, DatoSecuencial, NombreCargo) {

    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var url = host + "/Formas/Ajax/AjaxCargos.aspx";
    if (w >= 1200) //verifica el tamaño de la pantalla 
    {
        // Usa ajax para buscar Objetivo
        var columnaObjetivo = ["ObjetivoCargo"];
        //AjaxCargos AjaxAspiranteNuevo
        AgregarFormatoTablaVerCargos("tblObjetivos_Ver", "/Formas/Ajax/AjaxCargos.aspx?Query=consultaObjetivoCargo&idCargo=" + DatoSecuencial, columnaObjetivo)


        // Usa ajax para buscar Requisitos
        var columnaRequisito = ["Requisito"];
        //AjaxCargos AjaxAspiranteNuevo
        AgregarFormatoTablaVerCargos("tblRequisitos_Ver", "/Formas/Ajax/AjaxCargos.aspx?Query=consultaRequisitoCargo&idCargo=" + DatoSecuencial, columnaRequisito)

        // para mostrar el salario
        $.ajax({
            url: url,
            cache: false,
            data: { Query: "consultaSalario", idCargo: DatoSecuencial },
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success:
                function (data) {
                    var datos = data.Datos[0];
                    //Funciones.ObtenerObjeto("salarioTxt_Ver").val(datos.salario);
                    var monto = parseFloat(datos.salario).toFixed(2);
                    var txtmonto = Funciones.ObtenerObjeto("salarioTxt_Ver");
                    txtmonto.autoNumeric('set', monto);
                },
            error: function ajaxError(data, status, err) {
                alertify.error(Mensajes.ErrorGetData());
            }

        });

        Funciones.ObtenerObjeto("hdCodigoFila").val(DatoSecuencial);
        var titulo = Funciones.ObtenerObjeto("lblTituloCargo");
        var Nombre = Funciones.ObtenerObjeto("CargoNombreTxt");
        titulo.text(tituloModal);
        Nombre.text(NombreCargo);
        $("#" + idModal).modal('show');
    }
    else {
        window.open('VerCargo_DispMovil.aspx?codigoFila=' + DatoSecuencial + '&NombreCargo=' + NombreCargo);
    }

}

var ShowModalInfoGeneral = function (tituloModal, idModal) {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (w >= 1200) //verifica el tamaño de la pantalla 
    {

        var dir = host + "/formas/Ajax/AjaxInstruccionesGralModal.aspx";

        $.ajax({
            data: { query: "Modal_InsGral" },
            url: dir,
            cache: false,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                var titulo = Funciones.ObtenerObjeto("lblTituloInfoGeneral");
                titulo.text(tituloModal);

                document.getElementById("lista_ptoimp").innerHTML = data[0].ptoimp;
                document.getElementById("lista_instrucciones").innerHTML = data[0].ins;

                //$("#" + idModal).modal('show');
                $("#" + idModal).appendTo("body").modal('show');

            },
            error: function (data) {
                //console.log(data);
                alertify.error("data.Resultado = No ok")
            }
        });

    }
    else {
        window.open('VerInfoGeneral_DispMovil.aspx');
    }
}

function AgregarFormatoTablaVerCargos(idTabla, ajaxData, columns) {
    // Crea el array de columnas
    var colData = [];
    fLen = columns.length;

    // Carga las columnas que selecciono el usuario
    for (i = 0; i < fLen; i++) {
        colData.push({ "data": columns[i] });
    }


    // Inicia DataTable
    var table = $('#' + idTabla).DataTable({
        "processing": true,
        "ajax": host + ajaxData,
        "columns": colData,
        "ordering": false,
        "deferRender": true,
        "searching": false,
        "paging": false,
        "info": false,
        "scroller": true,
        "scrollY": "300px",
        "scrollX": true,
        "scrollCollapse": true,
        "columnDefs": [
              {

                  className: "col-lg-10", "targets": [0],
                  className: "col-md-10", "targets": [0],
                  className: "col-sm-10", "targets": [0],
                  className: "col-xs-10", "targets": [0]
                  ,
                  //render: function (data, type, full, meta) {
                  //    return "<div class='text-wrap width-100'>" + data + "</div>";
                  //},

                  targets: [0]


              },
              { "orderable": false, "targets": 0 }

        ],
        "bDestroy": true,
        "cache": false,
        "language": {
            "processing": "Cargando...",
            "zeroRecords": " ",
            "infoEmpty": " ",
        }
    });
}

function AgregarFormatoTablaHojaVida(idTabla, ajaxData, columns) {
    // Crea el array de columnas
    var colData = [];
    fLen = columns.length;


    // Agrega la columna de boton de Eliminar
    colData.push({
        "render": function (data, type, row) {

            return "<a href='" + row.Link + "'>Descargar</a> ";
        }
    });

    // Carga las columnas que selecciono el usuario
    for (i = 0; i < fLen; i++) {
        colData.push({ "data": columns[i] });
    }

    // Inicia DataTable
    var table = $('#' + idTabla).DataTable({
        "order": [],
        "lengthMenu": [10, 20, 50, 100],
        "dom": 'lfrt<"row"<"col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xs-offset-12 col-sm-offset-4 col-md-offset-4 col-lg-offset-4 paginacion text-center"p><"col-xs-12 col-sm-4 col-md-4 col-lg-4 text-left"i>>',
        "processing": true,
        "ajax": {
            "url": host + ajaxData,
            "dataType": "jsonp"
        },
        //"ajax": host + ajaxData,
        "columns": colData,
        "deferRender": true,
        //"columnDefs": [
        //      {

        //          className: "col-lg-9", "targets": [0],
        //          className: "col-md-9", "targets": [0],
        //          className: "col-sm-9", "targets": [0],
        //          className: "col-xs-9", "targets": [0]
        //          ,
        //          //render: function (data, type, full, meta) {
        //          //    return "<div class='text-wrap width-100'>" + data + "</div>";
        //          //},
        //          targets: [0]

        //      }
        //],
        "language": {
            "processing": "Procesando",
            "lengthMenu": "Registros por p\xE1ginas _MENU_",
            "zeroRecords": "Usted no tiene registros de hojas de vida.",
            "search": "Buscar",
            "info": "Mostrando P\xE1ginas _PAGE_ de _PAGES_",
            "infoEmpty": "",
            "infoFiltered": "(Filtrado de _MAX_ Total de Registros)",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
        },
    });
}


// barra de estado llenado de la data
function MoverBarra() {
    var porcentajeLimite = 0;
    var TotalTabs = 10;
    var TabsConData = 0;
    var idAspirantre = Funciones.ObtenerValor("hdCodigo");
    var herraInfo = Funciones.ObtenerValor("HDManejoHerraInfo");
    var familiares = Funciones.ObtenerValor("HDidDatoFamiliar");
    var otrosDatos = Funciones.ObtenerValor("HDOtrosDatosID");

    if (idAspirantre != "" && idAspirantre != null && idAspirantre != 0) {
        TabsConData++;
        Funciones.ObtenerObjeto("dvBar").removeClass("Oculto");
        var i = 0;
        function move() {
            if (i == 0) {
                i = 1;
                var elem = document.getElementById("myBar");
                var width = 1;
                var id = setInterval(frame, 10);

                if (herraInfo != "" && herraInfo != null && herraInfo != 0) {
                    TabsConData++;
                }

                if (familiares != "" && familiares != null && familiares != 0) {
                    TabsConData++;
                }
                else {
                    var url = host + "/Formas/Ajax/AjaxDatosFamiliares.aspx";
                    var rrhh = Funciones.ObtenerValor("hdRRHH");
                    cargarDataFamiliares(url, idAspirantre, rrhh);

                    familiares = Funciones.ObtenerValor("HDidDatoFamiliar");

                    if (familiares != "" && familiares != null && familiares != 0) {
                        TabsConData++;
                    }
                }

                if (otrosDatos != "" && otrosDatos != null && otrosDatos != 0) {
                    TabsConData++;
                }

                var cantidadVacanates = parseInt($("#CantidadCargos").val());

                if (cantidadVacanates > 0) {
                    TabsConData++;
                }

                var cantidadEstudios = parseInt($("#CantidadEstudios").val());

                if (cantidadEstudios > 1) {
                    TabsConData++;
                }

                var cantidadUrgencia = parseInt($("#countUrgencia").val());

                if (cantidadUrgencia > 0) {
                    TabsConData++;
                }

                var cantidadHabilidad = parseInt($("#countOtrasHabilidades").val());

                if (cantidadHabilidad > 0) {
                    TabsConData++;
                }

                var cantidadIdiomas = parseInt($("#countIdioma").val());

                if (cantidadIdiomas > 0) {
                    TabsConData++;
                }

                var cantidadExpLaboral = parseInt($("#countExperienciaLab").val());

                if (cantidadExpLaboral > 0) {
                    TabsConData++;
                }

                porcentajeLimite = ((TabsConData / TotalTabs) * 100).toFixed(2);

                function frame() {
                    if (width >= porcentajeLimite) {
                        clearInterval(id);
                        i = 0;
                    } else {
                        width++;
                        elem.style.width = width + "%";
                        elem.innerHTML = width + "%";
                    }
                }
                var mensaje = document.getElementById("msgPorcentaje");
                if (porcentajeLimite < 100) {
                    mensaje.innerHTML = "Porcentaje del total de información brindada, si no completa el 100% en estos momentos puede hacerlo en otra ocasión; pero tome en cuenta que toda su información es vital para nuestra selección.";
                }
                else {
                    mensaje.innerHTML = "Muchas gracias por completar toda la información!";
                }
            }
        }

        move();
    }
}


function ContarTablasCargadas() {
    var contTablas = $("#hd_tablasCargadas").val();
    var contAjax = $("#hd_ajaxCargados").val();

    if (contTablas == "" || contTablas == null) {
        contTablas = 1;
        $("#hd_tablasCargadas").val(contTablas);
    }
    else {
        if (Number(contTablas) > 0 && Number(contTablas) < 6) {
            contTablas = Number(contTablas) + 1;
            $("#hd_tablasCargadas").val(contTablas);

            if (contTablas == 6 && contAjax == 4) {
                MoverBarra();
            }

        }
    }
}

function ContarDataAjax() {
    var contTablas = $("#hd_tablasCargadas").val();
    var contAjax = $("#hd_ajaxCargados").val();

    if (contAjax == "" || contAjax == null) {
        contAjax = 1;
        $("#hd_ajaxCargados").val(contAjax);
    }
    else {
        if (Number(contAjax) > 0 && Number(contAjax) < 4) {
            contAjax = Number(contAjax) + 1;
            $("#hd_ajaxCargados").val(contAjax);
            if (contTablas == 6 && contAjax == 4) {
                MoverBarra();
            }
        }
    }

}
