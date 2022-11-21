import "./ProposalsItem.scss";
import { Link } from "react-router-dom";
function ProposalsItem(props) {
  return (
    <>
      <div className="proposal_container">
        <Link to={`/detail/${props.donationIdx}`}>
          <div
            className="proposal_image"
            style={{ backgroundImage: `url(${props.donationLogo})` }}
          ></div>
        </Link>
        <div className="proposal_title">{props.donationName}</div>
      </div>
    </>
  );
}

export default ProposalsItem;
