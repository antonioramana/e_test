<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Interview;
use App\Models\Subject;

class InterviewController extends Controller
{
     /**
     * Affiche la liste de tous les entretiens.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $interviews = Interview::with(['subject.questions.answers','post'])->get();

        return response()->json(['data' => $interviews]);
    }
    /**
     * Affiche un entretien.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($post_id)
    {
        $interview = Interview::where('post_id','=',$post_id)->get();
        $interview->load('subject', 'post');
        if (!$interview) {
            return response()->json(['message' => 'Interview not found'], 404);
        }
        return response()->json($interview);
    }
        /**
     * Affiche un entretien.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show2($interview_id)
    {
        $interview = Interview::where('id','=',$interview_id)->get();
        $interview->load('subject.questions.answers', 'post');
        if (!$interview) {
            return response()->json(['message' => 'Interview not found'], 404);
        }
        return response()->json($interview);
    }

    /**
     * Crée un nouvel entretien avec des sujets associés.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createInterviewWithSubjects(Request $request)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'time' => 'required|integer',
            'post_id' => 'required|exists:posts,id',
            'subject_id' => 'required|exists:subjects,id', 
        ]);
       
        $interview = new Interview();
        $interview->start_date = $request->input('start_date');
        $interview->end_date = $request->input('end_date');
        $interview->time = $request->input('time');
        $interview->post_id = $request->input('post_id');
        $interview->subject_id = $request->input('subject_id');
        $interview->save();

        return response()->json(['message' => 'Entretien créé avec succès avec un sujet associé !']);
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'time' => 'required|integer',
            'post_id' => 'required|exists:posts,id',
            'subject_id' => 'required|exists:subjects,id',
        ]);

        $interview = Interview::findOrFail($id);
        $interview->start_date = $request->input('start_date');
        $interview->end_date = $request->input('end_date');
        $interview->time = $request->input('time');
        $interview->post_id = $request->input('post_id');
        $interview->post_id = $request->input('subject_id');

        $interview->save();

        return response()->json(['message' => 'Entretien mis à jour avec succès !']);
    }


    public function destroy($id)
    {
        $interview = Interview::findOrFail($id);
        $interview->delete();

        return response()->json(['message' => 'Entretien supprimé avec succès !']);
    }

}
