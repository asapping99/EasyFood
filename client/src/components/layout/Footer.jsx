import React from 'react';
import { ChefHat, Github, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white/60 backdrop-blur border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 브랜드 섹션 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <ChefHat className="w-6 h-6 text-orange-500" />
              <span className="font-bold text-xl text-gradient">K-Recipe</span>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              집에서 쉽게 만들 수 있는 다양한 한국 요리 레시피를 발견하고 공유하세요. 
              요리 초보자부터 전문가까지 모두가 함께하는 요리 커뮤니티입니다.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Github className="w-5 h-5 text-gray-600" />
              </a>
              <a
                href="mailto:contact@krecipe.com"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Mail className="w-5 h-5 text-gray-600" />
              </a>
            </div>
          </div>

          {/* 링크 섹션 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">서비스</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  레시피 찾기
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  인기 레시피
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  요리 팁
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  커뮤니티
                </a>
              </li>
            </ul>
          </div>

          {/* 지원 섹션 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">지원</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  도움말
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  문의하기
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  개인정보처리방침
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  이용약관
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-gray-600 text-center md:text-left mb-4 md:mb-0">
              <p>© 2025 K-Recipe. 모든 권리 보유.</p>
              <p>Spring Boot + React로 만든 요리 레시피 웹서비스</p>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 mx-1" />
              <span>by Korean Developers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
