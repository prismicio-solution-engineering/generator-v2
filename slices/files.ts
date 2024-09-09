export const defaultComponent = `import React from "react";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Alice Johansson",
      position: "CEO",
      imageUrl: "https://source.unsplash.com/random/300x300?sig=1",
    },
    {
      name: "David Smith",
      position: "CTO",
      imageUrl: "https://source.unsplash.com/random/300x300?sig=2",
    },
    {
      name: "Emma Jones",
      position: "Lead Designer",
      imageUrl: "https://source.unsplash.com/random/300x300?sig=3",
    },
    {
      name: "Michael Brown",
      position: "Head of Sales",
      imageUrl: "https://source.unsplash.com/random/300x300?sig=4",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="
          text-center text-3xl font-semibold text-gray-800
          mb-16
          font-sans
        ">
          Our Team
        </h1>
        <div className="flex flex-wrap -mx-4 justify-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="
              px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-10
            ">
              <div className="
                flex flex-col items-center overflow-hidden
                bg-[#ffffff] rounded-lg shadow-lg
                p-6 border border-[#f0eee3]
              ">
                <img 
                  className="
                    mb-6 w-24 h-24 rounded-full object-cover 
                    border-2 border-white
                  " 
                  src={member.imageUrl} 
                  alt={member.name}
                />
                <h2 className="
                  text-xl font-semibold text-gray-800 mb-1 
                  font-sans
                ">
                  {member.name}
                </h2>
                <p className="
                  text-sm text-gray-600 mb-3
                  font-sans
                ">
                  {member.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
`

export const defaultPrompt = { name: "TeamSlice", description: "The Team Section is made of card for each team member, each card contains a name, a position and a profile picture." }

export const defaultModel = `{
  "id": "team_section",
  "type": "SharedSlice",
  "name": "TeamSection",
  "description": "The Team Section is made of a card for each team member, each card contains a name, a position, and a profile picture.",
  "variations": [
    {
      "id": "default",
      "name": "Default Variation",
      "description": "Default variation displaying team members with their names, positions, and profile pictures.",
      "primary": {
        "section_title": {
          "type": "StructuredText",
          "config": {
            "label": "Section Title",
            "placeholder": "Our Team",
            "single": "heading1"
          }
        }
      },
      "items": {
        "name": {
          "type": "Text",
          "config": {
            "label": "Name",
            "placeholder": "Name of the team member"
          }
        },
        "position": {
          "type": "Text",
          "config": {
            "label": "Position",
            "placeholder": "Position of the team member"
          }
        },
        "profile_picture": {
          "type": "Image",
          "config": {
            "label": "Profile Picture",
            "constraint": {
              "width": 200,
              "height": 200
            },
            "thumbnails": []
          }
        }
      },
      "docURL": "...",
      "version": "initial",
      "imageUrl": ""
    }
  ]
}`

export const defaultSliceComponent = `import React from "react";
import {PrismicNextImage, PrismicNextLink} from "@prismicio/next";
import {PrismicRichText} from "@prismicio/react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for "TeamSection".
 */
export type TeamSectionProps = SliceComponentProps<Content.TeamSectionSlice>;

/**
 * Component for "TeamSection" Slices.
 */
const TeamSection = ({ slice }: TeamSectionProps): JSX.Element => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PrismicRichText
          field={slice.primary.section_title}
          components={{
            heading1: ({ children }) => (
              <h1 className="
                text-center text-3xl font-semibold text-gray-800
                mb-16 font-sans
              ">
                {children}
              </h1>
            ),
          }}
        />
        <div className="flex flex-wrap -mx-4 justify-center">
          {slice.items.map((member, index) => (
            <div key={index} className="
              px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-10
            ">
              <div className="
                flex flex-col items-center overflow-hidden
                bg-[#ffffff] rounded-lg shadow-lg
                p-6 border border-[#f0eee3]
              ">
                <PrismicNextImage 
                  className="
                    mb-6 w-24 h-24 rounded-full object-cover 
                    border-2 border-white
                  " 
                  field={member.profile_picture} 
                />
                <h2 className="
                  text-xl font-semibold text-gray-800 mb-1 font-sans
                ">
                  {member.name}
                </h2>
                <p className="
                  text-sm text-gray-600 mb-3 font-sans
                ">
                  {member.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;`

export const defaultBrand = {
  websiteDescription: "Documentation website of Klarna, Klarna offers better shopping with direct payments, pay later options, and installment plans in a smoooth one-click purchase experience.",
  font: "Sans",
  colors: "#000000,#ffffff,#171717,#487b94,#41718a",
  additionalDetails: `Spacing: 160px,128px,96px,88px,80px,64px,56px,48px,40px,32px,24px,16px,12px,8px
  Desktop Layout Grid: Screen size 1440px, 12 cols, Gutter 24px, Margin 84px
  Mobile Layout Grid: Screen size 390px, 6 cols, Gutter 24px, Margin 24px
  Border Radius: 16px on frames, 8px on buttons
  Drop Shadow: Minimal to none, maintaining a clean and flat design aesthetic.
  Padding: Consistent padding is crucial. The top and bottom of sections should have balanced padding.
  Alignment: Titles are centered, Texts and buttons are typically left-aligned on the page and within sections
  Buttons: They should be styled for visibility and consistency with the brand colors.
  Distribution: Elements should be evenly distributed across the width of the section for a harmonious and balanced layout.
  Dropdowns: Ensure dropdown buttons have a clearly visible default value for better user experience and accessibility.`
}

export const defaultEnhancement="Make the title bigger, make the cards background darker and add a hover effect to them"