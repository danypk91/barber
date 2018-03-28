@extends('layouts.app2')
@section('title')
    Clienti
@stop

@section('content')
    <table id="bootstrap-data-tables" class="table table-striped table-bordered"></table>
@stop

@section('script')
    <script type="text/javascript">
        $(document).ready(function() {
            $('#bootstrap-data-tables').DataTable({
                "processing": true,
                "serverSide": true,
                "ajax": {
                    "url": "clienti/list",
                    "type": "POST"
                },
                "columns":[
                    {"data":"id","title":"ID"}
                ]
            });
        } );
    </script>
@stop