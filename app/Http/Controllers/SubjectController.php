<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subject;
use App\Models\Question;

class SubjectController extends Controller
{

    public function index()
    {
        $subjects = Subject::with('questions')->get();

        return response()->json(['data' => $subjects]);
    }

    public function show($id)
    {
        $subject = Subject::with('questions')->findOrFail($id);

        return response()->json(['data' => $subject]);
    }

    public function createSubjectWithQuestions(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            ]);
        $subject = new Subject();
        $subject->subject = $request->input('subject');
        $subject->save();

        $questionsData = $request->input('questions'); // Tableau de questions
        foreach ($questionsData as $questionData) {
            $subject->questions()->attach($question->id);
        }

        return response()->json(['message' => 'Sujet créé avec succès avec les questions associées !']);
    }

    public function destroy($id)
        {
            $subject= Subject::findOrFail($id); 
            $subject->delete();

            return response()->json(['message' => 'Sujet  supprimé avec succès !']);
        }
    public function update(Request $request, $id)
        {
            $request->validate([
                'subject' => 'required|string|max:255', 
            ]);
        
            $subject= Subject::findOrFail($id); 
            $subject->subject = $request->input('subject'); 

            $subject->save();
        
            return response()->json(['message' => 'Sujet mis à jour avec succès !']);
        }
        
    
}
