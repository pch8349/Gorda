import "./DonationListCard.scss";

function DonationListCard(props) {
  return (
    <>
      <div className="listcard">
        <div className="cardImg">
          <div
            className="img"
            style={{
              width: "290px",
              height: "300px",
              borderRadius: "20px 0px 0px 20px",
              backgroundImage: `url(${props.imgURL})`,
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <div className="cardP">
          <div className="hashtag"># {props.category}</div>
          <div className="title">{props.title}</div>
          <div className="paragraph">{props.description}</div>
          <div className="fund">{props.target}ETH 모금 중</div>
        </div>
      </div>
    </>
  );
}

export default DonationListCard;
