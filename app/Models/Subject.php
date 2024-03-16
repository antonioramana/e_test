<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;
    
    protected $fillable=['subject'];
    
    public function questions()
    {
        return $this->belongsToMany(Question::class);
    }
    public function interviews()
    {
        return $this->belongsToMany(Interview::class);
    }
}
