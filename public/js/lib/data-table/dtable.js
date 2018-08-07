var DatatableList = (function () {
    function DatatableList(settings) {
        this.settings = settings;
    }
    DatatableList.prototype.selectRowByID = function (id) {
        var table = $(this.settings.listElement);
        table.find("tr.current-row").removeClass("current-row");
        table.find("tr[record-id=" + id + "]").addClass("current-row");
        this.selectedID = id;
    };
    DatatableList.prototype.itemRender = function (rowElement, aData, iDisplayIndex) {
        var settings = this.settings;
        var nRow = $(rowElement);
        /*if(settings.trFormat!=null)
         $.each(settings.trFormat,function(){
         var st=this;
         if($("."+st.switchClass,nRow).val()==st.value)
         nRow.attr("style",st.style).addClass(st.addClass);

         });*/
        var id = aData['id'];
        nRow.attr("record-id", id);
        if (this.selectedID == id) {
            nRow.addClass("current-row");
        }
        if (typeof (aData['row_class']) !== "undefined") {
            nRow.addClass(aData['row_class']);
        }
        return nRow;
    };
    DatatableList.prototype.render = function () {
        var _this = this;
        var settings = this.settings;
        var listOptions = $.extend({}, {
            processing: false,
            serverSide: true,
            jQueryUI: false,
            paging: settings.listPaging,
            ajax: {
                "data": function (d) {
                    var blockElement = settings.blockElement ? settings.blockElement : $(settings.listElement).parent();
                    blockElement.block(Commons.getBlockConfig());
                    var filterWrapper = typeof settings.filterWrapper == 'object' ? settings.filterWrapper : $(settings.filterWrapper);
                    //inserisco tutti i dati di ricerca
                    $.each($('input, select', filterWrapper), function () {
                        if ($(this).is('[type=checkbox]')) {
                            d[$(this).attr('name')] = $(this).is(':checked') ? $(this).val() : "";
                        }
                        else {
                            d[$(this).attr('name')] = $(this).val();
                        }
                    });
                    //inserisco tutti i dati di ricerca
                    $.each(settings.listParms, function (k, v) {
                        d[k] = Commons.getParameterValue(v);
                    });
                },
                type: settings.method,
                "url": settings.url + '/' + settings.appList,
                "dataSrc": function (json) {
                    var blockElement = settings.blockElement ? settings.blockElement : $(settings.listElement).parent();
                    blockElement.unblock();
                    if (settings.onRefreshList != null) {
                        settings.onRefreshList(json);
                    }
                    return json.data;
                }
            },
            "autoWidth": false,
            //"rowReorder": true,
            "dom": settings.dom,
            "order": settings.sort,
            fixedHeader: settings.fixedHeader,
            "pageLength": settings.listLength,
            "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, LangCRUD.get("list_all", "Tutti")]],
            "pagingType": "full_numbers",
            "rowCallback": function (nRow, aData, iDisplayIndex) {
                return _this.itemRender(nRow, aData, iDisplayIndex);
            },
            "columns": settings.cols,
            "language": {
                "sLengthMenu": LangCRUD.get("list_view", "Mostra") + " <span class='length_datatables'>_MENU_</span> ",
                "sZeroRecords": settings.listEmpty,
                "sInfo": LangCRUD.get("list_info", "_START_ - _END_ di _TOTAL_"),
                "sInfoEmpty": "",
                //"sInfoFiltered": "(filtrati da _MAX_ voci totali)",
                "sInfoFiltered": "",
                "oPaginate": {
                    "sNext": LangCRUD.get("list_next", "Succesivo"),
                    "sFirst": LangCRUD.get("list_first", "Primo"),
                    "sLast": LangCRUD.get("list_last", "Ultimo"),
                    "sPrevious": LangCRUD.get("list_prev", "Precedente")
                }
            }
        }, this.settings.listOptions || {});
        this.tableObject = $(settings.listElement).DataTable(listOptions);
        console.log("datatables init ");
        /* BINDO i click agli elementi all'identificazinoe dell'ID del record */
        if (settings.onItemDoubleClick) {
            var dbClickHandler = function (e) {
                var tr = $(this).parent();
                var id = tr.attr("record-id");
                settings.onItemDoubleClick(id, tr);
            };
            $(settings.listElement).off("dblclick", "td:not(.op)", dbClickHandler);
            $(settings.listElement).on("dblclick", "td:not(.op)", dbClickHandler);
        }
        if (settings.onItemClick) {
            var clickHandler = function (e) {
                var tr = $(this).parent();
                var id = tr.attr("record-id");
                settings.onItemClick(id, {
                    target: tr
                });
            };
            $(settings.listElement).off("click", "td:not(.op)", clickHandler);
            $(settings.listElement).on("click", "td:not(.op)", clickHandler);
        }
        this.bindFilterElements();
    };
    DatatableList.prototype.bindFilterElements = function () {
        var _this = this;
        var filterWrapperSelector;
        var filterWrapper;
        //controllo
        if (typeof this.settings.filterWrapper == 'object') {
            Message.show({ error: true, message: "Errore sui filtri di ricerca" });
        }
        else {
            filterWrapperSelector = this.settings.filterWrapper;
            filterWrapper = $(this.settings.filterWrapper);
            if (filterWrapperSelector.indexOf("#") < 0 && filterWrapperSelector.indexOf(".") < 0) {
                Message.show({ error: true, message: "Errore sui filtri di ricerca: Selector non valido" });
            }
        }
        var refreshFunc = function () {
            _this.refresh();
        };
        var refreshFuncSend = function (e) {
            console.log(e.keyCode);
            if (e.keyCode == 13) {
                _this.refresh();
                return false;
            }
        };
        filterWrapper.off("change", "select:not(.nobind)", refreshFunc);
        filterWrapper.on("change", "select:not(.nobind)", refreshFunc);
        filterWrapper.off('keypress', "input[type='text']:not(.nobind)", refreshFuncSend);
        filterWrapper.on('keypress', "input[type='text']:not(.nobind)", refreshFuncSend);
    };
    DatatableList.prototype.refresh = function (reset) {
        if (reset === void 0) { reset = false; }
        this.tableObject.draw(reset);
    };
    DatatableList.prototype.getInstance = function () {
        return this.tableObject;
    };
    return DatatableList;
}());
var CrudUI = (function () {
    function CrudUI(settings) {
        var _this = this;
        this.settings = {
            confirmDeleteMessage: LangCRUD.get("confirm_delete", "Confermi la rimozione?"),
            /**
             * list settings
             */
            method: 'GET',
            listType: DatatableList,
            listElement: '#tabella',
            blockElement: null,
            listPaging: true,
            listEmpty: LangCRUD.get("list_no_records", "Nessun record disponibile"),
            cols: [],
            loader: true,
            onItemDoubleClick: function (id, element) { _this.formUpdate({ id: id }); },
            onItemClick: function (id, element) { },
            listParms: {},
            trFormat: null,
            sort: [[0, 'desc']],
            dom: "t<'clearfix table-footer'<'col-sm-5 col-md-4' li><'col-sm-7 col-md-8'p>>",
            listLength: 100,
            /**
             * form container settings
             */
            dialogH: 'auto',
            dialogW: 700,
            dialogModal: true,
            dialogPosition:  { my: 'center', at: 'center', of: window},
            formID: "formins",
            formWrapper: "dialog",
            titleEdit: "Modifica",
            titleInsert: "Inserisci",
            onformInsertOpen: null,
            onformUpdateOpen: null,
            formUpdateButtons: null,
            formInsertButtons: null,
            /**
             * filters settings
             */
            filterWrapper: "#filtraggio",
            fixedHeader: false,
            /**
             * serverside settings
             */
            url: "/routebase",
            appFormInsert: 'form',
            appInsertOrUpdate: 'save',
            appFormUpdate: 'form',
            appDelete: 'delete',
            appList: 'table',
            onUpdateItem: null,
            onCreateItem: null,
            onSaveItem: null,
            onRefreshList: null,
            onDeleteItem: function () {
                _this.refreshList();
            }
        };
        this.lastItemID = 0;
        $.extend(this.settings, settings || {});
    }
    CrudUI.prototype.set = function (key, value) {
        this.settings[key] = value;
    };
    CrudUI.prototype.renderForm = function (titolo, content, buttons) {
        var container = $("#" + this.settings.formWrapper);
        if (container.length == 0) {
            $("body").append('<div id="' + this.settings.formWrapper + '" title="" style="display:none"></div>');
        }
        try {
            container.dialog("destroy");
        }
        catch (e) {
        }
        container = $("#" + this.settings.formWrapper);
        container.attr("title", titolo);
        container.html(content);
        //alert("dialog")
        //BootstrapDialog.show({message:"aaaaaaa"});
        container.dialog({
            modal: this.settings.dialogModal,
            minHeight: 50,
            create: function () {
                // $(this).css("maxHeight", $(window).height());
            },
            width: this.settings.dialogW,
            position: this.settings.dialogPosition,
            buttons: buttons
        });
    };
    CrudUI.prototype.getListInstance = function () {
        return this.listInstance.getInstance();
    };
    CrudUI.prototype.list = function (settings) {
        if (settings === void 0) { settings = {}; }
        var localSettings = $.extend({
            listParms: {}
        }, this.settings, settings || {});
        console.log("list");
        this.listInstance = new localSettings.listType(localSettings);
        this.listInstance.render();
    };
    CrudUI.prototype.uniqID = function () {
        return "id" + Math.random().toString(16).slice(2);
    };
    ;
    CrudUI.prototype.formInsert = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var localSettings = $.extend({
            parms: {}
        }, this.settings, options || {});
        var data = { formid: localSettings.formID };
        $.each(localSettings.parms, function (k, v) {
            data[k] = Commons.getParameterValue(v);
        });
        this.renderForm(localSettings.titleInsert, '<div class="text-center" style="padding:20px;"><i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i> Loading...</div>', { "Annulla": function () { $(this).dialog("destroy"); } });
        $.get(localSettings.url + "/" + localSettings.appFormInsert, data, function (data) {
            var container = $("#" + _this.settings.formWrapper);
            if (container.length > 0 && container.attr("role") == "form-container") {
                var button = [
                    { text: '<i class="fa fa-plus"></i>', class: 'btn-primary', click: function () { _this.insertOrUpdate({ reopen: true, settings: localSettings }); } },
                    { text: '<i class="fa fa-times"></i>', class: 'btn-default', click: function () { _this.formInsert(settings); } }
                ];
                container.html(data);
                $.each(button, function (k, v) {
                    var id = (typeof v.id === "undefined") ? _this.uniqID() : v.id;
                    $("[role=form-buttons]", container).append('<a id="' + id + '" class="btn btn-xs ' + v.class + '">' + v.text + '</a>');
                    $("#" + id, container).on("click", v.click);
                });
                return;
            }
            var defaultButtons = {};
            defaultButtons[LangCRUD.get("save", "Salva")] = function () { _this.insertOrUpdate({ reopen: false }); };
            defaultButtons[LangCRUD.get("save_continue", "Salva e continua")] = function () { _this.insertOrUpdate({ reopen: true, settings: localSettings }); };
            defaultButtons[LangCRUD.get("cancel", "Annulla")] = function () { $(this).dialog("destroy"); };
            var button = (localSettings.insertButtons == null) ? defaultButtons : localSettings.insertButtons;
            _this.renderForm(localSettings.titleInsert, data, button);
            //callback
            if (localSettings.onformInsertOpen != null) {
                localSettings.onformInsertOpen();
            }
        });
    };
    CrudUI.prototype.formUpdate = function (settings) {
        console.log(settings);
        var _this = this;
        var localSettings = $.extend({
            parms: {}
        }, this.settings, settings || {});
        var data = { id: localSettings.id, formid: localSettings.formID };
        $.each(localSettings.parms, function (k, v) {
            data[k] = v;
        });
        this.renderForm(localSettings.titleEdit, '<div class="text-center" style="padding:20px;"><i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i> Loading...</div>', { "Annulla": function () { $(this).dialog("destroy"); } });
        $.get(localSettings.url + "/" + localSettings.appFormUpdate, data, function (data) {
            var container = $("#" + _this.settings.formWrapper);
            if (container.length > 0 && container.attr("role") == "form-container") {
                var button = [
                    { text: '<i class="fa fa-pencil"></i>', class: 'btn-success', click: function () { _this.insertOrUpdate({ reopen: true, settings: localSettings }); } },
                    { text: '<i class="fa fa-trash"></i>', class: 'btn-danger', click: function () { _this.confirmRemove(localSettings); } },
                    { text: '<i class="fa fa-times"></i>', class: 'btn-default', click: function () { _this.formInsert(settings); } }
                ];
                container.html(data);
                $.each(button, function (k, v) {
                    var id = (typeof v.id === "undefined") ? _this.uniqID() : v.id;
                    $("[role=form-buttons]", container).append('<a id="' + id + '" class="btn btn-xs ' + v.class + '">' + v.text + '</a>');
                    $("#" + id, container).on("click", v.click);
                });
                return;
            }
            var defaultButtons = {};
            defaultButtons[LangCRUD.get("save", "Salva")] = function () { _this.insertOrUpdate({ reopen: false, id: localSettings.id }); };
            defaultButtons[LangCRUD.get("save_continue", "Salva e continua")] = function () { _this.insertOrUpdate({ reopen: true, id: localSettings.id, settings: localSettings }); };
            defaultButtons[LangCRUD.get("delete", "Elimina")] = function () { _this.confirmRemove(localSettings); };
            defaultButtons[LangCRUD.get("cancel", "Annulla")] = function () { $(this).dialog("destroy"); };
            var button = (localSettings.updateButtons == null) ? defaultButtons : localSettings.updateButtons;
            _this.renderForm(localSettings.titleEdit, data, button);
            if (localSettings.onformUpdateOpen != null) {
                localSettings.onformUpdateOpen(localSettings);
            }
            _this.selectRow(localSettings.id);
        });
    };
    CrudUI.prototype.confirmRemove = function (settings) {
        var _this = this;
        var localSettings = $.extend({}, this.settings, settings || {});
        CrudUI.confirm(localSettings.confirmDeleteMessage, function () {
            _this.remove({ id: localSettings.id });
        });
    };
    CrudUI.prototype.refreshList = function (reset) {
        if (reset === void 0) { reset = false; }
        if (this.listInstance)
            this.listInstance.refresh(reset);
    };
    CrudUI.prototype.selectRow = function (id) {
        if (this.listInstance)
            this.listInstance.selectRowByID(id);
    };
    CrudUI.prototype.remove = function (settings) {
        var _this = this;
        var localSettings = $.extend({
            id: 0
        }, this.settings, settings || {});
        var data = { id: localSettings.id };
        $.post(localSettings.url + "/" + localSettings.appDelete, data, function (response) {
            Message.show(response);
            if (response.error) {
            }
            else {
                try {
                    $('#' + localSettings.formWrapper).dialog('destroy');
                }
                catch (e) {
                    console.log(e);
                }
                _this.refreshList();
                if (localSettings.onDeleteItem != null) {
                    localSettings.onDeleteItem();
                }
            }
        });
    };
    CrudUI.prototype.insertOrUpdate = function (settings) {
        var _this = this;
        if (settings === void 0) { settings = {}; }
        var localSettings = $.extend({
            reopen: false,
            id: 0
        }, this.settings, settings || {});
        //todo campi obbligatori da fare
        //if (this.obbligatori()){
        console.log("IDFORM: #" + localSettings.formWrapper + " #" + localSettings.formID);
        var data = $("#" + localSettings.formWrapper + " #" + localSettings.formID).serialize();
        console.log("DATAFORM:",data);
        $.post(localSettings.url + "/" + localSettings.appInsertOrUpdate, data, function (response) {
            //if(settings.onUpdated!=null) {settings.onUpdated(); return ;}
            Message.show(response);
            if (!response.error) {
                try {
                    $('#' + localSettings.formWrapper).dialog('destroy');
                }
                catch (e) {
                    console.log(e);
                }
                //reopen form
                if (localSettings.reopen) {
                    try {
                        localSettings.settings.id = response.item.id;
                        _this.formUpdate(localSettings.settings);
                    }
                    catch (e) {
                        Message.show({ error: true, message: "ID LAST ITEM MISSING!" });
                    }
                }
                //last item form selected row after refresh
                _this.lastItemID = 0;
                //console.log(localSettings);
                if (localSettings.id > 0) {
                    _this.lastItemID = localSettings.id;
                    if (localSettings.onUpdateItem != null) {
                        localSettings.onUpdateItem(response);
                    }
                }
                else {
                    if (localSettings.onCreateItem != null) {
                        localSettings.onCreateItem(response);
                    }
                }
                if (localSettings.onSaveItem != null) {
                    localSettings.onSaveItem(response);
                }
                //on insert success callbach
                _this.refreshList();
            }
        }, "json");
        //} else {
        //    $().toastmessage('showErrorToast',"Compila tutti i campi obbligatori");
        //}
    };
    CrudUI.confirm = function (message, onConfirm, onDenied) {
        if (onDenied === void 0) { onDenied = function () { }; }
        if (confirm(message)) {
            onConfirm();
        }
        else {
            onDenied();
        }
    };
    return CrudUI;
}());
var Message = (function () {
    function Message() {
    }
    Message.show = function (response) {
        if (response.error) {
            toastr.error(response.message);
        }
        else {
            toastr.success(response.message);
        }
    };
    return Message;
}());
var Commons = (function () {
    function Commons() {
    }
    Commons.getParameterValue = function (par) {
        if (typeof par == "object" && par instanceof jQuery) {
            return par.val();
        }
        else if (typeof par == "function") {
            return par();
        }
        else {
            return par;
        }
    };
    Commons.getBlockConfig = function () {
        return {
            message: '<i class="fa fa-cog fa-spin"></i>',
            css: {
                color: '#333',
                border: 'none',
                backgroundColor: 'none',
                fontSize: '30px',
                top: '50%'
            },
            overlayCSS: {
                backgroundColor: '#fff',
                opacity: 0.6,
                cursor: 'wait'
            },
            fadeOut: 0,
            fadeIn: 0
        };
    };
    return Commons;
}());
var LangCRUD = (function () {
    function LangCRUD() {
    }
    LangCRUD.get = function (key, defaultText) {
        return LangCRUD.language[key] || defaultText;
    };
    LangCRUD.set = function (key, value) {
        LangCRUD.language[key] = value;
    };
    LangCRUD.language = {};
    return LangCRUD;
}());
var AutoComplete = (function () {
    function AutoComplete(selector, options) {
        var _this = this;
        this.selector = selector;
        this.settings = $.extend({
            minLength: 0,
            url: "",
            strict: true,
            select: function (event, ui) { },
            onStrict: function (event, ui) { },
            change: function (event, ui) { }
        }, options || {});
        this.element = $(selector);
        this.element.autocomplete({
            minLength: this.settings.minLength,
            source: function (r, callback) {
                $.get(_this.settings.url, { term: r.term }, function (r) {
                    callback(r);
                }, "json");
            },
            select: function (event, ui) {
                ui.isEmpty = ui.item == null || ui.item == undefined;
                _this.settings.select(event, ui);
            },
            change: function (event, ui) {
                ui.isEmpty = ui.item == null || ui.item == undefined;
                _this.settings.change(event, ui);
            }
        });
        this.element.click(function () {
            $(this).autocomplete("search");
        });
    }
    return AutoComplete;
}());