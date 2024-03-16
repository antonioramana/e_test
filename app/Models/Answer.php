<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $fillable=['answer,is_correct'];

    public function question(){
        return $this->belongsTo(Question::class);
    }
    public function candidate_answer()
    {
        return $this->hasMany(Candidate_answer::class);
    }
}

