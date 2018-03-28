@extends('layouts.app2')
@section('title')
    Clienti
@stop

@section('content')
    <table id="bootstrap-data-table" class="table table-striped table-bordered"></table>
@stop

@section('script')
    <script type="text/javascript">
        $(document).ready(function() {
            $('#bootstrap-data-table').DataTable({
                "processing": true,
                "serverSide": true,
                "ajax": {
                    "url": "clienti/list",
                    "type": "POST"
                },
            });
        } );
    </script>
@stop