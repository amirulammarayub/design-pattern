import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { upload } from '@/routes';
import { useState } from 'react';
import type { BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { on } from 'process';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Upload',
        href: upload(),
    },
];

export default function Upload() {
    const [file, setFile] = useState<File | null>(null);

    function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log('File input changed', event);
        setFile(event.target.files?.[0] || null);
    }

    function submitFile() {
        if (!file) {
            console.warn('No file selected');
            return;
        }
        console.log('Submitting file', file);
        const formData = new FormData();
        formData.append('file', file);

        router.post('/transactions/import', formData, {
            onSuccess: () => {
                console.log('File uploaded successfully');
            },
            onError: (error) => {
                console.error('Error uploading file', error);
            }
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Upload" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <FieldLabel htmlFor="file-input">Upload Bank Transactions</FieldLabel>
                <FieldDescription>
                    Please upload your bank transactions in CSV or Excel format.
                </FieldDescription>
                <Input 
                    type="file" 
                    id="file-input" 
                    // className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                    accept='.csv, .xlsx, .xls'
                    onChange={onFileChange}
                />
                <div className="flex flex-wrap items-center gap-2 md:flex-row">
                    <Button variant="outline" onClick={submitFile}>select file</Button>
                </div>
            </div>
        </AppLayout>
    );
}
