<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //        
        $userGroups = Group::where('user_id', Auth::user()->id)->with('cities')->get();
        return response()->json([
            'userGroups' => $userGroups,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $request->validate(
            [
                'groupName' => 'required|max:30',
                'selectedCities' => 'required|array|min:1|max:5',
            ],
            [
                'groupName.required' => 'Informe um nome para este Grupo!',
                'groupName.max' => 'O nome do Grupo não pode ter mais de 30 caracteres!',
                'selectedCities.max' => 'Informe no máximo até 5 Cidades!',
                'selectedCities.min' => 'Informe pelo menos uma Cidade!',
                'selectedCities.required' => 'Informe pelo menos uma Cidade!',
                'selectedCities.array' => 'Informe pelo menos uma Cidade!',
            ]
        );

        $group = new Group;
        $group->name = $request->groupName;
        $group->user_id = Auth::user()->id;
        
        if ($group->save() && $group->cities()->sync($request->selectedCities)) {
            return response()->json([
                'success' => 'Grupo criado com Sucesso!',
            ]);
        }

        return response()->json([
            'error' => 'Houve uma falha ao criar o Grupo.',
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function show(Group $group)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function edit(Group $group)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Group $group)
    {
        //
        //
        $request->validate(
            [
                'groupId' => 'required|integer',
                'groupName' => 'required|max:30',
                'selectedCities' => 'required|array|min:1|max:5',
            ],
            [
                'groupName.required' => 'Informe um nome para este Grupo!',
                'groupName.max' => 'O nome do Grupo não pode ter mais de 30 caracteres!',
                'selectedCities.max' => 'Informe no máximo até 5 Cidades!',
                'selectedCities.min' => 'Informe pelo menos uma Cidade!',
                'selectedCities.required' => 'Informe pelo menos uma Cidade!',
                'selectedCities.array' => 'Informe pelo menos uma Cidade!',
            ]
        );

        $group = Group::where('id', $request->groupId)->first();
        $group->name = $request->groupName;

        
        if ($group->save() && $group->cities()->sync($request->selectedCities)) {
            return response()->json([
                'success' => 'Grupo editado com Sucesso!',
            ]);
        }

        return response()->json([
            'error' => 'Houve uma falha ao editar o Grupo.',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Group $group)
    {
        //

        $group = Group::where('id', $request->groupId)->first();
        $group->cities()->sync([]);
        
        if($group->delete()){
            return response()->json([
                'success' => 'Grupo excluído com Sucesso!',
            ]);
        }

        return response()->json([
            'error' => 'Houve uma falha ao excluir o Grupo.',
        ]);

    }
}
