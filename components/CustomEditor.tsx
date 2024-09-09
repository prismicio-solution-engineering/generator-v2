
'use client'

import { SandpackCodeEditor, useActiveCode, useSandpack } from "@codesandbox/sandpack-react";
import { useEffect } from "react";

interface Window {
    showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
}

// Augment the Window type (can also be done in a separate .d.ts file)
declare global {
    interface Window {
        showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
    }
}

function snakeToPascal(str: string) {
    return str
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

export const CustomEditor = ({ component = "", model = "", sliceComponent = "", setComponent }: { component: string, model: string, sliceComponent: string, setComponent: React.Dispatch<React.SetStateAction<string>> }) => {
    const { sandpack } = useSandpack();

    const handleButtonClick = async () => {
        if (!window.showDirectoryPicker) {
            alert("Your browser does not support directory selection.");
            return;
        }

        try {
            const directoryHandle = await window.showDirectoryPicker();
            // Add your logic to handle file download and saving to the selected directory
            console.log("Directory selected:", directoryHandle);


            const indexFileHandle = await directoryHandle.getFileHandle('index.ts', { create: true });
            // Read the contents of the file
            const file = await indexFileHandle.getFile();
            let contents = await file.text();

            if (sandpack.files['/model.json'].code !== "Slicify your component to get the model") {
                const model = JSON.parse(sandpack.files['/model.json'].code)
                const sliceComponent = sandpack.files['/index.tsx.txt'].code

                // Add the new line
                if (!contents.includes(model.id)) {
                    console.log(model.id)

                    // Find the position of the last closing brace and insert the new line before it
                    const insertionPoint = contents.lastIndexOf('};');
                    if (insertionPoint !== -1) {
                        const newComponent = '  ' + model.id + ': dynamic(() => import("./' + snakeToPascal(model.id) + '")),\n';
                        contents = contents.substring(0, insertionPoint) + newComponent + contents.substring(insertionPoint);
                    }
                    // Write the changes back to the file
                    const indexFilewritable = await indexFileHandle.createWritable();
                    await indexFilewritable.write(contents);
                    await indexFilewritable.close();

                    // Create a new folder in the selected directory
                    const newFolderHandle = await directoryHandle.getDirectoryHandle(snakeToPascal(model.id), { create: true });

                    const fileHandle = await newFolderHandle.getFileHandle('model.json', { create: true });
                    const writable = await fileHandle.createWritable();
                    await writable.write(JSON.stringify(model));
                    await writable.close();

                    const componentFileHandle = await newFolderHandle.getFileHandle('index.tsx', { create: true });
                    const componentWritable = await componentFileHandle.createWritable();
                    await componentWritable.write(sliceComponent);
                    await componentWritable.close();

                    // Convert base64 string to a Blob
                    // for (let i = 0; i < slice.images.length; i++) {
                    //     const imageBlob = base64ToBlob(slice.images[i].base64);

                    //     // Create a new file and write the Blob to it
                    //     const imageFileHandle = await newFolderHandle.getFileHandle(slice.images[i].name, { create: true });
                    //     const imageWritable = await imageFileHandle.createWritable();
                    //     await imageWritable.write(imageBlob);
                    //     await imageWritable.close();
                    // }

                }
                else {
                    alert("A slice with same name already exists in your repo")
                }
            }
            else{
                alert("Please slicify your component before trying to add it your project." )
            }

                console.log("Files written successfully");
            } catch (err) {
                console.error("Error selecting directory:", err);
            }
        };

        // Function to convert base64 to Blob
        function base64ToBlob(base64: string) {
            const binaryString = window.atob(base64.split(',')[1]);
            const bytes = new Uint8Array(binaryString.length);

            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            return new Blob([bytes], { type: 'image/png' });
        }


        useEffect(() => {
            // *************************************** //
            //      UPDATED CODE FROM STATE!!         //
            // *************************************** //
            if (sandpack.files['/App.tsx'].code !== `//------
//Loading... Please wait for generation
//------

import React from 'react';

const LoadingComponent = () => (
<div className="flex items-center justify-center h-screen">
<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
</div>
);

export default LoadingComponent;`) {
                setComponent(sandpack.files['/App.tsx'].code);
            }
        }, [sandpack.files['/App.tsx']])

        return (
            <>
                <SandpackCodeEditor
                    wrapContent
                    style={{
                        height: '800px'
                    }} showLineNumbers={true} showRunButton={false} />
                <button className="font-bold p-2 rounded-md bg-gray-300 hover:bg-gray-500 hover:text-gray-200" onClick={handleButtonClick}>
                    Add to my project
                </button>
            </>
        )
    }


    export default CustomEditor;