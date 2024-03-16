<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Answer;

class QuestionController extends Controller
{
    public function index()
    {
        $questions = Question::with('answers')->get();
        return response()->json($questions);
    }

    /**
     * Crée une nouvelle question avec des réponses.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createQuestion(Request $request)
    {
        $request->validate([
            'question' => 'required|string|max:255',
            'point' => 'required|integer',
            'answers' => 'required|array',
            'answers.*.answer' => 'required|string|max:255',
            'answers.*.is_correct' => 'required|boolean',
        ]);

        $question = new Question();
        $question->question = $request->input('question');
        $question->point = $request->input('point');
        $question->save();

        foreach ($request->input('answers') as $answerData) {
            $answer = new Answer();
            $answer->answer = $answerData['answer'];
            $answer->is_correct = $answerData['is_correct'];
            $answer->question_id = $question->id;
            $answer->save();
        }

        return response()->json(['message' => 'Question créée avec succès !']);
    }

    public function show($id)
    {
        $question = Question::findOrFail($id);
        $question->load('answers');
        return response()->json(['question' => $question]);
    }

     public function update(Request $request, $id)
        {
            $request->validate([
                'question' => 'required|string|max:255',
                'point' => 'required|integer',
            ]);

            $question = Question::findOrFail($id);

            $question->question = $request->input('question');
            $question->point = $request->input('point');

            $question->save();

            return response()->json(['message' => 'Question mise à jour avec succès !']);
        }

        public function destroy($id)
        {
            $question = Question::findOrFail($id);
            $question->delete();

            return response()->json(['message' => 'Question supprimée avec succès !']);
        }


}
