import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function WineForm(props) {
    
    const nameRef =useRef(null);
    const vineryRef =useRef(null);
    const grape_varietyRef =useRef(null);
    const vintageRef =useRef(null);
    const priceRef =useRef(null);
    const {onSubmit, buttonText, wine} = props;

    const createWine = async () => {
        const wine= {
            name: nameRef.current.value,
            vinery: vineryRef.current.value,
            grape_variety: grape_varietyRef.current.value,
            vintage: vintageRef.current.value,
            price: priceRef.current.value,
        };
        const succes = await onSubmit(wine);
        if (succes){
            resetForm();
        }
    }

    const resetForm = () => {
        nameRef.current.value = "";
        vineryRef.current.value = "";
        grape_varietyRef.current.value = "";
        vintageRef.current.value = "";
        priceRef.current.value = "";
    }

    useEffect(()=>{
        if(wine){
            nameRef.current.value = wine.name;
            vineryRef.current.value = wine.vinery;
            grape_varietyRef.current.value = wine.grape_variety;
            vintageRef.current.value = wine.vintage;
            priceRef.current.value = wine.price;
        }
    }, [wine]);

    return (<form onSubmit={event => {event.preventDefault(); createWine();}}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Bor neve</label>
            <input type="text" id="name" className="form-control" placeholder="Bor nev" ref={nameRef} />
        </div>
        <div className="mb-3">
            <label htmlFor="vinery" className="form-label">Borászat</label>
            <input type="text" id="vinery" className="form-control" placeholder="Borászat" ref={vineryRef} />
        </div>
        <div className="mb-3">
            <label htmlFor="grape_variety" className="form-label">Szőlő fajtája</label>
            <input type="text" id="grape_variety" className="form-control" placeholder="Szőlő fajtája" ref={grape_varietyRef}/>
        </div>
        <div className="mb-3">
            <label htmlFor="vintage" className="form-label">Évjárat</label>
            <input type="number" id="vintage" className="form-control" placeholder="Évjárat" ref={vintageRef}/>
        </div>
        <div className="mb-3">
            <label htmlFor="price" className="form-label">Ár</label>
            <input type="number" id="price" className="form-control" placeholder="Ár" ref={priceRef}/>
        </div>
        <button type="submit" className="btn btn-primary">{buttonText}</button>
    </form>);
}

WineForm.propTypes = {
    onSubmit : PropTypes.func.isRequired,
    buttonText: PropTypes.string,
    wine: PropTypes.object
}

WineForm.defaultProps = {
    buttonText: "Felvétel",
    wine: null
}

export default WineForm;