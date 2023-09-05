import { Cover } from "../cover/cover";
import { Heading } from "../Heading/Heading";
import { Paragraph } from "../paragraph/Paragraph";
import { theme } from "theme";
import { CallToActionButton } from "../CallToActionButton/CallToActionButton";
import { Columns } from "../Columns/Columns";
import { Column } from "../Column/Column";
import Image from 'next/image';
import { PropertySearch } from "../PropertySearch/PropertySearch";
import { PropertyFeatures } from "../PropertyFeature/PropertyFeature";
import { Gallery } from "../Gallery/Gallery";
import { Tickitem } from "../Tickitem/Tickitem";


export const BLockRenderer = ({blocks}) =>{
    return blocks.map(block =>{
        // console.log("Block: ",block)
        switch (block.name){
            case "acf/propertyfeatures":{
                return (<PropertyFeatures key={block.id}
                price={block.attributes.price}
                bathrooms={block.attributes.bathrooms}
                bedrooms={block.attributes.bedrooms}
                hasParking={block.attributes.has_parking}
                petFriendly={block.attributes.pet_friendly}/>
                );
            }
            case "acf/ctabutton": {
                return ( 
                    <CallToActionButton key={block.id} buttonLabel={ block.attributes.data.label } destination={ block.attributes.data.destination || "/"}
                    align={block.attributes.data.alignment}/>
                );
            }
            case "core/paragraph": {
                return ( <Paragraph 
                key={block.id}
                textAlign={block.attributes.align}
                content={block.attributes.content}
                textColor={
                theme[block.attributes.textColor] ||
                block.attributes.style?.color?.text
            }/>
                );
            }
            case "core/post-title":
            case "core/heading": {
                return ( 
                <Heading 
                key={block.id} 
                level={block.attributes.level} 
                content={block.attributes.content} 
                textAlign={block.attributes.textAlign}
                />
                );
            }
            case "acf/propertysearch":{
                return (
                    <PropertySearch key={block.id} />
                );
            }
            case "core/cover": {
                return (<Cover key={block.id} background={block.attributes.url}>
                    <BLockRenderer blocks={block.innerBlocks} />
                    </Cover>
                );
            }
            case "core/columns":{
                return (
                    <Columns key={block.id}
                    isStackedOnMobile={block.attributes.isStackedOnMobile}  
                    >
                        <BLockRenderer blocks={block.innerBlocks} />
                    </Columns>
                );
            }
            case "core/column":{
                // console.log("Column:", block.attributes);
                return (
                    <Column key={block.id} width={block.attributes.width}
                    textColor={
                        theme[block.attributes.textColor] || 
                        block.attributes.style?.color?.text
                    }> 
                        <BLockRenderer blocks={block.innerBlocks} />
                    </Column>
                );
            }
            case "core/image":{
                return(
                    <Image key={block.id} src={block.attributes.url}
                    width={block.attributes.width}
                    height={block.attributes.height}
                    alt={block.attributes.alt || ""} />
                );
            }
            case "acf/tickitem":{
                return <Tickitem key={block.id}>
                    <BLockRenderer blocks={block.innerBlocks}/>
                </Tickitem>
            }
            case "core/gallery":{
                return(
                    <Gallery key={block.id} 
                    columns={block.attributes.columns || 3}
                    cropImages={block.attributes.imageCrop}
                    items={block.innerBlocks} />
                );
            }
            
            default:
                console.log("UNKNOWN:", block)
                return null;
        }
    });
};