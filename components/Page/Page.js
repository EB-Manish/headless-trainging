import { MainMenu } from "../MainMenu/MainMenu";
import { BLockRenderer } from "../blockrenderer/blockrenderer";
export const Page = (props) => {
    return (
    <div className="font-heading">
        {/* <head>
            <title>{props.seo.title}</title>
            <meta name="description" content={props.seo.metaDesc} />
        </head> */}
    <MainMenu items={props.mainMenuItems} callToActionLabel={props.callToActionLabel}
    callToActionDestination={props.callToActionDestination}
    />
    <BLockRenderer blocks={props.blocks}/></div>
    );
}