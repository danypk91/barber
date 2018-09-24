@extends('layouts.app2')
@section('title')
    Clienti
@stop

@section('left-bar')
    <form class="filter" id="filter">
        <div class="form-group">
            <label for="company" class=" form-control-label">Cerca</label>
            <input type="text" id="search" placeholder="Cerca" class="form-control">
            <span class="clearfix"></span>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-outline-secondary btn-sm" style="margin-right: 5px;">Cerca</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" style="margin-right: 5px;">Svuota</button>
        </div>
    </form>
@stop
@section('content')
    <table id="tabella" class="table table-striped table-bordered table-sm" style="background-color: #fff"></table>
    <div class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title">Modal title</h4>
                </div>
                <div class="modal-body">
                    <p>One fine body…</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
@stop

@section('script')
    <script type="text/javascript">
        function renderOp(row,display,data){
            return '<button class="btn btn-primary btn-xs" onclick=progetti_customersUI.formUpdate({id:'+row+'}) type="button"><i class="fa fa-pencil"></i></button>'
        }
        clienti= new CrudUI({
            url:"clienti",
            dialogW:'940',
            cols:[
                {"data": "id", "title": "ID"},
                {"data": "nome", "title": "Nome"},
                {"data": "cognome", "title": "Cognome"},
                {"data": "id", "title": "Op",render:renderOp},
            ],
            listElement : '#tabella', //id della tabella per dataTables
            formID:'myForm'

        });
        clienti.list()
    </script>
@stop