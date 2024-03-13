<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate_answer extends Model
{
    use HasFactory;

 
    public function candidate(){
       return $this->belongsTo(Candidate::class);
    }

    public function answer(){
        return $this->belongsTo(Answer::class);
    }

    public function interview(){
        return $this->belongsTo(Interview::class);
    }
    // public function answers()
    // {
    //     return $this->belongsToMany(Answer::class);
    // }
}
