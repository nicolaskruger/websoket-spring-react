package com.example.messagingstompwebsocket.representation;

import lombok.Data;

@Data
public class Mensage {
    private String sender;

    private String receiver;

    private String msg;
}
