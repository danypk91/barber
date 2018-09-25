<?php
/**
 * Created by PhpStorm.
 * User: danie
 * Date: 28/03/2018
 * Time: 15:38
 */

namespace App\Http\Controllers\Gestione\Customers;


use App\Http\Controllers\Controller;
use App\Repositories\Customers\CustomersRepo;
use Illuminate\Http\Request;

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
        $items = CustomersRepo::query();
        return \DataTables::of($items)->make(true);
    }
    public function form(){
        $item = CustomersRepo::where('id',$this->request->id)->first();
        return view('gestione.anagrafiche.customers.form',compact('item'));

    }

    public function postSave(){
        dd($this->request);
    }
}