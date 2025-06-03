import React, { useState } from 'react';
import { Upload, X, CheckCircle, Download } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { fileService } from '../services/api';
import { UploadedFile } from '../types';

const SvgUploader: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState('');
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };
  
  const handleFiles = async (files: File[]) => {
    const svgFiles = files.filter(file => file.type === 'image/svg+xml');
    
    if (svgFiles.length === 0) {
      setError('Please upload SVG files only.');
      return;
    }
    
    setError('');
    setIsUploading(true);
    
    try {
      // In a real application, this would upload to the backend
      // For demo purposes, we'll simulate a successful upload
      
      // Uncomment when backend is available
      // const results = await Promise.all(
      //   svgFiles.map(file => fileService.uploadSvg(file))
      // );
      
      // Mock data for demonstration
      const mockResults = svgFiles.map((file, index) => ({
        id: `file-${Date.now()}-${index}`,
        filename: file.name,
        uploadDate: new Date().toISOString(),
        annotated: false,
      }));
      
      setUploadedFiles(prev => [...prev, ...mockResults]);
    } catch (error) {
      console.error('Error uploading files:', error);
      setError('Failed to upload files. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  const getAnnotatedSvg = (filename: string) => {
    // In a real application, this would get the URL from the backend
    return fileService.getAnnotatedUrl(filename);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">SVG Uploader</h1>
          <p className="mt-1 text-neutral-600">Upload patient scan SVG files for analysis</p>
        </div>
      </div>
      
      <Card>
        <div
          className={`
            border-2 border-dashed rounded-lg p-8 
            transition-colors duration-200 ease-in-out
            flex flex-col items-center justify-center
            ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-neutral-300 hover:border-primary-400'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="bg-primary-100 p-3 rounded-full text-primary-600 mb-4">
            <Upload size={24} />
          </div>
          <h3 className="text-lg font-medium text-neutral-900 mb-1">Upload SVG Files</h3>
          <p className="text-neutral-600 text-center mb-4">
            Drag and drop SVG files here, or click to select files
          </p>
          
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".svg,image/svg+xml"
            onChange={handleFileInput}
            multiple
          />
          <label htmlFor="file-upload">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              isLoading={isUploading}
            >
              Select Files
            </Button>
          </label>
          
          {error && (
            <div className="mt-4 p-3 bg-error-50 text-error-700 rounded-md text-sm">
              {error}
            </div>
          )}
        </div>
      </Card>
      
      {uploadedFiles.length > 0 && (
        <Card title="Uploaded Files" subtitle="SVG scans available for annotation">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Filename
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {uploadedFiles.map((file) => (
                  <tr key={file.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {file.filename}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                      {new Date(file.uploadDate).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800">
                        <CheckCircle size={14} className="mr-1" /> Processed
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                      <a 
                        href={getAnnotatedSvg(file.filename)}
                        download={`annotated-${file.filename}`}
                        className="inline-flex items-center text-primary-600 hover:text-primary-800"
                      >
                        <Download size={16} className="mr-1" />
                        Download Annotated
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">About SVG Analysis</h3>
        <p className="text-neutral-700">
          Our system can analyze lung scan SVG files to identify potential areas of concern.
          After uploading, the system processes the image and returns an annotated version with
          highlighted regions of interest and detailed analysis notes.
        </p>
      </div>
    </div>
  );
};

export default SvgUploader;