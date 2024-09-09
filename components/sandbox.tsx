'use client'

import {
    Sandpack, SandpackCodeEditor, SandpackConsole, SandpackLayout, SandpackPreview, SandpackProvider, useActiveCode,
} from "@codesandbox/sandpack-react";

import { defaultComponent, defaultModel, defaultSliceComponent } from "@/slices/files";
import React from 'react';
import CustomEditor from "./CustomEditor";

export const SandBox = ({ component = "", model = "", sliceComponent = "", setComponent }: { component: string, model: string, sliceComponent: string, setComponent: React.Dispatch<React.SetStateAction<string>> }) => {
    const files = {
        '/App.tsx': component,
        '/model.json': model,
        '/index.tsx.txt': sliceComponent,
    }
    return (
        <>
            {/* <Sandpack
                files={files}
                template="react-ts"
                options={{
                    autoReload: true,
                    autorun: true,
                    externalResources: ['https://cdn.tailwindcss.com'],
                    editorHeight: "800px",
                    wrapContent: true,
                    editorWidthPercentage: 40,
                }}
                customSetup={{
                    dependencies: {},
                }} /> */}
            <SandpackProvider
                template="react-ts"
                files={files}
                options={{
                    autoReload: true,
                    autorun: true,
                    externalResources: ['https://cdn.tailwindcss.com'],
                    classes: { "sp-layout": "grid grid-rows-2" }
                }}>
                <SandpackLayout>
                    <SandpackPreview style={{
                        width: 100 + "%",
                        height: '800px'
                    }} showOpenInCodeSandbox={false} />
                </SandpackLayout>
                <SandpackLayout>
                    <CustomEditor component={component} model={model} sliceComponent={sliceComponent} setComponent={setComponent} />
                </SandpackLayout>
            </SandpackProvider>
        </>
    )
}


export default SandBox;