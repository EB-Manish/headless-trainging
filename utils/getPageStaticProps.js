import {gql} from "@apollo/client";
import client from "client";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";
import { mapMainMenuItems } from "utils/mapMainMenuItems";

export const getPageStaticProps = async (context) =>{
    const uri = context.params?.slug?`/${context.params.slug.join("/")}/` : "/";
    const {data} = await client.query({
        query: gql`
        query PageQuery($uri: String!) {
          nodeByUri(uri: $uri) {
            ... on Page {
              id
              title
              blocks
              seo {
                title
                metaDesc
              }
            }
            
            ... on Property {
              id
              title
              blocks
              seo {
                title
                metaDesc
              }
            }
          }
          acfOptionsMainMenu {
            mainMenu {
              callToActionButton {
                label
                destation {
                  ... on Page {
                    uri
                  }
                }
              }
              menuItems {
                menuItem {
                  destination {
                    ... on Page {
                      uri
                    }
                  }
                  label
                }
                items {
                  label
                  destination {
                    ... on Page {
                      uri
                    }
                  }
                }
              }
            }
          }
        }
        `,
        variables:{
            uri,
        }
      });
      return{
        props:{
          seo: data.nodeByUri.seo,
          mainMenuItems: mapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems),
          callToActionLabel: data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
          callToActionDestination: data.acfOptionsMainMenu.mainMenu.callToActionButton.destation.uri,
          blocks: cleanAndTransformBlocks(data.nodeByUri.blocks),
        },
      };
    };