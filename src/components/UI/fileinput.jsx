export default function FileInput({
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
            <input type="file" className="form-control" id="inputGroupFile01" style = {combinedStyle}/>
        </div>

    );
}