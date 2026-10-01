package in.pravinmisal.foodsapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class FoodsapiApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodsapiApplication.class, args);
	}
	@Bean
	CommandLineRunner test(@Value("${spring.data.mongodb.uri}") String uri) {
		return args -> {
			System.out.println("Mongo URI = " + uri);
		};
	}

}