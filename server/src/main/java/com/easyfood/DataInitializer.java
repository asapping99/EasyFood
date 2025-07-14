package com.easyfood;

import com.easyfood.entity.Category;
import com.easyfood.entity.Recipe;
import com.easyfood.entity.User;
import com.easyfood.repository.CategoryRepository;
import com.easyfood.repository.RecipeRepository;
import com.easyfood.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(CategoryRepository categoryRepository,
                               RecipeRepository recipeRepository,
                               UserRepository userRepository,
                               PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByUsername("admin") == null) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("pass"));
                userRepository.save(admin);
            }
            if (categoryRepository.count() == 0) {
                Category cat = new Category();
                cat.setName("기본");
                categoryRepository.save(cat);
                Recipe r = new Recipe();
                r.setTitle("샘플 레시피");
                r.setDescription("테스트용 레시피");
                r.setInstructions("재료를 섞어 조리합니다");
                r.setCategory(cat);
                recipeRepository.save(r);
            }
        };
    }
}
