export default function Search({
    placeholder='',
    style = {}
  }) {
    const defaultStyle = {
        borderRadius: '15px'
    }
    const combinedStyle = {
        ...defaultStyle,
        ...style
    }
    return (
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder={placeholder} aria-label="Example text with button addon" aria-describedby="button-addon1" style = {combinedStyle}/>
        </div>
    );
}