import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * 페이지 타이틀을 동적으로 변경하는 커스텀 훅
 * 
 * @param {string} pageKey - 페이지 키 (예: 'home', 'login', 'recipeDetail')
 * @param {string} [customTitle] - 커스텀 타이틀 (레시피 이름 등)
 * 
 * @example
 * // 기본 사용
 * usePageTitle('home');
 * 
 * @example
 * // 커스텀 타이틀과 함께 사용 (레시피 상세 페이지)
 * usePageTitle('recipeDetail', recipeName);
 */
export const usePageTitle = (pageKey, customTitle = null) => {
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    // 커스텀 타이틀이 있는 경우 (예: 레시피 이름)
    if (customTitle) {
      document.title = `${customTitle} - ${t('appName')}`;
    } 
    // pageTitle에 해당 키가 있는 경우
    else if (pageKey && t(`pageTitle.${pageKey}`, { defaultValue: null })) {
      document.title = t(`pageTitle.${pageKey}`);
    } 
    // 기본 타이틀
    else {
      document.title = t('pageTitle.default');
    }
  }, [pageKey, customTitle, t, i18n.language]); // 언어 변경 시에도 업데이트
};

export default usePageTitle;
