import { useState, useRef } from 'react';
import { Upload, File, X, AlertCircle, CheckCircle } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  onFileUrlChange: (url: string | null) => void;
}

export function FileUpload({ onFileSelect, onFileUrlChange }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = ['.stl', '.obj', '.ply', '.3mf'];
  const maxSize = 50 * 1024 * 1024; // 50MB

  const validateFile = (file: File): string | null => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!acceptedTypes.includes(extension)) {
      return 'Formato no soportado. Usa archivos STL, OBJ, PLY o 3MF';
    }
    
    if (file.size > maxSize) {
      return 'El archivo es demasiado grande. Máximo 50MB';
    }
    
    return null;
  };

  const handleFile = (file: File) => {
    setError(null);
    
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setUploadedFile(file);
    onFileSelect(file);
    
    // Create object URL for 3D viewer
    const url = URL.createObjectURL(file);
    setFileUrl(url);
    onFileUrlChange(url);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    setUploadedFile(null);
    setFileUrl(null);
    setError(null);
    onFileSelect(null);
    onFileUrlChange(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
          dragActive
            ? 'border-[var(--brand)] bg-[var(--brand)]/10'
            : 'border-[var(--border)] hover:border-[var(--brand)]/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {!uploadedFile ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[var(--surface)] flex items-center justify-center">
              <Upload className="w-8 h-8 text-[var(--brand)]" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold mb-2">
                Arrastra tu archivo 3D aquí
              </h3>
              <p className="text-[var(--text-secondary)] mb-4">
                o haz clic para seleccionar
              </p>
              <div className="text-sm text-[var(--text-tertiary)]">
                Formatos soportados: STL, OBJ, PLY, 3MF
                <br />
                Tamaño máximo: 50MB
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-left">
                <div className="font-medium">{uploadedFile.name}</div>
                <div className="text-sm text-[var(--text-secondary)]">
                  {formatFileSize(uploadedFile.size)}
                </div>
              </div>
              <button
                onClick={removeFile}
                className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center hover:bg-red-500/30 transition-colors"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-2 p-4 rounded-xl bg-red-500/10 text-red-500">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* File Info */}
      {uploadedFile && (
        <div className="glass rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <File className="w-5 h-5 text-[var(--brand)]" />
            <div className="flex-1">
              <div className="font-medium">{uploadedFile.name}</div>
              <div className="text-sm text-[var(--text-secondary)]">
                {formatFileSize(uploadedFile.size)} • {uploadedFile.type || 'Archivo 3D'}
              </div>
            </div>
            <div className="text-green-500">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
