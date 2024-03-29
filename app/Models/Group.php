<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "user_id"
    ];

    public function user()
    {
    	return $this->belongsTo('App\Models\User');
    }

    public function cities()
    {
    	return $this->belongsToMany('App\Models\City');
    }

}
