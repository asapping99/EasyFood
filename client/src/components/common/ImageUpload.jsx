import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react';
import { uploadImage, validateImageFile, convertImageToBase64 } from '../../api/services/fileService';

/**
 * 이미지 업로드 컴포넌트
 * - 드래그 앤 드롭 지원
 * - 파일 선택 지원
 * - 썸네일 미리보기
 * - 업로드 진행 표시
 * 
 * @param {Function} onImageUploaded - 이미지 업로드 완료 시 콜백 (fileUrl을 받음)
 * @param {string} initialImageUrl - 초기 이미지 URL (수정 모드에서 사용)
 * @param {string} label - 라벨 텍스트
 */
const ImageUpload = ({ onImageUploaded, initialImageUrl = '', label = '이미지 업로드' }) => {
  const { t } = useTranslation(['recipe', 'common']);
  const [imagePreview, setImagePreview] = useState(initialImageUrl);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  /**
   * 파일 선택 핸들러
   */
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  /**
   * 드래그 오버 핸들러
   */
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  /**
   * 드래그 리브 핸들러
   */
  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  /**
   * 드롭 핸들러
   */
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  /**
   * 파일 처리 (유효성 검사 + 업로드)
   */
  const handleFile = async (file) => {
    setError('');

    // 파일 유효성 검사
    const validation = validateImageFile(file, 10);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    try {
      // 썸네일 미리보기 생성
      const base64 = await convertImageToBase64(file);
      setImagePreview(base64);

      // 서버에 업로드
      setUploading(true);
      const response = await uploadImage(file);

      if (response.success) {
        // 서버에서 전체 URL을 반환하므로 그대로 사용
        setImagePreview(response.fileUrl);
        
        // 부모 컴포넌트에 알림
        onImageUploaded(response.fileUrl);
      } else {
        setError(response.error || '업로드에 실패했습니다.');
        setImagePreview('');
      }
    } catch (err) {
      console.error('이미지 업로드 오류:', err);
      setError(err.message || '업로드 중 오류가 발생했습니다.');
      setImagePreview('');
    } finally {
      setUploading(false);
    }
  };

  /**
   * 이미지 제거 핸들러
   */
  const handleRemoveImage = () => {
    setImagePreview('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageUploaded('');
  };

  /**
   * 파일 선택 다이얼로그 열기
   */
  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      {/* 라벨 */}
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label} <span className="text-red-500">*</span>
        </label>
      )}

      {/* 업로드 영역 */}
      <div
        className={`relative border-2 border-dashed rounded-xl transition-all duration-300 ${
          isDragging
            ? 'border-orange-500 bg-orange-50'
            : imagePreview
            ? 'border-gray-300'
            : 'border-gray-300 hover:border-orange-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* 업로드 중 오버레이 */}
        {uploading && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10 rounded-xl">
            <div className="text-center">
              <Loader className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-600">업로드 중...</p>
            </div>
          </div>
        )}

        {/* 이미지 미리보기 */}
        {imagePreview ? (
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg"
            />
            
            {/* 이미지 위 오버레이 (호버 시 표시) */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 rounded-lg flex items-center justify-center">
              <button
                type="button"
                onClick={handleRemoveImage}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 우측 상단 제거 버튼 (항상 표시) */}
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* 업로드 안내 */
          <div
            onClick={handleClickUpload}
            className="p-12 text-center cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              <span className="text-orange-500 font-semibold">클릭</span>하여 이미지를 선택하거나
            </p>
            <p className="text-gray-600 mb-4">이미지를 여기로 드래그하세요</p>
            <p className="text-xs text-gray-500">
              JPG, PNG, GIF, WEBP (최대 10MB)
            </p>
          </div>
        )}

        {/* 숨겨진 파일 입력 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* 도움말 */}
      {!imagePreview && !error && (
        <p className="text-xs text-gray-500">
          * 요리 사진을 업로드해주세요. 정사각형 비율을 권장합니다.
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
