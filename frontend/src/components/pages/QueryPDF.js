import React from 'react'
import axios from 'axios'

const QueryPDF = () => {

    const handlePDFUpload = async (event) => {
      const file = event.target.files[0];
  
      if (!file) {
        return; // Handle case where no file is selected
      }
  
      // Validate file type and size if needed
      if (!file.type.startsWith('application/pdf')) {
        alert('Only PDF files are allowed.');
        return;
      }
  
      // Create form data (if needed for your API endpoint)
      const formData = new FormData();
      formData.append('file', file, file.name);
  
      try {
        const response = await axios.post('api/preparePDF', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
  
        // Process the response from your API
        console.log(response.data);
  

      } catch (error) {
        console.error('Error uploading file:', error);
        // Handle upload errors gracefully (e.g., display error message)
      }
    };

    return (
        <div className='page min-h-screen w-screen overflow-x-hidden overflow-y-auto' style={{padding: '0'}}>
            <div className=' w-full py-3 text-2xl bg-sec shadow-2xl px-2 flex items-center justify-between'>
                <h1>Learn From PDF</h1>
                <input 
                    onChange={(e)=>{handlePDFUpload(e)}}
                    type="file" 
                    className=' button'
                />
            </div>
        </div>
    )
}

export default QueryPDF