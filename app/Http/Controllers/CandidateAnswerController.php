<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CandidateAnswer;
use App\Models\CandidateNote;
use App\Models\Interview;
use Inertia\Inertia;

class CandidateAnswerController extends Controller
{
    /**
     * Affiche la liste de toutes les réponses des candidats.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id)
        {
            $interview= Interview::findOrFail($id);
            $candidateAnswers = CandidateAnswer::with(['answer.question', 'interview.candidate_notes', 'candidate.user','candidate.candidate_notes.interview'])
                ->where('interview_id', $id)
                ->get();

            $formattedData = [];

            foreach ($candidateAnswers as $candidateAnswer) {
                if (!array_key_exists($candidateAnswer->candidate_id, $formattedData)) {
                    $formattedData[$candidateAnswer->candidate_id] = [
                        'candidate' => [
                            'id' => $candidateAnswer->candidate_id,
                            'name' => $candidateAnswer->candidate->user->name,
                            'first_name' => $candidateAnswer->candidate->user->first_name,
                            'last_name' => $candidateAnswer->candidate->user->last_name,              
                        ],
                        'answers' => [],
                        'note' => $candidateAnswer->candidate->candidate_notes[0]->note,
                    ];
                }

                $formattedData[$candidateAnswer->candidate_id]['answers'][] = [
                    'id' => $candidateAnswer->id,
                    'question' => $candidateAnswer->answer->question->question,
                    'question_point' => $candidateAnswer->answer->question->point,
                    'answer' => $candidateAnswer->answer->answer,
                    'answer_of_candidate' => $candidateAnswer->answer_of_candidate,
                    'answer_point' => $candidateAnswer->point,
                    'is_correct' => $candidateAnswer->answer->is_correct,
                ];
            }
            return Inertia::render('Interview/Detail', [
                'candidate_answers' => array_values($formattedData),
                'interview'=>$interview
            ]);
        }


    public function show($interview,$candidate)
        {
            $candidateAnswers = CandidateAnswer::with(['answer.question', 'interview', 'candidate.user'])
            ->where('candidate_id', $candidate)
            ->where('interview_id', $interview)
            ->get();
           
            return Inertia::render('Interview/Detail', [
                'candidate_answers' => $candidateAnswers
            ]);
        }

    public function store(Request $request)
        {
            $request->validate([
                'candidate_id' => 'required|exists:posts,id',
                'interview_id' => 'required|exists:interviews,id',
                'answer_id' => 'required|exists:answers,id',
            ]);

            $candidateAnswer = new CandidateAnswer();

            $candidateAnswer->save();
           
        }

    
    public function destroy($id)
    {
        $candidateAnswer = CandidateAnswer::findOrFail($id);
        $candidateAnswer->delete();

        return response()->json(['message' => 'Réponse de candidat supprimée avec succès !']);
    }


}
