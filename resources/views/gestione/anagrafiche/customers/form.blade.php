@section('title')
    Clienti
@stop
<form id="myForm">
    <div class="form-row">
        <div class="form-group col-md-4">
            <label>Nome</label>
            <input class="form-control" name="nome" value={{$item->nome}}>
        </div>
        <div class="form-group col-md-4">
            <label>Cogome</label>
            <input class="form-control" name="cognome" value={{$item->cognome}}>
        </div>
    </div>
</form>