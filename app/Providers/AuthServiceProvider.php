<?php

namespace App\Providers;
use App\Policies\CandidatePolicy;
use App\Policies\InterviewPolicy;
use App\Policies\QuestionPolicy;
use App\Policies\RecruiterPolicy;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Candidate::class => CandidatePolicy::class,
        Question::class => InterviewPolicy::class,
        Question::class => QuestionPolicy::class,
        Recruiter::class => RecruiterPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}
