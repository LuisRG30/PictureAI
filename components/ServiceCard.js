const ServiceCard = ({ name, image, selected }) => {
  
    return (
      <div
        style={{ border: selected ? "4px solid #e76f51" : "4px solid white" }}
      >
        <img src={image} alt={name} style={{
          width: "90px",
          height: "90px",
        }}/>
        <h3>{name}</h3>
      </div>
    );
  };

    export default ServiceCard;
  