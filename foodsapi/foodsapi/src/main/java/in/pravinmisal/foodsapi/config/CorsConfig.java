
package in.pravinmisal.foodsapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(
                                "http://localhost:5173",
                                "http://localhost:5174",
                                "http://localhost:5175",
                                "https://foodies-admin-tau.vercel.app",
                                "https://foodies-beta-three.vercel.app",
                                "https://foodies-nm7yhunke-pravin-42bb.vercel.app",
                                "https://foodies-fgnnsatw2-pravin-42bb.vercel.app"
                        )
                        .allowedMethods(
                                "GET",
                                "POST",
                                "PUT",
                                "DELETE",
                                "OPTIONS",
                                "PATCH"
                        )
                        .allowedHeaders("*")
                        .maxAge(3600);
            }
        };
    }
}