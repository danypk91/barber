<?php
/**
 * Created by PhpStorm.
 * User: danie
 * Date: 28/03/2018
 * Time: 15:38
 */

namespace App\Http\Controllers\Gestione\Clienti;


use App\Http\Controllers\Controller;
use App\Repositories\Nominativi\Nominativo;
use Illuminate\Http\Request;

class ClientiController extends Controller
{
    function __construct(Request $request)
    {
        $this->request = $request;
    }
    public function index(){
        return view("gestione.anagrafiche.clienti.pagina");
    }

    public function getTable(){
        $items = Nominativo::query();
        return \DataTables::of($items)->make(true);
    }
    public function getForm(){
        $item = Nominativo::where('id',$this->request->id)->first();
        //dd($item);
        return view('gestione.anagrafiche.clienti.form',compact('item'));
    }

    public function postSave(){
        dd($this->request);
    }
}