package com.fiap.mecatronia.api_enchentes.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Permitir origens específicas
        config.setAllowedOrigins(Arrays.asList(
            "http://localhost:19006",
            "http://127.0.0.1:19006",
            "http://localhost:8081",
            "http://127.0.0.1:8081",
            "http://localhost:3000",
            "http://127.0.0.1:3000"
        ));
        
        // Permitir credenciais
        config.setAllowCredentials(true);
        
        // Permitir headers específicos
        config.setAllowedHeaders(Arrays.asList(
            "Origin",
            "Content-Type",
            "Accept",
            "Authorization",
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Credentials"
        ));
        
        // Permitir todos os métodos HTTP
        config.setAllowedMethods(Arrays.asList(
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "OPTIONS",
            "PATCH"
        ));

        // Expor headers específicos
        config.setExposedHeaders(Arrays.asList(
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Credentials"
        ));

        // Tempo de cache das configurações CORS (1 hora)
        config.setMaxAge(3600L);

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
} 