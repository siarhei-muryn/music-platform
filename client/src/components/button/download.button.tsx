import React, { useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import axios from "axios";

type Props = {
  track_id: string;
  fileName: string;
};

export const DownloadButton: React.FC<Props> = ({ track_id, fileName }) => {
  const { token } = useTypedSelector((state) => state.user);
  const handleDownload = async () => {
    const response = await axios.get("http://localhost:5000/track/download", {
      params: { id: track_id },
      headers: { Authorization: `Bearer ${token}` },
    });

    const byteArray = new Uint8Array(response.data.data);
    const blob = new Blob([byteArray], { type: "audio/mpeg" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  };
  return <button onClick={handleDownload}>Download</button>;
};
