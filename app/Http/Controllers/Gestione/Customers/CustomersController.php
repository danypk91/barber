<?php
/**
 * Created by PhpStorm.
 * User: danie
 * Date: 28/03/2018
 * Time: 15:38
 */

namespace App\Http\Controllers\Gestione\Customers;


use App\Http\Controllers\Controller;
use App\Repositories\Customers\Customers;
use Illuminate\Http\Request;
use \DB;

class CustomersController extends Controller
{
    function __construct(Request $request)
    {
        $this->request = $request;
    }
    public function index(){
        return view("gestione.anagrafiche.customers.pagina");
    }

    public function show(){
        $items = Customers::select('*');
        if($this->request->search){
            $items->where(function($q) {
                $q->orWhere(DB::raw("concat(nome,' ',cognome)"),'like','%'.$this->request->search.'%')
                    ->orWhere(DB::raw("concat(cognome,' ',nome)"),'like','%'.$this->request->search.'%')
                    ->orWhere("luogo_nascita",'like','%'.$this->request->search.'%')
                    ->orWhere("indirizzo",'like','%'.$this->request->search.'%');
            });
        }
        if($this->request->sesso){
            $items->where('sesso',$this->request->sesso);
        }

        return \DataTables::of($items)->make(true);
    }
    public function form(){
        $item = Customers::where('id',$this->request->id)->first();
        return view('gestione.anagrafiche.customers.form',compact('item'));

    }

    public function postSave(){
        dd($this->request);
    }
}