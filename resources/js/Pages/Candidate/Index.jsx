import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import Modal from "@/Components/Modal";
import { EnvelopeIcon,
    EyeIcon,
    PencilIcon,
    PhoneIcon,
    TrashIcon, } from "@heroicons/react/24/outline";
import Form from "./Form";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import Avatar from "@/Components/Avatar";
import ImportStudentsForm from "./Import";

export default function Index({ auth, candidates}) {
    console.log(candidates);

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
            reset("name");
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
        post(route("candidates.store"));
    };

    const handleEditionSubmit = (e) => {
        e.preventDefault();
        put(route("candidates.update", selectedData.id));
    };

    const handleDeletionSubmit = (e) => {
        e.preventDefault();
        destroy(route("candidates.destroy", selectedData));
        setSelectedData(null);
        setShowDeletionModal(false);
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 light:text-gray-200 dark:text-gray-200 leading-tight">
                   Etudiants
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <ImportStudentsForm />
                   <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Datagrid
                            columns={columns}
                            rows={candidates}
                           // canCreate={auth.user.can.createBroker}
                            onCreate={() => setShowCreationModal(true)}
                        />
                    </div>
            </div>
        </AuthenticatedLayout>
    );
}

const useColumns = (
    props,
)=> {
    return useMemo(() => {
        return [
            {
                accessorFn: (row) => row.user,
                id: "last_name",
                cell: (info) => {
                    const { email, phone, first_name, last_name } =
                        info.getValue();
                    const name = `${first_name} ${last_name}`;

                    return (
                        <div className="flex items-center gap-2">
                            <Avatar size="lg" src="" alt={name} />
                            <div className="space-y-2">
                                <h2 className="text-[16px] font-semibold">
                                    {name}
                                </h2>
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1 text-xs font-thin italic">
                                        <EnvelopeIcon className="w-3 h-3" />
                                        {email}
                                    </span>
                                    {phone && (
                                        <span className="flex items-center gap-1 text-xs font-thin italic">
                                            <PhoneIcon className="w-3 h-3" />
                                            {phone}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                },
                header: () => "Courtier",
            },
            {
                accessorKey: "gender",
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Genre",
            },
            {
                accessorKey: "post.name",
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Niveau",
            },
            {
                accessorKey: "user.address",
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Adresse",
            },
    
           {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <div className="flex space-x-2">
                    <Link
                         href={`/departments/${(info.getValue()).id}`}
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
