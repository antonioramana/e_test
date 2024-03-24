import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    UserIcon,
    QuestionMarkCircleIcon,
    AcademicCapIcon,
    BookOpenIcon,

} from "@heroicons/react/24/solid";

export default function Dashboard({ auth, count}) {
 
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 light:text-gray-200  leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-5 bg-white text-gray-900 light:bg-gray-800  light:text-gray-100  overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div className="rounded-lg bg-orange-400  light:bg-gray-600 h-32 flex items-center justify-center">
                                <UserIcon className="h-16 w-16 text-white" />
                                <div className="text-4xl text-white ml-4">124</div>
                                <div className="text-lg text-gray-900 ml-2">Étudiants</div>
                            </div>
                            <div className="rounded-lg bg-gray-300  light:bg-gray-600 h-32 flex items-center justify-center">
                                <QuestionMarkCircleIcon className="h-16 w-16 text-white" />
                                <div className="text-4xl text-white ml-4">300</div>
                                <div className="text-lg text-gray-900 ml-2">Questions</div>
                            </div>
                            <div className="rounded-lg bg-gray-300  light:bg-gray-600 h-32 flex items-center justify-center">
                                <AcademicCapIcon className="h-16 w-16 text-white" />
                                <div className="text-4xl text-white ml-4">21</div>
                                <div className="text-lg text-gray-900 ml-2">Sujets</div>
                            </div>
                            <div className="rounded-lg bg-gray-300  light:bg-gray-600 h-32 flex items-center justify-center">
                                <BookOpenIcon className="h-16 w-16 text-white" />
                                <div className="text-4xl text-white ml-4">4</div>
                                <div className="text-lg text-gray-900 ml-2">Tests</div>
                            </div>
                        </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="rounded-lg bg-gray-300  light:bg-gray-600 h-48 md:h-72"></div>
                            <div className="rounded-lg bg-gray-300  light:bg-gray-600 h-48 md:h-72"></div>
                        </div>
                        <div className="rounded-lg bg-gray-300  light:bg-gray-600 h-96 mb-4"></div>
                    </div>
                </div>
        </AuthenticatedLayout>
    );
}
