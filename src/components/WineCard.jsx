import PropTypes from "prop-types";

function WineCard(props) {
    const { wine, updateClick, deleteClick } = props;

    return (
        <div className='col'>
            <div className='card'>
                <div className="card-header">
                    {wine.name}
                </div>
                <div className="card-body">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Borászat</th>
                                <td>{wine.vinery}</td>
                            </tr>
                            <tr>
                                <th>Szőllő fajtája</th>
                                <td>{wine.grape_variety}</td>
                            </tr>
                            <tr>
                                <th>Évjárat</th>
                                <td>{wine.vintage}</td>
                            </tr>
                            <tr>
                                <th>Ár</th>
                                <td>{wine.price}</td>
                            </tr>
                        </tbody>
                    </table>                    
                </div>
                <div className="card-footer">
                    <div className="d-grid gap-1">
                        <button className="btn btn-warning" onClick={()=>{updateClick(wine.id)}}>Módosítás</button>
                        <button className="btn btn-danger" onClick={()=>{deleteClick(wine.id)}}>Törlés</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

WineCard.propTypes = {
    wine: PropTypes.object.isRequired,
    updateClick: PropTypes.func.isRequired,
    deleteClick: PropTypes.func.isRequired
}

export default WineCard;