import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import Modal from "@/Components/Modal";
import { PencilIcon, EyeIcon,TrashIcon } from "@heroicons/react/24/outline";
import Form from "./Form";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";


export default function Index({ auth, interviews, subjects,  posts}) {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);
    const [showEditionModal, setShowEditionModal] = useState(false);
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
        name: "",  
        start_date: "",  
        end_date: "",  
        time: "",
        subject_id: "",  
        post_id: "",  
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
    });
    useEffect(() => {
        if (hasErrors) {
            reset("end_date","post_id","subject_id","time");
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
        post(route("tests.store"));
    };

    const handleEditionSubmit = (e) => {
        e.preventDefault();
        put(route("tests.update", selectedData.id));
    };

    const handleDeletionSubmit = (e) => {
        e.preventDefault();
        destroy(route("tests.destroy", selectedData));
        setSelectedData(null);
        setShowDeletionModal(false);
    };
    console.log("interviews", interviews,"subjects", subjects ,"posts", posts);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 light:text-gray-200 dark:text-gray-200 leading-tight">
                    Départements
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                   <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Datagrid
                            columns={columns}
                            rows={interviews}
                           // canCreate={auth.user.can.createBroker}
                            onCreate={() => setShowCreationModal(true)}
                        />
                    </div>
            </div>

            <Modal
                show={showCreationModal}
                title="Ajouter une test"
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
                title="Modifier une test"
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
                title="Supprimer une test "
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
        </AuthenticatedLayout>
    );
}

const useColumns = (
    props,
)=> {
    return useMemo(() => {
        return [
            {
                accessorKey: "name",
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Nom du test",
            },
            {
                accessorKey: "start_date",
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Début",
            },
            {
                accessorKey: "end_date",
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Fin",
            },
            {
                accessorKey: "time",
                //cell: (info) =>(<span>{info.getValue()/60>0?<>{info.getValue()}</>:<></>}</span>),
                cell: (info) =>(<span>{info.getValue()}</span>),
                header: () => "Durée",
            },
            {
                accessorKey: "post.name",
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Post",
            },
            {
                accessorKey: "subject.subject",
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Sujet",
            },
             {
                accessorKey: "is_expired",
                cell: (info) =>(<span>{info.getValue()?"Expiré":"Non expiré"}</span>),
                header: () => "Status",
            },
           {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <div className="flex space-x-2">
                    <Link
                         href={`/student-answers/${(info.getValue()).id}`}
                        className={
                            "inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                        }           
                    >
                        <EyeIcon className="w-3 h-3 mr-1" />
                     
                    </Link>
                
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
