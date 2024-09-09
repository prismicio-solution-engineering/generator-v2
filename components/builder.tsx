'use client'

import React, { useState } from 'react';
import SandBox from './sandbox';
import { defaultBrand, defaultComponent, defaultEnhancement, defaultModel, defaultPrompt, defaultSliceComponent } from '@/slices/files';

export const BuilderComponent = () => {
    const [component, setComponent] = useState(defaultComponent);
    const [model, setModel] = useState(defaultModel)
    const [sliceComponent, setSliceComponent] = useState(defaultSliceComponent);
    const [prompt, setPrompt] = useState(defaultPrompt);
    const [brand, setBrand] = useState(defaultBrand);
    const [enhancement, setEnhancement] = useState(defaultEnhancement);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showDetails, setShowDetails] = useState(false);

    const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.currentTarget.form!.dataset.submitValue = event.currentTarget.value;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPrompt({ name: event.currentTarget.sliceName.value, description: event.currentTarget.sliceDescription.value })
        setBrand({ websiteDescription: event.currentTarget.websiteDescription.value, font: event.currentTarget.font.value, colors: event.currentTarget.colors.value, additionalDetails: event.currentTarget.additionalDetails.value })

        if (event.currentTarget.dataset.submitValue === "slicify") {
            console.log("slicify")
            handleSlicifier(event)
        }
        else {
            console.log("generate")
            setIsLoading(true)
            try {
                const response = await fetch('/generator', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt: { name: event.currentTarget.sliceName.value, description: event.currentTarget.sliceDescription.value }, brand: { websiteDescription: event.currentTarget.websiteDescription.value, font: event.currentTarget.font.value, colors: event.currentTarget.colors.value, additionalDetails: event.currentTarget.additionalDetails.value } }),
                });

                if (response.ok) {
                    console.log('Message sent');
                    const responseData = await response.json();
                    setComponent(responseData.component);
                    setModel("Slicify your component to get the model");
                    setSliceComponent("Slicify your component to get the Slice Component")
                } else {
                    console.log('Error sending message');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false)
            }
        }
    };


    const handleEnhancer = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true)
        setEnhancement(event.currentTarget.enhancement.value)

        try {
            const response = await fetch('/enhancer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: prompt, brand: brand, component: component, enhancement: event.currentTarget.enhancement.value }),
            });

            if (response.ok) {
                console.log('Message sent');
                const responseData = await response.json();
                setComponent(responseData.component);
                setModel("Slicify your component to get the model");
                setSliceComponent("Slicify your component to get the Slice Component")
            } else {
                console.log('Error sending message');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false)
        }
    }


    const handleSlicifier = async (event: React.FormEvent<HTMLFormElement>) => {

        try {
            setIsLoading(true)
            const response = await fetch('/slicifier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: { name: event.currentTarget.sliceName.value, description: event.currentTarget.sliceDescription.value }, component: component }),
            });


            if (response.ok) {
                console.log('Message sent');
                const responseData = await response.json();
                setModel(responseData.model)
                setSliceComponent(responseData.sliceComponent)
                setComponent(component)
            } else {
                console.log('Error sending message');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="websiteDescription">
                        Website Description
                    </label>
                    <textarea rows={1} defaultValue="Documentation website of Klarna, Klarna offers better shopping with direct payments, pay later options, and installment plans in a smoooth one-click purchase experience." name="websiteDescription" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Website description" />
                </div>
                <button type='button' onClick={(e) => { e.preventDefault(); setShowDetails(!showDetails) }}
                    className="text-blue-500 hover:text-blue-800 pb-4 ">
                    {showDetails ? "Hide details" : "Show more details"}
                </button>
                <div className={showDetails ? "" : "hidden"}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="websiteDescription">
                            Font
                        </label>
                        <textarea rows={1} defaultValue="Sans" name="font" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="font" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="colors">
                            Colors
                        </label>
                        <textarea rows={1} defaultValue="#000000,#ffffff,#171717,#487b94,#41718a" name="colors" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="#000000" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="additionalDetails">
                            Additional Details (edit with caution)
                        </label>
                        <textarea rows={5}
                            defaultValue={`Spacing: 160px,128px,96px,88px,80px,64px,56px,48px,40px,32px,24px,16px,12px,8px
Desktop Layout Grid: Screen size 1440px, 12 cols, Gutter 24px, Margin 84px
Mobile Layout Grid: Screen size 390px, 6 cols, Gutter 24px, Margin 24px
Border Radius: 16px on frames, 8px on buttons
Drop Shadow: Minimal to none, maintaining a clean and flat design aesthetic.
Padding: Consistent padding is crucial. The top and bottom of sections should have balanced padding.
Alignment: Titles are centered, Texts and buttons are typically left-aligned on the page and within sections
Buttons: They should be styled for visibility and consistency with the brand colors.
Distribution: Elements should be evenly distributed across the width of the section for a harmonious and balanced layout.
Dropdowns: Ensure dropdown buttons have a clearly visible default value for better user experience and accessibility.`}
                            name="additionalDetails" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Website description" />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sliceName">
                        Slice Name
                    </label>
                    <textarea rows={1} defaultValue="TeamSlice" name="sliceName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="sliceName" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sliceDescription">
                        Slice Description
                    </label>
                    <textarea rows={3} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="sliceDescription" placeholder="sliceDescription" defaultValue="The Team Section is made of card for each team member, each card contains a name, a position and a profile picture." />
                </div>
                <button disabled={isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-100 disabled:outline-none mr-4" type="submit" value="generate" onClick={handleButtonClick}>Generate</button>
                <button disabled={isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-100 disabled:outline-none" type="submit" value="slicify" onClick={handleButtonClick}>Slicify</button>
            </form>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleEnhancer}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="enhancement">
                        Enhancement
                    </label>
                    <textarea rows={3} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="enhancement" placeholder="Enhancement" defaultValue="Make the title bigger, make the cards background darker and add a hover effect to them" />
                </div>
                <button disabled={isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-100 disabled:outline-none" type="submit">Enhance</button>
            </form>
            <SandBox setComponent={setComponent} component={isLoading ? `//------
//Loading... Please wait for generation
//------

import React from 'react';

const LoadingComponent = () => (
<div className="flex items-center justify-center h-screen">
<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
</div>
);

export default LoadingComponent;` : component} model={isLoading ? "Loading.... Please wait for Generation" : model} sliceComponent={isLoading ? "Loading.... Please wait for Generation" : sliceComponent} />
        </>
    )
}