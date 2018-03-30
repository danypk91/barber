function MyTable(selettore,options) {
    var settings = {
        onItemClick: function (){alert("aaa")}
    }

    var table = $(selettore).DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": options.url+'table',
            "type": "GET"
        },
        "columns":options.cols,
    });

    $(selettore).on("click","tbody td:not(.op)",function (e) {
        var item = table.row( $(this).parent("tr") ).data();
        options.onItemClick(item, e);
    });
}