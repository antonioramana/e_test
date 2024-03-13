<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    use HasFactory;

    protected $fillable=['start_date, end_date, time, isExpired'];

    public function post(){
        return $this->belongsTo(Post::class);
    }
    public function subjects()
    {
        return $this->belongsToMany(Subject::class);
    }
}
