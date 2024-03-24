import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import Modal from "@/Components/Modal";
import { PencilIcon, EyeIcon,TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Form from "./Form";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Index({ auth, questions}) {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);
    const [showEditionModal, setShowEditionModal] = useState(false);
    const [showAnswersModal, setShowAnswersModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
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
        question: "",  
        point: 0,  
        answers: [],  
    });
    const columns = useColumns({
        onEdit: (data) => {
            setSelectedData(data);
            setData(data);
            setShowEditionModal(true);
        },
        onDelete: (data) => {
            setSelectedData(data);
            setShowDeletionModal(true);
        },
        onShow: (data) => {
            setSelectedData(data);
            setShowAnswersModal(true);
        },
    });
    useEffect(() => {
        if (hasErrors) {
            reset("question");
        }

        if (recentlySuccessful) {
            reset();

            if (showCreationModal) {
                setShowCreationModal(false);
            }

            if (showEditionModal) {
                setShowEditionModal(false);
            }
        }
    }, [hasErrors, recentlySuccessful]);

    const handleCreationSubmit = (e) => {
        e.preventDefault();
        post(route("questions.store"));
    };

    const handleEditionSubmit = (e) => {
        e.preventDefault();
        put(route("questions.update", selectedData.id));
    };

    const handleDeletionSubmit = (e) => {
        e.preventDefault();
        destroy(route("questions.destroy", selectedData));
        setSelectedData(null);
        setShowDeletionModal(false);
    };
    console.log(questions);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 light:text-gray-200 dark:text-gray-200 leading-tight">
                    Questions && Réponse
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                   <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Datagrid
                            columns={columns}
                            rows={questions}
                           // canCreate={auth.user.can.createBroker}
                            onCreate={() => setShowCreationModal(true)}
                        />
                    </div>
            </div>

            <Modal
                show={showCreationModal}
                title="Ajouter une question"
                onClose={() => setShowCreationModal(false)}
            >
                <Transition
                    show={hasErrors}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-center text-red-600 dark:text-red-400">
                        Quelque chose s'est mal passé.
                    </p>
                </Transition>
                <Form
                    mode={showEditionModal ? "editon" : ("creation")}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={
                        showEditionModal
                            ? handleEditionSubmit
                            : handleCreationSubmit
                    }
                    onCancel={() => {
                        cancel();
                        setShowCreationModal(false);
                    }}
                    onReset={() => reset("name")}
                />
            </Modal>

            <Modal
                show={showEditionModal}
                title="Modifier une dquestion"
                onClose={() => setShowEditionModal(false)}
            >
                <Transition
                    show={hasErrors}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-center text-red-600 dark:text-red-400">
                        Quelque chose s'est mal passé.
                    </p>
                </Transition>
                <Form
                    mode="edition"
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleEditionSubmit}
                    onCancel={() => {
                        cancel();
                        setShowEditionModal(false);
                    }}
                    onReset={() => reset()}
                />
            </Modal>

            <Modal
                show={showDeletionModal}
                title="Supprimer une question "
                onClose={() => setShowDeletionModal(false)}
            >
                {/* <DeletionConfirmation
                    name={
                        selectedData?.name
                    }
                    onCancel={() => {
                        cancel();
                        setShowDeletionModal(false);
                        // setSelectedData(null);
                    }}
                    handleDeleteSubmit={handleDeletionSubmit}
                /> */}
            </Modal>

            <Modal
                    show={showAnswersModal}
                    title="Réponse(s) d'une question"
                    onClose={() => setShowAnswersModal(false)}
                >
                    <div className="p-4 m-5 dark:text-white">
                        <h1 className="text-xl font-semibold mb-2">{selectedData?.question}:</h1> 
                        <h2 className="text-lg mb-4">Points : {selectedData?.point}</h2> 
                        <ul>
                            {selectedData?.answers.length > 0 && selectedData.answers.map((answer, index) => (
                                <li key={answer.id} className="flex items-center mb-2">
                                    <div className="m-2 p-2">
                                        {answer.is_correct ? 
                                            <CheckIcon className="w-10 h-5 text-green-500" /> : 
                                            <XMarkIcon className="w-10 h-5 text-red-500" />
                                        }
                                    </div>
                                    <span className="mr-2">{index+1}-{answer.answer}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex items-center border-t p-2 dark:border-gray-600 justify-center m-4">
                        <SecondaryButton className="mx-4" onClick={() => setShowAnswersModal(false)}>
                            Annuler
                        </SecondaryButton>
                    </div>
                </Modal>
        </AuthenticatedLayout>
    );
}

const useColumns = (
    props,
)=> {
    return useMemo(() => {
        return [
            {
                accessorKey: "question",
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Question",
            },
            {
                accessorKey: "answers",
                cell: (info) => `${(info.getValue() ).length}`,
                header: () => "Nombre des réponses",
            },
            {
                accessorKey: "point",
                cell: (info) => `${(info.getValue())}`,
                header: () => "Point",
            },
           {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <div className="flex space-x-2">
                      <button
                            className={
                                "inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                            }
                            onClick={() =>{
                                props.onShow(info.getValue());
                                //setSelectedData(info.getValue());
                            }}
                        >
                            <EyeIcon className="w-3 h-3 mr-1" />
                          
                        </button>
                
                        <button
                            className={
                                "inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-green-500 dark:text-green-400 bg-green-100 dark:bg-green-700 hover:text-green-700 dark:hover:text-green-300 focus:outline-none transition ease-in-out duration-150"
                            }
                            onClick={() =>{ 
                                 setShowEditionModal(true);
                                
                                 setData(info.getValue() );
                             }}
                        >
                            <PencilIcon className="w-3 h-3 mr-1" /> 
                        
                        </button>
                        <button
                            className={
                                "inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-700 hover:text-red-700 dark:hover:text-red-300 focus:outline-none transition ease-in-out duration-150"
                            }
                            onClick={() =>{
                                setShowDeletionModal(true);
                                setSelectedData(info.getValue());
                            }}
                        >
                            <TrashIcon className="w-3 h-3 mr-1" />
                          
                        </button>

                </div>
                
                ),
                header: () => "Action",
            },
        ];
    }, [props]);
};
