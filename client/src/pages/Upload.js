// /Test-Build/client/src/pages/Upload.js
import React, { useState } from 'react';
import axios from 'axios';

export default function Upload() {
  const [file, setFile]     = useState(null);
  const [status, setStatus] = useState('');
  const [url, setUrl]       = useState('');

  const onChange = e => {
    setFile(e.target.files[0]);
    setStatus('');
    setUrl('');
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!file) {
      setStatus('Please select a file.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/v1/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus('Upload successful!');
      setUrl(res.data.data.url);
    } catch (err) {
      console.error(err);
      setStatus(err.response?.data?.error || 'Upload failed.');
    }
  };

  return (
    <div className="page">
      <h1>Upload a Document</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="file">Select file</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={onChange}
        />
        <button type="submit" className="btn">Upload</button>
      </form>
      {status && <p>{status}</p>}
      {url && (
        <p>
          Download your file&nbsp;
          <a href={url} target="_blank" rel="noopener noreferrer">
            here
          </a>.
        </p>
      )}
    </div>
  );
}
