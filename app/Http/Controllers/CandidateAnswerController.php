<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CandidateAnswer;

class CandidateAnswerController extends Controller
{
    /**
     * Affiche la liste de toutes les réponses des candidats.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $candidateAnswers = CandidateAnswer::all();

        return response()->json(['data' => $candidateAnswers]);
    }

 public function show($id)
        {
            // Trouvez les réponses du candidat par son ID avec les relations associées
            $candidateAnswers = CandidateAnswer::with(['answer', 'interview', 'candidate'])->where('candidate_id', $id)->get();
        
            return response()->json(['data' => $candidateAnswers]);
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

            return response()->json(['message' => 'Réponse de candidat créée avec succès !'], 201); 
        }

    
 public function destroy($id)
    {
        $candidateAnswer = CandidateAnswer::findOrFail($id);
        $candidateAnswer->delete();

        return response()->json(['message' => 'Réponse de candidat supprimée avec succès !']);
    }


}
