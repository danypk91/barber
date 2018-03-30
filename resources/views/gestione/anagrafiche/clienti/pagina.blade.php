@extends('layouts.app2')
@section('title')
    Clienti
@stop

@section('content')
    <table id="bootstrap-data-tables" class="table table-striped table-bordered"></table>
@stop

@section('script')
    <script type="text/javascript">
        MyTable("#bootstrap-data-tables",{
            url:"/clienti/",
            cols:[
                {"data":"id","title":"ID"},
                {"data":"nome","title":"Nome"},
                {"data":"cognome","title":"Cognome"},
            ],
            /*onItemClick:function(item,e){
                //todo
                console.log(item);
                alert("bbb");
            }*/
        })

    </script>
@stop