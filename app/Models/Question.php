<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable=['question, point'];

    public function answers()
    {
        return $this->hasMany(Answers::class);
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class);
    }

}