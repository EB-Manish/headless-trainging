export const Columns = ({isStackedOnMobile,width, children,textColor,backgroudColor}) =>{
    const textColorStyle =textColor ? { color: textColor } : {};
    const backgroudColorStyle = backgroudColor ? { backgroudColor} : {};
    const widthStyle =width
    ? {minWidth: width, felxGrow:1}
    : {flexGrow: 1,flexBasis:0};
    return (<div className="my-10 text-color">
        <div style={{...widthStyle, ...textColorStyle,...backgroudColorStyle}}className={`text-black max-25xl mx-auto ${isStackedOnMobile ? "block md:flex" : "flex"}`}>
            {children}
        </div>
    </div>);
}