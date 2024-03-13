<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    protected $fillable=['status','gender'];

    public function user(){
       return $this->belongsTo(User::class);
    }

    public function Post(){
        return $this->belongsTo(Post::class);
    }
    public function candidate_answer()
    {
        return $this->hasMany(Candidate_answer::class);
    }
}
