package com.example.messagingstompwebsocket;

import com.example.messagingstompwebsocket.representation.Mensage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {

	@Autowired
	private SimpMessagingTemplate messagingTemplate;

	@MessageMapping("/chat")
	public Mensage  chat(@Payload Mensage mensage){
		messagingTemplate
				.convertAndSendToUser(
						mensage.getReceiver(),
						"/queue/messages",
						mensage
				);
		return mensage;
	}

	@MessageMapping("/hello")
	@SendTo("/topic/greetings")
	public Greeting greeting(HelloMessage message) throws Exception {
		Thread.sleep(1000); // simulated delay
		return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
	}

}
