import { useRef, useState, type DragEvent } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './ImageUpload.css';

interface ImageUploadProps {
  imageUrl: string | null;
  onUpload: (file: File) => void;
  onRemove: () => void;
}

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED = ['image/jpeg', 'image/png', 'image/jpg'];

export default function ImageUpload({ imageUrl, onUpload, onRemove }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  const validate = (file: File): boolean => {
    setError(null);
    if (!ACCEPTED.includes(file.type)) {
      setError(t('editor.image.error.type'));
      return false;
    }
    if (file.size > MAX_SIZE) {
      setError(t('editor.image.error.size'));
      return false;
    }
    return true;
  };

  const handleFile = (file: File) => {
    if (validate(file)) {
      onUpload(file);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  if (imageUrl) {
    return (
      <div className="image-upload-preview">
        <img src={imageUrl} alt="Uploaded preview" />
        <button className="image-remove btn btn-ghost btn-icon" onClick={onRemove} title={t('editor.image.remove_button')}>
          <X size={16} />
        </button>
        <button className="image-replace" onClick={handleClick}>
          <Upload size={14} /> {t('editor.image.replace')}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleChange}
          hidden
        />
      </div>
    );
  }

  return (
    <div>
      <div
        className={`image-upload-zone ${dragging ? 'dragging' : ''}`}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="upload-icon">
          <Image size={28} />
        </div>
        <p className="upload-text">
          <span>{t('editor.image.upload')}</span>{t('editor.image.drag')}
        </p>
        <p className="upload-hint">{t('editor.image.formats')}</p>
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleChange}
          hidden
        />
      </div>
      {error && <p className="upload-error">{error}</p>}
    </div>
  );
}
