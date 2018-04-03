@extends('layouts.app2')
@section('title')
    Clienti
@stop

@section('content')
    <table id="tabella" class="table table-striped table-bordered table-sm"></table>
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
        progetti_customersUI= new CrudUI({
            url:"clienti",
            dialogW:'940',
            cols:[
                {"data": "id", "title": "ID"},
                {"data": "nome", "title": "Nome"},
                {"data": "cognome", "title": "Cognome"},
            ],
            listElement : '#tabella', //id della tabella per dataTables
        });
        progetti_customersUI.list()
    </script>
@stop