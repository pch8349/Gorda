import "./RegistList.scss";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useState } from "react";
function RegistList() {
  const regist_list_1 = "제 11회 대구여성영화제 함께 해주세요!";
  const [progress, setProgress] = useState(70);
  return (
    <>
      <div className="regist_list">
        <div className="regist_tag">모금함</div>
        <div className="regist_list_title">{regist_list_1}</div>
      </div>
      <div className="regist_progress">
        <Box sx={{ width: "100%" }}>
          <div className="progress_label">모금 {progress}%</div>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      </div>
    </>
  );
}
export default RegistList;
