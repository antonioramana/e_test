<?php

use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\RecruiterController;
use App\Http\Controllers\SubjectController;
use App\Models\Candidate;
use App\Models\Department;
use App\Models\Post;
use App\Models\Question;
use App\Models\Recruiter;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->prefix('departments')->group(function () {
    Route::get('/{id}', [DepartmentController::class, 'show'])->can('viewAny', Recruiter::class)->name('departments.show');
    Route::get('/', [DepartmentController::class, 'index'])->can('viewAny', Recruiter::class)->name('departments.index');
    Route::post('/', [DepartmentController::class, 'store'])->can('create', Recruiter::class)->name('departments.store');
    Route::put('/{id}', [DepartmentController::class, 'update'])->can('create', Recruiter::class)->name('departments.update');
    Route::delete('/{id}', [DepartmentController::class, 'destroy'])->can('create', Recruiter::class)->name('departments.destroy');
});

Route::middleware('auth')->prefix('recruiters')->group(function () {
    Route::get('/{id}', [RecruiterController::class, 'show'])->can('viewAny', Recruiter::class)->name('recruiters.show');
    Route::get('/', [RecruiterController::class, 'index'])->can('viewAny', Recruiter::class)->name('recruiters.index');
    Route::post('/', [RecruiterController::class, 'store'])->can('create', Recruiter::class)->name('recruiters.store');
    Route::put('/{id}', [RecruiterController::class, 'update'])->can('create', Recruiter::class)->name('recruiters.update');
    Route::delete('/{id}', [RecruiterController::class, 'destroy'])->can('create', Recruiter::class)->name('recruiters.destroy');
});

Route::middleware('auth')->prefix('posts')->group(function () {
    Route::get('/{id}', [PostController::class, 'show'])->can('viewAny', Candidate::class)->name('posts.show');
    Route::get('/', [PostController::class, 'index'])->can('viewAny', Candidate::class)->name('posts.index');
    Route::post('/', [PostController::class, 'store'])->can('create', Candidate::class)->name('posts.store');
    Route::put('/{id}', [PostController::class, 'update'])->can('create', Candidate::class)->name('posts.update');
    Route::delete('/{id}', [PostController::class, 'destroy'])->can('create', Candidate::class)->name('posts.destroy');
});

Route::middleware('auth')->prefix('candidates')->group(function () {
    Route::get('/{id}', [CandidateController::class, 'show'])->can('viewAny', Candidate::class)->name('candidates.show');
    Route::get('/', [CandidateController::class, 'index'])->can('viewAny', Candidate::class)->name('candidates.index');
    Route::post('/', [CandidateController::class, 'store'])->can('create', Candidate::class)->name('candidates.store');
    Route::put('/{id}', [CandidateController::class, 'update'])->can('create', Candidate::class)->name('candidates.update');
    Route::delete('/{id}', [CandidateController::class, 'destroy'])->can('create', Candidate::class)->name('candidates.destroy');
});

Route::middleware('auth')->prefix('questions')->group(function () {
    Route::get('/{id}', [QuestionController::class, 'show'])->can('viewAny', Question::class)->name('questions.show');
    Route::get('/', [QuestionController::class, 'index'])->can('viewAny', Question::class)->name('questions.index');
    Route::post('/', [QuestionController::class, 'store'])->can('create', Question::class)->name('questions.store');
    Route::put('/{id}', [QuestionController::class, 'update'])->can('create', Question::class)->name('questions.update');
    Route::delete('/{id}', [QuestionController::class, 'destroy'])->can('create', Question::class)->name('questions.destroy');
});

Route::middleware('auth')->prefix('subjects')->group(function () {
    Route::get('/{id}', [SubjectController::class, 'show'])->can('viewAny', Question::class)->name('subjects.show');
    Route::get('/', [SubjectController::class, 'index'])->can('viewAny', Question::class)->name('subjects.index');
    Route::post('/', [SubjectController::class, 'store'])->can('create', Question::class)->name('subjects.tore');
    Route::put('/{id}', [SubjectController::class, 'update'])->can('create', Question::class)->name('subjects.update');
    Route::delete('/{id}', [SubjectController::class, 'destroy'])->can('create', Question::class)->name('subjects.destroy');
});

require __DIR__.'/auth.php';
