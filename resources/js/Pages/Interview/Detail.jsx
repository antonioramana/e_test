import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import Modal from "@/Components/Modal";
import { PencilIcon, EyeIcon,TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Form from "./Form";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";


export default function Index({ auth, candidate_answers, interview}) {
    const [showAnswerModal, setShowAnswerModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedData, setSelectedData] = useState(null);
    const [selectedCandidate, setSelectedCandidate] = useState(null); // État pour stocker les détails du candidat sélectionné
    const [showModal, setShowModal] = useState(false); 
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
        cancel,
        hasErrors,
        recentlySuccessful,
    } = useForm({
        note: "",  
    });
    // const columns = useColumns({
    //     onEdit: (data) => {
    //         setSelectedData(data);
    //         setData(data);
    //         setShowEditionModal(true);
    //     },
    //     onDelete: (data) => {
    //         setSelectedData(data);
    //         setShowDeletionModal(true);
    //     },
    // });
    useEffect(() => {
        if (hasErrors) {
            reset("note");
        }

        if (recentlySuccessful) {
            reset();

            if (showCreationModal) {
                setShowAnswerModal(false);
            }

        }
    }, [hasErrors, recentlySuccessful]);

    // const handleCreationSubmit = (e) => {
    //     e.preventDefault();
    //     post(route("departments.store"));
    // };

    // const handleEditionSubmit = (e) => {
    //     e.preventDefault();
    //     put(route("departments.update", selectedData.id));
    // };

    // const handleDeletionSubmit = (e) => {
    //     e.preventDefault();
    //     destroy(route("departments.destroy", selectedData));
    //     setSelectedData(null);
    //     setShowDeletionModal(false);
    // };
    
  const filteredCandidates = candidate_answers.filter(candidate_answer =>
    candidate_answer.candidate.name.toLowerCase().includes(searchTerm.toLowerCase())||candidate_answer.candidate.last_name.toLowerCase().includes(searchTerm.toLowerCase())||candidate_answer.candidate.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleViewCandidateDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setShowModal(true);
  };
    console.log(candidate_answers);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 light:text-gray-200 dark:text-gray-200 leading-tight">
                   Réponses du test {interview.name}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <input
                    type="text"
                    placeholder="Recherche..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="w-full p-3 m-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
                />
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {filteredCandidates.length > 0 ? (
                        filteredCandidates.map((candidate_answer) => (
                            <div key={candidate_answer.candidate.id} className="mb-4 p-4 bg-white rounded-md shadow-md flex flex-col items-center justify-center">
                                <div className="text-lg font-semibold">
                                    {candidate_answer.candidate.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {candidate_answer.candidate.first_name} {candidate_answer.candidate.last_name}
                                </div>
                                <div className="text-sm m-2 text-gray-500">
                                    {candidate_answer.note===null?<span className="text-red-800">Non validé..</span>:<span >Note: {candidate_answer.note}</span>} 
                                </div>
                                <PrimaryButton
                                    onClick={() => handleViewCandidateDetails(candidate_answer)}
                                > Voir
                                </PrimaryButton>
                              
                            </div>
                        ))
                    ) : (
                        <div className="text-red-500 text-center">Aucun résultat...</div>
                    )}
                </div>
            </div>     
              {/* Modal pour afficher les détails du candidat */}
        {selectedCandidate&&
            <Modal
                show={showModal}
                title={"Réponses de l'étudiant " + selectedCandidate.candidate.name+" :"}
                onClose={() => setShowModal(false)}
            >
                <div className="space-y-4 overflow-y-auto max-h-100">
                    {selectedCandidate.answers.length > 0 ? (
                        selectedCandidate.answers.map(answer => (
                            <div key={answer.id} className="border-b border-gray-200 pb-4">
                                <h1 className="text-lg font-semibold">{answer.question} ({answer.question_point} point(s))</h1>
                              {answer.answer_of_candidate ===null? <><p className="text-sm text-gray-600">
                                    Réponse de l'étudiant: {answer.answer} {answer.is_correct ? 
                                        <CheckIcon className="w-4 h-4 text-green-500 inline-block align-middle" /> : 
                                        <XMarkIcon className="w-4 h-4 text-red-500 inline-block align-middle" />
                                    }
                                </p>
                                <p className="text-sm text-gray-600">Point: {answer.answer_point}</p>
                                </> :<><p className="text-sm text-gray-600">
                                    Réponse de l'étudiant: {answer.answer_of_candidate} 
                                </p>
                                <p className="text-sm text-gray-600">Point: {answer.answer_point}</p>
                                </>}
                            </div>
                        ))
                    ) : (
                        <div className="text-red-500">Aucune réponse..</div>
                    )}
                </div>

                <div className="flex items-center justify-end m-4">
                    <input
                        type="number"
                        placeholder={selectedCandidate.note}
                        className="w-50 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 text-sm"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <SecondaryButton
                        className="ms-4 text-sm"
                        onClick={() => setShowModal(false)}
                    >
                        Annuler
                    </SecondaryButton>
                    <PrimaryButton
                        className="ms-4 text-sm"
                        type="submit"
                    >
                        Valider
                    </PrimaryButton>
                </div>
            </Modal>
        }
        </AuthenticatedLayout>
    );
}

// const useColumns = (
//     props,
// )=> {
//     return useMemo(() => {
//         return [
//             {
//                 accessorKey: "name",
//                 cell: (info) =>
//                     `${(info.getValue())}`,
//                 header: () => "Département",
//             },
//             {
//                 accessorKey: "recruiters",
//                 cell: (info) => `${(info.getValue() ).length}`,
//                 header: () => "Nombre d'Enseignant",
//             },
//            {
//                 accessorFn: (row) => row,
//                 id: "id",
//                 cell: (info) => (
//                     <div className="flex space-x-2">
//                     <Link
//                          href={`/departments/${(info.getValue()).id}`}
//                         className={
//                             "inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
//                         }
                        
//                     >
//                         <EyeIcon className="w-3 h-3 mr-1" />
                     
//                     </Link>
                
//                         <button
//                             className={
//                                 "inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-green-500 dark:text-green-400 bg-green-100 dark:bg-green-700 hover:text-green-700 dark:hover:text-green-300 focus:outline-none transition ease-in-out duration-150"
//                             }
//                             onClick={() =>{ 
//                                  setShowEditionModal(true);
                                
//                                  setData(info.getValue() );
//                              }}
//                         >
//                             <PencilIcon className="w-3 h-3 mr-1" /> 
                        
//                         </button>
//                         <button
//                             className={
//                                 "inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-700 hover:text-red-700 dark:hover:text-red-300 focus:outline-none transition ease-in-out duration-150"
//                             }
//                             onClick={() =>{
//                                 setShowDeletionModal(true);
//                                 setSelectedData(info.getValue());
//                             }}
//                         >
//                             <TrashIcon className="w-3 h-3 mr-1" />
                          
//                         </button>

//                 </div>
                
//                 ),
//                 header: () => "Action",
//             },
//         ];
//     }, [props]);
// };
